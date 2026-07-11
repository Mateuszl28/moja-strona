import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getSession } from "@/lib/auth";
import {
  getOrder,
  listMessages,
  listOrderItems,
  ORDER_STATUSES,
  STATUS_LABEL,
} from "@/lib/orders";
import { getUserById } from "@/lib/users";
import { setOrderStatusAction } from "@/lib/actions";
import StatusBadge from "@/components/StatusBadge";
import OrderThread from "@/components/OrderThread";
import MessageForm from "@/components/MessageForm";
import SubmitButton from "@/components/SubmitButton";
import { zl } from "@/lib/pricing";

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
  const items = listOrderItems(order.id);

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
        {order.amount == null && order.budget
          ? ` · budżet ${order.budget} zł`
          : ""}
      </p>

      {items.length > 0 ? (
        <div className="mt-5 rounded-2xl border border-accent/20 bg-accent/[0.06] p-5">
          <p className="text-sm font-medium">Zamówione produkty</p>
          <ul className="mt-3 space-y-2 text-sm">
            {items.map((it) => (
              <li key={it.id} className="flex items-center justify-between gap-3">
                <span className="min-w-0 truncate">
                  {it.name}{" "}
                  <span className="text-[var(--ink-soft)]">× {it.qty}</span>
                </span>
                <span className="tabular-nums">{zl(it.line_total)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex items-center justify-between border-t border-[var(--line)] pt-3 font-semibold">
            <span>Razem</span>
            <span className="text-lg tabular-nums">{zl(order.amount ?? 0)}</span>
          </div>
        </div>
      ) : (
        order.amount != null && (
          <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 rounded-2xl border border-accent/20 bg-accent/[0.06] px-5 py-4 text-sm">
            <span className="font-medium">Zamówienie produktu</span>
            {order.product_name && (
              <span className="text-[var(--ink-soft)]">· {order.product_name}</span>
            )}
            <span className="ml-auto text-lg font-semibold tracking-tight">
              {zl(order.amount)}
            </span>
          </div>
        )
      )}

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
