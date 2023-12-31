import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BookHttpService } from './book-http.service';
import { Book } from '../_library';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private _book$: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>([]);

  book$: Observable<Book[]> = this._book$.asObservable();

  constructor(private _bookHttpService: BookHttpService) {
    this._loadAll();
  }

  private _loadAll() {
    this._bookHttpService
      .loadAll()
      .pipe(
        // sort them by book.order
        map(things => {
          console.log(things);
          return things.sort(this._compareFn);
        })
      )
      .subscribe(results => {
        this._book$.next(results);
      });
  }

  private _compareFn = (a: Book, b: Book) => {
    if (a.order < b.order) return -1;
    if (a.order > b.order) return 1;
    return 0;
  };

  getName(id: string | undefined): string {
    const r = this._book$.getValue().find(b => b.id == id);
    return r?.name || 'Error';
  }
}
