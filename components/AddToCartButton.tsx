"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Check, ArrowRight } from "lucide-react";
import { useCart } from "./CartProvider";

export default function AddToCartButton({
  slug,
  name,
  price,
}: {
  slug: string;
  name: string;
  price: number;
}) {
  const { add } = useCart();
  const pathname = usePathname();
  const isEn = pathname.startsWith("/en");
  const [added, setAdded] = useState(false);
  const cartHref = isEn ? "/en/cart" : "/koszyk";

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          add({ slug, name, price });
          setAdded(true);
        }}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--ink)] px-5 py-3 text-sm font-medium text-[var(--paper)] transition-all hover:-translate-y-0.5"
      >
        {added ? (
          <>
            <Check size={16} />
            {isEn ? "Added to cart" : "Dodano do koszyka"}
          </>
        ) : (
          <>
            <ShoppingCart size={16} />
            {isEn ? "Add to cart" : "Do koszyka"}
          </>
        )}
      </button>
      {added && (
        <Link
          href={cartHref}
          className="mt-3 inline-flex items-center gap-1.5 text-sm text-accent transition-colors hover:text-[var(--ink)]"
        >
          {isEn ? "Go to cart" : "Przejdź do koszyka"}
          <ArrowRight size={15} />
        </Link>
      )}
    </div>
  );
}
