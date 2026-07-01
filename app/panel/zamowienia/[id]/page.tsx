import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getSession } from "@/lib/auth";
import { getOrder, listMessages } from "@/lib/orders";
import StatusBadge from "@/components/StatusBadge";
import OrderThread from "@/components/OrderThread";
import MessageForm from "@/components/MessageForm";

export const metadata: Metadata = {
  title: "Zapytanie",
  robots: { index: false, follow: false },
};

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("pl-PL", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default async function ClientOrderPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  if (!session) redirect("/login");

  const order = getOrder(Number(params.id));
  if (!order) notFound();
  // klient widzi tylko swoje zapytania
  if (order.user_id !== session.id && session.role !== "admin") notFound();

  const messages = listMessages(order.id);

  return (
    <main className="mx-auto max-w-2xl px-6 pb-24 pt-28">
      <Link
        href="/panel"
        className="inline-flex items-center gap-1.5 text-sm text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]"
      >
        <ArrowLeft size={15} />
        Wróć do panelu
      </Link>

      <div className="mt-6 flex flex-wrap items-start justify-between gap-3">
        <h1 className="text-2xl font-semibold tracking-tight">{order.title}</h1>
        <StatusBadge status={order.status} />
      </div>
      <p className="mt-2 text-xs text-[var(--ink-soft)]">
        Zgłoszone {fmtDate(order.created_at)}
        {order.budget ? ` · budżet ${order.budget} zł` : ""}
      </p>

      {order.details && (
        <div className="mt-6 rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-5 py-4">
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-[var(--ink-soft)]">
            {order.details}
          </p>
        </div>
      )}

      <h2 className="mb-4 mt-10 text-lg font-semibold">Wiadomości</h2>
      <OrderThread messages={messages} currentUserId={session.id} />
      <MessageForm orderId={order.id} />
    </main>
  );
}
