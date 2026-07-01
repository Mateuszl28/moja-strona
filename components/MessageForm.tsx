import { Send } from "lucide-react";
import { sendMessageAction } from "@/lib/actions";
import SubmitButton from "./SubmitButton";

export default function MessageForm({ orderId }: { orderId: number }) {
  return (
    <form action={sendMessageAction} className="mt-4 flex flex-col gap-3">
      <input type="hidden" name="orderId" value={orderId} />
      <textarea
        name="body"
        required
        rows={3}
        placeholder="Napisz wiadomość…"
        className="w-full resize-y rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-sm outline-none transition-colors focus:border-accent/50"
      />
      <div className="flex justify-end">
        <SubmitButton pendingLabel="Wysyłanie…">
          <Send size={15} />
          Wyślij
        </SubmitButton>
      </div>
    </form>
  );
}
