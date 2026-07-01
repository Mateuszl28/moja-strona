import { listUsers } from "@/lib/users";

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("pl-PL", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function AdminUsersPage() {
  const users = listUsers();

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">
        Użytkownicy{" "}
        <span className="text-[var(--ink-soft)]">({users.length})</span>
      </h1>

      <div className="mt-6 overflow-hidden rounded-2xl border border-[var(--line)]">
        <table className="w-full text-sm">
          <thead className="bg-[var(--surface)] text-left text-[var(--ink-soft)]">
            <tr>
              <th className="px-5 py-3 font-medium">Imię</th>
              <th className="px-5 py-3 font-medium">E-mail</th>
              <th className="px-5 py-3 font-medium">Rola</th>
              <th className="px-5 py-3 font-medium">Dołączył</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr
                key={u.id}
                className="border-t border-[var(--line)] transition-colors hover:bg-[var(--surface)]"
              >
                <td className="px-5 py-3 font-medium">{u.name}</td>
                <td className="px-5 py-3 text-[var(--ink-soft)]">{u.email}</td>
                <td className="px-5 py-3">
                  <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                      u.role === "admin"
                        ? "border-accent/40 bg-accent/10 text-accent"
                        : "border-[var(--line)] bg-[var(--surface)] text-[var(--ink-soft)]"
                    }`}
                  >
                    {u.role === "admin" ? "admin" : "klient"}
                  </span>
                </td>
                <td className="px-5 py-3 text-[var(--ink-soft)]">
                  {fmtDate(u.created_at)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
