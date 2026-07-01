// Uwierzytelnianie po stronie serwera: hasła (bcrypt) + odczyt/zapis sesji
// w httpOnly cookie. Logikę podpisu JWT trzyma lib/session.ts (edge-safe).

import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  signSession,
  verifySession,
  type SessionUser,
} from "./session";

export { SESSION_COOKIE } from "./session";
export type { SessionUser } from "./session";

export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Odczyt sesji w server components / server actions.
export async function getSession(): Promise<SessionUser | null> {
  const token = cookies().get(SESSION_COOKIE)?.value;
  return verifySession(token);
}

export async function setSessionCookie(user: SessionUser): Promise<void> {
  const token = await signSession(user);
  cookies().set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

export function clearSessionCookie(): void {
  cookies().set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}
