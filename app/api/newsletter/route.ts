import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const resendApiKey = process.env.RESEND_API_KEY;
const audienceId = process.env.RESEND_AUDIENCE_ID;

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  if (!resendApiKey || !audienceId) {
    return NextResponse.json(
      { error: "Newsletter nie jest skonfigurowany." },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Nieprawidłowe dane." }, { status: 400 });
  }

  const { email } = (body ?? {}) as { email?: unknown };

  if (typeof email !== "string" || !isValidEmail(email.trim()) || email.length > 200) {
    return NextResponse.json(
      { error: "Podaj poprawny adres email." },
      { status: 400 }
    );
  }

  try {
    const resend = new Resend(resendApiKey);
    const result = await resend.contacts.create({
      email: email.trim(),
      audienceId,
      unsubscribed: false,
    });

    if (result.error) {
      const msg = result.error.message || "";
      if (msg.toLowerCase().includes("already")) {
        return NextResponse.json({
          ok: true,
          alreadySubscribed: true,
        });
      }
      console.error("Newsletter error:", result.error);
      return NextResponse.json(
        { error: "Nie udało się dodać emaila." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Newsletter exception:", err);
    return NextResponse.json({ error: "Błąd serwera." }, { status: 500 });
  }
}
