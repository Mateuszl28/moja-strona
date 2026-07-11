import type { Metadata } from "next";
import CartView from "@/components/CartView";

export const metadata: Metadata = {
  title: "Koszyk",
  robots: { index: false, follow: false },
  alternates: {
    canonical: "/koszyk",
    languages: { "pl-PL": "/koszyk", en: "/en/cart" },
  },
};

export default function KoszykPage() {
  return <CartView />;
}
