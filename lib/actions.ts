"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  hashPassword,
  verifyPassword,
  getSession,
  setSessionCookie,
  clearSessionCookie,
} from "./auth";
import { createUser, getUserByEmail } from "./users";
import {
  createOrder,
  createOrderWithItems,
  getOrder,
  addMessage,
  updateOrderStatus,
} from "./orders";
import { parseCart } from "./cart";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductBySlug,
  type ProductInput,
} from "./products";
import { ORDER_STATUSES } from "./orders";
import type { OrderStatus } from "./db";
import { applyPromo } from "./promo";
import { zl } from "./pricing";

export type FormState = { error?: string; ok?: boolean };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function safeNext(next: FormDataEntryValue | null): string | null {
  const s = typeof next === "string" ? next : "";
  // tylko ścieżki wewnętrzne (bez open-redirect)
  return s.startsWith("/") && !s.startsWith("//") ? s : null;
}

// --- Auth ---

export async function registerAction(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const next = safeNext(formData.get("next"));

  if (name.length < 2) return { error: "Podaj imię (min. 2 znaki)." };
  if (!EMAIL_RE.test(email)) return { error: "Podaj poprawny adres e-mail." };
  if (password.length < 8)
    return { error: "Hasło musi mieć min. 8 znaków." };
  if (getUserByEmail(email))
    return { error: "Konto z tym adresem e-mail już istnieje." };

  const passwordHash = await hashPassword(password);
  const user = createUser({ email, name, passwordHash });
  await setSessionCookie({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  });
  redirect(next ?? (user.role === "admin" ? "/admin" : "/panel"));
}

export async function loginAction(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const next = safeNext(formData.get("next"));

  const user = getUserByEmail(email);
  const ok = user ? await verifyPassword(password, user.password_hash) : false;
  if (!user || !ok)
    return { error: "Nieprawidłowy e-mail lub hasło." };

  await setSessionCookie({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  });
  redirect(next ?? (user.role === "admin" ? "/admin" : "/panel"));
}

export async function logoutAction(): Promise<void> {
  clearSessionCookie();
  redirect("/login");
}

// --- Klient: zapytania i wiadomości ---

export async function createOrderAction(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const session = await getSession();
  if (!session) redirect("/login");

  const title = String(formData.get("title") ?? "").trim();
  const details = String(formData.get("details") ?? "").trim();
  const budgetRaw = String(formData.get("budget") ?? "").replace(/\s/g, "");
  const budget = budgetRaw ? Number(budgetRaw) : null;

  if (title.length < 3)
    return { error: "Podaj krótki tytuł zapytania (min. 3 znaki)." };
  if (budget !== null && (!Number.isFinite(budget) || budget < 0))
    return { error: "Budżet musi być liczbą." };

  createOrder({ userId: session.id, title, details, budget });
  revalidatePath("/panel");
  revalidatePath("/admin/zamowienia");
  return { ok: true };
}

// Zamówienie gotowego produktu ze sklepu → realne zamówienie w panelu,
// wycenione po cenie promocyjnej. Niezalogowany → logowanie z powrotem.
export async function orderProductAction(formData: FormData): Promise<void> {
  const slug = String(formData.get("slug") ?? "").trim();
  const product = getProductBySlug(slug);
  if (!product || product.soon || product.price <= 0) redirect("/sklep");

  const session = await getSession();
  if (!session) redirect(`/login?next=${encodeURIComponent(`/sklep/${slug}`)}`);

  const promo = applyPromo(product.price);
  const details = [
    `Zamówienie ze sklepu: ${product.name}`,
    promo.active
      ? `• Cena: ${zl(promo.final)} (promocja −${promo.percent}%, zamiast ${zl(promo.original)})`
      : `• Cena: ${zl(promo.final)}`,
    product.features.length ? `• Zawiera: ${product.features.join(", ")}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const id = createOrder({
    userId: session.id,
    title: `Zamówienie: ${product.name}`,
    details,
    productId: product.id,
    productName: product.name,
    amount: promo.final,
  });
  revalidatePath("/panel");
  revalidatePath("/admin/zamowienia");
  redirect(`/panel/zamowienia/${id}`);
}

// Checkout koszyka. Zwraca wynik (bez redirectu), żeby klient mógł wyczyścić
// koszyk i przejść dalej. Ceny liczone z bazy — dane z klienta są niezaufane.
export type CheckoutResult = {
  error?: string;
  needLogin?: boolean;
  orderId?: number;
};

export async function checkoutAction(
  itemsJson: string
): Promise<CheckoutResult> {
  const raw = parseCart(itemsJson);
  if (raw.length === 0) return { error: "Koszyk jest pusty." };

  const session = await getSession();
  if (!session) return { needLogin: true };

  const items: {
    productId: number;
    name: string;
    unitPrice: number;
    qty: number;
  }[] = [];
  for (const ci of raw) {
    const p = getProductBySlug(ci.slug);
    if (!p || p.soon || p.price <= 0) continue; // pomiń „Wkrótce"/nieaktywne
    items.push({
      productId: p.id,
      name: p.name,
      unitPrice: applyPromo(p.price).final,
      qty: ci.qty,
    });
  }
  if (items.length === 0)
    return { error: "Brak produktów dostępnych do zamówienia." };

  const amount = items.reduce((a, it) => a + it.unitPrice * it.qty, 0);
  const totalQty = items.reduce((a, it) => a + it.qty, 0);
  const productName =
    items.length === 1
      ? items[0].name
      : `${items[0].name} + ${items.length - 1} inny(ch)`;
  const details = [
    "Zamówienie ze sklepu (koszyk):",
    ...items.map((it) => `• ${it.name} × ${it.qty} — ${zl(it.unitPrice * it.qty)}`),
    `Razem: ${zl(amount)}`,
  ].join("\n");

  const orderId = createOrderWithItems({
    userId: session.id,
    title: `Zamówienie (${totalQty} szt.)`,
    details,
    productName,
    amount,
    items,
  });
  revalidatePath("/panel");
  revalidatePath("/admin");
  revalidatePath("/admin/zamowienia");
  return { orderId };
}

export async function sendMessageAction(formData: FormData): Promise<void> {
  const session = await getSession();
  if (!session) redirect("/login");

  const orderId = Number(formData.get("orderId"));
  const body = String(formData.get("body") ?? "").trim();
  const order = getOrder(orderId);
  if (!order || !body) return;

  // klient może pisać tylko w swoim zamówieniu; admin — w każdym
  if (session.role !== "admin" && order.user_id !== session.id) return;

  addMessage({ orderId, userId: session.id, body });
  revalidatePath(`/panel/zamowienia/${orderId}`);
  revalidatePath(`/admin/zamowienia/${orderId}`);
}

// --- Admin: status zamówień ---

export async function setOrderStatusAction(formData: FormData): Promise<void> {
  const session = await getSession();
  if (session?.role !== "admin") redirect("/login");

  const orderId = Number(formData.get("orderId"));
  const status = String(formData.get("status")) as OrderStatus;
  if (!ORDER_STATUSES.includes(status)) return;

  updateOrderStatus(orderId, status);
  revalidatePath("/admin/zamowienia");
  revalidatePath(`/admin/zamowienia/${orderId}`);
  revalidatePath(`/panel/zamowienia/${orderId}`);
}

// --- Admin: produkty ---

function parseProductForm(formData: FormData): ProductInput {
  const lines = (v: FormDataEntryValue | null) =>
    String(v ?? "")
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
  return {
    slug: String(formData.get("slug") ?? "").trim(),
    name: String(formData.get("name") ?? "").trim(),
    nameEn: String(formData.get("nameEn") ?? "").trim() || undefined,
    description: String(formData.get("description") ?? "").trim(),
    descriptionEn:
      String(formData.get("descriptionEn") ?? "").trim() || undefined,
    price: Number(String(formData.get("price") ?? "0").replace(/\s/g, "")),
    priceNote: String(formData.get("priceNote") ?? "").trim() || undefined,
    priceNoteEn:
      String(formData.get("priceNoteEn") ?? "").trim() || undefined,
    priceAlt: String(formData.get("priceAlt") ?? "").trim() || undefined,
    priceAltEn: String(formData.get("priceAltEn") ?? "").trim() || undefined,
    features: lines(formData.get("features")),
    featuresEn: lines(formData.get("featuresEn")),
    badge: String(formData.get("badge") ?? "").trim() || undefined,
    badgeEn: String(formData.get("badgeEn") ?? "").trim() || undefined,
    soon: formData.get("soon") === "on",
    active: formData.get("active") === "on",
  };
}

export async function saveProductAction(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const session = await getSession();
  if (session?.role !== "admin") redirect("/login");

  const idRaw = formData.get("id");
  const input = parseProductForm(formData);

  if (!input.slug || !input.name || !input.description)
    return { error: "Slug, nazwa i opis są wymagane." };
  if (!Number.isFinite(input.price) || input.price < 0)
    return { error: "Cena musi być liczbą ≥ 0." };

  if (idRaw) {
    updateProduct(Number(idRaw), input);
  } else {
    createProduct(input);
  }
  revalidatePath("/admin/produkty");
  revalidatePath("/sklep");
  revalidatePath("/en/shop");
  redirect("/admin/produkty");
}

export async function deleteProductAction(formData: FormData): Promise<void> {
  const session = await getSession();
  if (session?.role !== "admin") redirect("/login");

  const id = Number(formData.get("id"));
  if (id) deleteProduct(id);
  revalidatePath("/admin/produkty");
  revalidatePath("/sklep");
  revalidatePath("/en/shop");
}
