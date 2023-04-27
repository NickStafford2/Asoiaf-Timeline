import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { TimelineDateService } from './timeline-date.service';
import { TimelineService } from './timeline.service';
import { TimelineChild, TimelineDate, XYOffset } from '../_library';

@Injectable({
  providedIn: 'root',
})
export class LinesService {
  private _month$: BehaviorSubject<TimelineChild[]> = new BehaviorSubject<
    TimelineChild[]
  >([]);

  readonly month$: Observable<TimelineChild[]> = this._month$.asObservable();

  private _year$: BehaviorSubject<TimelineChild[]> = new BehaviorSubject<
    TimelineChild[]
  >([]);

  readonly year$: Observable<TimelineChild[]> = this._year$.asObservable();

  readonly yOffset: number = 0;

  readonly monthWidth: number = 1;

  readonly yearWidth: number = 3;

  constructor(
    private _timelineDateService: TimelineDateService,
    private _timelineService: TimelineService
  ) {
    this._timelineDateService.month$.subscribe(this._onMonthsUpdate.bind(this));
    this._timelineDateService.year$.subscribe(this._onYearsUpdate.bind(this));
    this._timelineService.pixlesPerMillisecond$.subscribe(() => {
      this._year$.getValue().forEach((year: TimelineChild) => {
        const xOffset: number = this._getXOffset(year.startTime);
        const yOffset: number = this.yOffset;
        year.xyOffset$?.next({ xOffset, yOffset });
      });
      this._month$.getValue().forEach((month: TimelineChild) => {
        const xOffset: number = this._getXOffset(month.startTime);
        const yOffset: number = this.yOffset;
        month.xyOffset$?.next({ xOffset, yOffset });
      });
    });
    //this._timelineService.redraw$.subscribe(this._onRedraw.bind(this));
  }

  private _getXOffset(startTime: number): number {
    //console.log('getXOffset()');
    const xOffset: number =
      this._timelineService.getPixelsForTimestamp(startTime);
    return xOffset;
  }

  private _sortFunction(a: TimelineChild, b: TimelineChild): number {
    if (a.startTime < b.startTime) return -1;
    if (a.startTime > b.startTime) return 1;
    return 0;
  }

  private _onRedraw() {
    // todo: maybe just update the XOffset and width? I'm undecided if constant deep copies is bad
    this._onMonthsUpdate();
    this._onYearsUpdate();
  }

  private _onMonthsUpdate(): void {
    const months: TimelineDate[] = this._timelineDateService.getMonths();
    const monthsCopy: TimelineChild[] = [];

    months.forEach((month: TimelineDate) => {
      const xOffset: number = this._getXOffset(month.startTime);
      const yOffset: number = this.yOffset;
      const newMonth: TimelineChild = {
        startTime: month.startTime,
        duration: month.duration,
        xyOffset$: new BehaviorSubject<XYOffset>({ xOffset, yOffset }),
        width$: new BehaviorSubject<number>(this.monthWidth),
        height$: new BehaviorSubject<number>(500),
      };
      monthsCopy.push(newMonth);
    });
    monthsCopy.sort(this._sortFunction);
    this._month$.next(monthsCopy);
  }

  private _onYearsUpdate(): void {
    const years: TimelineDate[] = this._timelineDateService.getYears();
    const yearsCopy: TimelineChild[] = [];

    years.forEach((year: TimelineDate) => {
      const xOffset: number = this._getXOffset(year.startTime);
      const yOffset: number = this.yOffset;
      const width: number = this.yearWidth;
      const newYear: TimelineChild = {
        startTime: year.startTime,
        duration: year.duration,
        xyOffset$: new BehaviorSubject<XYOffset>({ xOffset, yOffset }),
        width$: new BehaviorSubject<number>(width),
        height$: new BehaviorSubject<number>(500),
      };
      yearsCopy.push(newYear);
    });
    yearsCopy.sort(this._sortFunction);
    this._year$.next(yearsCopy);
  }
}
