// Warstwa sesji zależna wyłącznie od `jose` (bez bcrypt, bez next/headers,
// bez better-sqlite3) — bezpieczna do użycia w middleware (edge runtime).

import { SignJWT, jwtVerify } from "jose";
import type { Role } from "./db";

export const SESSION_COOKIE = "session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 dni

export type SessionUser = {
  id: number;
  email: string;
  name: string;
  role: Role;
};

function getSecret(): Uint8Array {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error(
      "AUTH_SECRET nie jest ustawiony (min. 16 znaków). Ustaw go w .env.local / env produkcji."
    );
  }
  return new TextEncoder().encode(secret);
}

export async function signSession(user: SessionUser): Promise<string> {
  return new SignJWT({ email: user.email, name: user.name, role: user.role })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(String(user.id))
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(getSecret());
}

export async function verifySession(
  token: string | undefined
): Promise<SessionUser | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret());
    const id = Number(payload.sub);
    if (!id) return null;
    return {
      id,
      email: String(payload.email ?? ""),
      name: String(payload.name ?? ""),
      role: payload.role === "admin" ? "admin" : "client",
    };
  } catch {
    return null;
  }
}
