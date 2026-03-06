export type Meal = {
  id: string;
  name: string;
  cuisine: string;
  tags: string[];
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  restrictions: Array<"vegetarian" | "vegan" | "pescatarian" | "gluten_free" | "halal" | "kosher">;
  allergens: string[];
};

export const MEALS: Meal[] = [
  {
    id: "m1",
    name: "Mediterranean Protein Bowl",
    cuisine: "Mediterranean",
    tags: ["high-protein", "balanced", "lunch"],
    calories: 520,
    protein: 42,
    carbs: 45,
    fat: 18,
    restrictions: ["halal"],
    allergens: [],
  },
  {
    id: "m2",
    name: "Gluten-Free Salmon Plate",
    cuisine: "Seafood",
    tags: ["omega-rich", "dinner", "clean"],
    calories: 480,
    protein: 38,
    carbs: 24,
    fat: 22,
    restrictions: ["gluten_free", "pescatarian", "kosher"],
    allergens: ["fish"],
  },
  {
    id: "m3",
    name: "Vegan Lentil Power Wrap",
    cuisine: "Plant-based",
    tags: ["high-fiber", "vegan", "budget"],
    calories: 430,
    protein: 24,
    carbs: 56,
    fat: 10,
    restrictions: ["vegan", "vegetarian"],
    allergens: [],
  },
  {
    id: "m4",
    name: "Low-Sodium Teriyaki Chicken",
    cuisine: "Asian",
    tags: ["family", "low-sodium", "dinner"],
    calories: 510,
    protein: 36,
    carbs: 49,
    fat: 15,
    restrictions: ["halal"],
    allergens: ["soy"],
  },
  {
    id: "m5",
    name: "Greek Yogurt Berry Parfait",
    cuisine: "Breakfast",
    tags: ["quick", "high-protein", "breakfast"],
    calories: 320,
    protein: 23,
    carbs: 30,
    fat: 9,
    restrictions: ["vegetarian", "gluten_free", "kosher"],
    allergens: ["dairy"],
  },
  {
    id: "m6",
    name: "Tofu Stir Fry (No Gluten)",
    cuisine: "Asian",
    tags: ["vegan", "high-fiber", "gluten-free"],
    calories: 410,
    protein: 28,
    carbs: 38,
    fat: 12,
    restrictions: ["vegan", "vegetarian", "gluten_free", "kosher"],
    allergens: ["soy"],
  },
];
