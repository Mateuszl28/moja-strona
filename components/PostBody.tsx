import type { PostBlock } from "@/lib/posts";

// Renderuje bloki treści wpisu (lib/posts). Prosty zestaw: akapit, nagłówek,
// kod, lista — bez zależności od MDX.
export default function PostBody({ blocks }: { blocks: PostBlock[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2":
            return (
              <h2
                key={i}
                className="mt-10 text-2xl font-semibold tracking-tight"
              >
                {b.text}
              </h2>
            );
          case "code":
            return (
              <pre
                key={i}
                className="overflow-x-auto rounded-xl border border-[var(--line)] bg-[var(--paper-soft)] p-4 text-sm leading-relaxed"
              >
                <code className="font-mono text-[var(--ink)]">{b.text}</code>
              </pre>
            );
          case "ul":
            return (
              <ul
                key={i}
                className="list-disc space-y-1.5 pl-5 leading-relaxed text-[var(--ink-soft)]"
              >
                {b.items.map((it, j) => (
                  <li key={j}>{it}</li>
                ))}
              </ul>
            );
          default:
            return (
              <p key={i} className="leading-relaxed text-[var(--ink-soft)]">
                {b.text}
              </p>
            );
        }
      })}
    </div>
  );
}
