import { Injectable } from '@angular/core';
import { NSMoment, TimelineMoment, XYOffset } from '../../_library';
import { BehaviorSubject, Observable } from 'rxjs';
import { TimelineService } from '../timeline.service';
import { MomentService } from '../../moment/moment.service';
import { TimeLabelService } from '../time-label.service';
import { RowService } from '../row/row.service';

@Injectable({
  providedIn: 'root'
})
export class MomentSpotService {

  private _moment$: BehaviorSubject<Array<TimelineMoment>> = new BehaviorSubject<Array<TimelineMoment>>([]);
  public readonly moment$: Observable<Array<TimelineMoment>> = this._moment$.asObservable();

  public readonly width: number =40;

  constructor(private _timelineService: TimelineService,
    private _momentsService: MomentService,
    private _timeLabelService: TimeLabelService,
    private _rowService: RowService
  ) {
    this._momentsService.moment$.subscribe(this._onMomentsUpdate.bind(this));
    this._timelineService.pixlesPerMillisecond$.subscribe(() => {
      this._moment$.getValue().forEach((moment: TimelineMoment) => {
        const xOffset: number = this._getXOffset(moment.startTime);
        const yOffset: number = this._timeLabelService.getTimeLabelRowHeight();
        moment.xyOffset$?.next({ xOffset, yOffset });
      })
    })
  }

  private _onMomentsUpdate() {
    // maybe update existing instead of replacing? 
    const moments: Array<NSMoment> = this._momentsService.getMoments()
    const copy: Array<TimelineMoment> = [];

    moments.forEach((m: NSMoment) => {
      const xOffset: number = this._getXOffset(m.timestamp);
      const yOffset: number = this._timeLabelService.getTimeLabelRowHeight();
      const width: number = this.width;
      const height: number = this._rowService.defaultHeight;

      const newMoment: TimelineMoment = {
        id: m.id,
        name: m.name,
        startTime: m.timestamp,
        duration: 0,
        xyOffset$: new BehaviorSubject<XYOffset>({xOffset, yOffset}),
        width$: new BehaviorSubject<number>(width),
        height$: new BehaviorSubject<number>(height)
      }

      newMoment.xyOffset$?.next({ xOffset, yOffset });
      newMoment.width$?.next(width);
      copy.push(newMoment);
    })
    copy.sort(this._sortFunction)
    this._moment$.next(copy);
  }
  
  private _getXOffset(startTime: number): number {
    const xOffset: number = this._timelineService.getPixelsForTimestamp(startTime);
    return xOffset;
  }

  private _sortFunction(a: TimelineMoment, b: TimelineMoment): number {
    if (a.startTime < b.startTime)
      return -1;
    if (a.startTime > b.startTime)
      return 1;
    return 0;
  }
}
