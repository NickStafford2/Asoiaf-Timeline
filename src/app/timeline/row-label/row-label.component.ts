import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { CharacterService } from '../../character/character.service';

@Component({
  selector: 'app-row-label',
  templateUrl: './row-label.component.html',
  styleUrls: ['./row-label.component.scss'],
})
export class RowLabelComponent implements OnChanges {
  @Input() characterId?: string;

  public nameLabel: string = '';

  constructor(public characterService: CharacterService) {}

  ngOnChanges(changes: SimpleChanges) {
    const c = changes['characterId'].currentValue;
    if (c) {
      this.nameLabel = this.characterService.getCharacterName(c);
    }
  }
}
