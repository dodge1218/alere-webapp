import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { AUTH_COOKIE, getUserIdFromCookie } from "@/lib/auth";
import { getProfile, upsertProfile } from "@/lib/server/store";
import { profileSchema } from "@/lib/contracts/profile";

async function requireUserId() {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(AUTH_COOKIE)?.value;
  return getUserIdFromCookie(cookieValue);
}

export async function GET() {
  const userId = await requireUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const profile = getProfile(userId);
  return NextResponse.json({ profile });
}

export async function PUT(request: Request) {
  const userId = await requireUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const body = await request.json();
  const parsed = profileSchema.safeParse({
    ...body,
    age: Number(body.age),
    weightLb: Number(body.weightLb),
    heightIn: Number(body.heightIn),
  });

  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_profile", issues: parsed.error.issues }, { status: 400 });
  }

  const profile = upsertProfile(userId, parsed.data);
  return NextResponse.json({ profile, saved: true });
}
