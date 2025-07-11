"use client";
import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { lightTheme, darkTheme } from "../theme";
import { Header } from "./header/header";
import { useThemeMode } from "../hooks/use-theme-mode";

export function ThemeClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { mode, toggleTheme, mounted } = useThemeMode();

  if (!mounted) {
    return null;
  }

  return (
    <ThemeProvider theme={mode === "dark" ? darkTheme : lightTheme}>
      <CssBaseline />
      <Header darkMode={mode === "dark"} onToggleTheme={toggleTheme} />
      {children}
    </ThemeProvider>
  );
}
