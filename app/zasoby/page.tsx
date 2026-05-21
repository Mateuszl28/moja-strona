import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Book,
  Video,
  Wrench,
  GraduationCap,
  Star,
} from "lucide-react";
import BackgroundBlobs from "@/components/BackgroundBlobs";

export const metadata: Metadata = {
  title: "Zasoby — to co mi pomogło",
  description:
    "Curated lista kursów, książek, narzędzi i kanałów YouTube, które polecam początkującym programistom.",
};

type Resource = {
  title: string;
  subtitle: string;
  url: string;
  why: string;
  free?: boolean;
  recommended?: boolean;
};

type Section = {
  title: string;
  icon: typeof Book;
  color: string;
  items: Resource[];
};

const sections: Section[] = [
  {
    title: "Kursy",
    icon: GraduationCap,
    color: "from-purple-600 to-pink-600",
    items: [
      {
        title: "freeCodeCamp",
        subtitle: "Responsive Web Design + JavaScript",
        url: "https://www.freecodecamp.org/",
        why: "Najlepszy punkt startu — od HTML do pełnego stacku. Po polsku i angielsku. Plus certyfikaty.",
        free: true,
        recommended: true,
      },
      {
        title: "Frontend Masters",
        subtitle: "Płatne, ale głęboko techniczne",
        url: "https://frontendmasters.com/",
        why: "Kursy od ludzi którzy pracują w branży (Kent C. Dodds, Brian Holt). Bardzo praktyczne.",
      },
      {
        title: "The Odin Project",
        subtitle: "Curriculum od zera do full-stacka",
        url: "https://www.theodinproject.com/",
        why: "Alternatywa do freeCodeCamp — bardziej oparta na czytaniu dokumentacji i samodzielnym researchu.",
        free: true,
      },
      {
        title: "Next.js Learn",
        subtitle: "Oficjalny darmowy kurs",
        url: "https://nextjs.org/learn",
        why: "Najszybszy sposób na ogarnięcie Next.js App Router. Hands-on, z prawdziwym projektem.",
        free: true,
        recommended: true,
      },
    ],
  },
  {
    title: "Książki",
    icon: Book,
    color: "from-orange-500 to-pink-600",
    items: [
      {
        title: "Clean Code",
        subtitle: "Robert C. Martin",
        url: "#",
        why: "Klasyka. Niektóre zasady są nadinterpretowane, ale baza wciąż aktualna. Czytam wybiórczo.",
      },
      {
        title: "Designing Data-Intensive Applications",
        subtitle: "Martin Kleppmann",
        url: "#",
        why: "Dla osób które chcą iść dalej niż frontend. Bazy, message queues, distributed systems.",
      },
      {
        title: "You Don't Know JS",
        subtitle: "Kyle Simpson",
        url: "https://github.com/getify/You-Dont-Know-JS",
        why: "Najlepsze co przeczytałem o JavaScript pod maską. Cała seria darmowa na GitHubie.",
        free: true,
        recommended: true,
      },
    ],
  },
  {
    title: "YouTube",
    icon: Video,
    color: "from-red-500 to-orange-500",
    items: [
      {
        title: "Theo — t3.gg",
        subtitle: "Nowoczesny stack TypeScript / Next",
        url: "https://www.youtube.com/@t3dotgg",
        why: "Trochę szybko mówi, ale daje najlepszy overview co się dzieje w ekosystemie.",
        recommended: true,
      },
      {
        title: "Web Dev Simplified",
        subtitle: "Praktyczne tutoriale po angielsku",
        url: "https://www.youtube.com/@WebDevSimplified",
        why: "Konkretne, krótkie, dobrze wytłumaczone. Idealne na start.",
        free: true,
      },
      {
        title: "Fireship",
        subtitle: "100 sekund o każdej technologii",
        url: "https://www.youtube.com/@Fireship",
        why: "Najlepszy sposób żeby się zorientować w nowych narzędziach w 2 minuty.",
        free: true,
        recommended: true,
      },
      {
        title: "Programowanie z Klasą (PL)",
        subtitle: "Polski content od podstaw",
        url: "https://www.youtube.com/results?search_query=programowanie+z+klas%C4%85",
        why: "Jeśli wolisz po polsku, dobry punkt startu.",
        free: true,
      },
    ],
  },
  {
    title: "Narzędzia",
    icon: Wrench,
    color: "from-cyan-500 to-blue-600",
    items: [
      {
        title: "VS Code",
        subtitle: "Edytor numer 1",
        url: "https://code.visualstudio.com/",
        why: "Plus rozszerzenia: Prettier, ESLint, GitLens, Tailwind IntelliSense, Error Lens.",
        free: true,
        recommended: true,
      },
      {
        title: "Vercel",
        subtitle: "Deploy w 1 kliknięcie",
        url: "https://vercel.com/",
        why: "Darmowy hosting dla projektów statycznych i Next.js. Idealny do pierwszych projektów.",
        free: true,
      },
      {
        title: "Bruno",
        subtitle: "Open-source Postman",
        url: "https://www.usebruno.com/",
        why: "Lepsze niż Postman bo offline-first i pliki collection w gicie.",
        free: true,
      },
      {
        title: "Excalidraw",
        subtitle: "Szybkie diagramy",
        url: "https://excalidraw.com/",
        why: "Świetne do szkicowania architektury. Działa offline. Style ręcznie rysowanych.",
        free: true,
        recommended: true,
      },
      {
        title: "Resend",
        subtitle: "API do wysyłania emaili",
        url: "https://resend.com/",
        why: "Używam go w tym portfolio do formularza kontaktowego. Darmowy tier 100 emaili/dzień.",
        free: true,
      },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <BackgroundBlobs />

      <div className="relative max-w-4xl mx-auto px-6 py-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-12"
        >
          <ArrowLeft size={16} />
          Wróć na stronę główną
        </Link>

        <header className="mb-16">
          <p className="font-mono text-sm text-purple-400 mb-2">/zasoby</p>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
            Moja <span className="text-gradient">biblioteka</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">
            Rzeczy które realnie pomogły mi wejść w programowanie i wciąż
            pomagają. Nie ranking — moja prywatna lista. Bez payola, bez
            affiliate.
          </p>
        </header>

        <div className="space-y-12">
          {sections.map((section) => (
            <section key={section.title}>
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center`}
                >
                  <section.icon size={18} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold">{section.title}</h2>
              </div>

              <div className="space-y-3">
                {section.items.map((item) => (
                  <a
                    key={item.title}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block glass glass-hover rounded-2xl p-5 transition-all hover:-translate-y-0.5 group"
                  >
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 className="font-bold text-white">
                            {item.title}
                          </h3>
                          {item.recommended && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-[10px] font-mono text-purple-300">
                              <Star size={10} fill="currentColor" />
                              polecam
                            </span>
                          )}
                          {item.free && (
                            <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-[10px] font-mono text-green-400">
                              free
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 font-mono">
                          {item.subtitle}
                        </p>
                      </div>
                      <ExternalLink
                        size={16}
                        className="text-slate-500 group-hover:text-white transition-colors shrink-0 mt-1"
                      />
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {item.why}
                    </p>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16 glass rounded-2xl p-6 text-center">
          <p className="text-sm text-slate-400 leading-relaxed">
            Masz coś co polecasz a tu tego nie ma? Napisz —{" "}
            <Link href="/#contact" className="text-purple-400 hover:underline">
              dodam jak będzie pasować
            </Link>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
