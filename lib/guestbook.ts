import fs from "fs";
import path from "path";

export type GuestbookMessage = {
  id: string;
  name: string;
  role?: string;
  message: string;
  date: string;
  verified?: boolean;
};

export function getVerifiedMessages(): GuestbookMessage[] {
  try {
    const filePath = path.join(process.cwd(), "content", "guestbook.json");
    if (!fs.existsSync(filePath)) return [];
    const raw = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(raw) as { messages?: GuestbookMessage[] };
    return (data.messages || [])
      .filter((m) => m.verified)
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  } catch {
    return [];
  }
}
