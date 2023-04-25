export interface timelineItemStore {
  getEarliestTimestamp(): number;
  getLatestTimestamp(): number;
}

export interface Event {
  startTime: number;
  duration: number;
  //timeReadable?: string;
}

export interface TimeLabel extends Event {
  width: number;
  xOffset: number;
}

export interface TimelineChild {
  startTime: number;
  duration: number;
  width: number;
  xOffset: number;
  timeReadable?: string; // todo: delete
}

export interface TimelineTimeLabel extends TimelineChild {
  timeReadable: string;
}

export interface TimelineMoment extends TimelineChild {
  // timestamp = startTime
  id: string;
  name: string;
}

export interface NSMoment {
  id: string;
  name: string;
  timestamp: number;
}

export interface NSMomentNoID {
  name: string;
  timestamp: number;
}

