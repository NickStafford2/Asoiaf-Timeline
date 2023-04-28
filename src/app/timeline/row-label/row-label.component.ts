import { Component, Input } from '@angular/core';

import { CharacterClass } from '../../character/character';

@Component({
  selector: 'app-row-label',
  templateUrl: './row-label.component.html',
  styleUrls: ['./row-label.component.scss'],
})
export class RowLabelComponent {
  @Input() character?: CharacterClass;
}
