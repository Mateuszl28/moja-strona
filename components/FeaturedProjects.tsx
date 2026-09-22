import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import SiteShot from "./SiteShot";
import { projects } from "@/lib/projects";

// Kilka wyróżnionych realizacji na stronie głównej (reszta na /projekty).
// Najpierw te ze zrzutem strony — wyglądają najlepiej jako duże case study.
const featured = projects
  .filter((p) => p.featured)
  .sort((a, b) => Number(!!b.cover) - Number(!!a.cover))
  .slice(0, 4);

export default function FeaturedProjects() {
  if (featured.length === 0) return null;

  return (
    <section className="mx-auto max-w-content px-6 py-20 sm:py-28">
      <SectionHead
        label="Realizacje"
        title="Wybrane projekty"
        aside={
          <Link
            href="/projekty"
            className="link-underline shrink-0 text-sm font-medium"
          >
            Wszystkie projekty
          </Link>
        }
      />

      <ol className="mt-12">
        {featured.map((p, i) => {
          const repo = p.repos?.[0]?.href ?? p.repo;
          return (
            <li
              key={p.title}
              className="border-b border-[var(--line)] first:border-t"
            >
              <Reveal delay={i * 0.05}>
                <article className="grid gap-8 py-10 md:grid-cols-12 md:gap-10">
                  {p.cover && (
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noreferrer"
                      tabIndex={-1}
                      aria-hidden="true"
                      className={`group md:col-span-7 ${i % 2 ? "md:order-2" : ""}`}
                    >
                      <SiteShot
                        src={p.cover}
                        href={p.href}
                        alt=""
                        sizes="(min-width: 768px) 58vw, 100vw"
                      />
                    </a>
                  )}

                  <div
                    className={`flex flex-col ${p.cover ? "md:col-span-5" : "md:col-span-8 md:col-start-5"} ${i % 2 && p.cover ? "md:order-1" : ""}`}
                  >
                    <div className="flex gap-3 text-sm text-[var(--ink-soft)]">
                      <span className="tabular-nums">{p.year}</span>
                      <span aria-hidden>/</span>
                      <span>{p.category}</span>
                    </div>
                    <h3 className="mt-3 text-3xl leading-tight sm:text-4xl">
                      {p.title}
                    </h3>
                    <p className="mt-4 leading-relaxed text-[var(--ink-soft)]">
                      {p.description}
                    </p>
                    <p className="mt-4 text-sm text-[var(--ink-soft)]">
                      {p.tags.join(" · ")}
                    </p>
                    <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                      {p.href && (
                        <a
                          href={p.href}
                          target="_blank"
                          rel="noreferrer"
                          className="group inline-flex items-center gap-1 font-medium"
                        >
                          <span className="link-underline">
                            {p.hrefLabel ?? "Zobacz na żywo"}
                          </span>
                          <ArrowUpRight
                            size={15}
                            className="transition-colors group-hover:text-accent"
                          />
                        </a>
                      )}
                      {repo && (
                        <a
                          href={repo}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]"
                        >
                          <Github size={15} />
                          Kod
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
