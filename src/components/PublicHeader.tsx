"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LanguageToggle } from "@/components/LanguageToggle";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useLanguage } from "@/components/LanguageProvider";
import { useSocket } from "@/components/SocketProvider";
import { SOCKET_EVENTS } from "@/lib/constants";

type HeaderSettings = {
  restaurantName: string;
  logoUrl: string | null;
};

export const PublicHeader = () => {
  const { lang } = useLanguage();
  const socket = useSocket();
  const [settings, setSettings] = useState<HeaderSettings>({
    restaurantName: "FOODO",
    logoUrl: null,
  });

  useEffect(() => {
    const load = async () => {
      const response = await fetch("/api/settings");
      const data = await response.json();
      if (data.settings) {
        setSettings({
          restaurantName: data.settings.restaurantName ?? "FOODO",
          logoUrl: data.settings.logoUrl ?? null,
        });
      }
    };
    load();
  }, []);

  useEffect(() => {
    if (!socket) return;
    const onSettingsUpdate = (next: HeaderSettings) => {
      setSettings({
        restaurantName: next.restaurantName || "FOODO",
        logoUrl: next.logoUrl || null,
      });
    };
    socket.on(SOCKET_EVENTS.SETTINGS_UPDATED, onSettingsUpdate);
    return () => {
      socket.off(SOCKET_EVENTS.SETTINGS_UPDATED, onSettingsUpdate);
    };
  }, [socket]);

  const labels = {
    menu: lang === "fa" ? "منو" : "Menu",
  };

  return (
    <header className="sticky top-0 z-40 border-b border-brand/20 bg-surface">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          {settings.logoUrl ? (
            <div className="relative h-10 w-10 overflow-hidden rounded-2xl">
              <Image src={settings.logoUrl} alt="FOODO logo" fill />
            </div>
          ) : (
            <div className="h-10 w-10 rounded-2xl bg-[linear-gradient(135deg,#ff7a00,#ffb266)]" />
          )}
          <div>
            <p className="text-lg font-semibold tracking-[0.2em] text-ink">
              {settings.restaurantName}
            </p>
            <p className="text-xs text-muted">Restaurant & Cafe</p>
          </div>
        </Link>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="#menu"
            className="rounded-full border border-brand/30 px-4 py-2 text-sm font-medium text-ink transition hover:bg-brand/10"
          >
            {labels.menu}
          </Link>
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
