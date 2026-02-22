"use client";

import { useLanguage } from "@/components/LanguageProvider";

export const PublicFooter = () => {
  const { lang } = useLanguage();
  return (
    <footer className="border-t border-brand/20 bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-muted">
        <div className="flex flex-col items-center gap-2 text-center">
          <p>
            {lang === "fa"
              ? "FOODO | منوی دیجیتال رستوران و کافه"
              : "FOODO | Digital menu for restaurant & cafe"}
          </p>
          <p>
            {lang === "fa"
              ? "تمامی حقوق محفوظ است."
              : "All rights reserved."}
          </p>
        </div>
      </div>
    </footer>
  );
};
