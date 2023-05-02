import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { CharacterService } from '../../character/character.service';
import { NSMoment } from '../../moment/moment.interface';
import { MomentService } from '../../moment/moment.service';
import { TimelineCharacterRow } from '../row/row.interface';
import { RowService } from '../row/row.service';
import { TimeLabelService } from '../time-label.service';
import { TimelineMoment, XYOffset } from '../timeline.interface';
import { TimelineService } from '../timeline.service';

@Injectable({
  providedIn: 'root',
})
export class MomentSpotService {
  private _moment$: BehaviorSubject<Array<TimelineMoment>> =
    new BehaviorSubject<Array<TimelineMoment>>([]);

  readonly moment$: Observable<Array<TimelineMoment>> =
    this._moment$.asObservable();

  readonly width: number = 40;

  constructor(
    private timelineService: TimelineService,
    private momentsService: MomentService,
    private timeLabelService: TimeLabelService,
    private rowService: RowService,
    private characterService: CharacterService
  ) {
    this.momentsService.moment$.subscribe(this._onMomentsUpdate.bind(this));
    this.timelineService.pixlesPerMillisecond$.subscribe(() => {
      this._moment$.getValue().forEach((moment: TimelineMoment) => {
        const xOffset: number = this._getXOffset(moment.startTime);
        const yOffset: number = moment.xyOffset$.getValue().yOffset;
        moment.xyOffset$?.next({ xOffset, yOffset });
      });
    });
    this.rowService.row$.subscribe((rows: TimelineCharacterRow[]) => {
      console.log('===================================', rows);

      rows.forEach((row: TimelineCharacterRow) => {
        const momentsWithCharacter = this._moment$
          .getValue()
          .filter((m: TimelineMoment) => {
            return m.characterId === row.characterId;
          });
        console.log('momentsWithCharacter.length', momentsWithCharacter.length);
        momentsWithCharacter.forEach((m: TimelineMoment) => {
          const yOffset: number = row.xyOffset$.getValue().yOffset;
          const xOffset = m.xyOffset$.getValue().xOffset;

          const character = this.characterService.getCharacterName(
            row.characterId
          );
          console.log('setting Moment', character, m.name, yOffset);
          m.xyOffset$.next({ xOffset, yOffset });
        });
      });
    });
  }

  private _onMomentsUpdate() {
    // maybe update existing instead of replacing?
    const moments: Array<NSMoment> = this.momentsService.getMoments();
    const copy: Array<TimelineMoment> = [];

    moments.forEach((m: NSMoment) => {
      const xOffset: number = this._getXOffset(m.timestamp);
      const yOffset: number = this.timeLabelService.getTimeLabelRowHeight();
      const width: number = this.width;
      const height: number = this.rowService.defaultHeight;

      const characters: string[] = m.characters;

      if (characters.length) {
        characters.forEach((id: string) => {
          const characterRowYOffset =
            this.rowService.getCharacterRowYOffset(id);
          const newMoment: TimelineMoment = {
            id: m.id,
            name: m.name,
            startTime: m.timestamp,
            duration: 0,
            xyOffset$: new BehaviorSubject<XYOffset>({
              xOffset,
              yOffset: characterRowYOffset,
            }),
            width$: new BehaviorSubject<number>(width),
            height$: new BehaviorSubject<number>(height),
            characterId: id,
          };

          newMoment.xyOffset$?.next({ xOffset, yOffset });
          newMoment.width$?.next(width);
          copy.push(newMoment);
        });
      } else {
        const newMoment: TimelineMoment = {
          id: m.id,
          name: m.name,
          startTime: m.timestamp,
          duration: 0,
          xyOffset$: new BehaviorSubject<XYOffset>({ xOffset, yOffset }),
          width$: new BehaviorSubject<number>(width),
          height$: new BehaviorSubject<number>(height),
          characterId: 'none',
        };

        newMoment.xyOffset$?.next({ xOffset, yOffset });
        newMoment.width$?.next(width);
        copy.push(newMoment);
      }
    });
    copy.sort(this._sortFunction);
    this._moment$.next(copy);
  }

  private _getXOffset(startTime: number): number {
    const xOffset: number =
      this.timelineService.getPixelsForTimestamp(startTime);
    return xOffset;
  }

  private _sortFunction(a: TimelineMoment, b: TimelineMoment): number {
    if (a.startTime < b.startTime) return -1;
    if (a.startTime > b.startTime) return 1;
    return 0;
  }
}
