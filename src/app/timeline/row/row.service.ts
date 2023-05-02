import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { TimelineCharacterRow } from './row.interface';
import { CharacterService } from '../../character/character.service';
import { FilterService } from '../filter/filter.service';
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
    private timelineService: TimelineService,
    private filterService: FilterService
  ) {
    this.filterService.selectedCharacterId$.subscribe(
      // todo: these rows are added sequentially. consider adding them all at once
      (characterIds: string[]) => {
        //const newRows: TimelineCharacterRow = [];
        this._row$.next([]);
        characterIds.forEach((id: string) => {
          //console.log(character);
          this.addRow(id);
        });
        const height = this.getHeight();
        this.timelineService.setHeight(height);
      }
    );
  }

  private addRow(characterId: string) {
    const yOffset: number = this.getHeight();
    const xyOffset: XYOffset = { xOffset: this.xOffset, yOffset };

    const newRow: TimelineCharacterRow = {
      height$: new BehaviorSubject<number>(this.defaultHeight),
      xyOffset$: new BehaviorSubject<XYOffset>(xyOffset),
      characterId: characterId,
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

  getCharacterRowYOffset(characterId: string): number {
    //console.log(this._row$);
    const row: TimelineCharacterRow | undefined = this._row$
      .getValue()
      .find(c => c.characterId === characterId);
    if (row) {
      return row.xyOffset$.getValue().yOffset;
    }
    return this.defaultHeight;
  }
}
