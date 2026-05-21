import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const data = {
    $schema: "https://jsonresume.org/schema",
    basics: {
      name: "Mateusz Łagocki",
      label: "Junior Frontend Developer",
      email: "lagockimateusz6@gmail.com",
      url: "http://85.215.197.199",
      summary:
        "Junior frontend developer z pasją do budowania rzeczy w internecie. Zbudowałem własne portfolio (Next.js 14, TypeScript, Tailwind) hostowane na własnym VPS. W konkursie Hack the Tech 2026 stworzyłem Sentra AI — narzędzie do wykrywania phishingu z Gemini. Otwarty na pierwszą pracę lub staż.",
      location: {
        countryCode: "PL",
        region: "Poland",
      },
      profiles: [
        {
          network: "GitHub",
          username: "Mateuszl28",
          url: "https://github.com/Mateuszl28",
        },
      ],
    },
    work: [],
    education: [
      {
        institution: "Studia inżynierskie",
        area: "Informatyka",
        studyType: "Inżynier",
        endDate: "2025",
        summary:
          "Praca inżynierska: aplikacja webowa wdrożona na własnym serwerze.",
      },
    ],
    skills: [
      {
        name: "Frontend",
        level: "Intermediate",
        keywords: [
          "React",
          "Next.js 14",
          "TypeScript",
          "Tailwind CSS",
          "Framer Motion",
          "HTML5",
          "CSS3",
          "JavaScript ES6+",
        ],
      },
      {
        name: "Backend",
        level: "Beginner",
        keywords: ["Node.js", "REST API", "PostgreSQL"],
      },
      {
        name: "AI",
        level: "Intermediate",
        keywords: ["Gemini API", "Prompt engineering", "LLM integration"],
      },
      {
        name: "Tools",
        level: "Intermediate",
        keywords: ["Git", "GitHub", "VS Code", "Vercel", "PM2", "Nginx"],
      },
    ],
    languages: [
      { language: "Polski", fluency: "Native" },
      { language: "English", fluency: "Working proficiency" },
    ],
    projects: [
      {
        name: "Sentra AI",
        description:
          "AI Phishing Sentinel — narzędzie edukacyjne do wykrywania phishingu z analizą emaili przez Gemini 2.0 Flash. Projekt z konkursu Hack the Tech 2026.",
        url: "https://sentra-ai-peach.vercel.app/",
        keywords: ["TypeScript", "Next.js", "Gemini AI", "Vercel"],
        startDate: "2026-01",
        endDate: "2026-04",
      },
      {
        name: "Portfolio",
        description:
          "Pełnostackowe portfolio od zera. Next.js 14, TypeScript, Tailwind, integracja Gemini (chatbot), Resend (email), Shiki, Three.js. Wdrożone na własnym VPS.",
        url: "http://85.215.197.199",
        keywords: ["Next.js 14", "TypeScript", "Tailwind", "Gemini", "Resend"],
        startDate: "2026-05",
      },
      {
        name: "Rapidsoc",
        description:
          "Drugi projekt z konkursu programistycznego.",
        url: "https://rapidsoc1-nc0o6orro-mateuszl28s-projects.vercel.app/",
        keywords: ["Next.js", "TypeScript"],
      },
      {
        name: "Praca inżynierska",
        description:
          "Aplikacja webowa wdrożona na własnym serwerze — pełen stack od zera.",
        url: "http://212.132.124.0/",
        keywords: ["Full-stack", "Deployment"],
        startDate: "2024",
        endDate: "2025",
      },
    ],
    meta: {
      version: "v1.0.0",
      lastModified: new Date().toISOString(),
      canonical: "http://85.215.197.199/resume.json",
    },
  };

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "public, max-age=3600",
      "Content-Disposition": 'inline; filename="mateusz-lagocki-resume.json"',
    },
  });
}
