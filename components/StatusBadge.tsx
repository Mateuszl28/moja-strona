import type { OrderStatus } from "@/lib/db";
import { STATUS_LABEL, STATUS_LABEL_EN } from "@/lib/orders";

const STYLES: Record<OrderStatus, string> = {
  new: "border-blue-400/30 bg-blue-400/10 text-blue-300",
  in_progress: "border-accent/40 bg-accent/10 text-accent",
  done: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  cancelled: "border-[var(--line)] bg-[var(--surface)] text-[var(--ink-soft)]",
};

export default function StatusBadge({
  status,
  en = false,
}: {
  status: OrderStatus;
  en?: boolean;
}) {
  const label = en ? STATUS_LABEL_EN[status] : STATUS_LABEL[status];
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${STYLES[status]}`}
    >
      {label}
    </span>
  );
}
