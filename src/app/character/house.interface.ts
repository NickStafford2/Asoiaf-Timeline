export interface House extends HouseData {
  id: string;
}

export interface HouseData {
  name: string;
  type: HouseType;
}

export enum HouseType {
  bastard,
  great,
  normal,
}
