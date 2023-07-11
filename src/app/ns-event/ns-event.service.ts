import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { NSEvent } from '../_library';
import { NsEventHttpService } from './ns-event-http.service';

@Injectable({
  providedIn: 'root',
})
export class NsEventService {
  private _nsEvent$ = new BehaviorSubject<NSEvent[]>([]);

  readonly nsEvent$: Observable<any> = this._nsEvent$.asObservable();


  constructor(private nsEventHttpService: NsEventHttpService) {
    this.fetchData();
  }

  private fetchData() {
    this.nsEventHttpService.getAll().subscribe((results: NSEvent[]) => {
      console.log(results);
      this._nsEvent$.next(results);
    });
  }
}
