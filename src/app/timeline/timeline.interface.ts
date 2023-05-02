import { BehaviorSubject } from 'rxjs';

export interface XYOffset {
  xOffset: number;
  yOffset: number;
}

export interface TimelineDate {
  startTime: number;
  duration: number;
}

export interface TimeLabel extends TimelineDate {
  width: number;
  xOffset: number;
}

export interface TimelineChild extends TimelineDate {
  timeReadable?: string; // todo: delete
  width$: BehaviorSubject<number>;
  height$: BehaviorSubject<number>;
  xyOffset$: BehaviorSubject<XYOffset>;
}

export interface TimelineTimeLabel extends TimelineChild {
  timeReadable: string;
}

export interface TimelineMoment extends TimelineChild {
  // timestamp = startTime
  id: string;
  name: string;
  characterId: string;
}
