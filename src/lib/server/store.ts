import type { NutritionProfile } from "@/lib/contracts/profile";

const profileStore = new Map<string, NutritionProfile>();

export function getProfile(userId: string) {
  return profileStore.get(userId) ?? null;
}

export function upsertProfile(userId: string, profile: NutritionProfile) {
  profileStore.set(userId, profile);
  return profile;
}
