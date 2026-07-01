import type { MetadataRoute } from "next";
import { posts } from "@/lib/posts";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://programujzmateuszem.pl";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/en",
    "/en/projects",
    "/en/contact",
    "/projekty",
    "/wycena",
    "/blog",
    "/kontakt",
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

  return [...staticRoutes, ...postRoutes];
}
