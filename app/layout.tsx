import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import CartProvider from "@/components/CartProvider";
import { company } from "@/lib/company";

const body = Instrument_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  display: "swap",
});

const display = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  display: "swap",
});

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://programujzmateuszem.pl";

// Opis pod frazy, których szukają klienci (usługa + miejsce), a nie pod technologię.
const SITE_DESCRIPTION =
  "Projektuję i koduję szybkie strony internetowe, sklepy i aplikacje w Next.js. Leszno i cała Polska zdalnie. Wycena online, audyty SEO i bezpieczeństwa.";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Strony internetowe i sklepy online — Mateusz Łagocki, Leszno",
    template: "%s — Mateusz Łagocki",
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: BASE_URL,
    siteName: "Mateusz Łagocki",
    title: "Strony internetowe i sklepy online — Mateusz Łagocki",
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Strony internetowe i sklepy online — Mateusz Łagocki",
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: {
    canonical: "/",
    languages: { "pl-PL": "/", en: "/en", "x-default": "/" },
    types: {
      "application/rss+xml": [{ url: "/rss.xml", title: "Blog — Mateusz Łagocki" }],
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#f3f0e8",
  colorScheme: "light",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mateusz Łagocki",
  jobTitle: "Frontend Developer",
  url: BASE_URL,
  email: "kontakt@programujzmateuszem.pl",
  sameAs: ["https://github.com/Mateuszl28"],
  knowsAbout: ["React", "Next.js", "TypeScript", "Tailwind CSS", "JavaScript"],
  description:
    "Frontend developer z pasją do budowania przejrzystych, szybkich interfejsów.",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Mateusz Łagocki — Portfolio",
  url: BASE_URL,
  inLanguage: "pl-PL",
  author: { "@type": "Person", name: "Mateusz Łagocki" },
};

// ProfessionalService (podtyp LocalBusiness) — z adresem i zakresem cen daje sygnał
// dla wyników lokalnych („strony internetowe Leszno").
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${BASE_URL}/#firma`,
  image: `${BASE_URL}/opengraph-image`,
  priceRange: "450–3000 zł",
  areaServed: [
    { "@type": "City", name: "Leszno" },
    { "@type": "Country", name: "Polska" },
  ],
  knowsAbout: [
    "strony internetowe",
    "sklepy internetowe",
    "aplikacje internetowe",
    "audyt SEO",
    "audyt bezpieczeństwa",
  ],
  name: company.legalName,
  legalName: company.legalName,
  url: BASE_URL,
  logo: `${BASE_URL}/icon`,
  email: company.email,
  telephone: company.phoneE164,
  taxID: company.nip,
  vatID: `PL${company.nip}`,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: company.phoneE164,
    email: company.email,
    contactType: "customer service",
    areaServed: "PL",
    availableLanguage: ["pl", "en"],
  },
  founder: { "@type": "Person", name: company.owner },
  address: {
    "@type": "PostalAddress",
    streetAddress: company.address.street,
    postalCode: company.address.postalCode,
    addressLocality: company.address.city,
    addressCountry: company.address.country,
  },
  sameAs: ["https://github.com/Mateuszl28"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pl"
      className={`${body.variable} ${display.variable}`}
    >
      <head>
        {/* Bez JS treść w [data-reveal] zostałaby niewidoczna — pokaż ją od razu. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>
        <CartProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-[var(--ink)] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[var(--paper)]"
          >
            Przejdź do treści
          </a>
          <Nav />
          {children}
          <Footer />
          <BackToTop />
        </CartProvider>
      </body>
    </html>
  );
}
