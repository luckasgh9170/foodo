import { Poppins, Vazirmatn } from "next/font/google";

export const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-latin",
  weight: ["300", "400", "500", "600", "700"],
});

export const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-fa",
  weight: ["300", "400", "500", "600", "700"],
});
