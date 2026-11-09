export type Testimonial = {
  quote: string;
  author: string;
  authorUrl?: string; // profil autora w Google (wymagana atrybucja przy opiniach z API)
  role?: string; // np. „właściciel Vibe" albo firma
  rating?: 1 | 2 | 3 | 4 | 5; // gwiazdki z Google
  date?: string; // np. „2026-10" albo „miesiąc temu"
  source?: "google"; // skąd pochodzi opinia (pokazuje znaczek Google)
};

// Profil firmy w Mapach Google (CID z wizytówki „Mateusz Łagocki Software Studio").
export const googleProfileUrl: string | null =
  "https://www.google.com/maps?cid=7496002022446887711";
// Bezpośredni link „napisz opinię". Gdy ustawiony jest GOOGLE_PLACE_ID, link budowany jest
// automatycznie (lib/google-reviews.ts); tu można wkleić link z Profilu Firmy → „Poproś o opinie".
export const googleReviewUrl: string | null = null;

// Opinie zapasowe — przepisane z Google (stan na 2026-11-09). Wyświetlane, gdy API Google
// nie jest skonfigurowane albo nie odpowiada; przy działającym API są z nim scalane.
export const testimonials: Testimonial[] = [
  {
    quote:
      "Zdecydowanie polecam współpracę! Stworzyliśmy świetny projekt aplikacji, który został dopracowany w każdym, nawet najmniejszym szczególe. Ogromne zaangażowanie, profesjonalne podejście i świetna komunikacja na każdym etapie działania. Efekt końcowy naprawdę robi wrażenie. Świetna robota, polecam! 😊",
    author: "Dawid Obrośliński",
    rating: 5,
    date: "2026-10",
    source: "google",
  },
  {
    quote:
      "Polecam. Szybki czas realizacji, świetny kontakt i bardzo korzystna oferta 👌",
    author: "Patrycja Reszka",
    rating: 5,
    date: "2026-10",
    source: "google",
  },
];
