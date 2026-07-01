import type { Metadata } from "next";
import { redirect } from "next/navigation";
import LoginForm from "@/components/LoginForm";
import { getSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Logowanie",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { next?: string };
}) {
  const session = await getSession();
  if (session) redirect(session.role === "admin" ? "/admin" : "/panel");

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-28">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-semibold tracking-tight">Zaloguj się</h1>
        <p className="mb-8 mt-2 text-sm text-[var(--ink-soft)]">
          Wejdź do panelu, aby śledzić swoje zapytania i wiadomości.
        </p>
        <LoginForm next={searchParams.next} />
      </div>
    </main>
  );
}
