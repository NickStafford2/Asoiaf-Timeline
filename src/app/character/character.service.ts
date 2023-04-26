import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import {
  CharacterClass,
  CharacterData,
  CharacterCreateData,
} from './character';
import { CharacterHttpService } from './character-http.service';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private _character$ = new BehaviorSubject<CharacterClass[]>([]);

  readonly character$ = this._character$.asObservable();

  // todo: use this to show during http requests.
  private _progres$ = new BehaviorSubject<any>({});

  public readonly progress$ = this._progres$.asObservable();

  constructor(private characterHttpService: CharacterHttpService) {
    this.fetchData();
  }

  public create(newCharacter: CharacterCreateData) {
    this.characterHttpService.create(newCharacter).subscribe(() => {
      this.fetchData();
    });
  }

  public update(updatedCharacter: CharacterData) {
    this.characterHttpService.update(updatedCharacter).subscribe(() => {
      this.fetchData();
    });
  }

  public delete(characterId: string) {
    this.characterHttpService.delete(characterId).subscribe(() => {
      this.fetchData();
    });
  }

  private fetchData() {
    this.characterHttpService.getAll().subscribe((results: CharacterData[]) => {
      const characters: CharacterClass[] = [];
      results.forEach((r: CharacterData) => {
        characters.push(new CharacterClass(r));
      });
      this._character$.next(characters);
    });
  }
}
