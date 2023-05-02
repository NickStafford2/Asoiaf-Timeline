import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { MomentHttpService } from './moment-http.service';
import { NSMoment } from './moment.interface';

@Injectable({
  providedIn: 'root',
})
export class MomentService {
  private _moment$ = new BehaviorSubject<NSMoment[]>([]);

  readonly moment$: Observable<any> = this._moment$.asObservable();

  constructor(private momentHttpService: MomentHttpService) {
    this.fetchData();
  }

  update(updatedMoment: NSMoment) {
    this.momentHttpService.update(updatedMoment).subscribe(() => {
      this.fetchData();
    });
  }

  private fetchData() {
    this.momentHttpService.getAll().subscribe((results: NSMoment[]) => {
      console.log(results);
      this._moment$.next(results);
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
