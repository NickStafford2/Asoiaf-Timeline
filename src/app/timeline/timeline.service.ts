import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { TimelineDateService } from './timeline-date.service';
import { MomentService } from '../moment/moment.service';

@Injectable({
  providedIn: 'root',
})
export class TimelineService {
  readonly rowLabelWidth: number = 100; // pixels

  private _widthInPixles$: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);

  readonly widthInPixles$: Observable<number> =
    this._widthInPixles$.asObservable();

  private _heightInPixles$: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);

  readonly heightInPixles$: Observable<number> =
    this._heightInPixles$.asObservable();

  // todo: make this a normal private variable
  private _pixlesPerMillisecond$: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);

  readonly pixlesPerMillisecond$: Observable<number> =
    this._pixlesPerMillisecond$.asObservable();

  // tell timeline to redraw the canvas
  private _redraw$: Subject<void> = new Subject();

  readonly redraw$: Observable<void> = this._redraw$.asObservable();

  constructor(
    private timelineDateService: TimelineDateService,
    private momentService: MomentService
  ) {
    this._widthInPixles$.subscribe(this._onWidthChanged.bind(this));
    this.timelineDateService.datesChanged$.subscribe(
      this._onDatesChanged.bind(this)
    );
    //this.momentService.moment$.subscribe(this._updateDateRange.bind(this));
  }

  getPixelsForTimestamp(timestamp: number): number {
    // todo: make room for row labels
    const start: number = this.timelineDateService.getStart();
    const timeDifference: number = timestamp - start;
    const offset: number =
      timeDifference * this._pixlesPerMillisecond$.getValue() +
      this.rowLabelWidth;
    return offset;
  }

  getPixelsForDuration(duration: number): number {
    return duration * this._pixlesPerMillisecond$.getValue();
  }

  setFullTimelineWidth(width: number): void {
    console.log('setFullTimelineWidth: ', width);
    this._widthInPixles$.next(width);
  }

  redrawCanvas(): void {
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

  setHeight(height: number): void {
    this._heightInPixles$.next(height);
  }

  getHeight(): number {
    return this._heightInPixles$.getValue();
  }
}
