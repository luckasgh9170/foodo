"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LanguageToggle } from "@/components/LanguageToggle";
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
    admin: lang === "fa" ? "مدیریت" : "Admin",
  };

  return (
    <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          {settings.logoUrl ? (
            <div className="relative h-10 w-10 overflow-hidden rounded-2xl">
              <Image src={settings.logoUrl} alt="FOODO logo" fill />
            </div>
          ) : (
            <div className="h-10 w-10 rounded-2xl bg-[linear-gradient(135deg,#c2422c,#f2b199)]" />
          )}
          <div>
            <p className="text-lg font-semibold tracking-[0.2em]">
              {settings.restaurantName}
            </p>
            <p className="text-xs text-muted">Restaurant & Cafe</p>
          </div>
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="#menu"
            className="rounded-full border border-black/10 px-4 py-2 text-sm font-medium"
          >
            {labels.menu}
          </Link>
          <Link
            href="/admin"
            className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-white"
          >
            {labels.admin}
          </Link>
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
};
