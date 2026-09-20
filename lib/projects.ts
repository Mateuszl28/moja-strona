// Kategorie = zakładki na stronie /projekty. Kolejność tu = kolejność zakładek.
export const categories = [
  "Strony www",
  "Sklepy www",
  "Aplikacje internetowe",
  "Aplikacje mobilne",
  "Sterowniki",
  "Rozwiązania",
  "Hackatony",
  "Rekrutacja",
] as const;

export type Category = (typeof categories)[number];

// Angielskie etykiety kategorii — dla /en/projects.
export const categoryEn: Record<Category, string> = {
  "Strony www": "Websites",
  "Sklepy www": "Online stores",
  "Aplikacje internetowe": "Web apps",
  "Aplikacje mobilne": "Mobile apps",
  Sterowniki: "Drivers",
  "Rozwiązania": "Solutions",
  Hackatony: "Hackathons",
  Rekrutacja: "Recruitment",
};

export type RepoLink = { label: string; href: string };

// Zrzut ekranu z działania aplikacji. Pliki leżą w public/projekty/<projekt>/.
export type Shot = { src: string; caption: string; captionEn?: string };

export type Project = {
  title: string;
  description: string;
  descriptionEn?: string; // opis po angielsku (dla /en/projects)
  category: Category; // do której zakładki trafia projekt
  tags: string[];
  href?: string; // link na żywo (demo / sklep)
  hrefLabel?: string; // etykieta przycisku href (domyślnie „Zobacz na żywo")
  repo?: string; // pojedyncze repo (skrót — pokaże się jako „Kod")
  repos?: RepoLink[]; // wiele repo z etykietami (np. Linux / Windows)
  shots?: Shot[]; // zrzuty ekranu — miniatury w karcie + podgląd po kliknięciu
  year: string;
  featured?: boolean;
};

// Edytuj tę listę, żeby dodać/zmienić projekty.
// Każdy projekt musi mieć `category` z listy powyżej. featured: true => też na stronie głównej.
export const projects: Project[] = [
  {
    title: "Własnem Perfect Home",
    description:
      "Wizytówka firmy wykończeniowo-remontowej — wykończenia wnętrz, remonty łazienek premium i profesjonalne sprzątanie. Galeria realizacji, opis 4-etapowego procesu, opinie klientów, FAQ i formularz wyceny. W pełni responsywna.",
    descriptionEn:
      "Business site for an interior finishing and renovation company — interior fit-outs, premium bathroom remodels and professional cleaning. Project gallery, a 4-step process breakdown, client reviews, FAQ and a quote form. Fully responsive.",
    category: "Strony www",
    tags: ["Next.js", "React", "Strona www"],
    href: "https://własnemperfecthome.pl",
    year: "2026",
    featured: true,
  },
  {
    title: "Vibe — sklep streetwear",
    description:
      "Sklep ze streetwearem premium (bluzy, koszulki z bawełny). Katalog z filtrowaniem, koszyk, płatności BLIK/Przelewy24 i pełny proces zakupowy.",
    descriptionEn:
      "Premium streetwear store (hoodies, cotton tees). Filterable catalog, cart, BLIK/Przelewy24 payments and a full checkout flow.",
    category: "Sklepy www",
    tags: ["JavaScript", "HTML & CSS", "E-commerce"],
    href: "https://www.vibeleszno.com",
    year: "2026",
    featured: true,
  },
  {
    title: "Nawia — biżuteria",
    description:
      "Sklep marki biżuterii inspirowanej księżycem — ręcznie robione naszyjniki ze stali chirurgicznej i naturalnych kamieni. Koszyk, ulubione i konto użytkownika.",
    descriptionEn:
      "Store for a moon-inspired jewelry brand — handmade surgical-steel necklaces with natural stones. Cart, favorites and user accounts.",
    category: "Sklepy www",
    tags: ["Next.js", "React", "E-commerce"],
    href: "https://nawiabizuteria.pl",
    year: "2026",
    featured: true,
  },
  {
    title: "Sterownik drukarki P15",
    description:
      "Sterownik do drukarki P15 działający na Linuksie i Windowsie — obsługa urządzenia napisana w .NET (C#).",
    descriptionEn:
      "A driver for the P15 printer running on Linux and Windows — device handling written in .NET (C#).",
    category: "Sterowniki",
    tags: [".NET", "C#", "Windows / Linux"],
    repos: [
      {
        label: "Kod (Linux)",
        href: "https://github.com/Mateuszl28/Printer_P15-Linux",
      },
      {
        label: "Kod (Windows)",
        href: "https://github.com/Mateuszl28/Printer_P15-Windows",
      },
    ],
    year: "2026",
    featured: true,
  },
  {
    title: "Lepszy dzień",
    description:
      "Autorska aplikacja mobilna wspierająca lepsze nawyki i dobre samopoczucie — drobne, codzienne kroki ku lepszemu dniu.",
    descriptionEn:
      "A mobile app supporting better habits and wellbeing — small, everyday steps toward a better day.",
    category: "Aplikacje mobilne",
    tags: ["Android", "Wellbeing", "Aplikacja mobilna"],
    href: "https://play.google.com/store/apps/details?id=com.lepszy_dzien",
    hrefLabel: "Google Play",
    year: "2026",
    featured: true,
  },
  {
    title: "Sentra AI — wykrywanie phishingu",
    description:
      "Wklejasz podejrzanego maila, a Sentra analizuje nagłówki, linki i treść heurystykami, po czym Gemini wyjaśnia zagrożenie prostym językiem i pozwala dopytać.",
    descriptionEn:
      "Paste a suspicious email and Sentra analyzes headers, links and content with heuristics; Gemini then explains the threat in plain language and lets you ask follow-ups.",
    category: "Aplikacje internetowe",
    tags: ["Next.js", "TypeScript", "Gemini AI"],
    href: "https://sentra-ai-peach.vercel.app",
    repo: "https://github.com/Mateuszl28/Sentra_AI",
    year: "2026",
    featured: true,
  },
  {
    title: "Enova Cleaner",
    description:
      "Narzędzie konsolowe automatyzujące archiwizację i retencję kopii zapasowych baz danych w Azure Blob Storage — przenosi miesięczne kopie do archiwum i usuwa starsze kopie dzienne. Opakowuje AzCopy.",
    descriptionEn:
      "Console tool that automates archiving and retention of database backups in Azure Blob Storage — moves monthly copies to archive and removes older daily ones. Wraps AzCopy.",
    category: "Rozwiązania",
    tags: ["C#", ".NET", "Azure"],
    repo: "https://github.com/Mateuszl28/Enova_cleaner",
    year: "2026",
    featured: true,
  },
  {
    title: "What Did I Miss? — asystent do Fire TV",
    description:
      "Projekt hackathonowy dla Amazona: asystent, który tłumaczy film w trakcie oglądania i ani razu nie zdradza dalszego ciągu. Przysnąłeś albo zapomniałeś, kto jest kto? Pytasz pilotem, a odpowiedź powstaje wyłącznie z tego, co już zobaczyłeś. Film jest podczas przetwarzania rozkładany na oś czasu (klatki wideo + napisy), a model dostaje odciętą do Twojej minuty wersję fabuły — dlatego „ruda kobieta” zostaje bezimienna dopóty, dopóki film sam nie powie, że to Sintel. Dodatkowo wykrywa przewijanie i proponuje streszczenie pominiętego fragmentu. W testach: 0% przecieków fabuły wobec 30% dla tego samego modelu z pełnym scenariuszem.",
    descriptionEn:
      "An Amazon hackathon project: a companion that explains a film while you watch it and never gives away what comes next. Dozed off, or lost track of who is who? You ask from the remote, and the answer is built only from what you have already seen. During ingestion the film is turned into a time-indexed timeline (video frames + subtitles), and the model only ever sees the story up to your playback position — so the “red-haired woman” stays nameless until the film itself reveals she is Sintel. It also detects fast-forwarding and offers a recap of what you skipped. In testing: 0% plot leaks versus 30% for the same model holding the full script.",
    category: "Hackatony",
    tags: ["Kotlin", "AWS Bedrock", "Python", "Fire TV"],
    repo: "https://github.com/Mateuszl28/Amazon_Hackaton",
    shots: [
      {
        src: "/projekty/amazon-hackaton/jump-result.webp",
        caption:
          "Odtwarzacz na Fire TV — asystent czeka pod przyciskiem „Companion”.",
        captionEn:
          "The Fire TV player — the companion waits behind the “Companion” button.",
      },
      {
        src: "/projekty/amazon-hackaton/whos-that-before-reveal.webp",
        caption:
          "„Kto to?” przed ujawnieniem imienia — postać opisana tak, jak znasz ją w tej minucie.",
        captionEn:
          "“Who’s that?” before the reveal — the character is described the way you know them right now.",
      },
      {
        src: "/projekty/amazon-hackaton/whos-that-after-reveal.webp",
        caption:
          "Ta sama postać później — film zdradził imię, więc asystent może już powiedzieć „Sintel”.",
        captionEn:
          "The same character later — the film has named her, so the companion can finally say “Sintel”.",
      },
    ],
    year: "2026",
    featured: true,
  },
];
