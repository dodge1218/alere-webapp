"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_COOKIE } from "@/lib/auth";

export async function signInAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!email) return;

  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE, email, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: false,
  });

  redirect("/app/onboarding");
}

export async function signOutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE);
  redirect("/");
}
