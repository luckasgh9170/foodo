"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LanguageToggle } from "@/components/LanguageToggle";

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/settings", label: "Settings" },
];

export const AdminShell = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-surface text-ink">
      <div className="flex">
        <aside className="hidden min-h-screen w-64 flex-col border-r border-brand/15 bg-card px-6 py-8 lg:flex">
          <div className="mb-10">
            <p className="text-xs uppercase text-muted">FOODO</p>
            <h1 className="text-2xl font-semibold tracking-wider">Admin</h1>
          </div>
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${
                  pathname === item.href
                    ? "bg-brand text-black"
                    : "text-ink/80 hover:bg-brand/10"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <div className="flex-1">
          <header className="flex items-center justify-between border-b border-brand/15 bg-card px-6 py-4">
            <div>
              <p className="text-sm text-muted">FOODO</p>
              <h2 className="text-lg font-semibold">Admin Panel</h2>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleLogout}
                className="rounded-full border border-brand/30 bg-card px-4 py-2 text-sm text-ink"
              >
                Logout
              </button>
              <LanguageToggle />
            </div>
          </header>
          <main className="px-6 py-8">{children}</main>
        </div>
      </div>
    </div>
  );
};
