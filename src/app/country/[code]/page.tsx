"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Grid from "@mui/material/Grid";
import { useCountryDetail } from "@/hooks/use-country-detail";
import { labels } from "@/utils/labels";
import { useEffect, useState, use as usePromise } from "react";
import { Snackbar } from "@mui/material";

export default function CountryDetailPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = usePromise(params);
  const { country, loading, error } = useCountryDetail(code);

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    if (error) setSnackbarOpen(true);
  }, [error]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  if (!country) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography>{labels.noInformation}</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        px: { xs: 4, md: 8 },
        py: { xs: 0, md: 4 },
        mb: 2,
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        sx={{
          mb: { xs: 4, md: 8 },
          backgroundColor: "primary.main",
          color: "text.primary",
          boxShadow: 2,
          textTransform: "none",
          "&:hover": {
            backgroundColor: "primary.main",
            color: "text.primary",
          },
        }}
        href="/"
      >
        {labels.back}
      </Button>
      <Grid container spacing={6} alignItems="center">
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            component="img"
            src={country.flag}
            alt={`Flag of ${country.name}`}
            sx={{
              width: "100%",
              maxWidth: 520,
              height: "auto",
              borderRadius: 2,
              boxShadow: 3,
              display: "block",
              mx: { xs: "auto", md: 0 },
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h4" fontWeight={800} mb={3}>
            {country.name}
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography>
                <b>{labels.nativeName}:</b> {country.nativeName}
              </Typography>
              <Typography>
                <b>{labels.population}:</b>{" "}
                {country.population.toLocaleString()}
              </Typography>
              <Typography>
                <b>{labels.region}:</b> {country.region}
              </Typography>
              <Typography>
                <b>{labels.subRegion}:</b> {country.subregion}
              </Typography>
              <Typography>
                <b>{labels.capital}:</b> {country.capital}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography>
                <b>{labels.topLevelDomain}:</b>{" "}
                {country.topLevelDomain?.join(", ")}
              </Typography>
              <Typography>
                <b>{labels.currencies}:</b> {country.currencies?.join(", ")}
              </Typography>
              <Typography>
                <b>{labels.languages}:</b> {country.languages?.join(", ")}
              </Typography>
            </Grid>
          </Grid>
          <Box mt={4}>
            <Typography fontWeight={600} mb={1}>
              {labels.borderCountries}:
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {country.borders && country.borders.length > 0 ? (
                country.borders.map((border: string) => (
                  <Box
                    key={border}
                    sx={{
                      backgroundColor: "primary.main",
                      color: "text.primary",
                      boxShadow: 1,
                      textTransform: "none",
                      px: 2,
                      py: 1,
                      borderRadius: 1,
                      fontSize: 10,
                      fontWeight: 500,
                      textAlign: "center",
                    }}
                  >
                    {border}
                  </Box>
                ))
              ) : (
                <Typography variant="body2">{labels.none}</Typography>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>

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
    </Box>
  );
}
