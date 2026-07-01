import Link from "next/link";
import { Plus, Pencil, Trash2, EyeOff } from "lucide-react";
import { listProducts } from "@/lib/products";
import { deleteProductAction } from "@/lib/actions";
import { zl } from "@/lib/pricing";

export default function AdminProductsPage() {
  const products = listProducts();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold tracking-tight">
          Produkty{" "}
          <span className="text-[var(--ink-soft)]">({products.length})</span>
        </h1>
        <Link
          href="/admin/produkty/nowy"
          className="inline-flex items-center gap-1.5 rounded-full bg-[var(--ink)] px-4 py-2 text-sm font-medium text-[var(--paper)] transition-transform hover:-translate-y-0.5"
        >
          <Plus size={16} />
          Nowy produkt
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-5 py-10 text-center text-sm text-[var(--ink-soft)]">
          Brak produktów. Dodaj pierwszy.
        </p>
      ) : (
        <ul className="mt-6 space-y-2">
          {products.map((p) => (
            <li
              key={p.id}
              className="flex items-center justify-between gap-4 rounded-xl border border-[var(--line)] bg-[var(--surface)] px-5 py-4"
            >
              <div className="min-w-0">
                <p className="flex items-center gap-2 font-medium">
                  <span className="truncate">{p.name}</span>
                  {!p.active && (
                    <span className="inline-flex items-center gap-1 text-xs text-[var(--ink-soft)]">
                      <EyeOff size={13} /> ukryty
                    </span>
                  )}
                  {p.badge && (
                    <span className="rounded-full bg-accent/15 px-2 py-0.5 text-xs text-accent">
                      {p.badge}
                    </span>
                  )}
                </p>
                <p className="mt-0.5 text-xs text-[var(--ink-soft)]">
                  {zl(p.price)}
                  {p.priceNote ? ` · ${p.priceNote}` : ""} · /{p.slug}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Link
                  href={`/admin/produkty/${p.id}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] px-3 py-1.5 text-sm text-[var(--ink-soft)] transition-colors hover:border-accent/40 hover:text-[var(--ink)]"
                >
                  <Pencil size={14} />
                  Edytuj
                </Link>
                <form action={deleteProductAction}>
                  <input type="hidden" name="id" value={p.id} />
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] px-3 py-1.5 text-sm text-[var(--ink-soft)] transition-colors hover:border-red-500/40 hover:text-red-300"
                  >
                    <Trash2 size={14} />
                    Usuń
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
