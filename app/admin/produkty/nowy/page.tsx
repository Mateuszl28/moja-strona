import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ProductForm from "@/components/ProductForm";

export default function NewProductPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <Link
        href="/admin/produkty"
        className="inline-flex items-center gap-1.5 text-sm text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]"
      >
        <ArrowLeft size={15} />
        Produkty
      </Link>
      <h1 className="mb-8 mt-6 text-2xl font-semibold tracking-tight">
        Nowy produkt
      </h1>
      <ProductForm />
    </div>
  );
}
