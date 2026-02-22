"use client";

import { useTheme } from "@/components/ThemeProvider";

export const ThemeToggle = () => {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      className="rounded-full border border-brand/40 bg-[#111]/80 px-3 py-1 text-sm font-medium text-ink shadow-sm transition hover:-translate-y-0.5 hover:bg-brand/10"
    >
      {theme === "night" ? "Day" : "Night"}
    </button>
  );
};
