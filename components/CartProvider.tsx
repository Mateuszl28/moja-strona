"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { type CartItem, CART_MAX_QTY } from "@/lib/cart";

const KEY = "cart";

type CartCtx = {
  items: CartItem[];
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
  count: number;
  hydrated: boolean;
};

const Ctx = createContext<CartCtx | null>(null);

const clamp = (n: number) =>
  Math.min(CART_MAX_QTY, Math.max(1, Math.floor(Number.isFinite(n) ? n : 1)));

export default function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Wczytaj po hydracji (unik niezgodności SSR).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      /* ignoruj uszkodzony wpis */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const add = useCallback((item: Omit<CartItem, "qty">, qty = 1) => {
    setItems((prev) => {
      const i = prev.findIndex((p) => p.slug === item.slug);
      if (i >= 0) {
        const copy = [...prev];
        copy[i] = { ...copy[i], qty: clamp(copy[i].qty + qty) };
        return copy;
      }
      return [...prev, { ...item, qty: clamp(qty) }];
    });
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    setItems((prev) =>
      prev.map((p) => (p.slug === slug ? { ...p, qty: clamp(qty) } : p))
    );
  }, []);

  const remove = useCallback((slug: string) => {
    setItems((prev) => prev.filter((p) => p.slug !== slug));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const count = items.reduce((a, i) => a + i.qty, 0);

  return (
    <Ctx.Provider value={{ items, add, setQty, remove, clear, count, hydrated }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCart(): CartCtx {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart poza CartProvider");
  return c;
}
