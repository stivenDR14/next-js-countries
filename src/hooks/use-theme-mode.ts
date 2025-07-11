import { useState, useEffect, useCallback } from "react";
import { PaletteMode } from "@mui/material";
import { LOCAL_STORAGE_THEME_KEY } from "@/constants";

export function useThemeMode() {
  const [mode, setMode] = useState<PaletteMode>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const storedMode = localStorage.getItem(
      LOCAL_STORAGE_THEME_KEY
    ) as PaletteMode;
    setMode(storedMode || "light");
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(LOCAL_STORAGE_THEME_KEY, mode);
    }
  }, [mode, mounted]);

  const toggleTheme = useCallback(() => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  return { mode, toggleTheme, mounted };
}
