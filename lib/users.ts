import { db, type Role, type UserRow } from "./db";

export function getUserByEmail(email: string): UserRow | undefined {
  return db
    .prepare("SELECT * FROM users WHERE email = ?")
    .get(email.toLowerCase()) as UserRow | undefined;
}

export function getUserById(id: number): UserRow | undefined {
  return db.prepare("SELECT * FROM users WHERE id = ?").get(id) as
    | UserRow
    | undefined;
}

export function countUsers(): number {
  const row = db.prepare("SELECT COUNT(*) AS n FROM users").get() as {
    n: number;
  };
  return row.n;
}

// Rola admin przypada e-mailowi z ADMIN_EMAIL (właściciel). Pierwsze
// zarejestrowane konto też dostaje admina, żeby nie zablokować się na starcie.
function roleForEmail(email: string): Role {
  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();
  if (adminEmail && email.toLowerCase() === adminEmail) return "admin";
  if (countUsers() === 0) return "admin";
  return "client";
}

export function createUser(input: {
  email: string;
  name: string;
  passwordHash: string;
}): UserRow {
  const email = input.email.toLowerCase();
  const role = roleForEmail(email);
  const now = new Date().toISOString();
  const info = db
    .prepare(
      "INSERT INTO users (email, name, password_hash, role, created_at) VALUES (?, ?, ?, ?, ?)"
    )
    .run(email, input.name, input.passwordHash, role, now);
  return getUserById(Number(info.lastInsertRowid))!;
}

export function listUsers(): UserRow[] {
  return db
    .prepare("SELECT * FROM users ORDER BY created_at DESC")
    .all() as UserRow[];
}
