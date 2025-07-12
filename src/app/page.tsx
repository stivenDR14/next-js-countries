"use client";
import React, { useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { Search } from "../components/search/search";
import { Filter } from "../components/filter/filter";
import { useCountries } from "../hooks/use-countries";
import { CountryList } from "@/components/country-list/country-list";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const { countries, loading, error } = useCountries();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  React.useEffect(() => {
    if (error) setSnackbarOpen(true);
  }, [error]);

  // Filtro por búsqueda y región
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
      <CountryList
        countries={filteredCountries}
        loading={loading}
        error={error}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity="error"
          onClose={() => setSnackbarOpen(false)}
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
}
