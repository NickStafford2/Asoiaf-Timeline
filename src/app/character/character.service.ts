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

  /* not all characters need to be loaded to the frontend. if their name is all that is
     needed. get that from the backend and cache it here.
   */
  private unloadedCharacterNames = new Map<string, string>();

  // todo: use this to show during http requests.
  private _progres$ = new BehaviorSubject<any>({});

  readonly progress$ = this._progres$.asObservable();

  constructor(private characterHttpService: CharacterHttpService) {
    //this.fetchData();
    this.fetchPOVs();
  }

  create(newCharacter: CharacterCreateData) {
    this.characterHttpService.create(newCharacter).subscribe(() => {
      this.fetchData();
    });
  }

  update(updatedCharacter: CharacterData) {
    this.characterHttpService.update(updatedCharacter).subscribe(() => {
      this.fetchData();
    });
  }

  delete(characterId: string) {
    this.characterHttpService.delete(characterId).subscribe(() => {
      this.fetchData();
    });
  }

  private fetchData() {
    /*
    this.characterHttpService.getAll().subscribe((results: CharacterData[]) => {
      const characters: CharacterClass[] = [];
      results.forEach((r: CharacterData) => {
        characters.push(new CharacterClass(r));
      });
      this._character$.next(characters);
    });*/
  }

  private fetchPOVs() {
    this.characterHttpService
      .getPOVs()
      .subscribe((results: CharacterData[]) => {
        const characters: CharacterClass[] = [];
        results.forEach((r: CharacterData) => {
          characters.push(new CharacterClass(r));
        });
        this._character$.next(characters);
      });
  }

  // todo: make a copy if made public
  private getCharacterFromId(
    id: string | undefined
  ): CharacterClass | undefined {
    return this._character$.getValue().find((character: CharacterClass) => {
      return character.id === id;
    });
  }

  getCharacterName(id: string | undefined): string {
    const character: CharacterClass | undefined = this.getCharacterFromId(id);
    if (character) return character.name;
    // todo: decide when and how to load characters. here is bad
    // maybe just load the names from the backend. not the whole character
    // else if (id) this.fetch(id);
    else if (id !== undefined) return id;
    return 'error';
  }

  getCharactersMatching(filterValue: string): CharacterClass[] {
    const s = filterValue.toLowerCase();

    return this._character$.getValue().filter((character: CharacterClass) => {
      //console.log(option)
      return character.name.toLowerCase().includes(s);
    });
  }

  scrapeFromWeb(id: string) {
    this.characterHttpService.scrapeFromWeb(id).subscribe((x: any) => {
      console.log(x);
    });
  }

  exists(id: string): boolean {
    return !!this._character$.getValue().find(c => c.id === id);
  }

  private fetch(id: string) {
    //console.log('fetch()', id);
    this.characterHttpService.get(id).subscribe((x: CharacterData) => {
      //console.log(x);
      const cs = this._character$.getValue();
      const existingWithId = cs.find(c => c.id === id);
      if (existingWithId) {
        const index = cs.indexOf(existingWithId);
        if (index > -1) {
          cs.splice(index, 1);
        }
      }
      cs.push(new CharacterClass(x));
      this._character$.next(cs);
    });
  }

  isPov(id: string): boolean {
    const ch = this._character$.getValue().find(c => c.id === id);
    if (ch) {
      return ch.isPov;
    } else {
      throw new Error('character does not exist');
    }
  }
}
