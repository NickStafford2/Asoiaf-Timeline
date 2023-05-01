import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, from, map, Observable } from 'rxjs';
import { CharacterClass } from '../../character/character';
import { CharacterService } from '../../character/character.service';
import { House, houseSortCompareFn } from '../../character/house.interface';
import { HouseService } from '../../character/house.service';

@Injectable({
  providedIn: 'root',
})
export class FilterService {

  private _characterId$ = new BehaviorSubject<Map<string, boolean>>(new Map<string, boolean>());

  readonly characterId$ = this._characterId$.asObservable();

  private _selectedCharacterId$ = new BehaviorSubject<string[]>([]);

  readonly selectedCharacterId$ = this._selectedCharacterId$.asObservable();

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
    this._characterId$.subscribe(this.setSelectedCharacterIds.bind(this))
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
    const ids: Map<string, boolean> = new Map<string, boolean>();
    characters.forEach((character: CharacterClass) => {
      ids.set(character.id, true);
    })
    //copy.sort(houseSortCompareFn)
    this._characterId$.next(ids);
  }

  private setSelectedCharacterIds(ids: Map<string, boolean>) {
    const selectedIds: string[] = [];
    ids.forEach((isSelected, id) => {
      console.log(id, isSelected);
      if (isSelected) {
        selectedIds.push(id)
      }
    });
    this._selectedCharacterId$.next(selectedIds);
  }

  setHouseSelected(characterId: string, isSelected: boolean): void {
    const map = this._characterId$.getValue();
    map.set(characterId, isSelected);
    this._characterId$.next(map);
  }

  getHouseSelected(characterId: string): boolean {
    const map = this._characterId$.getValue();
    return !!map.get(characterId)?.valueOf;
  }

  /*
  private setCharacters(characters: CharacterClass[]) {
    const ids: string[] = [];
    characters.forEach((character: CharacterClass) => {
      ids.push(character.id);
    })
    //copy.sort(houseSortCompareFn)
    this._characterId$.next(ids);
  }
  */
}