import { AppShell } from "@/components/app-shell";

const meals = [
  { name: "Mediterranean Protein Bowl", tags: ["high-protein", "halal-friendly"] },
  { name: "Gluten-Free Salmon Plate", tags: ["gluten-free", "omega-rich"] },
  { name: "Vegan Lentil Power Wrap", tags: ["vegan", "high-fiber"] },
  { name: "Low-Sodium Teriyaki Chicken", tags: ["low-sodium", "family"] },
];

export default function DiscoverPage() {
  return (
    <AppShell title="Discover Meals">
      <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <input
          className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm outline-none placeholder:text-slate-400"
          placeholder="Search meals, cuisines, or goals..."
        />
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {meals.map((meal) => (
          <article key={meal.name} className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="font-semibold">{meal.name}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {meal.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-emerald-300/30 bg-emerald-400/10 px-2 py-1 text-xs text-emerald-300">
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </section>
    </AppShell>
  );
}
