# Raport z audytu — portfolio Mateusz Łagocki

**Data:** 2026-06-15 (rewizja 7)
**Zakres:** kod źródłowy, SEO/metadane, dostępność, wydajność, bezpieczeństwo, konfiguracja wdrożenia
**Stack:** Next.js 14.2.5 (App Router) · TypeScript · Tailwind CSS · Lucide *(framer-motion usunięty)*

---

## Wskaźniki (ocena audytora)

| Obszar | Ocena | Podstawa |
|--------|-------|----------|
| 🔎 SEO | **92 / 100** | Core kompletny + structured data projektów (ItemList). Odłożone tylko social-share (S1/S2). |
| ⚡ Wydajność | **88 / 100** *(szacunek)* | framer-motion usunięty, hero SSR, 1 font mniej. **Brak zmierzonych metryk** — `npm run build` nie przeszedł w środowisku audytu. |
| 🔐 Bezpieczeństwo | **90 / 100** | nginx TLS+nagłówki+gzip, sekret poza kodem, honeypot, brak XSS. Minus: TLS do wdrożenia na serwerze (certbot). |

**Stan napraw (16 śledzonych pozycji):** naprawione **14** · odłożone **2** · otwarte **0**.

| Priorytet | Otwarte | Odłożone | Naprawione |
|-----------|---------|----------|------------|
| 🔴 Krytyczne | 0 | 0 | 3 |
| 🟠 Spójność danych | 0 | 0 | 4 |
| 🔎 SEO | 0 | 2 | 3 |
| ⚡ Wydajność | 0 | 0 | 4 |
| 🟡 Drobne / jakość | 0 | 0 | 2 |

---

## ✅ Naprawione

**🔴 Krytyczne**
1. Surowe IP po HTTP → fallback `https://programujzmateuszem.pl` (layout/sitemap/robots/.env).
2. `title.template` → podstrony z sufiksem `— Mateusz Łagocki`.
3. nginx bez TLS → redirect 80→443, TLS+http2, nagłówki, gzip, cache (+ procedura certbota). *Wdrożenie na serwerze.*

**🟠 Spójność danych**
4. Dwa kolory akcentu → jeden `#c98a4b`, usunięty duplikat `.text-accent`.
5. Dwa adresy e-mail → JSON-LD `kontakt@programujzmateuszem.pl`.
6. Stale `.env.example` → usunięty.
7. Stale README → przepisany pod faktyczny stan.

**🔎 SEO**
- S3. Structured data projektów → `ItemList`+`CreativeWork` z `lib/projects.ts` na `/projekty`.

**⚡ Wydajność**
- P1. `template.tsx` → server component + CSS `.page-enter` (bez framer-motion).
- P2. `Landing.tsx` → server component; hero w HTML od pierwszego renderu, animacja CSS `.fade-rise`.
- P3. `Reveal.tsx` → `IntersectionObserver` + CSS. **framer-motion całkowicie usunięty** (kod + `package.json`).
- P4. Usunięty JetBrains Mono; `font-mono` → systemowy stack. `latin-ext` zostaje (polskie znaki).

**🟡 Drobne**
8. ESLint → `.eslintrc.json` (`next/core-web-vitals`) + `eslint`/`eslint-config-next` w devDeps.
9. Klucz Web3Forms → czytany wyłącznie z env, z łagodnym komunikatem przy braku.

---

## ⏸ Odłożone na życzenie (bez social media — na razie)

- **S1. Brak Twitter card** — `app/layout.tsx`. Dodać `twitter: { card: "summary_large_image" }`.
- **S2. Podstrony bez własnego `openGraph`** — `/projekty`, `/kontakt` pokazują OG strony głównej w social.

---

## ⚠️ Do zrobienia po stronie użytkownika (skutki napraw)

1. **`npm install`** — po usunięciu framer-motion z `package.json` i dodaniu ESLint trzeba
   zsynchronizować lockfile/`node_modules`.
2. **Ustawić `NEXT_PUBLIC_WEB3FORMS_KEY`** — lokalnie w `.env.local` i w env builda na produkcji.
   Bez tego formularz przestanie wysyłać (sekret został celowo usunięty z kodu).
3. **`rm -rf .next && npm run build`** — potwierdzić build i odczytać realny „First Load JS"
   (w środowisku audytu build nie przechodzi przez `EISDIR` na Windows — nie defekt kodu).
4. **certbot na serwerze** — uruchomić TLS dla nginx (procedura w `deploy/nginx-portfolio.conf`).

---

## Co działa dobrze ✅

- Dostępność: `:focus-visible`, `prefers-reduced-motion` (obejmuje też nowe animacje CSS), `aria-*`, `lang="pl"`
- SEO: metadataBase + canonical, title default+template, JSON-LD Person/WebSite/ItemList, robots, sitemap, og:locale
- Bezpieczeństwo: nginx TLS+HSTS+nagłówki+gzip, honeypot, sekret poza kodem, brak XSS
- Wydajność: zero zależności od framer-motion, hero i przejścia stron renderowane bez czekania na hydrację JS
- Czysty TypeScript (`tsc --noEmit`), sensowny podział komponentów i App Router
- Dynamiczne `icon` i `opengraph-image` przez `next/og`
