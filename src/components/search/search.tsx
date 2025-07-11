import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
}

export const Search: React.FC<SearchProps> = ({ value, onChange }) => (
  <TextField
    fullWidth
    variant="outlined"
    placeholder="Search for a country..."
    value={value}
    onChange={(e) => onChange(e.target.value)}
    sx={{
      my: 2,
      maxWidth: { xs: "100%", md: 500 },
      mx: "auto",
      backgroundColor: "primary.main",
    }}
    slotProps={{
      input: {
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="action" />
          </InputAdornment>
        ),
      },
    }}
  />
);
