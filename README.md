# Portfolio — Mateusz Łagocki

Portfolio frontend developera zbudowane w Next.js 14 (App Router), TypeScript i Tailwind CSS.

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** — style
- **Framer Motion** — animacje
- **Lucide React** — ikony
- **Web3Forms** — obsługa formularza kontaktowego (bez backendu)

## Uruchomienie lokalne

```bash
npm install
npm run dev
```

Otwórz [http://localhost:3000](http://localhost:3000).

## Build produkcyjny

```bash
npm run build
npm start
```

## Konfiguracja (zmienne środowiskowe)

Skopiuj `.env.local.example` jako `.env.local` i uzupełnij:

| Zmienna | Opis |
|---------|------|
| `NEXT_PUBLIC_WEB3FORMS_KEY` | Klucz dostępu z [web3forms.com](https://web3forms.com) — formularz kontaktowy (klucz jest publiczny, trafia do klienta). |
| `NEXT_PUBLIC_SITE_URL` | Bazowy URL strony (SEO, OG, sitemap). Produkcja: `https://programujzmateuszem.pl`. |

## Struktura

```
.
├── app/
│   ├── layout.tsx          # layout, metadata SEO, JSON-LD
│   ├── page.tsx            # strona główna
│   ├── template.tsx        # animacja przejść między stronami
│   ├── globals.css         # style globalne + zmienne motywu
│   ├── icon.tsx            # favicon (next/og)
│   ├── opengraph-image.tsx # obrazek OG (next/og)
│   ├── sitemap.ts / robots.ts
│   ├── projekty/page.tsx   # lista projektów
│   └── kontakt/page.tsx    # formularz + dane kontaktowe
├── components/
│   ├── Nav.tsx             # nawigacja
│   ├── Footer.tsx          # stopka
│   ├── Landing.tsx         # sekcja hero (strona główna)
│   ├── ProjectsGrid.tsx    # siatka projektów
│   ├── ProjectCard.tsx     # pojedyncza karta projektu
│   ├── ContactForm.tsx     # formularz kontaktowy (Web3Forms)
│   ├── CTA.tsx             # sekcja call-to-action
│   └── Reveal.tsx          # animacja wejścia przy scrollu
└── lib/
    └── projects.ts         # lista projektów (edytuj tutaj)
```

## Co dostosować

| Plik | Co zmienić |
|------|-----------|
| `lib/projects.ts` | Lista projektów — tytuły, opisy, tagi, linki |
| `components/Landing.tsx` | Hasło na stronie głównej |
| `app/kontakt/page.tsx`, `components/Footer.tsx` | E-mail, GitHub |
| `app/layout.tsx` | Metadata SEO, JSON-LD |
| `app/globals.css` + `tailwind.config.ts` | Kolory motywu (akcent `#c98a4b`) |

## Deploy

Aplikacja działa jako proces Next.js (`npm start`, port 3000) za reverse proxy nginx na VPS.
Konfiguracja serwera: [`deploy/nginx-portfolio.conf`](deploy/nginx-portfolio.conf) — zawiera
TLS (Let's Encrypt), przekierowanie HTTP→HTTPS, nagłówki bezpieczeństwa, gzip i cache statyków
wraz z instrukcją uruchomienia certbota.
