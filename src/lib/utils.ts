import clsx, { type ClassValue } from "clsx";

export type Lang = "fa" | "en";

export const cn = (...inputs: ClassValue[]) => clsx(inputs);

export const formatPrice = (value: number, lang: Lang) => {
  const formatter = new Intl.NumberFormat(lang === "fa" ? "fa-IR" : "en-US");
  const currencyLabel = lang === "fa" ? "تومان" : "Toman";
  return `${formatter.format(value)} ${currencyLabel}`;
};

export const slugify = (value: string) => {
  return value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
};
