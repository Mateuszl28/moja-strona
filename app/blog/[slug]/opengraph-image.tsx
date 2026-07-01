import { renderOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { posts, getPost } from "@/lib/posts";

export const alt = "Wpis na blogu — Mateusz Łagocki";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export default function Image({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  return renderOg("Blog", post?.title ?? "Blog");
}
