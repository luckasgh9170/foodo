import type { Metadata } from "next";
import "@/styles/globals.css";
import { poppins, vazirmatn } from "@/lib/fonts";
import { LanguageProvider } from "@/components/LanguageProvider";
import { SocketProvider } from "@/components/SocketProvider";

export const metadata: Metadata = {
  title: "FOODO | Premium Restaurant & Cafe",
  description: "FOODO digital menu with cafe and fast food items.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className={`${poppins.variable} ${vazirmatn.variable}`}>
      <body>
        <LanguageProvider>
          <SocketProvider>{children}</SocketProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
