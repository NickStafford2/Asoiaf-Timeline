import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { House, HouseData } from './house.interface';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root',
})
export class HouseHttpService {
  private static readonly URL: string = 'api/Houses';

  constructor(private http: HttpClient) {}

  getAll(): Observable<House[]> {
    return this.http.get<House[]>(HouseHttpService.URL).pipe(
      tap(() => console.log('getAll')),
      catchError(ConfigService.handleError<House[]>('getAll', []))
    );
  }

  create(newHouse: HouseData) {
    return this.http.post<HouseData>(HouseHttpService.URL, newHouse).pipe(
      tap(() => console.log('create')),
      catchError(ConfigService.handleError<House[]>('create', []))
    );
  }

  update(house: House) {
    return this.http
      .put<HouseData>(HouseHttpService.URL + '/' + house.id, house)
      .pipe(
        tap(() => console.log('update')),
        catchError(ConfigService.handleError<HouseData[]>('update', []))
      );
  }

  delete(houseId: string) {
    return this.http
      .delete<HouseData>(HouseHttpService.URL + '/' + houseId)
      .pipe(
        tap(() => console.log('delete')),
        catchError(ConfigService.handleError<HouseData[]>('delete', []))
      );
  }

  webParser(): Observable<House[]> {
    return this.http.get<House[]>(HouseHttpService.URL + '/test').pipe(
      tap(() => console.log('test')),
      catchError(ConfigService.handleError<House[]>('test', []))
    );
  }
}
