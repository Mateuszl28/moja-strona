"use client";

import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { createOrderAction, type FormState } from "@/lib/actions";
import SubmitButton from "./SubmitButton";

const initial: FormState = {};

export default function NewOrderForm() {
  const [state, formAction] = useFormState(createOrderAction, initial);
  const formRef = useRef<HTMLFormElement>(null);
  const detailsRef = useRef<HTMLTextAreaElement>(null);
  const [prefilled, setPrefilled] = useState(false);

  // Prefill z wyceny/sklepu (sessionStorage), jak w formularzu kontaktowym.
  useEffect(() => {
    const summary = sessionStorage.getItem("wycena_summary");
    if (summary && detailsRef.current) {
      detailsRef.current.value = summary;
      setPrefilled(true);
    }
  }, []);

  // Po sukcesie: reset + wyczyść prefill.
  useEffect(() => {
    if (state.ok) {
      formRef.current?.reset();
      sessionStorage.removeItem("wycena_summary");
      setPrefilled(false);
    }
  }, [state.ok]);

  return (
    <form ref={formRef} action={formAction} className="space-y-4">
      <div>
        <label htmlFor="title" className="mb-1.5 block text-sm font-medium">
          Czego potrzebujesz?
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          placeholder="np. Strona firmowa dla gabinetu"
          className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-sm outline-none transition-colors focus:border-accent/50"
        />
      </div>

      <div>
        <label htmlFor="details" className="mb-1.5 block text-sm font-medium">
          Szczegóły{" "}
          {prefilled && (
            <span className="text-accent">(uzupełnione z wyceny)</span>
          )}
        </label>
        <textarea
          id="details"
          name="details"
          ref={detailsRef}
          rows={5}
          placeholder="Opisz zakres, terminy, przykłady…"
          className="w-full resize-y rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-sm outline-none transition-colors focus:border-accent/50"
        />
      </div>

      <div>
        <label htmlFor="budget" className="mb-1.5 block text-sm font-medium">
          Budżet (zł){" "}
          <span className="text-[var(--ink-soft)]">— opcjonalnie</span>
        </label>
        <input
          id="budget"
          name="budget"
          inputMode="numeric"
          placeholder="np. 1500"
          className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-sm outline-none transition-colors focus:border-accent/50"
        />
      </div>

      {state.error && (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
          {state.error}
        </p>
      )}
      {state.ok && (
        <p className="rounded-lg border border-accent/30 bg-accent/10 px-3 py-2 text-sm text-accent">
          Wysłane — Twoje zapytanie jest na liście poniżej.
        </p>
      )}

      <SubmitButton pendingLabel="Wysyłanie…">Wyślij zapytanie</SubmitButton>
    </form>
  );
}
