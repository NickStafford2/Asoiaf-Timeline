import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { catchError, shareReplay, tap } from 'rxjs/operators';

import {
  CharacterClass,
  CharacterCreateData,
  CharacterData,
} from './character';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root',
})
export class CharacterHttpService {
  private static readonly URL: string = 'api/Characters';

  private getCalls = new Map<string, Observable<CharacterData>>();

  constructor(private http: HttpClient) {}

  getAll(): Observable<CharacterData[]> {
    return this.http.get<CharacterData[]>(CharacterHttpService.URL).pipe(
      shareReplay(1),
      tap(() => console.log('getAll')),
      catchError(ConfigService.handleError<CharacterData[]>('getAll', []))
    );
  }

  get(id: string): Observable<CharacterData> {
    if (this.getCalls.has(id)) {
      timer(3000).subscribe(time => {
        //console.log('timer complete', time);
        this.getCalls.delete(id);
      });
      return this.getCalls.get(id) as Observable<CharacterData>;
    }
    const newCall = this.http
      .get<CharacterData>(CharacterHttpService.URL + '/' + id)
      .pipe(
        shareReplay(1),
        tap(() => console.log('get' + id)),
        catchError(ConfigService.handleError<CharacterData>('get' + id))
      );
    this.getCalls.set(id, newCall);

    return newCall;
  }

  getPOVs(): Observable<CharacterData[]> {
    return this.http
      .get<CharacterData[]>(CharacterHttpService.URL + '/getPovs')
      .pipe(
        shareReplay(1),
        tap(() => console.log('getAll')),
        catchError(ConfigService.handleError<CharacterData[]>('getAll', []))
      );
  }

  create(newCharacter: CharacterCreateData) {
    return this.http
      .post<CharacterCreateData>(CharacterHttpService.URL, newCharacter)
      .pipe(
        tap(() => console.log('create')),
        catchError(ConfigService.handleError<CharacterData[]>('create', []))
      );
  }

  update(updatedCharacter: CharacterData) {
    const c = new CharacterClass(updatedCharacter);
    //const cbody = c.serialize();
    const cbody2 = c.toObject();
    //console.log(cbody);
    //console.log(cbody2);
    //console.log(this._body);
    //console.log(this._body2);
    //const body = JSON.stringify(updatedCharacter);
    return this.http
      .put<CharacterData>(CharacterHttpService.URL + '/' + cbody2.id, cbody2)
      .pipe(
        tap(() => console.log('update')),
        catchError(ConfigService.handleError<CharacterData[]>('update', []))
      );
  }

  delete(characterId: string) {
    return this.http
      .delete<CharacterData>(CharacterHttpService.URL + '/' + characterId)
      .pipe(
        tap(() => console.log('delete')),
        catchError(ConfigService.handleError<CharacterData[]>('delete', []))
      );
  }

  scrapeFromWeb(id: string) {
    return this.http
      .get<CharacterData>(CharacterHttpService.URL + '/ScrapeFromWeb/' + id)
      .pipe(
        tap(() => console.log('update')),
        catchError(ConfigService.handleError<CharacterData[]>('update', []))
      );
  }

  /*
  private _body = {
    id: "6447292dd02d8d11904786f9",
    firstName: "kddlkj",
    lastName: "klkl",
    nickName: "",
    isPov: true,
  };

  private _body2 = {
    id: "6447292dd02d8d11904786f9",
    firstName: "kddlkj",
    lastName: "klkl",
    nickName: "",
    isPov: true,
  };
  */
}
