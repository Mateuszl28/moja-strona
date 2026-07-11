import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductView from "@/components/ProductView";
import { getProductBySlug } from "@/lib/products";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: "Produkt" };
  return {
    title: product.name,
    description: product.description.slice(0, 155),
    alternates: {
      canonical: `/sklep/${product.slug}`,
      languages: {
        "pl-PL": `/sklep/${product.slug}`,
        en: `/en/shop/${product.slug}`,
      },
    },
  };
}

export default function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();
  return <ProductView product={product} />;
}
