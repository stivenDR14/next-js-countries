import React from "react";
import { Card, CardContent, Typography, CardMedia } from "@mui/material";
import { Country } from "../../types/country";

interface CountryCardProps {
  country: Country;
}

export const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardMedia
        component="img"
        height="140"
        image={country.flag}
        alt={`Flag of ${country.name}`}
        sx={{ objectFit: "cover" }}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {country.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <b>Population:</b> {country.population.toLocaleString()}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <b>Region:</b> {country.region}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <b>Capital:</b> {country.capital}
        </Typography>
      </CardContent>
    </Card>
  );
};
