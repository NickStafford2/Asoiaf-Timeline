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

  update(updatedHouse: House) {
    this.houseHttpService.update(updatedHouse).subscribe(() => {
      this.fetchData();
    });
  }

  private fetchData() {
    this.houseHttpService.getAll().subscribe((results: House[]) => {
      console.log(results);
      this._house$.next(results);
    });
  }

  private getHouse(id: string): House | undefined {
    return this._house$.getValue().find((house: House) => {
      return house.id === id;
    });
  }

  public getHouseFromId(id: string): House | undefined {
    const real: House | undefined = this._house$
      .getValue()
      .find((house: House) => {
        return house.id === id;
      });
    if (!real) {
      return real;
    } else {
      const copy = Object.assign({}, real);
      return copy;
    }
  }

  public getHouses(): House[] {
    const copy: House[] = [];
    this._house$.getValue().forEach((house: House) => {
      const c = Object.assign({}, house);
      copy.push(c);
    });
    return copy;
  }

  public getHouseName(id: string): string {
    const house = this.getHouse(id);
    if (house) return house.name;
    return '';
  }
}
