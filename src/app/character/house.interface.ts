export interface House extends HouseData {
  id: string;
}

export interface HouseData {
  nameFull: string;
  nameUnique: string;
  nameShort: string;
  wikiUrl?: string;
  overlord?: string;
  cadetBranchs?: string;
  seats?: string[];
  region?: string;
  titles?: string[];
  heir?: string;
  founder?: string;
  founded?: string;
  sigilURL?: string;
  vassals?: string[];
  blazon?: string;
  words?: string;
  notes?: string;
  ancestrialWeapon?: string;
  continent?: string;
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
  if (a.nameUnique < b.nameUnique) return -1;
  if (a.nameUnique > b.nameUnique) return 1;
  return 0;
}
