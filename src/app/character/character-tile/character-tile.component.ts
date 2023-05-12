import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CharacterService } from '../character.service';

@Component({
  selector: 'app-character-tile',
  templateUrl: './character-tile.component.html',
  styleUrls: ['./character-tile.component.scss'],
})
export class CharacterTileComponent implements OnInit, OnChanges {
  @Input() id?: string;
  text: string = 'text';

  constructor(public characterService: CharacterService) {}

  ngOnInit() {
    //this.characterService
  }

  ngOnChanges(changes: SimpleChanges) {
    /*const newId = changes['id'].currentValue;
    if (newId) {
      if (this.characterService.exists(newId)) {
        this.text = 'found';
      }
      else {
        this.characterService.fetch(newId);
      }
    }*/
  }
}
