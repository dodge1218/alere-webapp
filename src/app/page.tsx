import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles, Smartphone } from "lucide-react";
import { FIGMA_EXTRACT } from "@/lib/product-spec";
import { Pill } from "@/components/ui/pill";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <main className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <Pill className="border-white/20 bg-white/10 text-slate-100">Figma-manual extraction → premium app scaffold</Pill>
        <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
          Alere: a premium, mobile-ready meal discovery and loyalty webapp.
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-slate-300">
          Built from your wireframe intent: personalized meals, dietary preferences, recommendations, coupons, and store-aware redemption.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/app" className="inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 font-semibold text-slate-950 hover:bg-emerald-300">
            Open App Prototype <ArrowRight className="size-4" />
          </Link>
          <Link href="/docs" className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-5 py-3 font-semibold hover:bg-white/10">
            View Build Docs
          </Link>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <Sparkles className="mb-3 size-5 text-emerald-300" />
            <p className="font-semibold">Conversion-ready UX</p>
            <p className="mt-2 text-sm text-slate-300">Clear journeys for discovery, personalization, and coupon conversion.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <Smartphone className="mb-3 size-5 text-emerald-300" />
            <p className="font-semibold">Mobile pivot path</p>
            <p className="mt-2 text-sm text-slate-300">Feature modules are scoped to map cleanly to React Native or Flutter screens later.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <ShieldCheck className="mb-3 size-5 text-emerald-300" />
            <p className="font-semibold">Dev-team friendly</p>
            <p className="mt-2 text-sm text-slate-300">Domain boundaries + API contract stubs to hand off without confusion.</p>
          </div>
        </div>

        <section className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold">Extracted core requirements</h2>
          <ul className="mt-4 grid gap-2 text-slate-300 md:grid-cols-2">
            {FIGMA_EXTRACT.inferredScope.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
