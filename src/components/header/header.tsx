import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { labels } from "@/utils/labels";
import { DarkMode, LightMode } from "@mui/icons-material";

interface HeaderProps {
  darkMode: boolean;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ darkMode, onToggleTheme }) => (
  <AppBar position="static" color="primary" elevation={1} sx={{ mb: 4 }}>
    <Toolbar
      sx={{
        display: "flex",
        justifyContent: "space-between",
        px: { xs: 2, sm: 6, md: 12 },
      }}
    >
      <Typography
        variant="h6"
        fontWeight={800}
        sx={{ fontSize: { xs: 18, sm: 24 } }}
      >
        {labels.title}
      </Typography>
      <IconButton
        onClick={onToggleTheme}
        color="inherit"
        aria-label="toggle dark mode"
      >
        {!darkMode ? <DarkMode /> : <LightMode />}
        <Typography
          sx={{ ml: 1, fontWeight: 600, fontSize: { xs: 14, sm: 16 } }}
        >
          {!darkMode ? labels.darkMode : labels.lightMode}
        </Typography>
      </IconButton>
    </Toolbar>
  </AppBar>
);
