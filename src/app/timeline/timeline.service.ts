import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { MomentService } from '../moment/moment.service';
import { TimelineDateService } from './timeline-date.service';

@Injectable({
  providedIn: 'root',
})
export class TimelineService {
  public readonly rowLabelWidth: number = 100; // pixels

  private _widthInPixles$: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);
  public readonly widthInPixles$: Observable<number> =
    this._widthInPixles$.asObservable();

  // todo: make this a normal private variable
  private _pixlesPerMillisecond$: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);
  public readonly pixlesPerMillisecond$: Observable<number> =
    this._pixlesPerMillisecond$.asObservable();

  // tell timeline to redraw the canvas
  private _redraw$: Subject<void> = new Subject();
  public readonly redraw$: Observable<void> = this._redraw$.asObservable();

  constructor(
    private timelineDateService: TimelineDateService,
    private momentService: MomentService
  ) {
    this._widthInPixles$.subscribe(this._onWidthChanged.bind(this));
    this.timelineDateService.datesChanged$.subscribe(
      this._onDatesChanged.bind(this)
    );
    this.momentService.onUpdate$.subscribe(this._updateDateRange.bind(this));
  }

  public getPixelsForTimestamp(timestamp: number): number {
    // todo: make room for row labels
    const start: number = this.timelineDateService.getStart();
    const timeDifference: number = timestamp - start;
    const offset: number =
      timeDifference * this._pixlesPerMillisecond$.getValue() +
      this.rowLabelWidth;
    return offset;
  }

  public getPixelsForDuration(duration: number): number {
    return duration * this._pixlesPerMillisecond$.getValue();
  }

  public setFullTimelineWidth(width: number): void {
    console.log('setFullTimelineWidth: ', width);
    this._widthInPixles$.next(width);
  }

  public redrawCanvas(): void {
    console.log('redraw called');
    this._redraw$.next();
  }

  private _updatePixelsPerMillisecond(newWidth: number) {
    // todo: make room for row labels
    const ms: number = this.timelineDateService.getDuration();
    const timelineWidthWithoutRowLabels: number = newWidth - this.rowLabelWidth;
    const quotent: number = timelineWidthWithoutRowLabels / ms;
    this._pixlesPerMillisecond$.next(quotent);
    this._redraw$.next();
  }

  private _onDatesChanged() {
    this._updatePixelsPerMillisecond(this._widthInPixles$.getValue());
  }

  private _updateDateRange() {
    const min: number = this.momentService.getEarliestTimestamp();
    const max: number = this.momentService.getLatestTimestamp();

    const newMin: number = moment(min).startOf('month').valueOf();
    const newMax: number = moment(max).endOf('month').valueOf();

    this.timelineDateService.setDateRange(newMin, newMax);
  }
  private _onWidthChanged(newWidth: number): void {
    this._updatePixelsPerMillisecond(newWidth);
    //this._redraw$.next();
  }
}

/*
TimelineService
TimelineDateService
?TimelineCanvasService

how timeline objects know when to reposition
 push position to all subscribers.

 TimelineService
   has function widthChanged()
     update Pixels/Ms
     tell Timeline Component to refreshObjects

 TimelineComponent
   has function refreshChildren()
     for each child()
       refresh()

   notify timelineService when width changes

   has array of elements
   this.timelineService.datesChanged.subscribe(() => {
     load/delete viewchildren based on dates
     push new position to all children
   })

 TimelineChildComponent
   has a function setPosition(x)

  needs no Timelien services. TimelineComponent tells them what their pos is
  optional services like Moment/Event/MonthLine/Yearline/Moon
*/
