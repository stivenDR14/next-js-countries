import React, { useMemo } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  useMediaQuery,
  useTheme,
  Grid,
} from "@mui/material";
import { Country } from "../../types/country";
import { CountryCard } from "../country-card/country-card";
import { useVirtualize } from "../../hooks/use-virtualize";
import { labels } from "@/utils/labels";

interface CountryListProps {
  countries: Country[];
  loading: boolean;
  error?: string | null;
  height?: string | number;
}

export const CountryList: React.FC<CountryListProps> = ({
  countries,
  loading,
  height = "70vh",
}) => {
  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  let columns = 1;
  if (isLgUp) columns = 4;
  else if (isMdUp) columns = 3;
  else if (isSmUp) columns = 2;

  const rows = useMemo(() => {
    const result: Country[][] = [];
    for (let i = 0; i < countries.length; i += columns) {
      result.push(countries.slice(i, i + columns));
    }
    return result;
  }, [countries, columns]);

  const itemHeight = 340;

  const {
    containerRef,
    visibleItems: visibleRows,
    totalHeight,
    getItemIndex,
  } = useVirtualize({
    items: rows,
    itemHeight,
  });

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  if (!countries.length) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography>{labels.noInformation}</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100%",
        mx: "auto",
        height,
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        ref={containerRef}
        sx={{
          flex: 1,
          overflow: "auto",
          position: "relative",
          height: "100%",
        }}
      >
        <Grid
          container
          sx={{
            height: `${totalHeight}px`,
            position: "relative",
            width: "100%",
          }}
        >
          {visibleRows.map((row) => {
            const itemIndex = getItemIndex(row);
            const top = itemIndex * itemHeight;
            return (
              <Box
                key={row.map((c) => c.name).join("-")}
                sx={{
                  position: "absolute",
                  top: `${top}px`,
                  left: 0,
                  width: "100%",
                  height: `${itemHeight}px`,
                  display: "flex",
                  gap: { xs: 2, sm: 5, md: 6 },
                  px: { xs: 4, md: 0 },
                  boxSizing: "border-box",
                  justifyContent: "space-between",
                }}
              >
                {row.map((country) => (
                  <Grid
                    size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                    key={country.name}
                    sx={{
                      flex: 1,
                      minWidth: 0,
                      maxWidth: {
                        xs: "100%",
                        md: "240px",
                      },
                      display: "flex",
                      pt: 6,
                    }}
                  >
                    <CountryCard country={country} />
                  </Grid>
                ))}
              </Box>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
};
