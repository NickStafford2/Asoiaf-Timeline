export class CharacterClass {
  private _id: string = '';

  private _wikiUrl: string = '';

  private _nameUnique: string = '';

  private _name: string = '';

  private _aliases: string[] = [];

  private _isPov: boolean = false;

  private _houses: string[] = [];

  private _titles: string[] = [];

  private _races: string[] = [];

  private _cultures: string[] = [];

  private _bookReferences: Reference[] = [];

  private _isHuman: boolean = true;

  private _personalArms: string = '';

  private _briefDescription: string = '';

  constructor(data: CharacterData) {
    if (!data.id) {
      console.error('id does not exist');
    }
    this.id = data.id;
    this.wikiUrl = data.wikiUrl;
    this.nameUnique = data.nameUnique;
    this.name = data.name;
    this.aliases = data.aliases;
    this.isPov = data.isPov;
    this.houses = data.houses;
    this.titles = data.titles;
    this.races = data.races;
    this.cultures = data.cultures;
    this.bookReferences = data.bookReferences;
    this.isHuman = data.isHuman;
    this.personalArms = data.personalArms;
    this.briefDescription = data.briefDescription;
  }

  private set id(value: string) {
    if (typeof value === 'string') this._id = value;
  }

  public get id(): string {
    return this._id;
  }

  private set wikiUrl(value: string) {
    if (typeof value === 'string') this._wikiUrl = value;
  }

  public get wikiUrl(): string {
    return this._wikiUrl;
  }

  private set nameUnique(value: string) {
    if (typeof value === 'string') this._nameUnique = value;
  }

  public get nameUnique(): string {
    return this._nameUnique;
  }

  private set name(value: string) {
    if (typeof value === 'string') this._name = value;
  }

  public get name(): string {
    return this._name;
  }

  private set isPov(value: boolean) {
    if (typeof value === 'boolean') this._isPov = value;
  }

  public get isPov(): boolean {
    return this._isPov;
  }

  private set aliases(value: string[]) {
    if (CharacterClass.isStringArray(value)) {
      this._aliases = Object.assign([], value);
    }
  }

  public get aliases(): string[] {
    return Object.assign([], this._aliases);
  }

  private set houses(value: string[]) {
    if (CharacterClass.isStringArray(value)) {
      this._houses = Object.assign([], value);
    }
  }

  public get houses(): string[] {
    return Object.assign([], this._houses);
  }

  private set titles(value: string[]) {
    if (CharacterClass.isStringArray(value)) {
      this._titles = Object.assign([], value);
    }
  }

  public get titles(): string[] {
    return Object.assign([], this._titles);
  }

  private set races(value: string[]) {
    if (CharacterClass.isStringArray(value)) {
      this._races = Object.assign([], value);
    }
  }

  public get races(): string[] {
    return Object.assign([], this._races);
  }

  private set cultures(value: string[]) {
    if (CharacterClass.isStringArray(value)) {
      this._cultures = Object.assign([], value);
    }
  }

  public get cultures(): string[] {
    return Object.assign([], this._cultures);
  }

  private set bookReferences(value: Reference[]) {
    if (CharacterClass.isReferenceArray(value)) {
      this._bookReferences = CharacterClass.copyRefernceArray(value);
      //this._cultures = Object.assign([], value);
    }
  }

  public get bookReferences(): Reference[] {
    return CharacterClass.copyRefernceArray(this._bookReferences);
  }

  private set isHuman(value: boolean) {
    if (typeof value === 'boolean') this._isHuman = value;
  }

  public get isHuman(): boolean {
    return this._isHuman;
  }

  private set personalArms(value: string) {
    if (typeof value === 'string') this._personalArms = value;
  }

  public get personalArms(): string {
    return this._personalArms;
  }

  private set briefDescription(value: string) {
    if (typeof value === 'string') this._briefDescription = value;
  }

  public get briefDescription(): string {
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
      titles: this.titles,
      races: this.races,
      cultures: this.cultures,
      bookReferences: this.bookReferences,
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

  private static isReferenceArray(arr: Reference[]): boolean {
    if (Array.isArray(arr)) {
      const isRefArray =
        arr.length > 0 &&
        arr.every(value => {
          return CharacterClass.isReference(value);
        });
      return isRefArray;
    }
    return false;
  }

  private static isReference(value: any): value is Reference {
    return (
      typeof value === 'object' &&
      typeof value.bookId === 'string' &&
      typeof value.description === 'string'
    );
  }

  private static copyRefernce(value: Reference): Reference {
    return {
      bookId: value.bookId,
      description: value.description,
    };
  }

  private static copyRefernceArray(toCopy: Reference[]): Reference[] {
    const ref: Reference[] = [];
    toCopy.forEach(value => {
      ref.push(CharacterClass.copyRefernce(value));
    });
    return ref;
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

  titles: string[];

  races: string[];

  cultures: string[];

  bookReferences: Reference[];

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

export interface Relation {
  type: string;
  description: string;
  characterId: string;
}

export interface Reference {
  bookId: string;
  description: string;
}
