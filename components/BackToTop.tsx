"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

// Dyskretny przycisk „na górę" — pojawia się dopiero po zjechaniu w dół.
export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Wróć na górę"
      className="soft-in fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--paper)] text-[var(--ink-soft)] transition-colors hover:border-[var(--ink)] hover:text-[var(--ink)]"
    >
      <ArrowUp size={18} />
    </button>
  );
}
