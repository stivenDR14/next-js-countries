"use client";
import React, { useState } from "react";
import { Container, Grid, Box } from "@mui/material";
import { Search } from "../components/search/search";
import { Filter } from "../components/filter/filter";
import { CountryCard } from "../components/country-card/country-card";

const countriesMock = [
  {
    name: "Germany",
    population: 81770900,
    region: "Europe",
    capital: "Berlin",
    flag: "https://flagcdn.com/de.svg",
  },
  {
    name: "United States of America",
    population: 323947000,
    region: "Americas",
    capital: "Washington, D.C.",
    flag: "https://flagcdn.com/us.svg",
  },
  {
    name: "Brazil",
    population: 206135893,
    region: "Americas",
    capital: "Brasilia",
    flag: "https://flagcdn.com/br.svg",
  },
  {
    name: "Iceland",
    population: 334300,
    region: "Europe",
    capital: "Reykjavik",
    flag: "https://flagcdn.com/is.svg",
  },
  {
    name: "Afghanistan",
    population: 27657145,
    region: "Asia",
    capital: "Kabul",
    flag: "https://flagcdn.com/af.svg",
  },
  {
    name: "Åland Islands",
    population: 28875,
    region: "Europe",
    capital: "Mariehamn",
    flag: "https://flagcdn.com/ax.svg",
  },
  {
    name: "Albania",
    population: 2886026,
    region: "Europe",
    capital: "Tirana",
    flag: "https://flagcdn.com/al.svg",
  },
  {
    name: "Algeria",
    population: 40400000,
    region: "Africa",
    capital: "Algiers",
    flag: "https://flagcdn.com/dz.svg",
  },
];

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
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
      <Grid container spacing={4}>
        {countriesMock.map((country) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={country.name}>
            <CountryCard country={country} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
