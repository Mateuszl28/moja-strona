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
  if (!product) return { title: "Product" };
  const name = product.nameEn ?? product.name;
  const description = product.descriptionEn ?? product.description;
  return {
    title: name,
    description: description.slice(0, 155),
    alternates: {
      canonical: `/en/shop/${product.slug}`,
      languages: {
        "pl-PL": `/sklep/${product.slug}`,
        en: `/en/shop/${product.slug}`,
      },
    },
  };
}

export default function EnProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();
  return <ProductView product={product} en />;
}
