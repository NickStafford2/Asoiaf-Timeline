import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { TimelineCharacterRow } from './row.interface';
import { CharacterClass } from '../../character/character';
import { CharacterService } from '../../character/character.service';
import { TimeLabelService } from '../time-label.service';
import { XYOffset } from '../timeline.interface';
import { TimelineService } from '../timeline.service';

@Injectable({
  providedIn: 'root',
})
export class RowService {
  private _row$ = new BehaviorSubject<Array<TimelineCharacterRow>>([]);

  readonly row$: Observable<Array<TimelineCharacterRow>> =
    this._row$.asObservable();

  readonly defaultHeight: number = 80;

  readonly xOffset: number = 0;

  constructor(
    private timeLabelService: TimeLabelService,
    private characterService: CharacterService,
    private timelineService: TimelineService
  ) {
    this.characterService.character$.subscribe(
      (characters: CharacterClass[]) => {
        characters.forEach((character: CharacterClass) => {
          console.log(character);
          this.addRow(character);
        });
        const height = this.getHeight();
        this.timelineService.setHeight(height);
      }
    );
  }

  private addRow(character: CharacterClass) {
    const yOffset: number = this.getHeight();
    const xyOffset: XYOffset = { xOffset: this.xOffset, yOffset };

    const newRow: TimelineCharacterRow = {
      height$: new BehaviorSubject<number>(this.defaultHeight),
      xyOffset$: new BehaviorSubject<XYOffset>(xyOffset),
      character: character,
    };

    const rows: Array<TimelineCharacterRow> = this._row$.getValue();
    rows.push(newRow);
    this._row$.next(rows);
  }

  private getHeight(): number {
    let total: number = 0;
    total += this.timeLabelService.getTimeLabelRowHeight(); // rows are below the time Label rows.
    this._row$.getValue().forEach((row: TimelineCharacterRow) => {
      total += row.height$.getValue();
    });
    return total;
  }
}
