// Blog bez dodatkowych zależności — treść jako dane. Dodaj nowy wpis, dopisując
// obiekt do tablicy `posts`. Bloki renderuje components/PostBody.tsx.
export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "code"; text: string }
  | { type: "ul"; items: string[] };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO, np. "2026-07-01"
  tags: string[];
  content: PostBlock[];
};

export const posts: Post[] = [
  {
    slug: "kalkulator-wyceny-nextjs-bez-backendu",
    title: "Kalkulator wyceny w Next.js — bez backendu",
    excerpt:
      "Interaktywna wycena liczona na żywo, ceny w jednym pliku i podsumowanie, które samo wypełnia formularz kontaktowy — całość po stronie klienta, bez bazy i serwera.",
    date: "2026-07-01",
    tags: ["Next.js", "React", "TypeScript", "UX"],
    content: [
      {
        type: "p",
        text: "Chciałem, żeby klient poznał orientacyjny koszt projektu, zanim w ogóle napisze. Efekt: kalkulator, który przelicza kwotę na żywo — bez żadnego backendu, bazy ani zewnętrznego API.",
      },
      { type: "h2", text: "Ceny w jednym miejscu" },
      {
        type: "p",
        text: "Cała konfiguracja — rodzaje projektów, funkcje, warianty grafiki — siedzi w jednym pliku i jest importowana zarówno przez kalkulator, jak i sekcję „Usługi”. Dzięki temu ceny nigdy się nie rozjeżdżają.",
      },
      {
        type: "code",
        text: "// lib/pricing.ts\nexport const projectTypes = [\n  { id: \"strona\", label: \"Strona www\", base: 450 },\n  { id: \"sklep\",  label: \"Sklep\",     base: 1500 },\n];\n\nexport const featuresList = [\n  { id: \"cms\", label: \"System CMS\", price: 150 },\n  { id: \"seo\", label: \"SEO\", price: 0, tbd: true }, // „do ustalenia\"\n];",
      },
      { type: "h2", text: "Liczenie na żywo" },
      {
        type: "p",
        text: "Wybory klienta trzymam w useState, a wynik liczę w useMemo — przelicza się przy każdej zmianie. Kwotę pokazuję jako widełki (od–do), bo wycena jest orientacyjna, a nie ostateczną fakturą.",
      },
      {
        type: "code",
        text: "const total = useMemo(() => {\n  let sum = type.base;\n  for (const f of featuresList)\n    if (picked.includes(f.id)) sum += f.price;\n  return sum * timeline.mult; // np. ekspres +30%\n}, [type, picked, timeline]);",
      },
      { type: "h2", text: "Podsumowanie, które wypełnia formularz" },
      {
        type: "p",
        text: "Przycisk „Wyślij zapytanie” zapisuje gotowe podsumowanie w sessionStorage i przechodzi do strony kontaktu. Tam formularz wczytuje je do treści wiadomości — bez przenoszenia stanu przez URL ani backend.",
      },
      {
        type: "code",
        text: "// na /wycena\nsessionStorage.setItem(\"wycena_summary\", summary);\n\n// na /kontakt (useEffect)\nconst saved = sessionStorage.getItem(\"wycena_summary\");\nif (saved) messageRef.current.value = saved;",
      },
      { type: "h2", text: "Dlaczego bez backendu" },
      {
        type: "ul",
        items: [
          "Zero danych do pilnowania — nic nie trafia do bazy.",
          "Hostuje się jak zwykła strona, bez dodatkowej infrastruktury.",
          "Zmiana cen to edycja jednego pliku, nie migracja.",
          "Szybko — wszystko dzieje się w przeglądarce.",
        ],
      },
    ],
  },
  {
    slug: "wdrozenie-nextjs-vps-nginx-pm2",
    title: "Jak wdrażam Next.js na VPS z nginx i pm2",
    excerpt:
      "Prosty, powtarzalny sposób na postawienie aplikacji Next.js na własnym serwerze — proces Node za reverse proxy nginx, HTTPS od Let's Encrypt i aktualizacje jednym poleceniem.",
    date: "2026-07-01",
    tags: ["Next.js", "VPS", "nginx", "pm2", "Wdrożenie"],
    content: [
      {
        type: "p",
        text: "Vercel jest wygodny, ale czasem chcesz mieć pełną kontrolę i własny serwer. Tak właśnie działa ta strona — jako proces Node na VPS, za nginx. Oto cały, powtarzalny setup.",
      },
      { type: "h2", text: "Architektura" },
      {
        type: "p",
        text: "Aplikacja Next.js działa jako proces Node na porcie 3000, pilnowany przez pm2. Nginx stoi z przodu jako reverse proxy: przyjmuje ruch na 80/443, kończy HTTPS i przekazuje żądania do aplikacji.",
      },
      { type: "h2", text: "pm2 — trzyma proces przy życiu" },
      {
        type: "p",
        text: "pm2 uruchamia aplikację, restartuje ją po awarii i wstaje po reboocie serwera.",
      },
      {
        type: "code",
        text: "pm2 start \"npm start\" --name portfolio\npm2 save\npm2 startup   # autostart po restarcie serwera",
      },
      { type: "h2", text: "nginx — reverse proxy i HTTPS" },
      {
        type: "p",
        text: "Nginx przekazuje cały ruch do localhost:3000, a statyki Next.js (/_next/static) dostają długi cache. Certyfikat HTTPS załatwia certbot (Let's Encrypt).",
      },
      {
        type: "code",
        text: "location / {\n    proxy_pass http://localhost:3000;\n    proxy_set_header Host $host;\n    proxy_set_header X-Forwarded-Proto $scheme;\n}",
      },
      { type: "h2", text: "Aktualizacja jednym poleceniem" },
      {
        type: "p",
        text: "Po zmianach na GitHubie wdrożenie to jedna linia z katalogu aplikacji:",
      },
      {
        type: "code",
        text: "cd /var/www/portfolio && git pull origin main && npm run build && pm2 restart portfolio",
      },
      {
        type: "p",
        text: "Build jest obowiązkowy, nie tylko restart — zmienne NEXT_PUBLIC_* są wstrzykiwane do kodu w czasie budowania, więc sam restart nie wciągnie zmian.",
      },
      { type: "h2", text: "Dlaczego tak" },
      {
        type: "ul",
        items: [
          "Pełna kontrola nad serwerem i kosztami.",
          "Ten sam proces działa dla strony, sklepu czy aplikacji.",
          "Aktualizacja i rollback są przewidywalne — to zwykły git + build.",
        ],
      },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

// Szacowany czas czytania (~200 słów/min) z całej treści wpisu.
export const readingTime = (post: Post) => {
  const words = post.content.reduce((n, b) => {
    const text = b.type === "ul" ? b.items.join(" ") : b.text;
    return n + text.split(/\s+/).filter(Boolean).length;
  }, 0);
  return Math.max(1, Math.round(words / 200));
};

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("pl-PL", { dateStyle: "long" }).format(
    new Date(iso + "T00:00:00")
  );
