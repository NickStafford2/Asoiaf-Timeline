import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import {
  CharacterClass,
  CharacterCreateData,
  CharacterData,
} from './character';

@Injectable({
  providedIn: 'root',
})
export class CharacterHttpService {
  private static readonly URL: string = 'api/Characters';

  constructor(private _http: HttpClient) {}

  /*
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  */

  getAll(): Observable<CharacterData[]> {
    return this._http.get<CharacterData[]>(CharacterHttpService.URL).pipe(
      tap(_ => console.log('loadAll')),
      catchError(this.handleError<CharacterData[]>('loadAll', []))
    );
  }

  create(newCharacter: CharacterCreateData) {
    // console.log("create: ", newCharacter);
    return this._http
      .post<CharacterCreateData>(CharacterHttpService.URL, newCharacter)
      .pipe(
        tap(_ => console.log('loadAll')),
        catchError(this.handleError<CharacterData[]>('loadAll', []))
      );
  }

  update(updatedCharacter: CharacterData) {
    console.log('update: ', updatedCharacter);
    const c = new CharacterClass(updatedCharacter);
    //const cbody = c.serialize();
    const cbody2 = c.toObject();
    //console.log(cbody);
    //console.log(cbody2);
    //console.log(this._body);
    //console.log(this._body2);
    //const body = JSON.stringify(updatedCharacter);
    return this._http
      .put<CharacterData>(CharacterHttpService.URL + '/' + cbody2.id, cbody2)
      .pipe(
        tap(_ => console.log('loadAll')),
        catchError(this.handleError<CharacterData[]>('loadAll', []))
      );
  }

  delete(characterId: string) {
    return this._http
      .delete<CharacterData>(CharacterHttpService.URL + '/' + characterId)
      .pipe(
        tap(_ => console.log('loadAll')),
        catchError(this.handleError<CharacterData[]>('loadAll', []))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
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
