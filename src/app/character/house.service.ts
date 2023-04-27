import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { HouseHttpService } from './house-http.service';

@Injectable({
  providedIn: 'root',
})
export class HouseService {
  private _house$ = new BehaviorSubject<House[]>([]);

  readonly house$ = this._house$.asObservable();

  constructor(private houseHttpService: HouseHttpService) {}

  //create()
}

export interface House extends HouseData {
  id: string;
}

export interface HouseData {
  name: string;
  type: HouseType;
}

export enum HouseType {
  bastard,
  great,
  normal,
}
