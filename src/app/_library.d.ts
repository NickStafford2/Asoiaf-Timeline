import { BehaviorSubject, Observable } from 'rxjs';

export interface timelineItemStore {
  getEarliestTimestamp(): number;
  getLatestTimestamp(): number;
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
}

export interface NSMoment extends NSMomentData {
  id: string;
}

export interface NSMomentData {
  // todo: maybe delete?
  name: string;
  timestamp: number;
}

export interface XYOffset {
  xOffset: number;
  yOffset: number;
}

export interface TimelineRow {
  height$: BehaviorSubject<number>;
  xyOffset$: BehaviorSubject<XYOffset>;
}

export interface NSEvent extends NSMoment {
  duration: number;
}

export interface NSEventData extends NSMomentData {
  // todo: maybe delete?
  duration: number;
}

export interface Book {
  id: string;
  name: string;
  abbreviation: string;
  order: number;
  category: string;
  author: string;
  price: string;
}

// ideas ==================================================================
/*
interface EEEEEvent {
  Event: string;
  Chapter: string;
  ChapterCharacter: string;
  Book: string;
  ChapterNumber?: number;
  Notes: string;
}

interface hmmmmm {
  book: "string";
}


interface Chapter {
  //characters: Array<Character>;
  book: "string";
  pages: number;
}

interface Location {
  x: number;
}

interface Travel {
  // ? extends event?
  startLocation: string;
  endLocation: string;
  isBySea: boolean;
  startDate: number;
  endDate: number;
}

interface Moon {
  //????
  phase: string;
}

enum region {
  
}
*/
