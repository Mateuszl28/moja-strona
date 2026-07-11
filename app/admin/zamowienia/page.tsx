import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  listAllOrders,
  countOrdersByStatus,
  ORDER_STATUSES,
  STATUS_LABEL,
} from "@/lib/orders";
import type { OrderStatus } from "@/lib/db";
import StatusBadge from "@/components/StatusBadge";
import { zl } from "@/lib/pricing";

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("pl-PL", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function isStatus(v: string | undefined): v is OrderStatus {
  return !!v && (ORDER_STATUSES as string[]).includes(v);
}

export default function AdminOrdersPage({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  const active = isStatus(searchParams.status) ? searchParams.status : undefined;
  const orders = listAllOrders(active);

  const counts = countOrdersByStatus();
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  const viewRevenue = orders.reduce((a, o) => a + (o.amount ?? 0), 0);

  const tabs: { key: OrderStatus | "all"; label: string; count: number; href: string }[] = [
    { key: "all", label: "Wszystkie", count: total, href: "/admin/zamowienia" },
    ...ORDER_STATUSES.map((s) => ({
      key: s,
      label: STATUS_LABEL[s],
      count: counts[s] ?? 0,
      href: `/admin/zamowienia?status=${s}`,
    })),
  ];

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Zamówienia{" "}
          <span className="text-[var(--ink-soft)]">({orders.length})</span>
        </h1>
        {viewRevenue > 0 && (
          <p className="text-sm text-[var(--ink-soft)]">
            Suma: <span className="font-semibold text-[var(--ink)]">{zl(viewRevenue)}</span>
          </p>
        )}
      </div>

      {/* Filtry statusu */}
      <div className="mt-5 flex flex-wrap gap-2">
        {tabs.map((t) => {
          const isActive = (active ?? "all") === t.key;
          return (
            <Link
              key={t.key}
              href={t.href}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                isActive
                  ? "border-accent/50 bg-accent/10 text-[var(--ink)]"
                  : "border-[var(--line)] text-[var(--ink-soft)] hover:border-accent/40 hover:text-[var(--ink)]"
              }`}
            >
              {t.label}
              <span className="tabular-nums text-xs text-[var(--ink-soft)]">
                {t.count}
              </span>
            </Link>
          );
        })}
      </div>

      {orders.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-5 py-10 text-center text-sm text-[var(--ink-soft)]">
          Brak zamówień w tym widoku.
        </p>
      ) : (
        <ul className="mt-6 space-y-2">
          {orders.map((o) => (
            <li key={o.id}>
              <Link
                href={`/admin/zamowienia/${o.id}`}
                className="group flex items-center justify-between gap-4 rounded-xl border border-[var(--line)] bg-[var(--surface)] px-5 py-4 transition-colors hover:border-accent/40"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium">{o.title}</p>
                  <p className="mt-0.5 text-xs text-[var(--ink-soft)]">
                    {o.user_name} · {o.user_email} · {fmtDate(o.created_at)}
                    {o.amount != null
                      ? ` · ${zl(o.amount)}`
                      : o.budget
                        ? ` · budżet ${o.budget} zł`
                        : ""}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <StatusBadge status={o.status} />
                  <ArrowUpRight
                    size={16}
                    className="text-[var(--ink-soft)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
