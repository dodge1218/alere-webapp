import Link from "next/link";
import { Home, Search, SlidersHorizontal, TicketPercent, MapPin } from "lucide-react";

const nav = [
  { href: "/app", label: "Overview", icon: Home },
  { href: "/app/discover", label: "Discover", icon: Search },
  { href: "/app/preferences", label: "Preferences", icon: SlidersHorizontal },
  { href: "/app/coupons", label: "Coupons", icon: TicketPercent },
  { href: "/app/stores", label: "Stores", icon: MapPin },
];

export function AppShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 md:grid-cols-[220px_1fr] md:px-6">
        <aside className="rounded-2xl border border-white/10 bg-white/5 p-4 md:sticky md:top-6 md:h-[calc(100vh-3rem)]">
          <p className="mb-4 text-lg font-semibold">Alere</p>
          <nav className="space-y-2">
            {nav.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href} className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-200 transition hover:bg-white/10">
                  <Icon className="size-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>
        <main className="space-y-4">
          <header className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          </header>
          {children}
        </main>
      </div>
    </div>
  );
}
