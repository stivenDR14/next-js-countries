import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Country } from "../../types/country";

interface CountryCardProps {
  country: Country;
}

export const CountryCard: React.FC<CountryCardProps> = ({ country }) => (
  <Card
    sx={{
      width: "100%",
      maxWidth: 240,
      height: 300,
      display: "flex",
      flexDirection: "column",
      m: "auto",
      borderRadius: 1,
      boxShadow: 3,
      mb: 4,
    }}
  >
    <CardMedia
      component="img"
      height="130"
      image={country.flag}
      alt={`Flag of ${country.name}`}
      sx={{
        objectFit: "cover",
        borderTopLeftRadius: 2,
        borderTopRightRadius: 2,
        flexShrink: 0,
      }}
    />
    <CardContent
      sx={{
        flex: 1,
        minHeight: 0,
        overflow: "auto", // Enable scroll if content is too large
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="body1" fontWeight={800} gutterBottom>
        {country.name}
      </Typography>
      <Box>
        <Typography variant="body2" fontWeight={600} component="span">
          Population:
        </Typography>{" "}
        <Typography variant="body2" component="span">
          {country.population.toLocaleString()}
        </Typography>
      </Box>
      <Box>
        <Typography variant="body2" fontWeight={600} component="span">
          Region:
        </Typography>{" "}
        <Typography variant="body2" component="span">
          {country.region}
        </Typography>
      </Box>
      <Box>
        <Typography variant="body2" fontWeight={600} component="span">
          Capital:
        </Typography>{" "}
        <Typography variant="body2" component="span">
          {country.capital}
        </Typography>
      </Box>
    </CardContent>
  </Card>
);
