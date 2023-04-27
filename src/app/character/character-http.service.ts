import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

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

  constructor(private http: HttpClient) {}

  getAll(): Observable<CharacterData[]> {
    return this.http.get<CharacterData[]>(CharacterHttpService.URL).pipe(
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
