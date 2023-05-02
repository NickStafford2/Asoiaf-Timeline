import { Component, OnInit } from '@angular/core';

import { CharacterService } from '../character/character.service';

@Component({
  selector: 'app-character-page',
  templateUrl: './character-page.component.html',
  styleUrls: ['./character-page.component.scss'],
})
export class CharacterPageComponent implements OnInit {
  constructor(public characterService: CharacterService) {}

  ngOnInit(): void {}
}
