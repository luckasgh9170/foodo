"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type ThemeMode = "night" | "day";

type ThemeContextValue = {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<ThemeMode>("night");

  useEffect(() => {
    const stored = window.localStorage.getItem("foodo_theme") as ThemeMode | null;
    if (stored === "day" || stored === "night") {
      setThemeState(stored);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("foodo_theme", theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme: setThemeState,
      toggle: () => setThemeState((prev) => (prev === "night" ? "day" : "night")),
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
};
