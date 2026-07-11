import { db, type ProductRow } from "./db";
import { solutions, type Solution } from "./solutions";

// Publiczne DTO produktu (kształt jak w komponencie Solutions).
// id jest numeryczne (z bazy), slug to publiczny identyfikator.
export type ShopProduct = Omit<Solution, "id"> & {
  id: number;
  slug: string;
  active: boolean;
};

function parseList(json: string | null): string[] {
  if (!json) return [];
  try {
    const v = JSON.parse(json);
    return Array.isArray(v) ? v.map(String) : [];
  } catch {
    return [];
  }
}

function rowToProduct(r: ProductRow): ShopProduct {
  return {
    id: r.id,
    slug: r.slug,
    name: r.name,
    nameEn: r.name_en ?? undefined,
    description: r.description,
    descriptionEn: r.description_en ?? undefined,
    price: r.price,
    priceNote: r.price_note ?? undefined,
    priceNoteEn: r.price_note_en ?? undefined,
    priceAlt: r.price_alt ?? undefined,
    priceAltEn: r.price_alt_en ?? undefined,
    features: parseList(r.features),
    featuresEn: r.features_en ? parseList(r.features_en) : undefined,
    badge: r.badge ?? undefined,
    badgeEn: r.badge_en ?? undefined,
    soon: r.soon === 1,
    active: r.active === 1,
  };
}

// Wypełnij tabelę produktów danymi startowymi z lib/solutions.ts (raz).
export function seedProductsIfEmpty(): void {
  const row = db.prepare("SELECT COUNT(*) AS n FROM products").get() as {
    n: number;
  };
  if (row.n > 0) return;
  const now = new Date().toISOString();
  const insert = db.prepare(
    `INSERT INTO products
      (slug, name, name_en, description, description_en, price, price_note,
       price_note_en, price_alt, price_alt_en, features, features_en, badge,
       badge_en, soon, active, sort, created_at)
     VALUES
      (@slug, @name, @name_en, @description, @description_en, @price, @price_note,
       @price_note_en, @price_alt, @price_alt_en, @features, @features_en, @badge,
       @badge_en, @soon, @active, @sort, @created_at)`
  );
  const seedAll = db.transaction((items: Solution[]) => {
    items.forEach((s, i) =>
      insert.run({
        slug: s.id,
        name: s.name,
        name_en: s.nameEn ?? null,
        description: s.description,
        description_en: s.descriptionEn ?? null,
        price: s.price,
        price_note: s.priceNote ?? null,
        price_note_en: s.priceNoteEn ?? null,
        price_alt: s.priceAlt ?? null,
        price_alt_en: s.priceAltEn ?? null,
        features: JSON.stringify(s.features ?? []),
        features_en: s.featuresEn ? JSON.stringify(s.featuresEn) : null,
        badge: s.badge ?? null,
        badge_en: s.badgeEn ?? null,
        soon: s.soon ? 1 : 0,
        active: 1,
        sort: i,
        created_at: now,
      })
    );
  });
  seedAll(solutions);
}

// Produkty widoczne w sklepie (aktywne), posortowane.
export function getShopProducts(): ShopProduct[] {
  seedProductsIfEmpty();
  const rows = db
    .prepare("SELECT * FROM products WHERE active = 1 ORDER BY sort, id")
    .all() as ProductRow[];
  return rows.map(rowToProduct);
}

// Wszystkie produkty (panel admina).
export function listProducts(): ShopProduct[] {
  seedProductsIfEmpty();
  const rows = db
    .prepare("SELECT * FROM products ORDER BY sort, id")
    .all() as ProductRow[];
  return rows.map(rowToProduct);
}

export function getProductById(id: number): ShopProduct | undefined {
  const r = db.prepare("SELECT * FROM products WHERE id = ?").get(id) as
    | ProductRow
    | undefined;
  return r ? rowToProduct(r) : undefined;
}

// Produkt po publicznym slugu (strona /sklep/[slug]). Tylko aktywne.
export function getProductBySlug(slug: string): ShopProduct | undefined {
  seedProductsIfEmpty();
  const r = db
    .prepare("SELECT * FROM products WHERE slug = ? AND active = 1")
    .get(slug) as ProductRow | undefined;
  return r ? rowToProduct(r) : undefined;
}

export type ProductInput = {
  slug: string;
  name: string;
  nameEn?: string;
  description: string;
  descriptionEn?: string;
  price: number;
  priceNote?: string;
  priceNoteEn?: string;
  priceAlt?: string;
  priceAltEn?: string;
  features: string[];
  featuresEn?: string[];
  badge?: string;
  badgeEn?: string;
  soon: boolean;
  active: boolean;
};

export function createProduct(p: ProductInput): number {
  const now = new Date().toISOString();
  const info = db
    .prepare(
      `INSERT INTO products
        (slug, name, name_en, description, description_en, price, price_note,
         price_note_en, price_alt, price_alt_en, features, features_en, badge,
         badge_en, soon, active, sort, created_at)
       VALUES
        (@slug, @name, @name_en, @description, @description_en, @price, @price_note,
         @price_note_en, @price_alt, @price_alt_en, @features, @features_en, @badge,
         @badge_en, @soon, @active,
         (SELECT COALESCE(MAX(sort), 0) + 1 FROM products), @created_at)`
    )
    .run({
      slug: p.slug,
      name: p.name,
      name_en: p.nameEn || null,
      description: p.description,
      description_en: p.descriptionEn || null,
      price: p.price,
      price_note: p.priceNote || null,
      price_note_en: p.priceNoteEn || null,
      price_alt: p.priceAlt || null,
      price_alt_en: p.priceAltEn || null,
      features: JSON.stringify(p.features),
      features_en: p.featuresEn ? JSON.stringify(p.featuresEn) : null,
      badge: p.badge || null,
      badge_en: p.badgeEn || null,
      soon: p.soon ? 1 : 0,
      active: p.active ? 1 : 0,
      created_at: now,
    });
  return Number(info.lastInsertRowid);
}

export function updateProduct(id: number, p: ProductInput): void {
  db.prepare(
    `UPDATE products SET
       slug=@slug, name=@name, name_en=@name_en, description=@description,
       description_en=@description_en, price=@price, price_note=@price_note,
       price_note_en=@price_note_en, price_alt=@price_alt,
       price_alt_en=@price_alt_en, features=@features, features_en=@features_en,
       badge=@badge, badge_en=@badge_en, soon=@soon, active=@active
     WHERE id=@id`
  ).run({
    id,
    slug: p.slug,
    name: p.name,
    name_en: p.nameEn || null,
    description: p.description,
    description_en: p.descriptionEn || null,
    price: p.price,
    price_note: p.priceNote || null,
    price_note_en: p.priceNoteEn || null,
    price_alt: p.priceAlt || null,
    price_alt_en: p.priceAltEn || null,
    features: JSON.stringify(p.features),
    features_en: p.featuresEn ? JSON.stringify(p.featuresEn) : null,
    badge: p.badge || null,
    badge_en: p.badgeEn || null,
    soon: p.soon ? 1 : 0,
    active: p.active ? 1 : 0,
  });
}

export function deleteProduct(id: number): void {
  db.prepare("DELETE FROM products WHERE id = ?").run(id);
}
