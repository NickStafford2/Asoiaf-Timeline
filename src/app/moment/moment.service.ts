import { Injectable } from '@angular/core';
import { BehaviorSubject, min, Observable, Subject } from 'rxjs';
import { MomentHttpService } from './moment-http.service';

import { NSMoment, timelineItemStore } from '../_library';

@Injectable({
  providedIn: 'root',
})
export class MomentService implements timelineItemStore {
  private _moment$: BehaviorSubject<NSMoment[]> = new BehaviorSubject<
    NSMoment[]
  >([]);
  public readonly moment$: Observable<any> = this._moment$.asObservable();

  private _onUpdate$: Subject<void> = new Subject();
  public readonly onUpdate$: Observable<void> = this._onUpdate$.asObservable();

  constructor(private momentService: MomentHttpService) {}

  public loadAllMoments() {
    this.momentService.getMoments().subscribe((response: NSMoment[]) => {
      this._moment$.next(response);
      console.log('MomentStore loaded All Moments');
      this._onUpdate$.next();
    });
  }

  public getEarliestTimestamp(): number {
    let earliest = Infinity;
    this._moment$.getValue().forEach((m: NSMoment) => {
      earliest = Math.min(earliest, m.timestamp);
    });
    return earliest;
  }

  public getLatestTimestamp(): number {
    let latest = 0;
    this._moment$.getValue().forEach((m: NSMoment) => {
      latest = Math.max(latest, m.timestamp);
    });
    return latest;
  }

  public getMoments(): NSMoment[] {
    const copy: NSMoment[] = [];
    this._moment$.getValue().forEach((moment: NSMoment) => {
      copy.push(Object.assign({}, moment));
    });
    return copy; // deep copy
  }
}
