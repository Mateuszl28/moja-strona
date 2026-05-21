import { GitCommit, Music, BookOpen, ExternalLink } from "lucide-react";

const GITHUB_USERNAME = "Mateuszl28";

type Commit = {
  sha: string;
  message: string;
  date: string;
  url: string;
  repo: string;
};

type CurrentlyInto = {
  category: string;
  icon: typeof Music;
  items: { title: string; subtitle: string; url?: string }[];
};

const currentlyInto: CurrentlyInto[] = [
  {
    category: "Słucham",
    icon: Music,
    items: [
      {
        title: "Tame Impala",
        subtitle: "Currents — podczas kodowania",
      },
      {
        title: "Lofi Girl",
        subtitle: "Beats to code/relax to",
      },
    ],
  },
  {
    category: "Czytam",
    icon: BookOpen,
    items: [
      {
        title: "Clean Code",
        subtitle: "Robert C. Martin",
      },
      {
        title: "Dokumentacja Next.js",
        subtitle: "App Router, Server Components",
        url: "https://nextjs.org/docs",
      },
    ],
  },
];

async function getRecentCommits(): Promise<Commit[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=30`,
      {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 600 },
      }
    );
    if (!res.ok) return [];
    const events = (await res.json()) as Array<{
      type: string;
      created_at: string;
      repo: { name: string };
      payload?: {
        commits?: Array<{ sha: string; message: string; url: string }>;
      };
    }>;
    const commits: Commit[] = [];
    for (const ev of events) {
      if (ev.type !== "PushEvent" || !ev.payload?.commits) continue;
      for (const c of ev.payload.commits) {
        commits.push({
          sha: c.sha.slice(0, 7),
          message: c.message.split("\n")[0].slice(0, 80),
          date: ev.created_at,
          url: `https://github.com/${ev.repo.name}/commit/${c.sha}`,
          repo: ev.repo.name,
        });
        if (commits.length >= 5) break;
      }
      if (commits.length >= 5) break;
    }
    return commits;
  } catch {
    return [];
  }
}

function timeAgo(date: string): string {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins} min temu`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h temu`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d temu`;
  return new Date(date).toLocaleDateString("pl-PL");
}

export default async function LiveWidgets() {
  const commits = await getRecentCommits();

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-mono text-sm text-purple-400 mb-2">{"// live"}</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Co u <span className="text-gradient">mnie teraz</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Ostatnie commity z GitHuba (auto-update co 10 min) i to, czym
            aktualnie żyję.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center">
                  <GitCommit size={18} className="text-purple-400" />
                </div>
                <div>
                  <h3 className="font-bold">Ostatnie commity</h3>
                  <p className="text-xs text-slate-500 font-mono">
                    @{GITHUB_USERNAME}
                  </p>
                </div>
              </div>
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-slate-500 hover:text-white transition-colors inline-flex items-center gap-1"
              >
                profil <ExternalLink size={12} />
              </a>
            </div>

            {commits.length === 0 ? (
              <p className="text-sm text-slate-500 py-8 text-center">
                Brak ostatnich commitów lub limit GitHub API.
              </p>
            ) : (
              <ul className="space-y-3">
                {commits.map((c) => (
                  <li key={c.sha}>
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-3 rounded-lg hover:bg-white/5 transition-colors group"
                    >
                      <div className="flex items-start gap-3">
                        <code className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded mt-0.5">
                          {c.sha}
                        </code>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-slate-200 group-hover:text-white transition-colors truncate">
                            {c.message}
                          </p>
                          <p className="text-[11px] text-slate-500 font-mono mt-0.5 truncate">
                            {c.repo.replace(`${GITHUB_USERNAME}/`, "")} ·{" "}
                            {timeAgo(c.date)}
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="space-y-6">
            {currentlyInto.map((cat) => (
              <div key={cat.category} className="glass rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center">
                    <cat.icon size={18} className="text-purple-400" />
                  </div>
                  <h3 className="font-bold">{cat.category}</h3>
                </div>
                <ul className="space-y-3">
                  {cat.items.map((item) => (
                    <li key={item.title}>
                      {item.url ? (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block hover:translate-x-0.5 transition-transform"
                        >
                          <p className="text-sm font-medium text-slate-200">
                            {item.title}
                          </p>
                          <p className="text-xs text-slate-500">
                            {item.subtitle}
                          </p>
                        </a>
                      ) : (
                        <div>
                          <p className="text-sm font-medium text-slate-200">
                            {item.title}
                          </p>
                          <p className="text-xs text-slate-500">
                            {item.subtitle}
                          </p>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
