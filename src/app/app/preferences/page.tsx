import { AppShell } from "@/components/app-shell";

export default function PreferencesPage() {
  return (
    <AppShell title="Preferences & Restrictions">
      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h2 className="font-semibold">Dietary profile</h2>
          <p className="mt-2 text-sm text-slate-300">Capture allergies, dietary restrictions, and religious practices to personalize recommendations.</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            <li>• Allergies: nuts, dairy, shellfish</li>
            <li>• Diet: vegetarian, vegan, gluten-free, keto</li>
            <li>• Religious: halal, kosher, fasting windows</li>
          </ul>
        </article>

        <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h2 className="font-semibold">Behavior model inputs</h2>
          <p className="mt-2 text-sm text-slate-300">Store meal likes/dislikes, frequency, and order history to support returning-user recommendations.</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            <li>• Favorite cuisines</li>
            <li>• Repeat purchases</li>
            <li>• Time-of-day preferences</li>
          </ul>
        </article>
      </section>
    </AppShell>
  );
}
