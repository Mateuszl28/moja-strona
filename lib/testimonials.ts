export type Testimonial = {
  quote: string;
  author: string;
  role?: string; // np. „właściciel Vibe" albo firma
};

// Dodaj tu REALNE opinie klientów — sekcja „Opinie" na stronie głównej pokaże
// się automatycznie, gdy tablica nie jest pusta. Nie wstawiaj zmyślonych.
export const testimonials: Testimonial[] = [];
