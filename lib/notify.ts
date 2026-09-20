// Powiadomienie o nowym zamówieniu — wysyłane na webhook (Discord / Slack /
// dowolny endpoint), jeśli ustawiono ORDER_WEBHOOK_URL. Bez URL: cicho pomija.
// Best-effort: żaden błąd sieci nie może przerwać składania zamówienia.

import { zl } from "./pricing";

type OrderNotice = {
  id: number;
  title: string;
  amount: number | null;
  itemsSummary?: string;
  customer: string;
};

export async function notifyNewOrder(o: OrderNotice): Promise<void> {
  const url = process.env.ORDER_WEBHOOK_URL;
  if (!url) return;

  const text = [
    `🛒 Nowe zamówienie #${o.id}`,
    o.title,
    o.itemsSummary || null,
    o.amount != null ? `Kwota: ${zl(o.amount)}` : null,
    `Klient: ${o.customer}`,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 5000);
    // `content` — Discord, `text` — Slack/Mattermost; nadmiarowe klucze są ignorowane.
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: text, text }),
      signal: ctrl.signal,
    });
    clearTimeout(timer);
  } catch {
    // powiadomienie jest best-effort — pomiń błąd, zamówienie i tak jest zapisane
  }
}
