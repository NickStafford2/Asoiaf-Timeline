import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { CharacterClass } from '../../character/character';
import { CharacterService } from '../../character/character.service';
import { HouseService } from '../../character/house.service';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private _characterId$ = new BehaviorSubject<Map<string, boolean>>(
    new Map<string, boolean>()
  );

  private _selectedCharacterId$ = new BehaviorSubject<string[]>([]);

  readonly selectedCharacterId$ = this._selectedCharacterId$.asObservable();

  private _setting$ = new BehaviorSubject<Map<string, boolean>>(
    new Map<string, boolean>()
  );

  readonly setting$ = this._setting$.asObservable();

  /*
  private _houseId$ = new BehaviorSubject<string[]>([]);

  readonly houseId$ = this._houseId$.asObservable();

  private _visibleHouseId$ = new BehaviorSubject<House[]>([]);

  readonly visibleHouseId$ = this._visibleHouseId$.asObservable();
  */
  constructor(
    private houseService: HouseService,
    private characterService: CharacterService
  ) {
    //this.houseService.house$.subscribe(this.setHouseIds.bind(this));
    this.characterService.character$.subscribe(this.setCharacters.bind(this));
    this._characterId$.subscribe(this.setSelectedCharacterIds.bind(this));
    this.setDefaultSettings();
  }
  /*
  private setHouseIds(houses: House[]) {
    const ids: string[] = [];
    houses.forEach((house: House) => {
      ids.push(house.id);
    })
    //copy.sort(houseSortCompareFn)
    this._houseId$.next(ids);
  }
  */

  private setCharacters(characters: CharacterClass[]) {
    const ids: Map<string, boolean> = new Map<string, boolean>();
    characters.forEach((character: CharacterClass) => {
      ids.set(character.id, true);
    });
    //copy.sort(houseSortCompareFn)
    this._characterId$.next(ids);
  }

  private setSelectedCharacterIds(ids: Map<string, boolean>) {
    //const settings = this._setting$.getValue();
    const selectedIds: string[] = [];
    ids.forEach((isSelected, id) => {
      //console.log(id, isSelected);
      if (isSelected) {
        //let name = this.characterService.getCharacterName(id);
        /*
        if (settings.get('povOnly')) {
          if (this.characterService.isPov(id)) {
            //console.log(id + 'pushed');
            selectedIds.push(id);
          } else {
            //console.log(id + 'not pushed');
          }
        } else {
          selectedIds.push(id);
        }*/
        selectedIds.push(id);
      }
    });
    this._selectedCharacterId$.next(selectedIds);
  }

  setHouseSelected(characterId: string, isSelected: boolean): void {
    const map = this._characterId$.getValue();
    map.set(characterId, isSelected);
    const mapCopy = new Map<string, boolean>();
    map.forEach((isChecked: boolean, id: string) => {
      mapCopy.set(id, isChecked);
    });
    const x = mapCopy === map;
    this._characterId$.next(mapCopy);
  }

  getHouseSelected(characterId: string): boolean {
    const map = this._characterId$.getValue();
    const isSelected = map.get(characterId)?.valueOf();
    return !!isSelected;
  }

/*  selectPovOnly() {
    this._selectedCharacterId$.getValue().forEach((id: string) => {
      this.characterService.isPov(id);
    });
  }
  */
  setDefaultSettings() {
    const m = this._setting$.getValue();
    m.set('povOnly', true);
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
