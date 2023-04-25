import { Injectable } from '@angular/core';
import { NSMoment, TimelineMoment } from '../../_library';
import { BehaviorSubject, Observable } from 'rxjs';
import { TimelineService } from '../timeline.service';
import { MomentService } from '../../moment/moment.service';

@Injectable({
  providedIn: 'root'
})
export class MomentSpotService {

  private _moment$: BehaviorSubject<Array<TimelineMoment>> = new BehaviorSubject<Array<TimelineMoment>>([]);
  public readonly moment$: Observable<Array<TimelineMoment>> = this._moment$.asObservable();

  private readonly _width: number =40;

  constructor(private _timelineService: TimelineService,
    private _momentsService: MomentService
  ) {
    this._momentsService.moment$.subscribe(this._onMomentsUpdate.bind(this));
    this._timelineService.redraw$.subscribe(this._onRedraw.bind(this));
  }

  private _onRedraw() {
    
  }

  private _onMomentsUpdate() {
    const moments: Array<NSMoment> = this._momentsService.getMoments()
    const copy: Array<TimelineMoment> = [];

    moments.forEach((m: NSMoment) => {
      copy.push({
        id: m.id,
        name: m.name,
        startTime: m.timestamp,
        duration: 0,
        width: this._width,
        xOffset: this._getXOffset(m.timestamp),
      })
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
