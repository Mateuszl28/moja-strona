import Image from "next/image";

// Zrzut strony w prostej „ramce przeglądarki" — pasek z adresem zamiast ozdobników.
export default function SiteShot({
  src,
  href,
  alt,
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  fill = false,
  className = "",
}: {
  fill?: boolean; // rozciągnij na wysokość rodzica (kadr od góry strony)
  src: string;
  href?: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  // Z surowego stringa, nie z URL — URL zamienia polskie znaki na punycode.
  const host = href?.replace(/^https?:\/\/(www\.)?/, "").replace(/\/.*$/, "");

  return (
    <div
      className={`flex flex-col overflow-hidden rounded-xl border border-ink/15 bg-[var(--surface)] ${fill ? "h-full" : ""} ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-ink/10 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-ink/15" />
        {host && (
          <span className="truncate text-xs text-[var(--ink-soft)]">
            {host}
          </span>
        )}
      </div>
      {fill ? (
        // Obraz poza przepływem: wysokość wyznacza rodzic, nie proporcje zrzutu.
        <div className="relative aspect-[2/1] min-h-0 flex-1 overflow-hidden md:aspect-auto">
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          />
        </div>
      ) : (
        <div className="overflow-hidden">
          <Image
            src={src}
            alt={alt}
            width={1280}
            height={640}
            sizes={sizes}
            priority={priority}
            className="block h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          />
        </div>
      )}
    </div>
  );
}
