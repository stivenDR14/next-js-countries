import React from "react";
import { Card, CardContent, Typography, CardMedia } from "@mui/material";
import { Country } from "../../types/country";
import Link from "next/link";

interface CountryCardProps {
  country: Country;
}

export const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Link
        href={`/country/${country.code}`}
        passHref
        style={{ textDecoration: "none" }}
      >
        <CardMedia
          component="img"
          height="140"
          image={country.flag}
          alt={`Flag of ${country.name}`}
          sx={{
            objectFit: "cover",
            transition: "transform 0.2s cubic-bezier(.4,2,.6,1)",
            cursor: "pointer",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: 3,
            },
            "&:active": {
              transform: "scale(0.97)",
            },
          }}
        />
      </Link>
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
