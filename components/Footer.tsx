export default function Footer() {
  return (
    <footer className="border-t border-[var(--line)]">
      <div className="mx-auto flex max-w-content flex-col items-center justify-between gap-2 px-6 py-8 text-sm text-[var(--ink-soft)] sm:flex-row">
        <p>© 2026 Mateusz Łagocki</p>
        <p className="font-mono text-xs">Zbudowane w Next.js</p>
      </div>
    </footer>
  );
}
