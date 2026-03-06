import { z } from "zod";

export const mealTypeSchema = z.enum(["breakfast", "lunch", "dinner", "snack"]);

export const mealLogSchema = z.object({
  mealType: mealTypeSchema,
  label: z.string().min(2),
  calories: z.number().min(0).max(3000),
  protein: z.number().min(0).max(300),
  carbs: z.number().min(0).max(500),
  fat: z.number().min(0).max(300),
  waterOz: z.number().min(0).max(300).default(0),
  loggedAt: z.string().datetime().optional(),
});

export type MealLogInput = z.infer<typeof mealLogSchema>;

export type MealLog = MealLogInput & {
  id: string;
  loggedAt: string;
};
