import type { NutritionProfile } from "@/lib/contracts/profile";
import type { MealLog } from "@/lib/contracts/log";

const profileStore = new Map<string, NutritionProfile>();
const mealLogStore = new Map<string, MealLog[]>();

export function getProfile(userId: string) {
  return profileStore.get(userId) ?? null;
}

export function upsertProfile(userId: string, profile: NutritionProfile) {
  profileStore.set(userId, profile);
  return profile;
}

export function getMealLogs(userId: string) {
  return mealLogStore.get(userId) ?? [];
}

export function addMealLog(userId: string, log: MealLog) {
  const current = mealLogStore.get(userId) ?? [];
  const next = [log, ...current];
  mealLogStore.set(userId, next);
  return log;
}

export function summarizeForDate(userId: string, datePrefix: string) {
  const logs = (mealLogStore.get(userId) ?? []).filter((log) => log.loggedAt.startsWith(datePrefix));

  const totals = logs.reduce(
    (acc, log) => {
      acc.calories += log.calories;
      acc.protein += log.protein;
      acc.carbs += log.carbs;
      acc.fat += log.fat;
      acc.waterOz += log.waterOz;
      return acc;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0, waterOz: 0 }
  );

  return { logs, totals };
}
