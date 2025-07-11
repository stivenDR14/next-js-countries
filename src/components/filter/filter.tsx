import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { labels } from "@/utils/labels";

interface FilterProps {
  region: string;
  onChange: (region: string) => void;
}

const regions = [
  labels.africa,
  labels.americas,
  labels.asia,
  labels.europe,
  labels.oceania,
];

export const Filter: React.FC<FilterProps> = ({ region, onChange }) => (
  <FormControl
    fullWidth
    sx={{
      minWidth: 200,
      maxWidth: 300,
      my: 2,
      backgroundColor: "primary.main",
    }}
  >
    <InputLabel id="region-select-label">{labels.filter}</InputLabel>
    <Select
      labelId="region-select-label"
      id="region-select"
      value={region}
      label={labels.filter}
      onChange={(e) => onChange(e.target.value)}
    >
      <MenuItem value="">
        <em>{labels.all}</em>
      </MenuItem>
      {regions.map((r) => (
        <MenuItem key={r} value={r}>
          {r}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);
