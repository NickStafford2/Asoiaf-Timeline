import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { of } from 'rxjs';

import { TimelineDateService } from './timeline-date.service';
import { TimelineService } from './timeline.service';
import {
  TimelineTimeLabel,
  TimelineDate,
  TimelineChild,
  XYOffset,
} from '../_library';

@Injectable({
  providedIn: 'root',
})
export class TimeLabelService {
  private _month$: BehaviorSubject<Array<TimelineTimeLabel>> =
    new BehaviorSubject<Array<TimelineTimeLabel>>([]);

  public readonly month$: Observable<Array<TimelineTimeLabel>> =
    this._month$.asObservable();

  private _year$: BehaviorSubject<Array<TimelineTimeLabel>> =
    new BehaviorSubject<Array<TimelineTimeLabel>>([]);

  public readonly year$: Observable<Array<TimelineTimeLabel>> =
    this._year$.asObservable();

  public readonly yearLabelHeight: number = 30;

  public readonly monthLabelHeight: number = 30;

  constructor(
    private _timelineDateService: TimelineDateService,
    private _timelineService: TimelineService
  ) {
    this._timelineDateService.month$.subscribe(this._onMonthsUpdate.bind(this));
    this._timelineDateService.year$.subscribe(this._onYearsUpdate.bind(this));
    this._timelineService.pixlesPerMillisecond$.subscribe(() => {
      this._year$.getValue().forEach((year: TimelineTimeLabel) => {
        const xOffset = this._getXOffset(year.startTime);
        const yOffset: number = 0;
        const width = this._getWidth(year.duration);
        year.xyOffset$?.next({ xOffset, yOffset });
        year.width$.next(width);
      });
      this._month$.getValue().forEach((month: TimelineTimeLabel) => {
        const xOffset = this._getXOffset(month.startTime);
        const yOffset: number = this.yearLabelHeight; // below the year label
        const width = this._getWidth(month.duration);
        month.xyOffset$?.next({ xOffset, yOffset });
        month.width$.next(width);
      });
    });
    //this._timelineService.redraw$.subscribe(this._onRedraw.bind(this));
  }

  private _getXOffset(startTime: number): number {
    //console.log('_getXOffset', startTime)
    const xOffset: number =
      this._timelineService.getPixelsForTimestamp(startTime);
    return xOffset;
  }

  private _sortFunction(a: TimelineChild, b: TimelineChild): number {
    if (a.startTime < b.startTime) return -1;
    if (a.startTime > b.startTime) return 1;
    return 0;
  }

  private _getWidth(duration: number): number {
    const width = this._timelineService.getPixelsForDuration(duration);
    return width;
  }

  private _onRedraw() {
    //console.log('_onRedraw()')
    // todo: maybe just update the XOffset and width? I'm undecided if constant deep copies is bad
    this._onMonthsUpdate();
    this._onYearsUpdate();
  }

  private _onMonthsUpdate(): void {
    const months: Array<TimelineDate> = this._timelineDateService.getMonths();
    const monthsCopy: Array<TimelineTimeLabel> = [];

    months.forEach((month: TimelineDate) => {
      const xOffset: number = this._getXOffset(month.startTime);
      const yOffset: number = 0;
      const width: number = this._getWidth(month.duration);
      const height: number = this.monthLabelHeight;
      const newMonth: TimelineTimeLabel = {
        startTime: month.startTime,
        duration: month.duration,
        xyOffset$: new BehaviorSubject<XYOffset>({ xOffset, yOffset }),
        width$: new BehaviorSubject<number>(width),
        timeReadable: moment(month.startTime).format('MMM'),
        height$: new BehaviorSubject<number>(height),
      };
      monthsCopy.push(newMonth);
    });
    monthsCopy.sort(this._sortFunction);
    this._month$.next(monthsCopy);
  }

  private _onYearsUpdate(): void {
    const years: Array<TimelineDate> = this._timelineDateService.getYears();
    const yearsCopy: Array<TimelineTimeLabel> = [];
    years.forEach((year: TimelineDate) => {
      const xOffset = this._getXOffset(year.startTime);
      const yOffset: number = 0;
      const width = this._getWidth(year.duration);
      const height: number = this.yearLabelHeight;

      const newYear: TimelineTimeLabel = {
        startTime: year.startTime,
        duration: year.duration,
        timeReadable: moment(year.startTime).format('YYYY'),
        xyOffset$: new BehaviorSubject<XYOffset>({ xOffset, yOffset }),
        width$: new BehaviorSubject<number>(width),
        height$: new BehaviorSubject<number>(height),
      };
      yearsCopy.push(newYear);
    });
    yearsCopy.sort(this._sortFunction);
    this._year$.next(yearsCopy);
  }

  public getTimeLabelRowHeight() {
    return this.yearLabelHeight + this.monthLabelHeight;
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
