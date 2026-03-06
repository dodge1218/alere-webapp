import { AppShell } from "@/components/app-shell";

const coupons = [
  { id: "A-1021", label: "10% off healthy bowls", expires: "Apr 12" },
  { id: "A-993", label: "Buy 1 get 1 smoothie", expires: "Apr 08" },
  { id: "A-770", label: "$5 off first order", expires: "Apr 28" },
];

export default function CouponsPage() {
  return (
    <AppShell title="Coupons & QR Redemption">
      <section className="grid gap-4 md:grid-cols-2">
        {coupons.map((coupon) => (
          <article key={coupon.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs text-slate-400">Code {coupon.id}</p>
            <h3 className="mt-2 font-semibold">{coupon.label}</h3>
            <p className="mt-1 text-sm text-slate-300">Expires {coupon.expires}</p>
            <button className="mt-4 rounded-xl bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-300">
              Generate QR
            </button>
          </article>
        ))}
      </section>
    </AppShell>
  );
}
