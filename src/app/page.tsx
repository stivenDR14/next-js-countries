"use client";
import React, { useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { Search } from "../components/search/search";
import { Filter } from "../components/filter/filter";
import { CountryCard } from "../components/country-card/country-card";
import { useCountries } from "../hooks/use-countries";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const { countries, loading, error } = useCountries();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  React.useEffect(() => {
    if (error) setSnackbarOpen(true);
  }, [error]);

  const filteredCountries = countries.filter((country) => {
    const matchesSearch = country.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesRegion = region ? country.region === region : true;
    return matchesSearch && matchesRegion;
  });

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
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="40vh"
        >
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={4}>
          {filteredCountries.map((country) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={country.name}>
              <CountryCard country={country} />
            </Grid>
          ))}
        </Grid>
      )}
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
