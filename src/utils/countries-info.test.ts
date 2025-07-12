import { describe, it, expect } from "vitest";
import {
  restCountriesToCountry,
  restCountriesToCountryDetail,
  fetchCountriesWithRevalidation,
} from "@/utils/countries-info";

describe("countries-info utils", () => {
  describe("restCountriesToCountry", () => {
    it("should map API response to Country type correctly", () => {
      const apiCountry = {
        cca3: "COL",
        name: { common: "Colombia" },
        flags: { svg: "colombia.svg" },
        population: 50000000,
        region: "Americas",
        capital: ["Bogotá"],
      };

      const result = restCountriesToCountry(apiCountry);

      expect(result).toEqual({
        code: "COL",
        name: "Colombia",
        flag: "colombia.svg",
        population: 50000000,
        region: "Americas",
        capital: "Bogotá",
      });
    });

    it("should handle missing optional fields gracefully", () => {
      const apiCountry = {
        cca3: "NOC",
        name: { common: "No Country" },
        population: 0,
        region: "Nowhere",
      };

      const result = restCountriesToCountry(apiCountry);

      expect(result).toEqual({
        code: "NOC",
        name: "No Country",
        flag: "",
        population: 0,
        region: "Nowhere",
        capital: "",
      });
    });
  });

  describe("restCountriesToCountryDetail", () => {
    it("should map API response to CountryDetail type correctly", () => {
      const apiCountry = {
        cca3: "ESP",
        name: {
          common: "Spain",
          nativeName: { spa: { common: "España" } },
        },
        flags: { png: "spain.png" },
        population: 47000000,
        region: "Europe",
        capital: ["Madrid"],
        subregion: "Southern Europe",
        tld: [".es"],
        currencies: { EUR: { name: "Euro" } },
        languages: { spa: "Spanish" },
        borders: ["FRA", "POR"],
      };

      const result = restCountriesToCountryDetail(apiCountry);

      expect(result).toEqual({
        code: "ESP",
        name: "Spain",
        nativeName: "España",
        flag: "spain.png",
        population: 47000000,
        region: "Europe",
        capital: "Madrid",
        subregion: "Southern Europe",
        topLevelDomain: [".es"],
        currencies: ["Euro"],
        languages: ["Spanish"],
        borders: ["FRA", "POR"],
      });
    });
  });

  describe("fetchCountriesWithRevalidation", () => {
    it("should be a function", () => {
      expect(typeof fetchCountriesWithRevalidation).toBe("function");
    });
  });
});
