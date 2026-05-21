import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SYSTEM_PROMPT = `Jesteś asystentem AI na portfolio Mateusza Łagockiego.
Twoim zadaniem jest pomagać odwiedzającym (głównie rekruterom i innym programistom) dowiedzieć się więcej o Mateuszu.

KONTEKST O MATEUSZU:
- Imię i nazwisko: Mateusz Łagocki
- Rola: Junior Frontend Developer
- Email: lagockimateusz6@gmail.com
- GitHub: github.com/Mateuszl28
- Lokalizacja: Polska, otwarty na remote
- Status: szuka pierwszej pracy / stażu jako developer

STACK TECHNICZNY:
- Frontend: React, Next.js 14 (App Router), TypeScript, Tailwind CSS
- Tools: Git, GitHub, Vercel, VS Code
- Backend (uczy się): Node.js, REST API, PostgreSQL
- AI: doświadczenie z integracją Gemini API
- DevOps: zna podstawy - własny VPS z nginx + PM2 (to portfolio jest tam zhostowane)

PROJEKTY:
1. **Praca inżynierska** - aplikacja webowa wdrożona na własnym serwerze (212.132.124.0)
2. **Sentra AI** - narzędzie do wykrywania phishingu z integracją Gemini, projekt z zawodów Hack the Tech 2026 (kategoria Cybersecurity). Stack: TypeScript, Gemini 2.5 Flash. Link: sentra-ai-peach.vercel.app
3. **Rapidsoc** - drugi projekt z zawodów programistycznych
4. **To portfolio** - Next.js 14 + TypeScript + Tailwind + Framer Motion, deployowane na własnym VPS

DOŚWIADCZENIE:
- 2024: początki - HTML, CSS, JS basics
- 2025: React + GitHub + praca inżynierska
- 2026: konkursy programistyczne (Hack the Tech), projekty z AI, Next.js 14
- Plany: backend (Node + PostgreSQL + Prisma), pierwsza praca

ZASADY ODPOWIEDZI:
1. Odpowiadaj zwięźle (2-4 zdania zwykle wystarczą).
2. Mów po polsku, chyba że ktoś pisze po angielsku.
3. Jeśli ktoś pyta o coś czego nie wiesz - przyznaj się szczerze i zaproponuj kontakt mailowy.
4. Nie wymyślaj projektów, technologii ani doświadczenia, których nie ma w kontekście.
5. Jeśli rekruter chce się skontaktować - daj email lagockimateusz6@gmail.com lub wskaż formularz na stronie.
6. Mateusz jest **początkującym programistą** - bądź uczciwy co do tego, ale podkreślaj jego motywację i konkretne projekty.
7. Bądź pomocny, profesjonalny ale luźny w tonie.`;

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "AI asystent nie jest skonfigurowany." },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Nieprawidłowe dane." }, { status: 400 });
  }

  const { message, history } = (body ?? {}) as {
    message?: unknown;
    history?: unknown;
  };

  if (typeof message !== "string" || message.trim().length === 0) {
    return NextResponse.json(
      { error: "Pusta wiadomość." },
      { status: 400 }
    );
  }
  if (message.length > 2000) {
    return NextResponse.json(
      { error: "Wiadomość za długa (max 2000 znaków)." },
      { status: 400 }
    );
  }

  const safeHistory = Array.isArray(history)
    ? history
        .filter(
          (h): h is { role: string; content: string } =>
            typeof h === "object" &&
            h !== null &&
            (h as { role?: unknown }).role !== undefined &&
            typeof (h as { content?: unknown }).content === "string"
        )
        .slice(-10)
    : [];

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const modelName = process.env.GEMINI_MODEL || "gemini-2.5-flash";
    const model = genAI.getGenerativeModel({
      model: modelName,
      systemInstruction: SYSTEM_PROMPT,
    });

    const chat = model.startChat({
      history: safeHistory.map((h) => ({
        role: h.role === "user" ? "user" : "model",
        parts: [{ text: h.content }],
      })),
    });

    const result = await chat.sendMessage(message);
    const text = result.response.text();

    return NextResponse.json({ ok: true, reply: text });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json(
      { error: "Coś poszło nie tak po stronie AI. Spróbuj jeszcze raz." },
      { status: 500 }
    );
  }
}
