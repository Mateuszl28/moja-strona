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

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("pl-PL", { dateStyle: "long" }).format(
    new Date(iso + "T00:00:00")
  );
