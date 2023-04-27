import { BehaviorSubject } from 'rxjs';


// todo: get rid of this file. or rename it to timeline.interface.ts

export interface NSMoment extends NSMomentData {
  id: string;
}

export interface NSMomentData {
  // todo: maybe delete?
  name: string;
  timestamp: number;
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
