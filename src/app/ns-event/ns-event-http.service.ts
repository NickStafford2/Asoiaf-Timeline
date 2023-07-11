import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { ConfigService } from '../config.service';
import { NSEvent } from '../_library';

@Injectable({
  providedIn: 'root',
})
export class NsEventHttpService {
  private static readonly URL: string = 'api/Events';

  constructor(private http: HttpClient) {}

  getAll(): Observable<NSEvent[]> {
    return this.http.get<NSEvent[]>(NsEventHttpService.URL).pipe(
      tap(() => console.log('getAll')),
      catchError(ConfigService.handleError<NSEvent[]>('getAll', []))
    );
  }
}
