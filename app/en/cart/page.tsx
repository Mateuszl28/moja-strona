import type { Metadata } from "next";
import CartView from "@/components/CartView";

export const metadata: Metadata = {
  title: "Cart",
  robots: { index: false, follow: false },
  alternates: {
    canonical: "/en/cart",
    languages: { "pl-PL": "/koszyk", en: "/en/cart" },
  },
};

export default function EnCartPage() {
  return <CartView en />;
}
