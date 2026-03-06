import type { NutritionProfile } from "@/lib/contracts/profile";
import type { Meal } from "@/lib/domain/meals";

export type RecommendationResult = {
  meal: Meal;
  score: number;
  reasons: string[];
  blocked: boolean;
};

function matchesRestriction(meal: Meal, restriction: string) {
  if (restriction === "none") return true;
  return meal.restrictions.includes(restriction as Meal["restrictions"][number]);
}

function goalScore(meal: Meal, goal: NutritionProfile["goal"]) {
  if (goal === "lose_weight") return meal.calories <= 450 ? 3 : 1;
  if (goal === "gain_muscle") return meal.protein >= 35 ? 3 : 1;
  if (goal === "energy") return meal.carbs >= 35 && meal.protein >= 20 ? 3 : 1;
  return 2;
}

export function rankMeals(params: {
  meals: Meal[];
  profile: NutritionProfile | null;
  query: string;
  activeRestriction: string;
}) {
  const { meals, profile, query, activeRestriction } = params;
  const q = query.trim().toLowerCase();

  const results: RecommendationResult[] = meals.map((meal) => {
    let score = 0;
    const reasons: string[] = [];

    const queryMatch = !q || `${meal.name} ${meal.cuisine} ${meal.tags.join(" ")}`.toLowerCase().includes(q);
    if (queryMatch) score += 2;

    if (activeRestriction !== "none" && matchesRestriction(meal, activeRestriction)) {
      score += 4;
      reasons.push(`Matches ${activeRestriction.replace("_", " ")}`);
    }

    let blocked = false;

    if (profile) {
      const profileRestrictions = profile.dietaryRestrictions.filter((r) => r !== "none");
      if (profileRestrictions.length > 0) {
        const overlap = profileRestrictions.filter((r) => matchesRestriction(meal, r));
        if (overlap.length > 0) {
          score += 5;
          reasons.push(`Fits your profile: ${overlap.join(", ").replaceAll("_", " ")}`);
        } else {
          score -= 2;
        }
      }

      if (profile.allergies.length > 0) {
        const allergenHit = profile.allergies.some((a) => meal.allergens.includes(a.toLowerCase()));
        if (allergenHit) {
          blocked = true;
          reasons.push("Contains a listed allergen");
          score -= 100;
        }
      }

      const gs = goalScore(meal, profile.goal);
      score += gs;
      if (gs >= 3) reasons.push(`Supports goal: ${profile.goal.replace("_", " ")}`);
    }

    if (meal.protein >= 30) reasons.push("High protein");
    if (meal.calories <= 450) reasons.push("Calorie-aware");

    return { meal, score, reasons: reasons.slice(0, 3), blocked };
  });

  return results
    .filter((r) => !r.blocked)
    .sort((a, b) => b.score - a.score)
    .filter((r) => r.score > 0);
}
