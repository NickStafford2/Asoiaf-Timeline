import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Book } from '../_library';

@Injectable({
  providedIn: 'root',
})
export class BookHttpService {
  private readonly url: string = 'api/Books';

  constructor(private _http: HttpClient) {}

  public loadAll(): Observable<Book[]> {
    return this._http.get<Book[]>(this.url);
  }
}
