import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getSession } from "@/lib/auth";
import {
  getOrder,
  listMessages,
  ORDER_STATUSES,
  STATUS_LABEL,
} from "@/lib/orders";
import { getUserById } from "@/lib/users";
import { setOrderStatusAction } from "@/lib/actions";
import StatusBadge from "@/components/StatusBadge";
import OrderThread from "@/components/OrderThread";
import MessageForm from "@/components/MessageForm";
import SubmitButton from "@/components/SubmitButton";

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("pl-PL", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default async function AdminOrderPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  const order = getOrder(Number(params.id));
  if (!order) notFound();

  const client = getUserById(order.user_id);
  const messages = listMessages(order.id);

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        href="/admin/zamowienia"
        className="inline-flex items-center gap-1.5 text-sm text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]"
      >
        <ArrowLeft size={15} />
        Wszystkie zamówienia
      </Link>

      <div className="mt-6 flex flex-wrap items-start justify-between gap-3">
        <h1 className="text-2xl font-semibold tracking-tight">{order.title}</h1>
        <StatusBadge status={order.status} />
      </div>
      <p className="mt-2 text-xs text-[var(--ink-soft)]">
        {client ? `${client.name} · ${client.email} · ` : ""}
        {fmtDate(order.created_at)}
        {order.budget ? ` · budżet ${order.budget} zł` : ""}
      </p>

      {order.details && (
        <div className="mt-6 rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-5 py-4">
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-[var(--ink-soft)]">
            {order.details}
          </p>
        </div>
      )}

      <form
        action={setOrderStatusAction}
        className="mt-6 flex flex-wrap items-end gap-3"
      >
        <input type="hidden" name="orderId" value={order.id} />
        <div>
          <label
            htmlFor="status"
            className="mb-1.5 block text-sm font-medium"
          >
            Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue={order.status}
            className="rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent/50"
          >
            {ORDER_STATUSES.map((s) => (
              <option key={s} value={s}>
                {STATUS_LABEL[s]}
              </option>
            ))}
          </select>
        </div>
        <SubmitButton pendingLabel="Zapis…">Zmień status</SubmitButton>
      </form>

      <h2 className="mb-4 mt-10 text-lg font-semibold">Wiadomości</h2>
      <OrderThread messages={messages} currentUserId={session!.id} />
      <MessageForm orderId={order.id} />
    </div>
  );
}
