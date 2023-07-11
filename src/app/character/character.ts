import { Reference } from './reference';
import { Relationship } from './relationship';

export class CharacterClass {
  private _id: string = '';

  private _wikiUrl: string = '';

  private _nameUnique: string = '';

  private _name: string = '';

  private _aliases: string[] = [];

  private _isPov: boolean = false;

  private _houses: string[] = [];

  private _allegiances: string[] = [];

  private _titles: string[] = [];

  private _races: string[] = [];

  private _cultures: string[] = [];

  private _bookReferences: Reference[] = [];

  private _relationships: Relationship[] = [];

  private _isHuman: boolean = true;

  private _personalArms: string = '';

  private _briefDescription: string = '';

  constructor(data: CharacterData) {
    if (!data.id) {
      console.error('id does not exist');
    }
    this.setId(data.id);
    this.setWikiUrl(data.wikiUrl);
    this.setNameUnique(data.nameUnique);
    this.setName(data.name);
    this.setAliases(data.aliases);
    this.setIsPov(data.isPov);
    this.setHouses(data.houses);
    this.setAllegiances(data.allegiances);
    this.setTitles(data.titles);
    this.setRaces(data.races);
    this.setCultures(data.cultures);
    this.setBookReferences(data.bookReferences);
    this.setRelationships(data.relationships);
    this.setIsHuman(data.isHuman);
    this.setPersonalArms(data.personalArms);
    this.setBriefDescription(data.briefDescription);
  }

  private setId(value: string) {
    if (typeof value === 'string') this._id = value;
  }

  get id(): string {
    return this._id;
  }

  private setWikiUrl(value: string) {
    if (typeof value === 'string') this._wikiUrl = value;
  }

  get wikiUrl(): string {
    return this._wikiUrl;
  }

  private setNameUnique(value: string) {
    if (typeof value === 'string') this._nameUnique = value;
  }

  get nameUnique(): string {
    return this._nameUnique;
  }

  private setName(value: string) {
    if (typeof value === 'string') this._name = value;
  }

  get name(): string {
    return this._name;
  }

  private setIsPov(value: boolean) {
    if (typeof value === 'boolean') this._isPov = value;
  }

  get isPov(): boolean {
    return this._isPov;
  }

  private setAliases(value: string[]) {
    if (CharacterClass.isStringArray(value)) {
      this._aliases = Object.assign([], value);
    }
  }

  get aliases(): string[] {
    return Object.assign([], this._aliases);
  }

  private setHouses(value: string[]) {
    if (CharacterClass.isStringArray(value)) {
      this._houses = Object.assign([], value);
    }
  }

  get houses(): string[] {
    return Object.assign([], this._houses);
  }

  private setAllegiances(value: string[]) {
    if (CharacterClass.isStringArray(value)) {
      this._allegiances = Object.assign([], value);
    }
  }

  get allegiances(): string[] {
    return Object.assign([], this._allegiances);
  }

  private setTitles(value: string[]) {
    if (CharacterClass.isStringArray(value)) {
      this._titles = Object.assign([], value);
    }
  }

  get titles(): string[] {
    return Object.assign([], this._titles);
  }

  private setRaces(value: string[]) {
    if (CharacterClass.isStringArray(value)) {
      this._races = Object.assign([], value);
    }
  }

  get races(): string[] {
    return Object.assign([], this._races);
  }

  private setCultures(value: string[]) {
    if (CharacterClass.isStringArray(value)) {
      this._cultures = Object.assign([], value);
    }
  }

  get cultures(): string[] {
    return Object.assign([], this._cultures);
  }

  private setBookReferences(value: Reference[]) {
    if (Reference.isReferenceArray(value)) {
      this._bookReferences = Reference.copyRefernceArray(value);
    }
  }

  get bookReferences(): Reference[] {
    return Reference.copyRefernceArray(this._bookReferences);
  }

  private setRelationships(value: Relationship[]) {
    if (Relationship.isRelationshipArray(value)) {
      this._relationships = Relationship.copyRelationshipArray(value);
    }
  }

  get relationships(): Relationship[] {
    return Relationship.copyRelationshipArray(this._relationships);
  }

  private setIsHuman(value: boolean) {
    if (typeof value === 'boolean') this._isHuman = value;
  }

  get isHuman(): boolean {
    return this._isHuman;
  }

  private setPersonalArms(value: string) {
    if (typeof value === 'string') this._personalArms = value;
  }

  get personalArms(): string {
    return this._personalArms;
  }

  private setBriefDescription(value: string) {
    if (typeof value === 'string') this._briefDescription = value;
  }

  get briefDescription(): string {
    return this._briefDescription;
  }

  toObject() {
    return {
      id: this.id,
      wikiUrl: this.wikiUrl,
      nameUnique: this.nameUnique,
      name: this.name,
      aliases: this.aliases,
      isPov: this.isPov,
      houses: this.houses,
      allegiances: this.allegiances,
      titles: this.titles,
      races: this.races,
      cultures: this.cultures,
      bookReferences: this.bookReferences,
      relationships: this.relationships,
      isHuman: this.isHuman,
      personalArms: this.personalArms,
      briefDescription: this.briefDescription,
    };
  }

  serialize() {
    // the backend expects all these types to be correct. don't allow null in place
    // of an number or something.
    return JSON.stringify(this.toObject());
  }

  static fromSerialized(serialized: string) {
    const character: ReturnType<CharacterClass['toObject']> =
      JSON.parse(serialized);

    return new CharacterClass(character);
  }

  static isStringArray(arr: string[]): boolean {
    if (Array.isArray(arr)) {
      const isStringArray =
        arr.length > 0 &&
        arr.every(value => {
          return typeof value === 'string';
        });
      return isStringArray;
    }
    return false;
  }

  /*
  // i hate visual studio more than life itself.  dasf
  private isValid(): boolean {
    if (this.id === undefined || typeof this.id !== "string") return false;
    if (this.firstName === undefined || typeof this.firstName !== "string") return false;
    if (this.lastName === undefined || typeof this.lastName !== "string") return false;
    if (this.nickName === undefined || typeof this.nickName !== "string") return false;
    if (this.isPov === undefined || typeof this.isPov !== "boolean") return false;
    return true;
  }*/
}

export interface CharacterCreateData {
  id: string;

  wikiUrl: string;

  nameUnique: string;

  name: string;

  aliases: string[];

  isPov: boolean;

  houses: string[];

  allegiances: string[];

  titles: string[];

  races: string[];

  cultures: string[];

  bookReferences: Reference[];

  relationships: Relationship[];

  isHuman: boolean;

  personalArms: string;

  briefDescription: string;
}

export interface CharacterData extends CharacterCreateData {
  id: string;
}

export interface Alias {
  name: string;
  type: AliasType;
}

export enum AliasType {
  known,
  suspected,
}

export interface CharacterHouse {
  houseId: string;
  isPrimary: boolean;
}
