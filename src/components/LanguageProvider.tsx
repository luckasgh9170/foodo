"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { DEFAULT_LANG, LANGS } from "@/lib/constants";
import type { Lang } from "@/lib/utils";

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggle: () => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);

  useEffect(() => {
    const stored = window.localStorage.getItem("foodo_lang") as Lang | null;
    if (stored && LANGS.includes(stored)) {
      setLangState(stored);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("foodo_lang", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
  }, [lang]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang: setLangState,
      toggle: () => setLangState((prev) => (prev === "fa" ? "en" : "fa")),
    }),
    [lang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
};
