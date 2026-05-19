import type { Metadata } from "next";
import Link from "next/link";
import { Home, Terminal } from "lucide-react";
import BackgroundBlobs from "@/components/BackgroundBlobs";

export const metadata: Metadata = {
  title: "404 - Nie ma takiej strony",
};

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden flex items-center justify-center px-6">
      <BackgroundBlobs />

      <div className="relative max-w-2xl mx-auto text-center">
        <div className="relative inline-block mb-8">
          <h1 className="text-[10rem] md:text-[14rem] font-bold text-gradient leading-none">
            404
          </h1>
          <div className="absolute inset-0 text-[10rem] md:text-[14rem] font-bold text-purple-500/10 leading-none blur-xl -z-10">
            404
          </div>
        </div>

        <div className="glass rounded-2xl p-6 mb-8 text-left font-mono text-sm">
          <div className="flex items-center gap-2 mb-3 text-slate-400">
            <Terminal size={14} />
            <span>~/portfolio</span>
          </div>
          <p className="text-slate-300">
            <span className="text-purple-400">$</span> cd /this-page
          </p>
          <p className="text-red-400 mt-1">
            bash: cd: /this-page: No such file or directory
          </p>
          <p className="text-slate-300 mt-2">
            <span className="text-purple-400">$</span> echo &quot;Spr&oacute;buj
            inaczej&quot;
          </p>
          <p className="text-slate-400 mt-1">Spróbuj inaczej</p>
        </div>

        <h2 className="text-2xl font-bold mb-3">
          Tu nic nie ma — albo jeszcze nic.
        </h2>
        <p className="text-slate-400 mb-8">
          Adres który wpisałeś nie prowadzi nigdzie. Może literówka, może link
          jest stary. Wracaj na stronę główną.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all"
        >
          <Home size={16} />
          Wróć na stronę główną
        </Link>
      </div>
    </main>
  );
}
