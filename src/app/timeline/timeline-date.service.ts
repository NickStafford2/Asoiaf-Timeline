import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { TimelineDate } from './timeline.interface';

@Injectable({
  providedIn: 'root',
})
export class TimelineDateService {
  readonly defaultStartTimestamp: number = new Date('01/01/2015').getTime();

  readonly defaultEndTimestamp: number = new Date('01/01/2018').getTime();

  private _month$: BehaviorSubject<TimelineDate[]> = new BehaviorSubject<
    TimelineDate[]
  >([]);

  readonly month$: Observable<TimelineDate[]> = this._month$.asObservable();

  private _year$: BehaviorSubject<TimelineDate[]> = new BehaviorSubject<
    TimelineDate[]
  >([]);

  readonly year$: Observable<TimelineDate[]> = this._year$.asObservable();

  private _startDate: number = this.defaultStartTimestamp;

  private _endDate: number = this.defaultEndTimestamp;

  private _datesChanged$: Subject<void> = new Subject();

  readonly datesChanged$: Observable<void> = this._datesChanged$.asObservable();

  constructor() {
    this._datesChanged$.subscribe(this.onDatesChanged.bind(this));
  }

  private onDatesChanged() {
    const start: number = this.getStart();
    const end: number = this.getEnd();

    if (start < end) {
      console.log('error');
    }

    this._setMonths(start, end);
    this._setYears(start, end);
  }

  private _setYears(start: number, end: number): void {
    const s: moment.Moment = moment(start);
    const e: moment.Moment = moment(end);

    const years: TimelineDate[] = [];

    const fromYear: number = s.year();
    const toYear: number = e.year();

    for (let year = fromYear; year <= toYear; year++) {
      const nextYear: number = year + 1;
      const startOfYear: moment.Moment = moment('01/01/' + year);
      const startOfNextYear: moment.Moment = moment('01/01/' + nextYear);
      const duration: number =
        startOfNextYear.valueOf() - startOfYear.valueOf();
      const startTime = startOfYear.valueOf();

      years.push({
        startTime: startTime,
        duration: duration,
      });
    }
    this._year$.next(years);
  }

  private _setMonths(start: number, end: number): void {
    const s: moment.Moment = moment(start);
    const e: moment.Moment = moment(end);

    const months: TimelineDate[] = [];

    const fromYear: number = s.year();
    const toYear: number = e.year();
    const fromMonth: number = s.month();
    const toMonth: number = e.month();

    for (let year = fromYear; year <= toYear; year++) {
      // const nextYear: number = year + 1;
      // const startOfYear: moment.Moment = moment('01/01/' + year);
      // const startOfNextYear: moment.Moment = moment('01/01/' + nextYear)
      // todo const duration: number = startOfNextYear.valueOf() - startOfYear.valueOf();

      let monthNum = year === fromYear ? fromMonth : 0;
      const monthLimit = year === toYear ? toMonth : 11;

      // for month in year (excluding before start and after end)
      for (; monthNum <= monthLimit; monthNum++) {
        const month = monthNum + 1;

        const startOfMonth: moment.Moment = moment('' + month + '/01/' + year);
        const startOfNextMonth: moment.Moment = moment(startOfMonth.valueOf());
        startOfNextMonth.add(1, 'month'); // moment.js is mutable. :(
        const duration: number =
          startOfNextMonth.valueOf() - startOfMonth.valueOf();
        const startTime: number = startOfMonth.valueOf();

        months.push({
          startTime: startTime,
          duration: duration,
        });
      }
    }
    this._month$.next(months); // array should be sorted
  }

  getSmallestYear(): number {
    return this._year$.getValue()[0].startTime;
  }

  getLargestYear(): number {
    const x = this._year$.getValue();
    return x[x.length].startTime;
  }

  getSmallestMonth(): number {
    return this._month$.getValue()[0].startTime;
  }

  getLargestMonth(): number {
    const x = this._month$.getValue();
    return x[x.length].startTime;
  }

  setDateRange(startTimestamp: number, endTimestamp: number): void {
    if (endTimestamp < startTimestamp) {
      console.error('end date < start date');
    }
    this._startDate = startTimestamp;
    this._endDate = endTimestamp;

    this._datesChanged$.next();
  }

  getDuration(): number {
    return this._endDate - this._startDate;
    //return this._endDate$.getValue().getTime() - this._startDate$.getValue().getTime();
  }

  getStart(): number {
    return this._startDate;
  }

  getEnd(): number {
    return this._endDate;
  }

  editStart(operation: string, positiveInt: number, duration: string): void {
    const m: moment.Moment = moment(this._startDate);
    if (operation === 'add') {
      if (duration === 'year') m.add(positiveInt, 'year');
      else if (duration === 'month') m.add(positiveInt, 'month');
      else if (duration === 'day') m.add(positiveInt, 'day');
    } else if (operation === 'subtract') {
      if (duration === 'year') m.subtract(positiveInt, 'year');
      else if (duration === 'month') m.subtract(positiveInt, 'month');
      else if (duration === 'day') m.subtract(positiveInt, 'day');
    }
    this.setDateRange(m.valueOf(), this._endDate);
  }

  editEnd(operation: string, positiveInt: number, duration: string): void {
    const m: moment.Moment = moment(this._endDate);
    if (operation === 'add') {
      if (duration === 'year') m.add(positiveInt, 'year');
      else if (duration === 'month') m.add(positiveInt, 'month');
      else if (duration === 'day') m.add(positiveInt, 'day');
    } else if (operation === 'subtract') {
      if (duration === 'year') m.subtract(positiveInt, 'year');
      else if (duration === 'month') m.subtract(positiveInt, 'month');
      else if (duration === 'day') m.subtract(positiveInt, 'day');
    }
    this.setDateRange(this._startDate, m.valueOf());
  }

  getMonths(): TimelineDate[] {
    // deep copy
    const copy: TimelineDate[] = [];
    this._month$.getValue().forEach((month: TimelineDate) => {
      copy.push(Object.assign({}, month));
    });
    return copy;
  }

  getYears(): TimelineDate[] {
    const copy: TimelineDate[] = [];
    this._year$.getValue().forEach((year: TimelineDate) => {
      copy.push(Object.assign({}, year));
    });
    return copy; // deep copy
  }
}
