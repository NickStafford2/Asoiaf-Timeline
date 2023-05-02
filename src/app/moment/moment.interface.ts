export interface NSMoment extends NSMomentData {
  id: string;
}

export interface NSMomentData {
  // todo: maybe delete?
  name: string;
  timestamp: number;
  characters: string[];
}
