import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const resendApiKey = process.env.RESEND_API_KEY;
const contactEmail = process.env.CONTACT_EMAIL;
const fromAddress = process.env.RESEND_FROM || "onboarding@resend.dev";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  if (!resendApiKey || !contactEmail) {
    console.error("Missing RESEND_API_KEY or CONTACT_EMAIL env variables");
    return NextResponse.json(
      { error: "Serwer nieskonfigurowany. Spróbuj ponownie później." },
      { status: 500 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Nieprawidłowy format danych." },
      { status: 400 }
    );
  }

  const { name, email, message } = (body ?? {}) as {
    name?: unknown;
    email?: unknown;
    message?: unknown;
  };

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string"
  ) {
    return NextResponse.json(
      { error: "Brakujące pola." },
      { status: 400 }
    );
  }

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedMessage = message.trim();

  if (trimmedName.length < 2 || trimmedName.length > 100) {
    return NextResponse.json(
      { error: "Imię powinno mieć od 2 do 100 znaków." },
      { status: 400 }
    );
  }
  if (!isValidEmail(trimmedEmail) || trimmedEmail.length > 200) {
    return NextResponse.json(
      { error: "Nieprawidłowy adres email." },
      { status: 400 }
    );
  }
  if (trimmedMessage.length < 10 || trimmedMessage.length > 5000) {
    return NextResponse.json(
      { error: "Wiadomość powinna mieć od 10 do 5000 znaków." },
      { status: 400 }
    );
  }

  try {
    const resend = new Resend(resendApiKey);

    const result = await resend.emails.send({
      from: fromAddress,
      to: contactEmail,
      replyTo: trimmedEmail,
      subject: `Portfolio: nowa wiadomość od ${trimmedName}`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; padding: 24px;">
          <h2 style="color: #a855f7;">Nowa wiadomość z portfolio</h2>
          <p><strong>Od:</strong> ${escapeHtml(trimmedName)}</p>
          <p><strong>Email:</strong> ${escapeHtml(trimmedEmail)}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0;" />
          <p style="white-space: pre-wrap; line-height: 1.6;">${escapeHtml(trimmedMessage)}</p>
        </div>
      `,
      text: `Od: ${trimmedName} <${trimmedEmail}>\n\n${trimmedMessage}`,
    });

    if (result.error) {
      console.error("Resend error:", result.error);
      return NextResponse.json(
        { error: "Nie udało się wysłać wiadomości." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact API exception:", err);
    return NextResponse.json(
      { error: "Wystąpił błąd serwera." },
      { status: 500 }
    );
  }
}
