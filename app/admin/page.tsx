import Link from "next/link";
import { Users, Inbox, Package, Wallet, ArrowUpRight } from "lucide-react";
import { countUsers } from "@/lib/users";
import { listAllOrders, getOrderStats, STATUS_LABEL } from "@/lib/orders";
import { listProducts } from "@/lib/products";
import { zl } from "@/lib/pricing";
import type { OrderStatus } from "@/lib/db";
import StatusBadge from "@/components/StatusBadge";

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("pl-PL", {
    day: "2-digit",
    month: "short",
  });
}

const STATUS_ORDER: OrderStatus[] = ["new", "in_progress", "done", "cancelled"];

export default function AdminDashboard() {
  const users = countUsers();
  const orders = listAllOrders();
  const stats = getOrderStats();
  const products = listProducts();
  const recent = orders.slice(0, 6);

  const cards = [
    {
      icon: Wallet,
      label: "Przychód",
      value: zl(stats.revenue),
      sub: stats.avgOrder ? `śr. ${zl(stats.avgOrder)} / zamówienie` : "bez anulowanych",
      href: "/admin/zamowienia",
    },
    {
      icon: Inbox,
      label: "Zamówienia",
      value: String(stats.totalOrders),
      sub: `${stats.productOrders} ze sklepu`,
      href: "/admin/zamowienia",
    },
    {
      icon: Package,
      label: "Produkty",
      value: String(products.length),
      href: "/admin/produkty",
    },
    {
      icon: Users,
      label: "Użytkownicy",
      value: String(users),
      href: "/admin/uzytkownicy",
    },
  ];

  const maxStatus = Math.max(1, ...STATUS_ORDER.map((s) => stats.byStatus[s] ?? 0));

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
            <p className="mt-3 truncate text-2xl font-semibold tracking-tight">
              {c.value}
            </p>
            <p className="text-sm text-[var(--ink-soft)]">{c.label}</p>
            {c.sub && (
              <p className="mt-0.5 text-xs text-[var(--ink-soft)]">{c.sub}</p>
            )}
          </Link>
        ))}
      </div>

      {/* Zamówienia wg statusu */}
      <div className="mt-10 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6">
        <h2 className="text-lg font-semibold">Zamówienia wg statusu</h2>
        <ul className="mt-5 space-y-3">
          {STATUS_ORDER.map((s) => {
            const n = stats.byStatus[s] ?? 0;
            return (
              <li key={s}>
                <Link
                  href={`/admin/zamowienia?status=${s}`}
                  className="group grid grid-cols-[7rem_1fr_2rem] items-center gap-3 text-sm"
                >
                  <span className="text-[var(--ink-soft)] transition-colors group-hover:text-[var(--ink)]">
                    {STATUS_LABEL[s]}
                  </span>
                  <span className="h-2 overflow-hidden rounded-full bg-[var(--paper-soft)]">
                    <span
                      className="block h-full rounded-full bg-accent/70"
                      style={{ width: `${(n / maxStatus) * 100}%` }}
                    />
                  </span>
                  <span className="text-right font-medium tabular-nums">{n}</span>
                </Link>
              </li>
            );
          })}
        </ul>
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
                    {o.amount != null ? ` · ${zl(o.amount)}` : ""}
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
