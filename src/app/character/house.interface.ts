export interface House extends HouseData {
  id: string;
}

export interface HouseData {
  name: string;
  type: HouseType;
}

export enum HouseType {
  bastard = 'Bastard',
  great = 'Great',
  normal = 'Normal',
  exile = 'Exile',
  extinct = 'Extinct',
}

export function houseSortCompareFn(a: House, b: House): number {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
}
