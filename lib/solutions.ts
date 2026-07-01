// Gotowe rozwiązania do kupienia (panel /sklep, /en/shop).
//
// Płatność:
//  • buyUrl ustawiony (np. Stripe Payment Link / Gumroad / Paddle) → przycisk
//    „Kup teraz" prowadzi wprost do płatności (bez backendu).
//  • buyUrl pusty → przycisk „Zamawiam" prefilluje formularz zamówieniem
//    (zamówienie trafia do Ciebie mailem, bez pobierania płatności).
//
// priceNote / priceAlt = dopiski przy cenie (np. „na własność" + druga opcja
// abonamentowa). Pola *En = wersja angielska (dla /en/shop).
//
// ℹ️ Listę funkcji poniżej dopracuj pod realny zakres aplikacji.

export type Solution = {
  id: string;
  name: string;
  nameEn?: string;
  description: string;
  descriptionEn?: string;
  price: number;
  priceNote?: string; // dopisek przy cenie, np. „na własność"
  priceNoteEn?: string;
  priceAlt?: string; // druga opcja cenowa, np. „lub 200 zł / mies."
  priceAltEn?: string;
  features: string[];
  featuresEn?: string[];
  badge?: string; // np. „Bestseller", „Wkrótce"
  badgeEn?: string;
  soon?: boolean; // true → produkt zapowiedziany, jeszcze nie do kupienia
  buyUrl?: string; // zewnętrzny link płatności; brak → zamówienie przez formularz
};

export const solutions: Solution[] = [
  {
    id: "interior-app",
    name: "Aplikacja do projektowania wnętrz",
    nameEn: "Interior Design App",
    description:
      "Aplikacja web + mobilna do projektowania i aranżacji wnętrz — planowanie pomieszczeń, rozmieszczanie mebli i wyposażenia oraz wizualizacja efektu.",
    descriptionEn:
      "A web + mobile app for designing and arranging interiors — plan rooms, place furniture and fittings, and preview the result.",
    price: 45000,
    priceNote: "na własność",
    priceNoteEn: "one-time, you own it",
    priceAlt: "lub 200 zł / mies. w subskrypcji",
    priceAltEn: "or 200 zł / mo subscription",
    badge: "Wkrótce",
    badgeEn: "Coming soon",
    soon: true,
    features: [
      "Wersja webowa i mobilna",
      "Projektowanie i aranżacja wnętrz",
      "Planowanie pomieszczeń i rozmieszczanie wyposażenia",
      "Kod na własność albo model abonamentowy",
      "Wdrożenie i wsparcie techniczne",
    ],
    featuresEn: [
      "Web and mobile version",
      "Design and arrange interiors",
      "Room planning and item placement",
      "Own the code or pay monthly",
      "Deployment and technical support",
    ],
  },
];
