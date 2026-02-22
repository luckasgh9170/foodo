"use client";

import { useEffect, useState } from "react";
const emptySettings = {
  restaurantName: "",
  logoUrl: "",
  primaryColor: "#c2422c",
  secondaryColor: "#1f6f8b",
  seoTitle: "",
  seoDescription: "",
};

export const SettingsManager = () => {
  const [settings, setSettings] = useState({ ...emptySettings });
  const [loading, setLoading] = useState(false);

  const load = async () => {
    const response = await fetch("/api/settings");
    const data = await response.json();
    if (data.settings) {
      setSettings({
        restaurantName: data.settings.restaurantName ?? "",
        logoUrl: data.settings.logoUrl ?? "",
        primaryColor: data.settings.primaryColor ?? "#c2422c",
        secondaryColor: data.settings.secondaryColor ?? "#1f6f8b",
        seoTitle: data.settings.seoTitle ?? "",
        seoDescription: data.settings.seoDescription ?? "",
      });
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    const payload = {
      restaurantName: settings.restaurantName,
      logoUrl: settings.logoUrl || null,
      primaryColor: settings.primaryColor,
      secondaryColor: settings.secondaryColor,
      seoTitle: settings.seoTitle || null,
      seoDescription: settings.seoDescription || null,
    };

    const response = await fetch("/api/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);
    if (response.ok) {
      await load();
    }
  };

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold">Brand Settings</h2>
      <div className="mt-4 space-y-4">
        <div>
          <label className="text-sm font-medium">Restaurant Name</label>
          <input
            value={settings.restaurantName}
            onChange={(event) =>
              setSettings((prev) => ({
                ...prev,
                restaurantName: event.target.value,
              }))
            }
            className="mt-2 w-full rounded-2xl border border-black/10 px-4 py-3"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Logo URL</label>
          <input
            value={settings.logoUrl}
            onChange={(event) =>
              setSettings((prev) => ({ ...prev, logoUrl: event.target.value }))
            }
            className="mt-2 w-full rounded-2xl border border-black/10 px-4 py-3"
          />
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium">Primary Color</label>
            <input
              value={settings.primaryColor}
              onChange={(event) =>
                setSettings((prev) => ({
                  ...prev,
                  primaryColor: event.target.value,
                }))
              }
              className="mt-2 w-full rounded-2xl border border-black/10 px-4 py-3"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Secondary Color</label>
            <input
              value={settings.secondaryColor}
              onChange={(event) =>
                setSettings((prev) => ({
                  ...prev,
                  secondaryColor: event.target.value,
                }))
              }
              className="mt-2 w-full rounded-2xl border border-black/10 px-4 py-3"
            />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium">SEO Title</label>
          <input
            value={settings.seoTitle}
            onChange={(event) =>
              setSettings((prev) => ({ ...prev, seoTitle: event.target.value }))
            }
            className="mt-2 w-full rounded-2xl border border-black/10 px-4 py-3"
          />
        </div>
        <div>
          <label className="text-sm font-medium">SEO Description</label>
          <textarea
            value={settings.seoDescription}
            onChange={(event) =>
              setSettings((prev) => ({
                ...prev,
                seoDescription: event.target.value,
              }))
            }
            className="mt-2 w-full rounded-2xl border border-black/10 px-4 py-3"
          />
        </div>
        <div className="rounded-2xl border border-black/5 bg-[#f6f2ed] p-4 text-sm text-muted">
          Currency is locked to Iranian Toman (تومان).
        </div>
        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full rounded-2xl bg-ink px-4 py-3 text-sm font-semibold text-white"
        >
          {loading ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </div>
  );
};
