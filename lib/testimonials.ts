export type Testimonial = {
  quote: string;
  author: string;
  role?: string; // np. „właściciel Vibe" albo firma
  rating?: 1 | 2 | 3 | 4 | 5; // gwiazdki z Google
  date?: string; // np. „2026-10"
  source?: "google"; // skąd pochodzi opinia (pokazuje znaczek Google)
};

// Link do profilu firmy w Google (Maps / Profil Firmy). Uzupełnij po założeniu profilu —
// wtedy pod paskiem opinii pojawi się „Zobacz wszystkie w Google" i „Wystaw opinię".
export const googleProfileUrl: string | null = null;
// Bezpośredni link „napisz opinię" (Profil Firmy → Poproś o opinie → skopiuj link).
export const googleReviewUrl: string | null = null;

// Dodaj tu REALNE opinie (przepisane z Google). Nie wstawiaj zmyślonych.
// Przykład:
// { quote: "Strona gotowa w tydzień, wszystko jasno wytłumaczone.", author: "Anna K.",
//   role: "salon kosmetyczny", rating: 5, date: "2026-10", source: "google" },
export const testimonials: Testimonial[] = [];
