import { audits } from "./pricing";

// Treść podstron /audyt/[slug]. Cena i nazwa pochodzą z lib/pricing (jedno źródło),
// tu jest tylko opis oferty. Edytuj śmiało — to tekst sprzedażowy, nie logika.

export type AuditPage = {
  slug: (typeof audits)[number]["id"];
  metaTitle: string;
  metaDescription: string;
  headline: string;
  lead: string;
  forWho: string[];
  scope: { title: string; desc: string }[];
  deliverables: string[];
  steps: { title: string; desc: string }[];
  faq: { q: string; a: string }[];
  sample?: { href: string; label: string; note: string };
  note?: string;
};

export const auditPages: AuditPage[] = [
  {
    slug: "audyt-seo",
    metaTitle: "Audyt SEO strony i sklepu",
    metaDescription:
      "Audyt SEO za 800 zł: techniczne SEO, szybkość, metadane, dane strukturalne, treść i lokalne SEO. Raport PDF z priorytetami i listą szybkich wygranych.",
    headline: "Audyt SEO, po którym wiesz, co poprawić najpierw",
    lead: "Sprawdzam, dlaczego strona nie pokazuje się w Google tak, jak powinna. Dostajesz raport z oceną, listą problemów ułożoną od najważniejszych i konkretnymi poprawkami, bez ogólników.",
    forWho: [
      "Masz stronę albo sklep, ale mało ruchu z Google.",
      "Planujesz przebudowę i nie chcesz stracić pozycji.",
      "Chcesz wiedzieć, na co wydać budżet marketingowy w pierwszej kolejności.",
    ],
    scope: [
      {
        title: "Techniczne SEO",
        desc: "Indeksacja, robots.txt, sitemap, adresy kanoniczne, przekierowania, HTTPS, błędy 404.",
      },
      {
        title: "Szybkość i Core Web Vitals",
        desc: "Czas ładowania, obrazy, skrypty, wynik na telefonie — to, co Google mierzy u prawdziwych użytkowników.",
      },
      {
        title: "Metadane i nagłówki",
        desc: "Tytuły, opisy, struktura nagłówków, Open Graph — jak strona wygląda w wynikach i przy udostępnianiu.",
      },
      {
        title: "Dane strukturalne",
        desc: "Schema.org: firma, produkty z ceną, FAQ, artykuły — to, co daje rozszerzone wyniki w Google.",
      },
      {
        title: "Treść i linkowanie",
        desc: "Czy podstrony odpowiadają na to, czego szukają klienci, i czy dobrze do siebie linkują.",
      },
      {
        title: "Lokalne SEO i sklep",
        desc: "Profil Firmy w Google, spójność danych firmy, karty produktów i kategorie w sklepie.",
      },
    ],
    deliverables: [
      "Raport PDF z oceną ogólną i ocenami cząstkowymi.",
      "Lista problemów z priorytetami P0–P2 i przewidywanym wpływem.",
      "Konkretna rekomendacja do każdego problemu, którą możesz przekazać dowolnemu wykonawcy.",
      "Szybkie wygrane — rzeczy do zrobienia w jeden dzień.",
      "Omówienie raportu i odpowiedzi na pytania.",
    ],
    steps: [
      {
        title: "Zgłoszenie",
        desc: "Podajesz adres strony i to, co Cię niepokoi (np. spadek ruchu).",
      },
      {
        title: "Analiza",
        desc: "Przeglądam stronę ręcznie i narzędziami, na komputerze i telefonie.",
      },
      {
        title: "Raport",
        desc: "Dostajesz PDF z oceną, priorytetami i rekomendacjami.",
      },
      {
        title: "Omówienie",
        desc: "Przechodzimy przez raport. Jeśli chcesz, wdrażam poprawki (wycena osobno).",
      },
    ],
    faq: [
      {
        q: "Czy potrzebujesz dostępu do panelu strony?",
        a: "Nie. Audyt robię z zewnątrz, tak jak widzi stronę Google. Dostęp do Google Search Console, jeśli go masz, pozwala sprawdzić więcej, ale nie jest wymagany.",
      },
      {
        q: "Czy audyt obejmuje wdrożenie poprawek?",
        a: "Nie, cena dotyczy analizy i raportu. Poprawki mogę wdrożyć osobno — wycenię je na podstawie raportu.",
      },
      {
        q: "Czy gwarantujesz pierwsze miejsce w Google?",
        a: "Nie — i uważaj na każdego, kto to obiecuje. Audyt pokazuje, co blokuje widoczność i co poprawić najpierw, żeby Twoje działania dawały efekt.",
      },
      {
        q: "Czy to działa dla WordPressa, Shopify albo innego systemu?",
        a: "Tak. Audyt dotyczy strony widocznej dla Google, niezależnie od tego, na czym jest zbudowana. W raporcie uwzględniam ograniczenia Twojej platformy.",
      },
    ],
    sample: {
      href: "/audyty/przyklad-audyt-seo.pdf",
      label: "Zobacz przykładowy raport (PDF)",
      note: "Audyt mojej własnej strony z lipca 2026. Większość wskazanych problemów — w tym brak HTTPS — jest już naprawiona.",
    },
  },
  {
    slug: "audyt-bezpieczenstwa",
    metaTitle: "Audyt bezpieczeństwa strony i aplikacji",
    metaDescription:
      "Audyt bezpieczeństwa za 3000 zł: HTTPS i nagłówki, logowanie i sesje, formularze, uprawnienia, zależności i konfiguracja serwera. Raport z priorytetami i poprawkami.",
    headline: "Audyt bezpieczeństwa, zanim zrobi go ktoś inny",
    lead: "Sprawdzam stronę, sklep albo aplikację pod kątem luk, przez które można wykraść dane klientów, przejąć konto albo położyć serwis. Dostajesz raport z priorytetami i instrukcją naprawy.",
    forWho: [
      "Masz sklep lub aplikację z kontami użytkowników i danymi klientów.",
      "Stronę zrobił ktoś inny i nie wiesz, jak jest zabezpieczona.",
      "Przed startem nowego serwisu chcesz mieć pewność, że nic oczywistego nie przecieka.",
    ],
    scope: [
      {
        title: "HTTPS i nagłówki bezpieczeństwa",
        desc: "Certyfikat, przekierowania, HSTS, Content-Security-Policy, ochrona przed osadzaniem strony.",
      },
      {
        title: "Logowanie i sesje",
        desc: "Przechowywanie haseł, ciasteczka sesyjne, reset hasła, ochrona przed zgadywaniem haseł.",
      },
      {
        title: "Formularze i dane wejściowe",
        desc: "XSS, SQL injection, CSRF, przesyłanie plików — typowe drogi ataku przez formularze.",
      },
      {
        title: "Uprawnienia",
        desc: "Czy użytkownik widzi tylko swoje dane, czy panel administratora jest naprawdę zamknięty.",
      },
      {
        title: "Zależności i aktualizacje",
        desc: "Biblioteki, wtyczki i CMS ze znanymi podatnościami, nieaktualne wersje.",
      },
      {
        title: "Konfiguracja i wycieki",
        desc: "Publicznie dostępne pliki konfiguracyjne, kopie zapasowe, katalogi .git, komunikaty błędów z danymi.",
      },
    ],
    deliverables: [
      "Raport PDF z listą znalezionych problemów i oceną ryzyka.",
      "Priorytety P0–P2: co naprawić od razu, a co może poczekać.",
      "Opis, jak odtworzyć każdy problem, i konkretna instrukcja naprawy.",
      "Lista rzeczy, które są zrobione dobrze — żeby ich nie zepsuć przy zmianach.",
      "Omówienie raportu i odpowiedzi na pytania.",
    ],
    steps: [
      {
        title: "Zakres i zgoda",
        desc: "Ustalamy, co testuję, i podpisujemy zgodę właściciela na testy.",
      },
      {
        title: "Testy",
        desc: "Sprawdzam serwis ręcznie i narzędziami, bez ingerencji w dane produkcyjne.",
      },
      {
        title: "Raport",
        desc: "Dostajesz PDF z ryzykiem, priorytetami i instrukcją naprawy.",
      },
      {
        title: "Omówienie",
        desc: "Przechodzimy przez raport. Poprawki mogę wdrożyć osobno.",
      },
    ],
    faq: [
      {
        q: "Czy testy mogą zepsuć stronę?",
        a: "Testuję ostrożnie i bez ataków przeciążeniowych. Jeśli masz środowisko testowe, najlepiej sprawdzać na nim — ustalimy to przed startem.",
      },
      {
        q: "Czy możesz sprawdzić stronę konkurencji?",
        a: "Nie. Audyt bezpieczeństwa robię wyłącznie na zlecenie i za pisemną zgodą właściciela serwisu.",
      },
      {
        q: "Czy audyt obejmuje naprawę luk?",
        a: "Nie, cena dotyczy testów i raportu. Naprawy mogę wykonać osobno albo przekazać raport Twojemu wykonawcy.",
      },
      {
        q: "Co z danymi moich klientów?",
        a: "Nie kopiuję ani nie przechowuję danych klientów. Jeśli podczas testów trafię na dane osobowe, opisuję problem w raporcie bez ich zapisywania.",
      },
    ],
    note: "Audyt wykonuję wyłącznie na zlecenie właściciela serwisu i na podstawie pisemnej zgody na testy.",
  },
];

export function getAuditPage(slug: string) {
  const page = auditPages.find((p) => p.slug === slug);
  const offer = audits.find((a) => a.id === slug);
  return page && offer ? { page, offer } : null;
}
