import { SettingsManager } from "@/components/admin/SettingsManager";

export default function SettingsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-sm text-muted">
          Update branding, SEO metadata, and colors.
        </p>
      </div>
      <SettingsManager />
    </div>
  );
}
