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

export async function fetchCountriesWithRevalidation(): Promise<Country[]> {
  try {
    const res = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,cca3",
      {
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch countries");
    }

    const data = await res.json();
    return data.map(restCountriesToCountry);
  } catch (error) {
    console.error("Error fetching countries:", error);
    return [];
  }
}
