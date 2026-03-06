export const AUTH_COOKIE = "alere_user";

export function getUserIdFromCookie(raw: string | undefined): string | null {
  if (!raw) return null;
  return raw.trim() || null;
}
