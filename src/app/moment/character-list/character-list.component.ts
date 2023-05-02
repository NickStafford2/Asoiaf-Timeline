import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

import { CharacterService } from '../../character/character.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss'],
})
export class CharacterListComponent implements OnInit {
  @Input() characterIds?: string[];

  @Output() changeEvent = new EventEmitter<string[]>();

  constructor(public characterService: CharacterService) {}

  ngOnInit(): void {}

  addCharacter($event: any) {
    console.log($event);
  }
}
