import { Component, OnInit } from '@angular/core';
import { map, Observable, startWith, tap } from 'rxjs';
import { CharacterClass } from '../character';
import { FormControl } from '@angular/forms';

import { CharacterService } from '../character.service';

@Component({
  selector: 'app-character-select-autocomplete',
  templateUrl: './character-select-autocomplete.component.html',
  styleUrls: ['./character-select-autocomplete.component.scss'],
})
export class CharacterSelectAutocompleteComponent implements OnInit {

  myControl = new FormControl(null);
  filteredOption$?: Observable<CharacterClass[]>;

  constructor(private characterService: CharacterService) { }

  

  ngOnInit(): void {
    this.filteredOption$ = this.myControl.valueChanges.pipe(
      map((filterValue: string) => {
        return this.characterService.getCharactersMatching(filterValue);
      })
    )
  }

  characterSelected($event: any) {
    console.log($event)
  }

  getOptionText(option: CharacterClass) {
    if (option) {
      return option.fullName;
    }
    return '';
  }
}
