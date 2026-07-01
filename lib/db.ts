// Warstwa bazy danych (SQLite przez better-sqlite3).
//
// Plik bazy trzymany jest poza repo (katalog /data, w .gitignore). Ścieżkę
// można nadpisać zmienną DATABASE_PATH. Schemat tworzony jest idempotentnie
// przy pierwszym imporcie (CREATE TABLE IF NOT EXISTS).
//
// better-sqlite3 jest modułem natywnym — na serwerze wymaga `npm install`
// (build binarki) przed `npm run build`.

import Database from "better-sqlite3";
import { existsSync, mkdirSync } from "fs";
import path from "path";

export type Role = "admin" | "client";
export type OrderStatus = "new" | "in_progress" | "done" | "cancelled";

export type UserRow = {
  id: number;
  email: string;
  name: string;
  password_hash: string;
  role: Role;
  created_at: string;
};

export type ProductRow = {
  id: number;
  slug: string;
  name: string;
  name_en: string | null;
  description: string;
  description_en: string | null;
  price: number;
  price_note: string | null;
  price_note_en: string | null;
  price_alt: string | null;
  price_alt_en: string | null;
  features: string; // JSON string[]
  features_en: string | null; // JSON string[]
  badge: string | null;
  badge_en: string | null;
  soon: number; // 0/1
  active: number; // 0/1
  sort: number;
  created_at: string;
};

export type OrderRow = {
  id: number;
  user_id: number;
  title: string;
  details: string;
  budget: number | null;
  status: OrderStatus;
  created_at: string;
  updated_at: string;
};

export type MessageRow = {
  id: number;
  order_id: number;
  user_id: number;
  body: string;
  created_at: string;
};

const DB_PATH =
  process.env.DATABASE_PATH || path.join(process.cwd(), "data", "app.db");

function createConnection(): Database.Database {
  const dir = path.dirname(DB_PATH);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

  const db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");

  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      email         TEXT NOT NULL UNIQUE,
      name          TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      role          TEXT NOT NULL DEFAULT 'client',
      created_at    TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS products (
      id              INTEGER PRIMARY KEY AUTOINCREMENT,
      slug            TEXT NOT NULL UNIQUE,
      name            TEXT NOT NULL,
      name_en         TEXT,
      description     TEXT NOT NULL,
      description_en  TEXT,
      price           INTEGER NOT NULL,
      price_note      TEXT,
      price_note_en   TEXT,
      price_alt       TEXT,
      price_alt_en    TEXT,
      features        TEXT NOT NULL DEFAULT '[]',
      features_en     TEXT,
      badge           TEXT,
      badge_en        TEXT,
      soon            INTEGER NOT NULL DEFAULT 0,
      active          INTEGER NOT NULL DEFAULT 1,
      sort            INTEGER NOT NULL DEFAULT 0,
      created_at      TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS orders (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      title       TEXT NOT NULL,
      details     TEXT NOT NULL DEFAULT '',
      budget      INTEGER,
      status      TEXT NOT NULL DEFAULT 'new',
      created_at  TEXT NOT NULL,
      updated_at  TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS messages (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id    INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
      user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      body        TEXT NOT NULL,
      created_at  TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
    CREATE INDEX IF NOT EXISTS idx_messages_order ON messages(order_id);
  `);

  return db;
}

// Singleton — w devie Next przeładowuje moduły, więc cache na globalThis.
const globalForDb = globalThis as unknown as { __db?: Database.Database };
export const db: Database.Database = globalForDb.__db ?? createConnection();
if (process.env.NODE_ENV !== "production") globalForDb.__db = db;
