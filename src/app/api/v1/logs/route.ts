import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { AUTH_COOKIE, getUserIdFromCookie } from "@/lib/auth";
import { mealLogSchema } from "@/lib/contracts/log";
import { addMealLog, summarizeForDate } from "@/lib/server/store";

async function requireUserId() {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(AUTH_COOKIE)?.value;
  return getUserIdFromCookie(cookieValue);
}

export async function GET(request: Request) {
  const userId = await requireUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const url = new URL(request.url);
  const date = url.searchParams.get("date") ?? new Date().toISOString().slice(0, 10);

  const summary = summarizeForDate(userId, date);
  return NextResponse.json({ date, ...summary });
}

export async function POST(request: Request) {
  const userId = await requireUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const body = await request.json();
  const parsed = mealLogSchema.safeParse({
    ...body,
    calories: Number(body.calories),
    protein: Number(body.protein),
    carbs: Number(body.carbs),
    fat: Number(body.fat),
    waterOz: Number(body.waterOz || 0),
  });

  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_log", issues: parsed.error.issues }, { status: 400 });
  }

  const log = addMealLog(userId, {
    ...parsed.data,
    id: crypto.randomUUID(),
    loggedAt: parsed.data.loggedAt ?? new Date().toISOString(),
  });

  return NextResponse.json({ saved: true, log });
}
