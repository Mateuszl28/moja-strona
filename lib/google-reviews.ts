import {
  googleProfileUrl,
  googleReviewUrl,
  testimonials as fallback,
  type Testimonial,
} from "./testimonials";

// Automatyczne wczytywanie opinii z Google (Places API — New).
// Wymaga zmiennej GOOGLE_PLACES_API_KEY (Google Cloud → włącz „Places API (New)").
// GOOGLE_PLACE_ID jest opcjonalne — bez niego miejsce wyszukiwane jest po nazwie.
// Odpowiedź jest cache'owana na 12 h (ISR), więc nowe opinie pojawią się same.
// Uwaga: Google zwraca maksymalnie 5 najtrafniejszych opinii.

const REVALIDATE = 60 * 60 * 12;
const SEARCH_QUERY = "Mateusz Łagocki Software Studio Leszno";

export type ReviewsData = {
  reviews: Testimonial[];
  rating: number | null;
  count: number;
  profileUrl: string | null;
  reviewUrl: string | null;
};

type PlaceReview = {
  rating?: number;
  relativePublishTimeDescription?: string;
  publishTime?: string;
  text?: { text?: string };
  originalText?: { text?: string };
  authorAttribution?: { displayName?: string; uri?: string };
};

type Place = {
  id?: string;
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: PlaceReview[];
};

async function resolvePlaceId(key: string): Promise<string | null> {
  if (process.env.GOOGLE_PLACE_ID) return process.env.GOOGLE_PLACE_ID;
  const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": key,
      "X-Goog-FieldMask": "places.id",
    },
    body: JSON.stringify({ textQuery: SEARCH_QUERY, languageCode: "pl" }),
    next: { revalidate: 60 * 60 * 24 * 7 },
  });
  if (!res.ok) return null;
  const data = (await res.json()) as { places?: { id?: string }[] };
  return data.places?.[0]?.id ?? null;
}

function toTestimonial(r: PlaceReview): Testimonial | null {
  const quote = (r.originalText?.text ?? r.text?.text ?? "").trim();
  const author = r.authorAttribution?.displayName?.trim();
  if (!quote || !author) return null;
  const rating =
    r.rating && r.rating >= 1 && r.rating <= 5
      ? (Math.round(r.rating) as Testimonial["rating"])
      : undefined;
  return {
    quote,
    author,
    authorUrl: r.authorAttribution?.uri,
    rating,
    date: r.publishTime?.slice(0, 7) ?? r.relativePublishTimeDescription,
    source: "google",
  };
}

function fromFallback(): ReviewsData {
  const rated = fallback.filter((t) => t.rating);
  return {
    reviews: fallback,
    rating: rated.length
      ? rated.reduce((s, t) => s + (t.rating ?? 0), 0) / rated.length
      : null,
    count: rated.length,
    profileUrl: googleProfileUrl,
    reviewUrl: googleReviewUrl,
  };
}

export async function getGoogleReviews(): Promise<ReviewsData> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) return fromFallback();

  try {
    const placeId = await resolvePlaceId(key);
    if (!placeId) return fromFallback();

    const res = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=pl`,
      {
        headers: {
          "X-Goog-Api-Key": key,
          "X-Goog-FieldMask": "id,rating,userRatingCount,googleMapsUri,reviews",
        },
        next: { revalidate: REVALIDATE },
      },
    );
    if (!res.ok) {
      console.error("[google-reviews]", res.status, await res.text());
      return fromFallback();
    }
    const place = (await res.json()) as Place;

    const live = (place.reviews ?? [])
      .map(toTestimonial)
      .filter((t): t is Testimonial => t !== null);
    // Scal z listą zapasową (Google zwraca max 5 opinii) — bez duplikatów po autorze.
    const seen = new Set(live.map((t) => t.author.toLowerCase()));
    const reviews = [
      ...live,
      ...fallback.filter((t) => !seen.has(t.author.toLowerCase())),
    ];

    return {
      reviews,
      rating: place.rating ?? fromFallback().rating,
      count: place.userRatingCount ?? reviews.length,
      profileUrl: place.googleMapsUri ?? googleProfileUrl,
      reviewUrl:
        googleReviewUrl ??
        `https://search.google.com/local/writereview?placeid=${encodeURIComponent(place.id ?? placeId)}`,
    };
  } catch (err) {
    console.error("[google-reviews]", err);
    return fromFallback();
  }
}
