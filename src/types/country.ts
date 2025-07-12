export interface Country {
  code: string;
  name: string;
  flag: string;
  population: number;
  region: string;
  capital: string;
}

export interface CountryDetail extends Country {
  subregion: string;
  topLevelDomain: string[];
  currencies: string[];
  languages: string[];
  borders: string[];
  nativeName: string;
}
