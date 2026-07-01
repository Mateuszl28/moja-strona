import type { MessageWithAuthor } from "@/lib/orders";

function fmtTime(iso: string) {
  return new Date(iso).toLocaleString("pl-PL", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function OrderThread({
  messages,
  currentUserId,
}: {
  messages: MessageWithAuthor[];
  currentUserId: number;
}) {
  if (messages.length === 0) {
    return (
      <p className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-5 py-8 text-center text-sm text-[var(--ink-soft)]">
        Brak wiadomości. Napisz pierwszą poniżej.
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {messages.map((m) => {
        const mine = m.user_id === currentUserId;
        return (
          <li
            key={m.id}
            className={`flex flex-col ${mine ? "items-end" : "items-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl border px-4 py-3 text-sm ${
                mine
                  ? "border-accent/40 bg-accent/10"
                  : "border-[var(--line)] bg-[var(--surface)]"
              }`}
            >
              <p className="whitespace-pre-wrap leading-relaxed">{m.body}</p>
            </div>
            <p className="mt-1 px-1 text-xs text-[var(--ink-soft)]">
              {m.author_name}
              {m.author_role === "admin" ? " · zespół" : ""} · {fmtTime(m.created_at)}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
