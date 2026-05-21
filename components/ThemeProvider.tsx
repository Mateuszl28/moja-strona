"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Theme = "default" | "synthwave" | "terminal" | "paper";

type Ctx = {
  theme: Theme;
  setTheme: (t: Theme) => void;
};

const ThemeContext = createContext<Ctx | null>(null);
const STORAGE_KEY = "portfolio:theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("default");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (
        saved === "default" ||
        saved === "synthwave" ||
        saved === "terminal" ||
        saved === "paper"
      ) {
        setThemeState(saved);
        document.documentElement.setAttribute("data-theme", saved);
      }
    } catch {}
  }, []);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    document.documentElement.setAttribute("data-theme", t);
    try {
      localStorage.setItem(STORAGE_KEY, t);
    } catch {}
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  return ctx ?? { theme: "default" as Theme, setTheme: () => {} };
}
