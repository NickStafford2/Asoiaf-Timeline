import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CharacterClass } from '../../character/character';
import { CharacterService } from '../../character/character.service';
import { House, houseSortCompareFn } from '../../character/house.interface';
import { HouseService } from '../../character/house.service';

@Injectable({
  providedIn: 'root',
})
export class FilterService {

  private _characterId$ = new BehaviorSubject<string[]>([]);

  readonly characterId$ = this._characterId$.asObservable();

  private _houseId$ = new BehaviorSubject<string[]>([]);

  readonly houseId$ = this._houseId$.asObservable();
  /*
  private _visibleHouseId$ = new BehaviorSubject<House[]>([]);

  readonly visibleHouseId$ = this._visibleHouseId$.asObservable();
  */
  constructor(private houseService: HouseService,
    private characterService: CharacterService
  ) {
    this.houseService.house$.subscribe(this.setHouseIds.bind(this));
    this.characterService.character$.subscribe(this.setCharacters.bind(this));
  }

  private setHouseIds(houses: House[]) {
    const ids: string[] = [];
    houses.forEach((house: House) => {
      ids.push(house.id);
    })
    //copy.sort(houseSortCompareFn)
    this._houseId$.next(ids);
  }

  private setCharacters(characters: CharacterClass[]) {
    const ids: string[] = [];
    characters.forEach((character: CharacterClass) => {
      ids.push(character.id);
    })
    //copy.sort(houseSortCompareFn)
    this._characterId$.next(ids);
  }
}
