"use client";

import { useLanguage } from "@/components/LanguageProvider";

export const LanguageToggle = () => {
  const { lang, toggle } = useLanguage();

  return (
    <button
      onClick={toggle}
      className="rounded-full border border-black/10 bg-white/80 px-3 py-1 text-sm font-medium shadow-sm transition hover:-translate-y-0.5 hover:shadow"
    >
      {lang === "fa" ? "EN" : "فا"}
    </button>
  );
};
