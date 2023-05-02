import {
  Component,
  Input,
  Output,
  OnChanges,
  OnInit,
  SimpleChanges,
  EventEmitter,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
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
}
