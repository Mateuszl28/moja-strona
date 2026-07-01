"use client";

import { useFormState } from "react-dom";
import { saveProductAction, type FormState } from "@/lib/actions";
import type { ShopProduct } from "@/lib/products";
import SubmitButton from "./SubmitButton";

const initial: FormState = {};

const inputCls =
  "w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent/50";

function Field({
  label,
  name,
  defaultValue,
  type = "text",
  required = false,
  hint,
}: {
  label: string;
  name: string;
  defaultValue?: string | number;
  type?: string;
  required?: boolean;
  hint?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium">
        {label}
        {hint && <span className="text-[var(--ink-soft)]"> — {hint}</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        className={inputCls}
      />
    </div>
  );
}

export default function ProductForm({ product }: { product?: ShopProduct }) {
  const [state, formAction] = useFormState(saveProductAction, initial);

  return (
    <form action={formAction} className="space-y-5">
      {product && <input type="hidden" name="id" value={product.id} />}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Slug"
          name="slug"
          required
          defaultValue={product?.slug}
          hint="unikalny identyfikator, np. interior-app"
        />
        <Field
          label="Cena (zł)"
          name="price"
          type="text"
          required
          defaultValue={product?.price}
        />
        <Field label="Nazwa (PL)" name="name" required defaultValue={product?.name} />
        <Field label="Nazwa (EN)" name="nameEn" defaultValue={product?.nameEn} />
      </div>

      <div>
        <label htmlFor="description" className="mb-1.5 block text-sm font-medium">
          Opis (PL)
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={3}
          defaultValue={product?.description}
          className={inputCls}
        />
      </div>
      <div>
        <label htmlFor="descriptionEn" className="mb-1.5 block text-sm font-medium">
          Opis (EN)
        </label>
        <textarea
          id="descriptionEn"
          name="descriptionEn"
          rows={3}
          defaultValue={product?.descriptionEn}
          className={inputCls}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Dopisek przy cenie (PL)"
          name="priceNote"
          defaultValue={product?.priceNote}
          hint="np. na własność"
        />
        <Field
          label="Dopisek przy cenie (EN)"
          name="priceNoteEn"
          defaultValue={product?.priceNoteEn}
        />
        <Field
          label="Druga opcja cenowa (PL)"
          name="priceAlt"
          defaultValue={product?.priceAlt}
          hint="np. lub 200 zł / mies."
        />
        <Field
          label="Druga opcja cenowa (EN)"
          name="priceAltEn"
          defaultValue={product?.priceAltEn}
        />
        <Field label="Badge (PL)" name="badge" defaultValue={product?.badge} hint="np. Wkrótce" />
        <Field label="Badge (EN)" name="badgeEn" defaultValue={product?.badgeEn} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="features" className="mb-1.5 block text-sm font-medium">
            Funkcje (PL){" "}
            <span className="text-[var(--ink-soft)]">— jedna na linię</span>
          </label>
          <textarea
            id="features"
            name="features"
            rows={5}
            defaultValue={product?.features?.join("\n")}
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="featuresEn" className="mb-1.5 block text-sm font-medium">
            Funkcje (EN){" "}
            <span className="text-[var(--ink-soft)]">— jedna na linię</span>
          </label>
          <textarea
            id="featuresEn"
            name="featuresEn"
            rows={5}
            defaultValue={product?.featuresEn?.join("\n")}
            className={inputCls}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="inline-flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="active"
            defaultChecked={product ? product.active : true}
            className="h-4 w-4 accent-[var(--accent)]"
          />
          Widoczny w sklepie
        </label>
        <label className="inline-flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="soon"
            defaultChecked={product?.soon ?? false}
            className="h-4 w-4 accent-[var(--accent)]"
          />
          Oznacz „Wkrótce” (bez zakupu)
        </label>
      </div>

      {state.error && (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
          {state.error}
        </p>
      )}

      <SubmitButton pendingLabel="Zapisywanie…">
        {product ? "Zapisz zmiany" : "Dodaj produkt"}
      </SubmitButton>
    </form>
  );
}
