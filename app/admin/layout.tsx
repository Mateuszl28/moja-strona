import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import LogoutButton from "@/components/LogoutButton";

export const metadata: Metadata = {
  title: "Panel admina",
  robots: { index: false, follow: false },
};

const links = [
  { href: "/admin", label: "Pulpit" },
  { href: "/admin/zamowienia", label: "Zamówienia" },
  { href: "/admin/produkty", label: "Produkty" },
  { href: "/admin/uzytkownicy", label: "Użytkownicy" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/login?next=/admin");
  if (session.role !== "admin") redirect("/panel");

  return (
    <div className="mx-auto max-w-content px-6 pb-24 pt-28">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--line)] pb-5">
        <div className="flex flex-wrap items-center gap-1">
          <span className="mr-3 font-mono text-xs uppercase tracking-[0.18em] text-accent">
            Admin
          </span>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full px-3.5 py-1.5 text-sm text-[var(--ink-soft)] transition-colors hover:bg-[var(--paper-soft)]/60 hover:text-[var(--ink)]"
            >
              {l.label}
            </Link>
          ))}
        </div>
        <LogoutButton />
      </div>

      <div className="pt-8">{children}</div>
    </div>
  );
}
