import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { NSMoment, NSMomentData } from '../_library';

@Injectable({
  providedIn: 'root',
})
export class MomentHttpService {
  private readonly url: string = 'api/Moments';

  constructor(private http: HttpClient) {}

  public getMoment(id: string) {
    return this.http.get('api/Moments/' + id);
  }

  public getMoments(): Observable<NSMoment[]> {
    return this.http.get<NSMoment[]>('api/Moments');
  }

  public deleteMoment(id: string) {
    return this.http.delete('api/Moments/' + id);
  }

  public create(newMoment: NSMoment) {
    const copy: NSMomentData = {
      name: newMoment.name,
      timestamp: newMoment.timestamp,
    };
    this.http.post<NSMomentData>('api/Moments', copy).subscribe(() => {
      console.log('moment.post');
    });
    /*.pipe(
      catchError(this.handleError('create', newMoment))
    )*/
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
