import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const display = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  display: "swap",
});

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://programujzmateuszem.pl";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Mateusz Łagocki — Frontend Developer",
    template: "%s — Mateusz Łagocki",
  },
  description:
    "Portfolio Mateusza Łagockiego — frontend developer. React, Next.js, TypeScript, Tailwind.",
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: BASE_URL,
    siteName: "Mateusz Łagocki",
    title: "Mateusz Łagocki — Frontend Developer",
    description:
      "Portfolio Mateusza Łagockiego — frontend developer. React, Next.js, TypeScript.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": [{ url: "/rss.xml", title: "Blog — Mateusz Łagocki" }],
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#14120f",
  colorScheme: "dark",
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pl"
      className={`${inter.variable} ${display.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="grain">
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
      </body>
    </html>
  );
}
