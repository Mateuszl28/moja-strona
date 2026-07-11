import type { MetadataRoute } from "next";
import { posts } from "@/lib/posts";
import { getShopProducts } from "@/lib/products";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://programujzmateuszem.pl";

export const dynamic = "force-dynamic";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/en",
    "/en/projects",
    "/en/quote",
    "/en/shop",
    "/en/contact",
    "/en/terms",
    "/projekty",
    "/wycena",
    "/sklep",
    "/blog",
    "/kontakt",
    "/regulamin",
  ];
  const staticRoutes = routes.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const postRoutes = posts.map((p) => ({
    url: `${BASE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.date + "T00:00:00"),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  // Strony produktów (PL + EN). Odporne na brak bazy przy buildzie.
  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    productRoutes = getShopProducts().flatMap((p) => [
      {
        url: `${BASE_URL}/sklep/${p.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      },
      {
        url: `${BASE_URL}/en/shop/${p.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      },
    ]);
  } catch {
    productRoutes = [];
  }

  return [...staticRoutes, ...postRoutes, ...productRoutes];
}
