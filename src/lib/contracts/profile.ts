import { z } from "zod";

export const dietaryRestrictionSchema = z.enum([
  "none",
  "vegetarian",
  "vegan",
  "pescatarian",
  "gluten_free",
  "halal",
  "kosher",
]);

export const goalSchema = z.enum(["lose_weight", "maintain", "gain_muscle", "energy"]);

export const profileSchema = z.object({
  fullName: z.string().min(2),
  age: z.number().int().min(13).max(120),
  weightLb: z.number().min(60).max(700),
  heightIn: z.number().min(48).max(90),
  activityLevel: z.enum(["low", "moderate", "high"]),
  dietaryRestrictions: z.array(dietaryRestrictionSchema).default(["none"]),
  allergies: z.array(z.string()).default([]),
  religiousPractice: z.string().max(120).optional().default(""),
  goal: goalSchema,
});

export type NutritionProfile = z.infer<typeof profileSchema>;
