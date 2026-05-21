import Script from "next/script";

export default function Analytics() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const src =
    process.env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT ||
    "https://plausible.io/js/script.js";

  if (!domain) return null;

  return (
    <Script
      defer
      strategy="afterInteractive"
      data-domain={domain}
      src={src}
    />
  );
}
