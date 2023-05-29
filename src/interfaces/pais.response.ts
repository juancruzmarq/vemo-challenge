export type Paises = Pais[];

export interface Pais {
  name: Name;
  tld?: string[];
  cca2: string;
  ccn3?: string;
  cca3: string;
  cioc?: string;
  independent?: boolean;
  status: string;
  unMember: boolean;
  currencies?: Currencies;
  idd: Idd;
  capital?: string[];
  altSpellings: string[];
  region: string;
  subregion?: string;
  languages?: Languages;
  translations: Translations;
  latlng: number[];
  landlocked: boolean;
  borders?: string[];
  area: number;
  demonyms?: Demonyms;
  flag: string;
  maps: Maps;
  population: number;
  gini?: Gini;
  fifa?: string;
  car: Car;
  timezones: string[];
  continents: string[];
  flags: Flags;
  coatOfArms: CoatOfArms;
  startOfWeek: string;
  capitalInfo: CapitalInfo;
  postalCode?: PostalCode;
}

export interface Name {
  common: string;
  official: string;
  nativeName?: NativeName;
}

export interface NativeName {
  [key: string]: {
    official: string;
    common: string;
  };
}

export interface Currencies {
  [key: string]: {
    name: string;
    symbol: string;
  };
}

export interface Idd {
  root?: string;
  suffixes?: string[];
}

export interface Languages {
  [key: string]: string;
}

export interface Translations {
  [key: string]: {
    official: string;
    common: string;
  };
}

export interface Demonyms {
  [key: string]: {
    f: string;
    m: string;
  };
}

export interface Maps {
  [key: string]: string;
}

export interface Gini {
  [key: string]: number;
}

export interface Car {
  signs?: string[];
  side: string;
}

export interface Flags {
  png: string;
  svg: string;
  alt?: string;
}

export interface CoatOfArms {
  png?: string;
  svg?: string;
}

export interface CapitalInfo {
  latlng?: number[];
}

export interface PostalCode {
  format: string;
  regex?: string;
}
