import { FIGMA_EXTRACT } from "@/lib/product-spec";

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-slate-100">
      <div className="mx-auto max-w-4xl space-y-6">
        <h1 className="text-3xl font-bold">Figma extraction notes</h1>
        <p className="text-slate-300">Manual extraction from shared Figma wireframe/comments and translated into a premium webapp scaffold.</p>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h2 className="font-semibold">Inferred scope</h2>
          <ul className="mt-3 space-y-1 text-sm text-slate-300">
            {FIGMA_EXTRACT.inferredScope.map((s) => <li key={s}>• {s}</li>)}
          </ul>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h2 className="font-semibold">Mobile pivot architecture</h2>
          <ul className="mt-3 space-y-1 text-sm text-slate-300">
            <li>• Domain modules: discover, preferences, recommendations, coupons, stores</li>
            <li>• API-first contracts to reuse with React Native/Flutter</li>
            <li>• UI system can map to native components screen-by-screen</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
