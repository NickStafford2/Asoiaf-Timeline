import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { of } from 'rxjs';
import { TimelineDateService } from './timeline-date.service';
import { TimelineTimeLabel, Event, TimelineChild } from '../_library';
import { TimelineService } from './timeline.service';

@Injectable({
  providedIn: 'root'
}) 
export class TimeLabelService {

  private _month$: BehaviorSubject<Array<TimelineTimeLabel>> = new BehaviorSubject<Array<TimelineTimeLabel>>([]);
  public readonly month$: Observable<Array<TimelineTimeLabel>> = this._month$.asObservable();

  private _year$: BehaviorSubject<Array<TimelineTimeLabel>> = new BehaviorSubject<Array<TimelineTimeLabel>>([]);
  public readonly year$: Observable<Array<TimelineTimeLabel>> = this._year$.asObservable();

  constructor(private _timelineDateService: TimelineDateService,
    private _timelineService: TimelineService
  ) {

    this._timelineDateService.month$.subscribe();
    this._timelineDateService.year$.subscribe();
    this._timelineService.redraw$.subscribe(this._onRedraw.bind(this));

  }

  private _getXOffset(startTime: number): number {
    const xOffset: number = this._timelineService.getPixelsForTimestamp(startTime);
    return xOffset;
  }

  private _sortFunction(a: TimelineChild, b: TimelineChild): number {
    if (a.startTime < b.startTime)
      return -1;
    if (a.startTime > b.startTime)
      return 1;
    return 0;
  }

  private _getWidth(duration: number): number {
    const width = this._timelineService.getPixelsForDuration(duration);
    return width;
  }

  private _onRedraw() {
    // todo: maybe just update the XOffset and width? I'm undecided if constant deep copies is bad
    this._onMonthsUpdate();
    this._onYearsUpdate();
  }

  private _onMonthsUpdate(): void {
    const months: Array<Event> = this._timelineDateService.getMonths()
    const monthsCopy: Array<TimelineTimeLabel> = [];

    months.forEach((month: Event) => {
      monthsCopy.push({
        startTime: month.startTime,
        duration: month.duration,
        //timeReadable: startOfYear.format('ll'),
        width: this._getWidth(month.duration),
        xOffset: this._getXOffset(month.startTime),
        timeReadable: moment(month.startTime).format('MMM')
      })
    })
    monthsCopy.sort(this._sortFunction)
    this._month$.next(monthsCopy);
  }
  private _onYearsUpdate(): void {
    const years: Array<Event> = this._timelineDateService.getYears()
    const yearsCopy: Array<TimelineTimeLabel> = [];
    years.forEach((year: Event) => {
      yearsCopy.push({
        startTime: year.startTime,
        duration: year.duration,
        width: this._getWidth(year.duration),
        xOffset: this._getXOffset(year.startTime),
        timeReadable: moment(year.startTime).format('YYYY')
      })
    })
    yearsCopy.sort(this._sortFunction)
    this._year$.next(yearsCopy);
  }

}


/*import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { MomentHttpService } from '../moment/moment-http.service';
import { MomentService } from '../moment/moment.service';
import { TimelineDateService } from './timeline-date.service';
import { TimeLabel } from '../_library';
import { TimelineService } from './timeline.service';


@Injectable({
  providedIn: 'root'
})
export class TimeLabelService {

  private _yearLabel$: BehaviorSubject<Array<TimeLabel>> = new BehaviorSubject<Array<TimeLabel>>([]);
  public readonly yearLabel$: Observable<Array<TimeLabel>> = this._yearLabel$.asObservable();



  constructor(private timelineService: TimelineService) { }

  
  private _getXOffset(timestamp: number): number {
    const xOffset: number = this.timelineService.getPixelsForTimestamp(timestamp);
    return xOffset;
  }



}
*/
