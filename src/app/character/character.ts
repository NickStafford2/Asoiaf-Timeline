export class CharacterClass {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly nickName: string;
  readonly isPov: boolean;

  constructor(data: CharacterData) {
    if (!data.id) {
      throw "id does not exist";
    }
    this.id = typeof data.id === "string" && data.id ? data.id : "";
    this.firstName = typeof data.firstName === "string" && data.firstName ? data.firstName : "";
    this.lastName = typeof data.lastName === "string" && data.lastName ? data.lastName : "";
    this.isPov = typeof data.isPov === "boolean" && data.isPov ? data.isPov : false;
    this.nickName = typeof data.nickName === "string" && data.nickName ? data.nickName : "";
  }

  get fullName(): string {
    return this.firstName + " " + this.lastName;
  }

  public toObject() {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      nickName: this.nickName,
      isPov: this.isPov, // todo: rename isPOV --> isPov in mongoDB
    };
  }

  public serialize() {
    // the backend expects all these types to be correct. don't allow null in place
    // of an number or something.
    return JSON.stringify(this.toObject());
  }

  static fromSerialized(serialized: string) {
    const character: ReturnType<CharacterClass["toObject"]> = JSON.parse(serialized);

    return new CharacterClass(character);
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
  firstName: string;
  lastName: string;
  nickName: string; // maybe change to alias. make array?
  isPov: boolean;
  //houses: string[];
}

export interface CharacterData extends CharacterCreateData {
  id: string;

}
