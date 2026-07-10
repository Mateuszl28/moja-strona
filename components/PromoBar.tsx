"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

const STORAGE_KEY = "promo-15-dismissed";

export default function PromoBar() {
  const pathname = usePathname();
  const isEn = pathname.startsWith("/en");
  const [dismissed, setDismissed] = useState(false);

  // Zapamiętaj zamknięcie w localStorage (sprawdzane po hydracji, żeby uniknąć niezgodności SSR).
  useEffect(() => {
    setDismissed(localStorage.getItem(STORAGE_KEY) === "1");
  }, []);

  if (dismissed) return null;

  const message = isEn ? "−15% on everything" : "−15% na wszystko";
  const note = isEn ? "Limited-time offer" : "Promocja ograniczona czasowo";

  // Jedna „porcja" treści — powtarzana, by wypełnić szeroki ekran i płynnie zapętlić.
  const unit = (
    <span className="flex shrink-0 items-center gap-x-3 pr-8 font-medium">
      <span className="font-semibold tracking-tight">{message}</span>
      <span aria-hidden className="opacity-50">
        ·
      </span>
      <span className="opacity-75">{note}</span>
      <span aria-hidden className="opacity-50">
        ·
      </span>
    </span>
  );

  // Dwie identyczne grupy w torze; animacja przesuwa o −50%, więc pętla jest bezszwowa.
  const group = (
    <div className="flex shrink-0 items-center" aria-hidden={false}>
      {Array.from({ length: 4 }).map((_, i) => (
        <span key={i}>{unit}</span>
      ))}
    </div>
  );

  return (
    <div className="relative bg-accent text-[var(--paper)]">
      <div className="promo-viewport mx-auto flex max-w-content items-center overflow-hidden px-6 py-1.5 text-sm">
        <div className="promo-track flex w-max items-center">
          {group}
          <div aria-hidden className="flex shrink-0 items-center">
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i}>{unit}</span>
            ))}
          </div>
        </div>
      </div>
      {/* Delikatne wygaszenie po prawej, żeby napis nie zderzał się z „×". */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-14"
        style={{
          background:
            "linear-gradient(to right, rgba(224,169,109,0), var(--accent) 70%)",
        }}
      />
      <button
        type="button"
        onClick={() => {
          localStorage.setItem(STORAGE_KEY, "1");
          setDismissed(true);
        }}
        aria-label={isEn ? "Close" : "Zamknij"}
        className="absolute right-2 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-[var(--paper)] opacity-70 transition-opacity hover:opacity-100"
      >
        <X size={15} />
      </button>
    </div>
  );
}
