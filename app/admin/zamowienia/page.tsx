import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { listAllOrders } from "@/lib/orders";
import StatusBadge from "@/components/StatusBadge";

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("pl-PL", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function AdminOrdersPage() {
  const orders = listAllOrders();

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">
        Zamówienia{" "}
        <span className="text-[var(--ink-soft)]">({orders.length})</span>
      </h1>

      {orders.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-5 py-10 text-center text-sm text-[var(--ink-soft)]">
          Brak zamówień.
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
                    {o.budget ? ` · budżet ${o.budget} zł` : ""}
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
