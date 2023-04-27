import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { MomentHttpService } from './moment-http.service';
import { NSMoment } from '../_library';

@Injectable({
  providedIn: 'root',
})
export class MomentService {
  private _moment$: BehaviorSubject<NSMoment[]> = new BehaviorSubject<
    NSMoment[]
  >([]);

  readonly moment$: Observable<any> = this._moment$.asObservable();

  private _onUpdate$: Subject<void> = new Subject();

  readonly onUpdate$: Observable<void> = this._onUpdate$.asObservable();

  constructor(private momentService: MomentHttpService) {}

  loadAllMoments() {
    this.momentService.getMoments().subscribe((response: NSMoment[]) => {
      this._moment$.next(response);
      console.log('MomentStore loaded All Moments');
      this._onUpdate$.next();
    });
  }

  getEarliestTimestamp(): number {
    let earliest = Infinity;
    this._moment$.getValue().forEach((m: NSMoment) => {
      earliest = Math.min(earliest, m.timestamp);
    });
    return earliest;
  }

  getLatestTimestamp(): number {
    let latest = 0;
    this._moment$.getValue().forEach((m: NSMoment) => {
      latest = Math.max(latest, m.timestamp);
    });
    return latest;
  }

  getMoments(): NSMoment[] {
    const copy: NSMoment[] = [];
    this._moment$.getValue().forEach((moment: NSMoment) => {
      copy.push(Object.assign({}, moment));
    });
    return copy; // deep copy
  }
}
