import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { Book } from "../_library";
import { BookHttpService } from "./book-http.service";

@Injectable({
  providedIn: "root",
})
export class BookService {
  private _book$: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>([]);
  public book$: Observable<Book[]> = this._book$.asObservable();

  constructor(private _bookHttpService: BookHttpService) {
    this._loadAll();
  }

  private _loadAll() {
    this._bookHttpService
      .loadAll()
      .pipe(
        // sort them by book.order
        map((things) => {
          console.log(things);
          return things.sort(this._compareFn);
        })
      )
      .subscribe((results) => {
        this._book$.next(results);
      });
  }

  private _compareFn = (a: Book, b: Book) => {
    if (a.order < b.order) return -1;
    if (a.order > b.order) return 1;
    return 0;
  };
}
