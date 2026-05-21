---
title: "Sentra AI"
subtitle: "AI Phishing Sentinel"
date: "2026-04-15"
excerpt: "Narzędzie do wykrywania phishingu z analizą emaili przez Gemini 2.0 Flash. Projekt z konkursu Hack the Tech 2026 (kategoria Cybersecurity)."
tech: ["TypeScript", "Next.js", "Gemini AI", "Vercel"]
category: "Konkurs"
status: "live"
links:
  demo: "https://sentra-ai-peach.vercel.app/"
  github: "https://github.com/Mateuszl28"
gradient: "from-orange-500 to-pink-600"
emoji: "🛡️"
order: 1
---

## Problem

**90% naruszeń bezpieczeństwa zaczyna się od phishingu.** Phishing emaile są coraz bardziej przekonujące — wygenerowane przez AI, dopracowane stylistycznie, podszywające się pod konkretne marki. Mało osób potrafi je odróżnić od prawdziwych wiadomości.

Konkurs **Hack the Tech 2026** miał kategorię _Cybersecurity & Privacy_. Pomyślałem — czy AI może pomóc walczyć z atakami, które samo AI ułatwia tworzyć?

## Rozwiązanie

**Sentra AI** to edukacyjne narzędzie web, które:

1. **Analizuje email** — wkleisz treść, dostajesz risk score + wyjaśnienie po polsku / angielsku
2. **Sprawdza URL** — czy link wygląda na podszywający się
3. **Porównuje wiadomości** — pokazuje różnice między prawdziwym a podszytym mailem
4. **Uczy** — quizy, symulacja skrzynki, walkthrough z prawdziwych przypadków

## Architektura

Trzy warstwy analizy:

```ts
const result = await analyzeEmail({
  headers,
  sender,
  content,
  attachments,
});

// 1. Deterministic checks
const headerScore = checkHeaders(headers);
const senderScore = checkSenderReputation(sender);

// 2. AI analysis
const aiScore = await gemini.analyze({
  content,
  context: 'phishing-detection',
});

// 3. Educational feedback
const explanation = await gemini.explain({
  findings: { headerScore, senderScore, aiScore },
  language: userLanguage,
});
```

**Dlaczego trzy warstwy?** Bo każda łapie coś innego:
- **Deterministic** wyłapuje techniczne ślady (SPF/DKIM, dziwne nagłówki)
- **AI** rozumie kontekst i ton wiadomości
- **Edukacyjne wyjaśnienie** zamienia "to phishing 87%" w naukę

## Stack

- **TypeScript** — cała aplikacja w jednym języku, type safety na styku z LLM
- **Gemini 2.0 Flash** — szybki model, dobry stosunek jakości do ceny, struktured output
- **Vercel** — deployment, edge functions, dobre limity dla konkursu

## Decyzje techniczne

### Privacy first
Cała analiza dzieje się po stronie serwera, ale **historia nie jest zapisywana**. "History stays on this device" — localStorage tylko, żadnej bazy.

### Gemini, nie OpenAI
Wybrałem Gemini bo:
- Darmowy tier wystarczył na demo i prezentację
- 2.0 Flash jest **szybki** (poniżej sekundy) — UX nie cierpiał
- Structured output działa świetnie dla JSON-owego risk score

### Brak rejestracji
Konkurs miał ostry limit czasu. Każdy "register / login" flow to dodatkowa godzina kodu. Bez kont — od razu działa.

## Czego się nauczyłem

1. **Prompt engineering to nie hype.** Pierwsza wersja promptu dawała 60% fałszywych alarmów. Wersja po 5 iteracjach — poniżej 10%.
2. **AI hallucinations w cybersec są groźne.** Model "wymyślał" technical details które brzmiały wiarygodnie. Musiałem dodać deterministic guardrails.
3. **Edukacja > detekcja.** Sam risk score nie pomaga użytkownikowi. Wyjaśnienie _dlaczego_ to phishing — tak.

## Co bym zrobił inaczej

- **Streaming responses** — Gemini wspiera streaming, ale nie zdążyłem zaimplementować przed deadline'em
- **Multi-language detection** — robi tylko EN/PL, brakuje DE, ES, FR
- **API endpoint** — żeby ktoś mógł podpiąć Sentra do swojego systemu

## Linki

- 🔗 **Live demo:** [sentra-ai-peach.vercel.app](https://sentra-ai-peach.vercel.app/)
- 🏆 **Konkurs:** Hack the Tech 2026, kategoria Cybersecurity & Privacy
- 💻 **Stack:** TypeScript, Next.js, Gemini 2.0 Flash
