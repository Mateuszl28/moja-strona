import { LogOut } from "lucide-react";
import { logoutAction } from "@/lib/actions";

export default function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button
        type="submit"
        className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] px-3.5 py-1.5 text-sm text-[var(--ink-soft)] transition-colors hover:border-accent/40 hover:text-[var(--ink)]"
      >
        <LogOut size={15} />
        Wyloguj
      </button>
    </form>
  );
}
