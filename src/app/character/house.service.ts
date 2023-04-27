import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root',
})
export class HouseService {
  private static readonly URL: string = 'api/Houses';

  constructor(private http: HttpClient) { }

  getAll(): Observable<CharacterData[]> {
    return this.http.get<CharacterData[]>(HouseService.URL).pipe(
      tap(() => console.log('getAll')),
      catchError(ConfigService.handleError<CharacterData[]>('getAll', []))
    );
  }

  create(newHouse: House) {
    return this.http
      .post<House>(HouseService.URL, newHouse)
      .pipe(
        tap(() => console.log('create')),
        catchError(ConfigService.handleError<House[]>('create', []))
      );
  }

  update(updatedCharacter: CharacterData) {
    const c = new CharacterClass(updatedCharacter);
    const cbody2 = c.toObject();
    return this.http
      .put<CharacterData>(HouseService.URL + '/' + cbody2.id, cbody2)
      .pipe(
        tap(() => console.log('update')),
        catchError(ConfigService.handleError<CharacterData[]>('update', []))
      );
  }

  delete(houseId: string) {
    return this.http
      .delete<CharacterData>(HouseService.URL + '/' + houseId)
      .pipe(
        tap(() => console.log('delete')),
        catchError(ConfigService.handleError<CharacterData[]>('delete', []))
      );
  }
}

export interface House {
  id: string;
  name: string;
  type: HouseType;
}

export enum HouseType {
  bastard,
  great,
  normal,
}
