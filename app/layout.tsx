import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

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

const mono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-mono",
  display: "swap",
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://85.215.197.199";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Mateusz Łagocki — Frontend Developer",
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
  alternates: { canonical: "/" },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mateusz Łagocki",
  jobTitle: "Frontend Developer",
  url: BASE_URL,
  email: "lagockimateusz6@gmail.com",
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
      className={`${inter.variable} ${display.variable} ${mono.variable}`}
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
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
