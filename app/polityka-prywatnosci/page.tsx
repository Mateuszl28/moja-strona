import type { Metadata } from "next";
import { company } from "@/lib/company";

export const metadata: Metadata = {
  title: "Polityka prywatności",
  description:
    "Jak przetwarzam dane z formularza kontaktowego. Prosta, uczciwa informacja o prywatności.",
  alternates: { canonical: "/polityka-prywatnosci" },
  robots: { index: false, follow: true },
};

const EMAIL = "kontakt@programujzmateuszem.pl";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-3 space-y-3 leading-relaxed text-[var(--ink-soft)]">
        {children}
      </div>
    </section>
  );
}

export default function PolitykaPrywatnosciPage() {
  return (
    <main className="pt-28">
      <article className="mx-auto max-w-3xl px-6 pb-24">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
          Prywatność
        </p>
        <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          Polityka prywatności
        </h1>
        <p className="mt-4 text-sm text-[var(--ink-soft)]">
          Ostatnia aktualizacja: 1 lipca 2026
        </p>

        <Section title="Administrator danych">
          <p>
            Administratorem danych jest {company.legalName}, {company.addressLine},
            NIP&nbsp;{company.nip}. W sprawach dotyczących prywatności napisz na:{" "}
            <a
              href={`mailto:${EMAIL}`}
              className="text-[var(--ink)] underline underline-offset-4 hover:text-accent"
            >
              {EMAIL}
            </a>{" "}
            lub zadzwoń:{" "}
            <a
              href={`tel:${company.phoneE164}`}
              className="text-[var(--ink)] underline underline-offset-4 hover:text-accent"
            >
              {company.phoneDisplay}
            </a>
            .
          </p>
        </Section>

        <Section title="Jakie dane zbieram">
          <p>
            Wyłącznie te, które sam(a) podasz w formularzu kontaktowym: imię,
            adres e-mail i treść wiadomości. Podanie danych jest dobrowolne, ale
            konieczne, żebym mógł odpowiedzieć.
          </p>
        </Section>

        <Section title="Cel przetwarzania">
          <p>
            Dane wykorzystuję wyłącznie do kontaktu z Tobą i odpowiedzi na Twoje
            zapytanie. Nie sprzedaję ich ani nie wykorzystuję do marketingu bez
            Twojej zgody.
          </p>
        </Section>

        <Section title="Kto jeszcze przetwarza dane">
          <p>
            Formularz obsługuje usługa Web3Forms — Twoja wiadomość przechodzi
            przez jej system i trafia na mój adres e-mail. Poza tym korzystam z
            poczty do prowadzenia korespondencji.
          </p>
        </Section>

        <Section title="Jak długo przechowuję dane">
          <p>
            Korespondencję przechowuję tak długo, jak jest to potrzebne do
            obsługi sprawy, a potem przez rozsądny czas na wypadek dalszych
            pytań. Możesz w każdej chwili poprosić o jej usunięcie.
          </p>
        </Section>

        <Section title="Twoje prawa">
          <p>
            Masz prawo dostępu do swoich danych, ich sprostowania, usunięcia oraz
            wniesienia sprzeciwu wobec przetwarzania. Aby z nich skorzystać,
            napisz na podany wyżej adres e-mail.
          </p>
        </Section>

        <Section title="Pliki cookies i analityka">
          <p>
            Ta strona nie używa śledzących plików cookies ani zewnętrznej
            analityki. Nie profiluję odwiedzających.
          </p>
        </Section>

        <Section title="Zmiany">
          <p>
            Politykę mogę od czasu do czasu aktualizować — obowiązuje wersja z
            datą podaną na górze strony.
          </p>
        </Section>

        <p className="mt-10 border-t border-[var(--line)] pt-6 text-xs leading-relaxed text-[var(--ink-soft)]">
          To ogólna informacja o prywatności, a nie porada prawna. Jeśli
          prowadzisz działalność, warto dostosować ją do swojej sytuacji.
        </p>
      </article>
    </main>
  );
}
