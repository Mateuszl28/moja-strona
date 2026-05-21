"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  dictionaries,
  defaultLocale,
  type Dictionary,
  type Locale,
} from "@/i18n/dictionaries";

type Ctx = {
  locale: Locale;
  dict: Dictionary;
  setLocale: (l: Locale) => void;
};

const I18nContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "portfolio:locale";

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "pl" || saved === "en") {
        setLocaleState(saved);
      }
    } catch {}
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {}
  };

  return (
    <I18nContext.Provider
      value={{ locale, dict: dictionaries[locale], setLocale }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    return {
      locale: defaultLocale,
      dict: dictionaries[defaultLocale],
      setLocale: () => {},
    } as Ctx;
  }
  return ctx;
}
