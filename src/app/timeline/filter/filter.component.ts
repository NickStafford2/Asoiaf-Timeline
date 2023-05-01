import { Component, OnInit } from '@angular/core';
import { CharacterClass } from '../../character/character';
import { CharacterService } from '../../character/character.service';
import { House } from '../../character/house.interface';

import { HouseService } from '../../character/house.service';
import { FilterService } from './filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  constructor(public filterService: FilterService, public houseService: HouseService, public characterService: CharacterService) {}

  ngOnInit(): void { }
}
