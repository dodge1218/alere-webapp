"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { profileSchema, type NutritionProfile } from "@/lib/contracts/profile";
import { AppShell } from "@/components/app-shell";

const restrictionOptions: Array<NutritionProfile["dietaryRestrictions"][number]> = [
  "none",
  "vegetarian",
  "vegan",
  "pescatarian",
  "gluten_free",
  "halal",
  "kosher",
];

export default function OnboardingPage() {
  const [saved, setSaved] = useState(false);
  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm<NutritionProfile>({
    defaultValues: {
      fullName: "",
      age: 25,
      weightLb: 160,
      heightIn: 68,
      activityLevel: "moderate",
      dietaryRestrictions: ["none"],
      allergies: [],
      religiousPractice: "",
      goal: "maintain",
    },
  });

  const selectedRestrictions = watch("dietaryRestrictions") ?? ["none"];

  const toggleRestriction = (value: NutritionProfile["dietaryRestrictions"][number]) => {
    const current = new Set(selectedRestrictions);
    if (value === "none") {
      setValue("dietaryRestrictions", ["none"]);
      return;
    }
    current.delete("none");
    if (current.has(value)) current.delete(value);
    else current.add(value);
    setValue("dietaryRestrictions", current.size ? Array.from(current) : ["none"]);
  };

  const onSubmit = async (data: NutritionProfile) => {
    const parsed = profileSchema.safeParse(data);
    if (!parsed.success) return;

    const response = await fetch("/api/v1/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (response.ok) setSaved(true);
  };

  return (
    <AppShell title="Onboarding">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5">
        <h2 className="text-lg font-semibold">Nutrition profile setup</h2>

        <div className="grid gap-3 md:grid-cols-2">
          <input {...register("fullName", { required: true })} placeholder="Full name" className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm" />
          <select {...register("goal")} className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm">
            <option value="lose_weight">Lose weight</option>
            <option value="maintain">Maintain</option>
            <option value="gain_muscle">Gain muscle</option>
            <option value="energy">Improve energy</option>
          </select>
          <input type="number" {...register("age", { valueAsNumber: true })} placeholder="Age" className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm" />
          <input type="number" {...register("weightLb", { valueAsNumber: true })} placeholder="Weight (lb)" className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm" />
          <input type="number" {...register("heightIn", { valueAsNumber: true })} placeholder="Height (in)" className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm" />
          <select {...register("activityLevel")} className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm">
            <option value="low">Low activity</option>
            <option value="moderate">Moderate activity</option>
            <option value="high">High activity</option>
          </select>
        </div>

        <div>
          <p className="mb-2 text-sm text-slate-300">Dietary restrictions</p>
          <div className="flex flex-wrap gap-2">
            {restrictionOptions.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => toggleRestriction(r)}
                className={`rounded-full border px-3 py-1 text-xs ${selectedRestrictions.includes(r) ? "border-emerald-300 bg-emerald-400/20 text-emerald-200" : "border-white/20 text-slate-300"}`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <textarea
          placeholder="Allergies (comma separated, e.g. peanuts, shellfish)"
          className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm"
          onBlur={(e) => {
            const values = e.target.value
              .split(",")
              .map((v) => v.trim())
              .filter(Boolean);
            setValue("allergies", values);
          }}
        />

        <input {...register("religiousPractice")} placeholder="Religious practice (optional)" className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm" />

        {(errors.fullName || errors.age || errors.weightLb || errors.heightIn) && (
          <p className="text-sm text-rose-300">Please complete all required profile fields with valid values.</p>
        )}

        <button disabled={isSubmitting} className="rounded-xl bg-emerald-400 px-5 py-3 font-semibold text-slate-950 hover:bg-emerald-300 disabled:opacity-50">
          {isSubmitting ? "Saving..." : "Save profile"}
        </button>

        {saved && <p className="text-sm text-emerald-300">Profile saved. Recommendation engine inputs are now initialized.</p>}
      </form>
    </AppShell>
  );
}
