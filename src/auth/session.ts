// src/auth/session.ts
export type SessionUser = { id: number; name: string; email: string };

const TOKEN_KEY = "token";
const USER_KEY  = "user";

export function setSession(token: string, user: SessionUser) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}
export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}
export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}
export function getUser(): SessionUser | null {
  const raw = localStorage.getItem(USER_KEY);
  try { return raw ? (JSON.parse(raw) as SessionUser) : null; } catch { return null; }
}
export function isAuthenticated(): boolean {
  return !!getToken();
}

// ➜ usado no UserMenu
export function getUserName(): string | null {
  return getUser()?.name ?? null;
}