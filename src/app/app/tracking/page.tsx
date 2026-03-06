"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/app-shell";

type LogItem = {
  id: string;
  mealType: "breakfast" | "lunch" | "dinner" | "snack";
  label: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  waterOz: number;
  loggedAt: string;
};

type Totals = { calories: number; protein: number; carbs: number; fat: number; waterOz: number };

const defaultForm = {
  mealType: "breakfast",
  label: "",
  calories: 450,
  protein: 30,
  carbs: 40,
  fat: 15,
  waterOz: 0,
};

export default function TrackingPage() {
  const [form, setForm] = useState(defaultForm);
  const [logs, setLogs] = useState<LogItem[]>([]);
  const [totals, setTotals] = useState<Totals>({ calories: 0, protein: 0, carbs: 0, fat: 0, waterOz: 0 });
  const [saving, setSaving] = useState(false);

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const refresh = useCallback(async () => {
    const res = await fetch(`/api/v1/logs?date=${today}`);
    if (!res.ok) return;
    const data = await res.json();
    setLogs(data.logs ?? []);
    setTotals(data.totals ?? { calories: 0, protein: 0, carbs: 0, fat: 0, waterOz: 0 });
  }, [today]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/v1/logs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setForm(defaultForm);
        await refresh();
      }
    } finally {
      setSaving(false);
    }
  };

  const calorieTarget = 2200;
  const proteinTarget = 140;
  const adherence = Math.max(
    0,
    Math.min(
      100,
      Math.round(((Math.min(totals.calories / calorieTarget, 1) + Math.min(totals.protein / proteinTarget, 1)) / 2) * 100)
    )
  );

  return (
    <AppShell title="Daily Tracking">
      <section className="grid gap-4 md:grid-cols-4">
        {[
          ["Calories", `${totals.calories} / ${calorieTarget}`],
          ["Protein", `${totals.protein}g / ${proteinTarget}g`],
          ["Water", `${totals.waterOz} oz`],
          ["Adherence", `${adherence}%`],
        ].map(([label, value]) => (
          <article key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs text-slate-400">{label}</p>
            <p className="mt-2 text-xl font-semibold text-emerald-300">{value}</p>
          </article>
        ))}
      </section>

      <form onSubmit={submit} className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <h2 className="text-lg font-semibold">Log a meal</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          <select
            value={form.mealType}
            onChange={(e) => setForm((f) => ({ ...f, mealType: e.target.value as typeof f.mealType }))}
            className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm"
          >
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="snack">Snack</option>
          </select>
          <input value={form.label} onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))} placeholder="Meal label" className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm" />
          <input type="number" value={form.calories} onChange={(e) => setForm((f) => ({ ...f, calories: Number(e.target.value) }))} placeholder="Calories" className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm" />
          <input type="number" value={form.protein} onChange={(e) => setForm((f) => ({ ...f, protein: Number(e.target.value) }))} placeholder="Protein" className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm" />
          <input type="number" value={form.carbs} onChange={(e) => setForm((f) => ({ ...f, carbs: Number(e.target.value) }))} placeholder="Carbs" className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm" />
          <input type="number" value={form.fat} onChange={(e) => setForm((f) => ({ ...f, fat: Number(e.target.value) }))} placeholder="Fat" className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm" />
          <input type="number" value={form.waterOz} onChange={(e) => setForm((f) => ({ ...f, waterOz: Number(e.target.value) }))} placeholder="Water (oz)" className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm md:col-span-2" />
        </div>
        <button disabled={saving || !form.label.trim()} className="mt-4 rounded-xl bg-emerald-400 px-5 py-3 font-semibold text-slate-950 hover:bg-emerald-300 disabled:opacity-50">
          {saving ? "Saving..." : "Save log"}
        </button>
      </form>

      <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <h2 className="text-lg font-semibold">Today&apos;s logs</h2>
        <div className="mt-3 space-y-2">
          {logs.length === 0 && <p className="text-sm text-slate-400">No logs yet today.</p>}
          {logs.map((log) => (
            <article key={log.id} className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm">
              <p className="font-medium text-slate-100">{log.label} <span className="text-slate-400">({log.mealType})</span></p>
              <p className="mt-1 text-slate-300">{log.calories} cal • P {log.protein}g • C {log.carbs}g • F {log.fat}g • Water {log.waterOz} oz</p>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
