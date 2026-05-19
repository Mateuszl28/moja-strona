# Portfolio — Mateusz Łagocki

Profesjonalne portfolio programisty zbudowane w Next.js 14, TypeScript i Tailwind CSS.

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** + animacje
- **Framer Motion** — animacje
- **Lucide React** — ikony

## Uruchomienie lokalne

```bash
npm install
npm run dev
```

Otwórz [http://localhost:3000](http://localhost:3000) w przeglądarce.

## Build produkcyjny

```bash
npm run build
npm start
```

## Struktura

```
.
├── app/
│   ├── layout.tsx      # główny layout
│   ├── page.tsx        # strona główna
│   └── globals.css     # style globalne
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Skills.tsx
│   ├── Projects.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   └── BackgroundBlobs.tsx
└── public/
```

## Co dostosować

Wszystkie miejsca, gdzie warto wpisać własne dane:

| Plik | Co zmienić |
|------|-----------|
| `components/Hero.tsx` | Hasło powitalne, social linki |
| `components/About.tsx` | Tekst "o mnie" |
| `components/Skills.tsx` | Lista technologii i poziomów |
| `components/Projects.tsx` | Tablica `projects` — twoje projekty + linki |
| `components/Contact.tsx` | Email, GitHub, LinkedIn |
| `components/Footer.tsx` | Social linki w stopce |
| `app/layout.tsx` | Metadata strony (SEO) |

## Deploy

Najłatwiej na [Vercel](https://vercel.com) — wystarczy podłączyć repo GitHuba.

```bash
npm i -g vercel
vercel
```
