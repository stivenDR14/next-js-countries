/* eslint-disable @typescript-eslint/no-explicit-any */
import { Country, CountryDetail } from "../types/country";

export function restCountriesToCountry(apiCountry: any): Country {
  return {
    code: apiCountry.cca3,
    name: apiCountry.name?.common || "",
    flag: apiCountry.flags?.svg || apiCountry.flags?.png || "",
    population: apiCountry.population,
    region: apiCountry.region,
    capital: apiCountry.capital?.[0] || "",
  };
}

export function restCountriesToCountryDetail(apiCountry: any): CountryDetail {
  return {
    code: apiCountry.cca3,
    name: apiCountry.name?.common || "",
    flag: apiCountry.flags?.svg || apiCountry.flags?.png || "",
    population: apiCountry.population,
    region: apiCountry.region,
    capital: apiCountry.capital?.[0] || "",
    subregion: apiCountry.subregion || "",
    topLevelDomain: apiCountry.tld || [],
    currencies: apiCountry.currencies
      ? Object.values(apiCountry.currencies).map((c: any) => c.name)
      : [],
    languages: apiCountry.languages ? Object.values(apiCountry.languages) : [],
    borders: apiCountry.borders || [],
    nativeName: apiCountry.name?.nativeName
      ? (Object.values(apiCountry.name.nativeName)[0] as any).common || ""
      : "",
  };
}
