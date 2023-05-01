import { BehaviorSubject } from 'rxjs';

import { XYOffset } from '../timeline.interface';

export interface TimelineRow {
  height$: BehaviorSubject<number>;
  xyOffset$: BehaviorSubject<XYOffset>;
}

export interface TimelineCharacterRow extends TimelineRow {
  characterId: string;
}
