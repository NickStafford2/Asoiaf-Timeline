import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { filter, map, Observable } from 'rxjs';

import { CharacterClass } from '../character';
import { CharacterService } from '../character.service';

@Component({
  selector: 'app-character-select-autocomplete',
  templateUrl: './character-select-autocomplete.component.html',
  styleUrls: ['./character-select-autocomplete.component.scss'],
})
export class CharacterSelectAutocompleteComponent implements OnInit {
  @Output() selectedCharacter = new EventEmitter<string>();

  myControl = new FormControl(null);

  filteredOption$?: Observable<CharacterClass[]>;

  constructor(private characterService: CharacterService) {}

  ngOnInit(): void {
    this.filteredOption$ = this.myControl.valueChanges.pipe(
      // sometimes is a character or a string
      filter(value => {
        return typeof value === 'string';
      }),
      map((filterValue: string) => {
        return this.characterService.getCharactersMatching(filterValue);
      })
    );
  }

  characterSelected() {
    const c: CharacterClass = this.myControl.value;
    this.selectedCharacter.emit(c.id);
    this.myControl.setValue('');
  }

  getOptionText(option: CharacterClass) {
    if (option) {
      return option.fullName;
    }
    return '';
  }
}
