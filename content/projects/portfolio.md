---
title: "Portfolio"
subtitle: "Ta strona, którą oglądasz"
date: "2026-05-19"
excerpt: "Portfolio zbudowane od zera w Next.js 14 z setką małych detali. Hostowane na własnym VPS, AI chatbot zasilany Gemini."
tech: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion", "Gemini AI", "Resend"]
category: "Side project"
status: "live"
links:
  demo: "/"
  github: "https://github.com/Mateuszl28/moja-strona"
gradient: "from-purple-600 to-pink-600"
emoji: "✨"
order: 0
---

## Po co?

Każde portfolio juniora wygląda tak samo: szablon z Vercel, "hire me" w 5 sekcjach, koniec. Chciałem coś, co **pokazuje że potrafię, a nie tylko opisuje że potrafię**.

Więc zbudowałem to od zera. Cały kod jest [na GitHubie](https://github.com/Mateuszl28/moja-strona) — możesz zerknąć, skopiować, skrytykować.

## Co znajdziesz na stronie

- **Hero** z animowanym code snippet i statystykami
- **Sekcja "Moja droga"** — chronologia nauki w timeline
- **Playground** — mini interaktywne dema z możliwością obejrzenia kodu
- **Live widgets** — ostatnie commity z GitHuba na żywo
- **Blog** z syntax highlightingiem (Shiki) i komentarzami (Giscus)
- **AI Chatbot** — pytasz, Gemini odpowiada na podstawie kontekstu o mnie
- **Command palette** (⌘K) — szybka nawigacja jak w Linear/Notion
- **PWA** — instalowalna jako aplikacja
- **Easter eggi** — wpisz Konami code na klawiaturze 😉

## Stack

```ts
const stack = {
  framework: 'Next.js 14 (App Router)',
  language: 'TypeScript',
  styling: 'Tailwind CSS',
  animations: 'Framer Motion',
  ai: 'Google Gemini 2.0 Flash',
  email: 'Resend',
  markdown: 'gray-matter + marked + shiki',
  hosting: 'Własny VPS (Ubuntu 22.04, nginx, PM2)',
  analytics: 'Plausible (opcjonalne)',
  comments: 'Giscus (GitHub Discussions)',
};
```

## Hosting

Najciekawsza część. Większość juniorów hostuje na Vercel. Ja wybrałem **własny VPS** żeby się nauczyć:

- Ubuntu 22.04 jako system
- **nginx** jako reverse proxy
- **PM2** jako process manager
- **Let's Encrypt** dla HTTPS (wkrótce)
- Deploy przez `git pull && npm run build && pm2 restart`

Cała procedura jest opisana w [moim poście blogowym](/blog/nextjs-na-vps).

## Decyzje, których nie żałuję

1. **Nie używać template'u** — dłużej, ale każda linijka mojego kodu
2. **Własny VPS zamiast Vercela** — mniej "magii", więcej zrozumienia
3. **AI Chatbot z system promptem** — żeby rekruter mógł zapytać o mnie bez przeglądania całej strony
4. **Polish-first, English w drodze** — robię portfolio na PL rynek, multi-language dopiszę później

## Co dalej

- ✅ Custom domena + HTTPS (Let's Encrypt)
- ✅ Multi-language (PL/EN switcher)
- ⏳ Mobilna aplikacja (React Native)
- ⏳ Admin panel do bloga
- ⏳ Więcej postów na blogu

## Linki

- 🔗 **Live:** [tę stronę właśnie oglądasz](/)
- 💻 **Kod:** [github.com/Mateuszl28/moja-strona](https://github.com/Mateuszl28/moja-strona)
- 📖 **Blog post o wdrożeniu:** [Jak postawiłem to portfolio na własnym VPS](/blog/nextjs-na-vps)
