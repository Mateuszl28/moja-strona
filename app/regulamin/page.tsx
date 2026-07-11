import type { Metadata } from "next";
import Link from "next/link";
import { company } from "@/lib/company";

export const metadata: Metadata = {
  title: "Regulamin sklepu",
  description:
    "Regulamin sklepu — zasady składania zamówień, płatności, realizacji, prawo odstąpienia od umowy i reklamacje.",
  alternates: {
    canonical: "/regulamin",
    languages: { "pl-PL": "/regulamin", en: "/en/terms" },
  },
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-3 space-y-3 leading-relaxed text-[var(--ink-soft)]">
        {children}
      </div>
    </section>
  );
}

export default function RegulaminPage() {
  return (
    <main className="pt-28">
      <article className="mx-auto max-w-3xl px-6 pb-24">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
          Sklep
        </p>
        <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          Regulamin sklepu
        </h1>
        <p className="mt-4 text-sm text-[var(--ink-soft)]">
          Ostatnia aktualizacja: 11 lipca 2026
        </p>

        <Section title="1. Sprzedawca">
          <p>
            Sklep prowadzi <strong>{company.legalName}</strong>,{" "}
            {company.addressLine}, NIP&nbsp;{company.nip} („Sprzedawca").
            Kontakt: e-mail{" "}
            <a
              href={`mailto:${company.email}`}
              className="text-[var(--ink)] underline underline-offset-4 hover:text-accent"
            >
              {company.email}
            </a>
            , tel.{" "}
            <a
              href={`tel:${company.phoneE164}`}
              className="text-[var(--ink)] underline underline-offset-4 hover:text-accent"
            >
              {company.phoneDisplay}
            </a>
            .
          </p>
        </Section>

        <Section title="2. Definicje">
          <ul className="list-disc space-y-1.5 pl-5">
            <li>
              <strong>Sklep</strong> — sklep internetowy dostępny na tej stronie.
            </li>
            <li>
              <strong>Klient</strong> — osoba składająca zamówienie w Sklepie.
            </li>
            <li>
              <strong>Konsument</strong> — Klient będący osobą fizyczną,
              zawierający umowę niezwiązaną bezpośrednio z jego działalnością
              gospodarczą lub zawodową.
            </li>
            <li>
              <strong>Produkt</strong> — usługa lub produkt cyfrowy prezentowany
              w Sklepie.
            </li>
            <li>
              <strong>Zamówienie</strong> — oświadczenie woli Klienta zmierzające
              do zawarcia umowy ze Sprzedawcą.
            </li>
          </ul>
        </Section>

        <Section title="3. Wymagania techniczne">
          <p>
            Do korzystania ze Sklepu potrzebne jest urządzenie z dostępem do
            internetu i aktualną przeglądarką, a do złożenia zamówienia — konto w
            Sklepie oraz aktywny adres e-mail.
          </p>
        </Section>

        <Section title="4. Składanie zamówienia">
          <p>
            Klient dodaje Produkty do koszyka i składa zamówienie po zalogowaniu.
            Złożenie zamówienia jest zaproszeniem do zawarcia umowy — po jego
            otrzymaniu Sprzedawca kontaktuje się z Klientem, aby potwierdzić
            zakres, termin i sposób płatności. Umowa zostaje zawarta z chwilą
            potwierdzenia przyjęcia zamówienia do realizacji przez Sprzedawcę.
          </p>
        </Section>

        <Section title="5. Ceny i płatności">
          <p>
            Ceny podane są w złotych polskich (PLN). Ceny promocyjne obowiązują w
            czasie trwania promocji lub do wyczerpania jej warunków. Sposób i
            termin płatności Sprzedawca ustala z Klientem indywidualnie po
            złożeniu zamówienia (np. przelew na podstawie faktury). Sklep nie
            pobiera płatności automatycznie w chwili składania zamówienia.
          </p>
        </Section>

        <Section title="6. Realizacja zamówienia">
          <p>
            Termin i zakres realizacji Sprzedawca uzgadnia z Klientem po
            potwierdzeniu zamówienia. Postęp realizacji Klient może śledzić w
            panelu, w szczegółach zamówienia, gdzie dostępna jest też korespondencja
            ze Sprzedawcą.
          </p>
        </Section>

        <Section title="7. Prawo odstąpienia od umowy (14 dni)">
          <p>
            Konsument, który zawarł umowę na odległość, może w terminie{" "}
            <strong>14 dni</strong> odstąpić od niej bez podawania przyczyny,
            składając Sprzedawcy oświadczenie (np. e-mailem na{" "}
            <a
              href={`mailto:${company.email}`}
              className="text-[var(--ink)] underline underline-offset-4 hover:text-accent"
            >
              {company.email}
            </a>
            ). Do zachowania terminu wystarczy wysłanie oświadczenia przed jego
            upływem. Sprzedawca zwraca otrzymane płatności w terminie 14 dni od
            otrzymania oświadczenia.
          </p>
          <p>
            <strong>Wyjątki.</strong> Prawo odstąpienia nie przysługuje m.in. w
            przypadku umów o świadczenie usług, jeżeli Sprzedawca wykonał w pełni
            usługę za wyraźną zgodą Konsumenta, który przed rozpoczęciem został
            poinformowany, że po spełnieniu świadczenia utraci prawo odstąpienia,
            a także dla treści cyfrowych dostarczanych na indywidualne zamówienie,
            jeżeli ich wykonywanie rozpoczęto za wyraźną zgodą Konsumenta.
          </p>

          <div className="mt-4 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 text-sm">
            <p className="font-medium text-[var(--ink)]">
              Wzór formularza odstąpienia od umowy
            </p>
            <p className="mt-3 whitespace-pre-line">
              {`Adresat: ${company.legalName}, ${company.addressLine}, ${company.email}

Ja/My niniejszym informuję/informujemy o moim/naszym odstąpieniu od umowy sprzedaży następujących rzeczy / o świadczenie następującej usługi:

Data zawarcia umowy / odbioru:
Imię i nazwisko konsumenta(-ów):
Adres konsumenta(-ów):
Data:
Podpis (tylko jeżeli formularz jest przesyłany w wersji papierowej):`}
            </p>
          </div>
        </Section>

        <Section title="8. Reklamacje">
          <p>
            Sprzedawca ma obowiązek dostarczyć Produkt zgodny z umową. W razie
            niezgodności Klient może złożyć reklamację e-mailem na{" "}
            <a
              href={`mailto:${company.email}`}
              className="text-[var(--ink)] underline underline-offset-4 hover:text-accent"
            >
              {company.email}
            </a>
            . Reklamację rozpatrujemy w terminie 14 dni.
          </p>
        </Section>

        <Section title="9. Dane osobowe">
          <p>
            Zasady przetwarzania danych opisuje{" "}
            <Link
              href="/polityka-prywatnosci"
              className="text-[var(--ink)] underline underline-offset-4 hover:text-accent"
            >
              Polityka prywatności
            </Link>
            .
          </p>
        </Section>

        <Section title="10. Postanowienia końcowe">
          <p>
            W sprawach nieuregulowanych stosuje się przepisy prawa polskiego, w
            tym Kodeksu cywilnego oraz ustawy o prawach konsumenta. Regulamin może
            być aktualizowany — do zamówień stosuje się wersję obowiązującą w dniu
            złożenia zamówienia.
          </p>
        </Section>

        <p className="mt-10 border-t border-[var(--line)] pt-6 text-xs leading-relaxed text-[var(--ink-soft)]">
          To ogólny wzór regulaminu, a nie porada prawna. Dostosuj go do
          rzeczywistego modelu sprzedaży i skonsultuj z prawnikiem, jeśli
          prowadzisz sprzedaż konsumencką.
        </p>
      </article>
    </main>
  );
}
