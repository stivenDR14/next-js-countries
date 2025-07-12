"use client";
import { useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Search } from "./search/search";
import { Filter } from "./filter/filter";
import { CountryList } from "./country-list/country-list";
import { Country } from "../types/country";

interface CountriesPageClientProps {
  countries: Country[];
}

export default function CountriesPageClient({
  countries,
}: CountriesPageClientProps) {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");

  const filteredCountries = countries.filter((country) => {
    const matchesSearch = country.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesRegion = region ? country.region === region : true;
    return matchesSearch && matchesRegion;
  });

  return (
    <Container maxWidth="lg" sx={{ py: 4, px: { xs: 4, md: 6 } }}>
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", md: "center" }}
        gap={2}
        mb={4}
      >
        <Search value={search} onChange={setSearch} />
        <Filter region={region} onChange={setRegion} />
      </Box>
      <CountryList countries={filteredCountries} />
    </Container>
  );
}
