import { renderOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { auditPages, getAuditPage } from "@/lib/audit-pages";
import { zl } from "@/lib/pricing";

export const alt = "Audyt — Mateusz Łagocki";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return auditPages.map((p) => ({ slug: p.slug }));
}

export default function Image({ params }: { params: { slug: string } }) {
  const data = getAuditPage(params.slug);
  if (!data) return renderOg("Audyt", "Audyt strony");
  return renderOg(`${data.offer.label} · ${zl(data.offer.price)}`, data.page.headline);
}
