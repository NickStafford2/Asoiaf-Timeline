import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';

import { FilterService } from './filter.service';
import { CharacterService } from '../../character/character.service';
import { HouseService } from '../../character/house.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  constructor(
    public filterService: FilterService,
    public houseService: HouseService,
    public characterService: CharacterService
  ) {
    this.filterService.selectedCharacterId$.subscribe(() => {});
  }

  ngOnInit(): void {}

  onCheckboxClicked($event: MatCheckboxChange, characterId: string) {
    this.filterService.setHouseSelected(characterId, $event.checked);
    console.log($event);
  }

  isChecked(characterId: string): boolean {
    return this.filterService.getHouseSelected(characterId);
  }
}
