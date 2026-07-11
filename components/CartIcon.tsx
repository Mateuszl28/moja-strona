"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { useCart } from "./CartProvider";

export default function CartIcon() {
  const pathname = usePathname();
  const isEn = pathname.startsWith("/en");
  const { count, hydrated } = useCart();
  const href = isEn ? "/en/cart" : "/koszyk";

  return (
    <Link
      href={href}
      aria-label={
        isEn ? `Cart (${count})` : `Koszyk (${count})`
      }
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-full text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]"
    >
      <ShoppingCart size={18} />
      {hydrated && count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 inline-flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold leading-none text-[var(--paper)]">
          {count}
        </span>
      )}
    </Link>
  );
}
