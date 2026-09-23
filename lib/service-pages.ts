import { featuresList, designOptions, projectTypes } from "./pricing";

// Treść stron usług /uslugi/[slug]. Ceny, dodatki i czasy realizacji pochodzą z
// lib/pricing i lib/packages — tu jest tylko opis i dobór danych do usługi.

export type ServicePage = {
  slug: string;
  typeId: (typeof projectTypes)[number]["id"]; // rodzaj z cennika (cena bazowa, tygodnie)
  packageIds: string[]; // pakiety z lib/packages pokazywane na stronie
  extraIds: string[]; // dodatki z featuresList
  caseStudySlugs: string[]; // realizacje z lib/projects (projectSlug)
  metaTitle: string;
  metaDescription: string;
  label: string;
  headline: string;
  lead: string;
  includes: { title: string; desc: string }[];
  faq: { q: string; a: string }[];
};

const customDesign = designOptions.find((d) => d.id === "custom")!;

export const servicePages: ServicePage[] = [
  {
    slug: "strony-internetowe",
    typeId: "strona",
    packageIds: ["start", "firmowy"],
    extraIds: ["cms", "blog", "i18n", "content", "anim"],
    caseStudySlugs: ["wlasnem-perfect-home"],
    metaTitle: "Strony internetowe dla firm — cena i realizacje",
    metaDescription:
      "Strony internetowe dla firm: wizytówka od 450 zł, strona firmowa od 900 zł. Projekt od zera, szybkie ładowanie, SEO i wdrożenie w cenie.",
    label: "Strony internetowe",
    headline: "Strona internetowa, która sprzedaje Twoje usługi",
    lead: "Projektuję i koduję strony firmowe od zera — bez gotowych szablonów. Szybkie, czytelne na telefonie i przygotowane pod Google, żeby klient znalazł Cię, zrozumiał ofertę i od razu napisał albo zadzwonił.",
    includes: [
      {
        title: "Projekt pod Twoją firmę",
        desc: "Wygląd dopasowany do branży i klientów, a nie szablon, który ma już sto innych firm.",
      },
      {
        title: "Działa na telefonie",
        desc: "Każda strona jest responsywna — większość klientów zobaczy ją najpierw na smartfonie.",
      },
      {
        title: "Przygotowana pod Google",
        desc: "Szybkie ładowanie, poprawne tytuły i opisy, dane firmy dla wyników lokalnych.",
      },
      {
        title: "Kontakt na wyciągnięcie ręki",
        desc: "Formularz, telefon i wezwania do działania tam, gdzie klient podejmuje decyzję.",
      },
      {
        title: "Wdrożenie w cenie",
        desc: "Publikuję stronę na serwerze, podpinam domenę i certyfikat SSL.",
      },
      {
        title: "Kod i dostępy są Twoje",
        desc: "Po rozliczeniu dostajesz pełny kod źródłowy i wszystkie dostępy.",
      },
    ],
    faq: [
      {
        q: "Ile kosztuje strona internetowa dla firmy?",
        a: `Prosta wizytówka (one-page) zaczyna się od 450 zł, rozbudowana strona firmowa z kilkoma podstronami i edycją treści od 900 zł. Projekt graficzny od zera to dodatkowo ${customDesign.price} zł. Dokładną kwotę policzysz w kalkulatorze wyceny.`,
      },
      {
        q: "Ile trwa zrobienie strony?",
        a: `Orientacyjnie około ${projectTypes.find((t) => t.id === "strona")!.weeks} tygodni dla strony firmowej. Termin zależy od zakresu i tego, jak szybko dostanę treści i zdjęcia.`,
      },
      {
        q: "Czy będę mógł sam zmieniać treści?",
        a: "Tak, jeśli wybierzesz system CMS — wtedy edytujesz teksty i zdjęcia bez programisty. W pakiecie „Firmowy” CMS jest w cenie.",
      },
      {
        q: "Nie mam tekstów ani zdjęć. Pomożesz?",
        a: "Tak — przygotowanie treści i grafik to osobny dodatek w kalkulatorze wyceny.",
      },
      {
        q: "Czy robisz poprawki po oddaniu strony?",
        a: "Tak — drobne poprawki po wdrożeniu wchodzą w zakres. Większe zmiany i nowe funkcje wyceniam osobno.",
      },
      {
        q: "Jak wygląda płatność?",
        a: "Najczęściej zaliczka na start i reszta po wdrożeniu. Szczegóły dopasowujemy do wielkości projektu.",
      },
    ],
  },
  {
    slug: "sklepy-internetowe",
    typeId: "sklep",
    packageIds: ["sklep"],
    extraIds: ["i18n", "content", "anim", "blog"],
    caseStudySlugs: ["vibe", "nawia"],
    metaTitle: "Sklepy internetowe — projekt, płatności, wdrożenie",
    metaDescription:
      "Sklep internetowy od 1500 zł: katalog, koszyk, płatności BLIK i Przelewy24, konta klientów i panel do produktów. Projekt od zera i wdrożenie w cenie.",
    label: "Sklepy internetowe",
    headline: "Sklep internetowy, który możesz prowadzić sam",
    lead: "Buduję sklepy od zera — z własnym wyglądem, płatnościami online i panelem, w którym sam dodajesz produkty. Bez miesięcznych opłat za platformę sklepową i bez szablonu, który wygląda jak u konkurencji.",
    includes: [
      {
        title: "Katalog i koszyk",
        desc: "Produkty z filtrowaniem, karty produktów ze zdjęciami, koszyk i pełny proces zamówienia.",
      },
      {
        title: "Płatności online",
        desc: "Integracja płatności — np. BLIK i Przelewy24, jak w sklepie festiwalu Vibe.",
      },
      {
        title: "Panel do produktów",
        desc: "Sam dodajesz i edytujesz produkty, bez proszenia programisty — tak działa sklep NAWIA.",
      },
      {
        title: "Konta klientów i ulubione",
        desc: "Logowanie, konto klienta i lista ulubionych produktów.",
      },
      {
        title: "Wiele języków",
        desc: "Sklep w kilku wersjach językowych, poprawnie oznaczonych dla Google — np. PL, EN i DE.",
      },
      {
        title: "Wdrożenie i kod na własność",
        desc: "Publikuję sklep z domeną i SSL, a po rozliczeniu dostajesz pełny kod i dostępy.",
      },
    ],
    faq: [
      {
        q: "Ile kosztuje sklep internetowy?",
        a: `Sklep z katalogiem, koszykiem, płatnościami, kontami klientów i edycją treści zaczyna się od 1500 zł. Projekt graficzny od zera to dodatkowo ${customDesign.price} zł, wielojęzyczność i inne dodatki policzysz w kalkulatorze wyceny.`,
      },
      {
        q: "Ile trwa zrobienie sklepu?",
        a: `Orientacyjnie około ${projectTypes.find((t) => t.id === "sklep")!.weeks} tygodni. Termin zależy od liczby produktów, funkcji i tego, jak szybko dostanę zdjęcia i opisy.`,
      },
      {
        q: "Jakie płatności obsłuży sklep?",
        a: "Najczęściej BLIK i Przelewy24 — tak działa sklep Vibe. Konkretnego operatora płatności dobieramy do Twojej firmy.",
      },
      {
        q: "Czy sam dodam produkty?",
        a: "Tak. Sklep ma panel, w którym dodajesz i edytujesz produkty bez pomocy programisty.",
      },
      {
        q: "Czym to się różni od Shopera czy Shopify?",
        a: "Sklep jest Twój — z własnym wyglądem i kodem, bez miesięcznego abonamentu za platformę. W zamian utrzymanie (serwer, aktualizacje) ustalamy osobno.",
      },
      {
        q: "Czy kod sklepu należy do mnie?",
        a: "Tak. Po rozliczeniu przekazuję pełny kod źródłowy i wszystkie dostępy.",
      },
    ],
  },
];

export function getServicePage(slug: string) {
  return servicePages.find((p) => p.slug === slug) ?? null;
}

export function extrasFor(page: ServicePage) {
  return featuresList.filter((f) => page.extraIds.includes(f.id));
}
