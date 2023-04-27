import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { HouseHttpService } from './house-http.service';
import { House, HouseData, HouseType } from './house.interface';

@Injectable({
  providedIn: 'root',
})
export class HouseService {
  private _house$ = new BehaviorSubject<House[]>([]);

  readonly house$ = this._house$.asObservable();

  constructor(private houseHttpService: HouseHttpService) {
    this.fetchData();
  }

  createFromName(name: string): void {
    const newType: HouseType = HouseType.normal;
    const houseData: HouseData = {
      name,
      type: newType,
    };
    this.houseHttpService.create(houseData).subscribe(result => {
      console.log(result);
    });
  }

  private fetchData() {
    this.houseHttpService.getAll().subscribe((results: House[]) => {
      this._house$.next(results);
    });
  }
}
