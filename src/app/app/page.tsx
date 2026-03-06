import { AppShell } from "@/components/app-shell";

const cards = [
  { title: "Personalized Recommendations", value: "12", note: "Based on recent habits + saved restrictions" },
  { title: "Saved Coupons", value: "8", note: "Ready for QR redemption" },
  { title: "Nearby Stores", value: "4", note: "Within 5 miles of selected location" },
];

export default function AppOverviewPage() {
  return (
    <AppShell title="Overview">
      <section className="grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <article key={card.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-slate-300">{card.title}</p>
            <p className="mt-2 text-3xl font-bold text-emerald-300">{card.value}</p>
            <p className="mt-2 text-sm text-slate-400">{card.note}</p>
          </article>
        ))}
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <h2 className="text-lg font-semibold">Primary user flow</h2>
        <ol className="mt-3 space-y-2 text-sm text-slate-300">
          <li>1. Set dietary restrictions and preferences</li>
          <li>2. Discover meals and save favorites</li>
          <li>3. Receive personalized recommendations</li>
          <li>4. Collect and redeem coupons at nearby stores</li>
        </ol>
      </section>
    </AppShell>
  );
}
