import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { of } from 'rxjs';
import { TimelineDateService } from './timeline-date.service';
import { TimelineChild, Event } from '../_library';
import { TimelineService } from './timeline.service';

@Injectable({
  providedIn: 'root'
})
export class LinesService {
  
  private _month$: BehaviorSubject<Array<TimelineChild>> = new BehaviorSubject<Array<TimelineChild>>([]);
  public readonly month$: Observable<Array<TimelineChild>> = this._month$.asObservable();

  private _year$: BehaviorSubject<Array<TimelineChild>> = new BehaviorSubject<Array<TimelineChild>>([]);
  public readonly year$: Observable<Array<TimelineChild>> = this._year$.asObservable();
  
  constructor(private _timelineDateService: TimelineDateService,
    private _timelineService: TimelineService
  ) {
    this._timelineDateService.month$.subscribe(this._onMonthsUpdate.bind(this));
    this._timelineDateService.year$.subscribe(this._onYearsUpdate.bind(this));
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

  private _onRedraw() {
    // todo: maybe just update the XOffset and width? I'm undecided if constant deep copies is bad
    this._onMonthsUpdate();
    this._onYearsUpdate();
  }

  private _onMonthsUpdate(): void {
    const months: Array<Event> = this._timelineDateService.getMonths()
    const monthsCopy: Array<TimelineChild> = [];

    months.forEach((month: Event) => {
      monthsCopy.push({
        startTime: month.startTime,
        duration: month.duration,
        //timeReadable: startOfYear.format('ll'),
        width: 1,
        xOffset: this._getXOffset(month.startTime)
      })
    })
    monthsCopy.sort(this._sortFunction)
    this._month$.next(monthsCopy);
  }

  private _onYearsUpdate(): void {
    const years: Array<Event> = this._timelineDateService.getYears()
    const yearsCopy: Array<TimelineChild> = [];
    years.forEach((year: Event) => {
      yearsCopy.push({
        startTime: year.startTime,
        duration: year.duration,
        width: 3,
        xOffset: this._getXOffset(year.startTime)
      })
    })
    yearsCopy.sort(this._sortFunction)
    this._year$.next(yearsCopy);
  }
}
