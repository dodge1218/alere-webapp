import { AppShell } from "@/components/app-shell";

const stores = [
  { name: "Alere Market — Center City", distance: "1.2 mi", open: "Open until 9:00 PM" },
  { name: "Alere Market — University City", distance: "2.8 mi", open: "Open until 10:00 PM" },
  { name: "Alere Market — South Street", distance: "3.4 mi", open: "Open until 8:30 PM" },
];

export default function StoresPage() {
  return (
    <AppShell title="Store Locations">
      <section className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-slate-300">
        Determine store location first so recommendations and coupons match local inventory and promotions.
      </section>
      <section className="grid gap-4">
        {stores.map((store) => (
          <article key={store.name} className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="font-semibold">{store.name}</h3>
            <p className="mt-1 text-sm text-slate-300">{store.distance} • {store.open}</p>
          </article>
        ))}
      </section>
    </AppShell>
  );
}
