import Link from "next/link";
import { Users, Inbox, Package, ArrowUpRight } from "lucide-react";
import { countUsers } from "@/lib/users";
import {
  listAllOrders,
  countOrdersByStatus,
  STATUS_LABEL,
} from "@/lib/orders";
import { listProducts } from "@/lib/products";
import StatusBadge from "@/components/StatusBadge";

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("pl-PL", {
    day: "2-digit",
    month: "short",
  });
}

export default function AdminDashboard() {
  const users = countUsers();
  const orders = listAllOrders();
  const byStatus = countOrdersByStatus();
  const products = listProducts();
  const recent = orders.slice(0, 6);

  const cards = [
    { icon: Users, label: "Użytkownicy", value: users, href: "/admin/uzytkownicy" },
    { icon: Inbox, label: "Zamówienia", value: orders.length, href: "/admin/zamowienia" },
    { icon: Package, label: "Produkty", value: products.length, href: "/admin/produkty" },
    {
      icon: Inbox,
      label: STATUS_LABEL.new,
      value: byStatus["new"] ?? 0,
      href: "/admin/zamowienia",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Pulpit</h1>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="group rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 transition-colors hover:border-accent/40"
          >
            <c.icon size={18} className="text-accent" />
            <p className="mt-3 text-2xl font-semibold">{c.value}</p>
            <p className="text-sm text-[var(--ink-soft)]">{c.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Ostatnie zamówienia</h2>
        <Link
          href="/admin/zamowienia"
          className="inline-flex items-center gap-1 text-sm text-accent hover:underline"
        >
          Wszystkie
          <ArrowUpRight size={15} />
        </Link>
      </div>

      {recent.length === 0 ? (
        <p className="mt-4 rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-5 py-10 text-center text-sm text-[var(--ink-soft)]">
          Brak zamówień.
        </p>
      ) : (
        <ul className="mt-4 space-y-2">
          {recent.map((o) => (
            <li key={o.id}>
              <Link
                href={`/admin/zamowienia/${o.id}`}
                className="group flex items-center justify-between gap-4 rounded-xl border border-[var(--line)] bg-[var(--surface)] px-5 py-3.5 transition-colors hover:border-accent/40"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium">{o.title}</p>
                  <p className="mt-0.5 text-xs text-[var(--ink-soft)]">
                    {o.user_name} · {o.user_email} · {fmtDate(o.created_at)}
                  </p>
                </div>
                <StatusBadge status={o.status} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
