import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const resendApiKey = process.env.RESEND_API_KEY;
const contactEmail = process.env.CONTACT_EMAIL;
const fromAddress = process.env.RESEND_FROM || "onboarding@resend.dev";

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  if (!resendApiKey || !contactEmail) {
    return NextResponse.json(
      { error: "Guestbook nie jest skonfigurowany." },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Złe dane." }, { status: 400 });
  }

  const { name, role, message } = (body ?? {}) as {
    name?: unknown;
    role?: unknown;
    message?: unknown;
  };

  if (typeof name !== "string" || typeof message !== "string") {
    return NextResponse.json({ error: "Brakujące pola." }, { status: 400 });
  }

  const n = name.trim();
  const r = typeof role === "string" ? role.trim() : "";
  const m = message.trim();

  if (n.length < 2 || n.length > 60)
    return NextResponse.json(
      { error: "Imię: 2-60 znaków." },
      { status: 400 }
    );
  if (m.length < 5 || m.length > 500)
    return NextResponse.json(
      { error: "Wiadomość: 5-500 znaków." },
      { status: 400 }
    );

  try {
    const resend = new Resend(resendApiKey);
    const result = await resend.emails.send({
      from: fromAddress,
      to: contactEmail,
      subject: `Portfolio Guestbook: ${n}`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; padding: 24px;">
          <h2 style="color: #a855f7;">Nowy wpis w księdze gości</h2>
          <p><strong>Imię:</strong> ${escapeHtml(n)}</p>
          ${r ? `<p><strong>Rola:</strong> ${escapeHtml(r)}</p>` : ""}
          <hr style="border:none; border-top: 1px solid #eee; margin: 16px 0;" />
          <p style="white-space: pre-wrap; line-height: 1.6;">${escapeHtml(m)}</p>
          <hr style="border:none; border-top: 1px solid #eee; margin: 16px 0;" />
          <p style="color: #888; font-size: 12px;">
            Żeby pokazać tę wiadomość na stronie, edytuj
            <code>content/guestbook.json</code> i dodaj wpis z
            <code>"verified": true</code>.
          </p>
        </div>
      `,
      text: `Nowy guestbook entry:\nImię: ${n}\nRola: ${r}\n\n${m}`,
    });

    if (result.error) {
      console.error("Guestbook send error:", result.error);
      return NextResponse.json(
        { error: "Nie udało się wysłać." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Guestbook exception:", err);
    return NextResponse.json({ error: "Błąd serwera." }, { status: 500 });
  }
}
