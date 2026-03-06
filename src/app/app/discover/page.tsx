"use client";

import { useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/app-shell";
import type { NutritionProfile } from "@/lib/contracts/profile";
import { MEALS } from "@/lib/domain/meals";
import { rankMeals } from "@/lib/domain/recommendations";

const RESTRICTIONS = ["none", "vegetarian", "vegan", "pescatarian", "gluten_free", "halal", "kosher"] as const;

export default function DiscoverPage() {
  const [query, setQuery] = useState("");
  const [restriction, setRestriction] = useState<(typeof RESTRICTIONS)[number]>("none");
  const [profile, setProfile] = useState<NutritionProfile | null>(null);

  useEffect(() => {
    fetch("/api/v1/profile")
      .then((r) => (r.ok ? r.json() : Promise.resolve({ profile: null })))
      .then((data) => setProfile(data.profile ?? null))
      .catch(() => setProfile(null));
  }, []);

  const ranked = useMemo(
    () => rankMeals({ meals: MEALS, profile, query, activeRestriction: restriction }),
    [profile, query, restriction]
  );

  return (
    <AppShell title="Discover Meals">
      <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm outline-none placeholder:text-slate-400"
          placeholder="Search meals, cuisines, or goals..."
        />

        <div className="mt-4 flex flex-wrap gap-2">
          {RESTRICTIONS.map((r) => (
            <button
              key={r}
              onClick={() => setRestriction(r)}
              className={`rounded-full border px-3 py-1 text-xs ${restriction === r ? "border-emerald-300 bg-emerald-400/20 text-emerald-200" : "border-white/20 text-slate-300"}`}
            >
              {r.replace("_", " ")}
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <h2 className="text-sm font-semibold text-slate-200">Recommendation context</h2>
        <p className="mt-2 text-sm text-slate-300">
          {profile
            ? `Using profile goal: ${profile.goal.replace("_", " ")} • restrictions: ${profile.dietaryRestrictions.join(", ").replaceAll("_", " ")}`
            : "No saved profile found yet. Complete onboarding for personalized ranking."}
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {ranked.length === 0 && (
          <article className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-slate-300">
            No meals match current filters. Try removing one restriction or broadening your search.
          </article>
        )}

        {ranked.map(({ meal, reasons }) => (
          <article key={meal.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="font-semibold">{meal.name}</h3>
            <p className="mt-1 text-sm text-slate-300">{meal.cuisine} • {meal.calories} cal • {meal.protein}g protein</p>

            <div className="mt-3 flex flex-wrap gap-2">
              {meal.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-emerald-300/30 bg-emerald-400/10 px-2 py-1 text-xs text-emerald-300">
                  {tag}
                </span>
              ))}
            </div>

            {reasons.length > 0 && (
              <div className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Why recommended</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {reasons.map((reason) => (
                    <span key={reason} className="rounded-full border border-cyan-300/30 bg-cyan-400/10 px-2 py-1 text-xs text-cyan-200">
                      {reason}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </article>
        ))}
      </section>
    </AppShell>
  );
}
