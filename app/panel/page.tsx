import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowUpRight, Shield } from "lucide-react";
import { getSession } from "@/lib/auth";
import { listOrdersByUser } from "@/lib/orders";
import NewOrderForm from "@/components/NewOrderForm";
import StatusBadge from "@/components/StatusBadge";
import LogoutButton from "@/components/LogoutButton";
import { zl } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Panel",
  robots: { index: false, follow: false },
};

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("pl-PL", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default async function PanelPage() {
  const session = await getSession();
  if (!session) redirect("/login?next=/panel");

  const orders = listOrdersByUser(session.id);

  return (
    <main className="mx-auto max-w-content px-6 pb-24 pt-28">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
            Panel klienta
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            Cześć, {session.name}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {session.role === "admin" && (
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 px-3.5 py-1.5 text-sm text-accent transition-colors hover:bg-accent/10"
            >
              <Shield size={15} />
              Panel admina
            </Link>
          )}
          <LogoutButton />
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <section>
          <h2 className="text-lg font-semibold">Nowe zapytanie</h2>
          <p className="mb-5 mt-1 text-sm text-[var(--ink-soft)]">
            Opisz, czego potrzebujesz — odezwę się z wyceną i kolejnymi krokami.
          </p>
          <NewOrderForm />
        </section>

        <section>
          <h2 className="text-lg font-semibold">
            Twoje zapytania{" "}
            <span className="text-[var(--ink-soft)]">({orders.length})</span>
          </h2>

          {orders.length === 0 ? (
            <p className="mt-5 rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-5 py-10 text-center text-sm text-[var(--ink-soft)]">
              Nie masz jeszcze żadnych zapytań. Wyślij pierwsze obok.
            </p>
          ) : (
            <ul className="mt-5 space-y-3">
              {orders.map((o) => (
                <li key={o.id}>
                  <Link
                    href={`/panel/zamowienia/${o.id}`}
                    className="group flex items-center justify-between gap-4 rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-5 py-4 transition-colors hover:border-accent/40"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium">{o.title}</p>
                      <p className="mt-0.5 text-xs text-[var(--ink-soft)]">
                        {fmtDate(o.created_at)}
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
        </section>
      </div>
    </main>
  );
}
