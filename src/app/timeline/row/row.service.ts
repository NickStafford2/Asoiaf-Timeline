import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { TimelineRow, XYOffset } from '../../_library';
import { CharacterClass } from '../../character/character';
import { CharacterService } from '../../character/character.service';
import { TimeLabelService } from '../time-label.service';

@Injectable({
  providedIn: 'root',
})
export class RowService {
  private _row$: BehaviorSubject<Array<TimelineRow>> = new BehaviorSubject<
    Array<TimelineRow>
  >([]);

  readonly row$: Observable<Array<TimelineRow>> = this._row$.asObservable();

  readonly defaultHeight: number = 80;

  readonly xOffset: number = 0;

  constructor(
    private timeLabelService: TimeLabelService,
    private characterService: CharacterService
  ) {
    this.characterService.character$.subscribe(
      (characters: CharacterClass[]) => {
        characters.forEach((character: CharacterClass) => {
          console.log(character);
          this.addRow();
        });
      }
    );

    this.addRow();
    this.addRow();
    this.addRow();
    this.addRow();
  }

  private addRow() {
    const yOffset: number = this.getHeight();
    const xyOffset: XYOffset = { xOffset: this.xOffset, yOffset };

    const newRow: TimelineRow = {
      height$: new BehaviorSubject<number>(this.defaultHeight),
      xyOffset$: new BehaviorSubject<XYOffset>(xyOffset),
    };

    const rows: Array<TimelineRow> = this._row$.getValue();
    rows.push(newRow);
    this._row$.next(rows);
  }

  private getHeight(): number {
    let total: number = 0;
    total += this.timeLabelService.getTimeLabelRowHeight(); // rows are below the time Label rows.
    this._row$.getValue().forEach((row: TimelineRow) => {
      total += row.height$.getValue();
    });
    return total;
  }
}
