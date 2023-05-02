import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { NSMoment, NSMomentData } from './moment.interface';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root',
})
export class MomentHttpService {
  //private readonly url: string = 'api/Moments';
  private static readonly URL: string = 'api/Moments';

  constructor(private http: HttpClient) {}

  getMoment(id: string) {
    return this.http.get('api/Moments/' + id);
  }

  getAll(): Observable<NSMoment[]> {
    return this.http.get<NSMoment[]>(MomentHttpService.URL).pipe(
      tap(() => console.log('getAll')),
      catchError(ConfigService.handleError<NSMoment[]>('getAll', []))
    );
  }
  /*
  getMoments(): Observable<NSMoment[]> {
    return this.http.get<NSMoment[]>('api/Moments');
  }*/

  deleteMoment(id: string) {
    return this.http.delete('api/Moments/' + id);
  }

  create(newMoment: NSMoment) {
    const copy: NSMomentData = {
      name: newMoment.name,
      timestamp: newMoment.timestamp,
      characters: newMoment.characters,
    };
    this.http.post<NSMomentData>('api/Moments', copy).subscribe(() => {
      console.log('moment.post');
    });
    /*.pipe(
      catchError(this.handleError('create', newMoment))
    )*/
  }

  update(moment: NSMoment) {
    return this.http
      .put<NSMoment>(MomentHttpService.URL + '/' + moment.id, moment)
      .pipe(
        tap(() => console.log('update')),
        catchError(ConfigService.handleError<NSMoment[]>('update', []))
      );
  }

  /*
  private handleError(error: HttpErrorResponse, extra: any) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
  */
}
