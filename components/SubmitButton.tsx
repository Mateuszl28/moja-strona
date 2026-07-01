"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({
  children,
  pendingLabel,
  className,
}: {
  children: React.ReactNode;
  pendingLabel?: string;
  className?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={
        className ??
        "inline-flex items-center justify-center gap-2 rounded-full bg-[var(--ink)] px-5 py-3 text-sm font-medium text-[var(--paper)] transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
      }
    >
      {pending ? pendingLabel ?? "Chwila…" : children}
    </button>
  );
}
