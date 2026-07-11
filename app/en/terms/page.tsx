import type { Metadata } from "next";
import Link from "next/link";
import { company } from "@/lib/company";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Shop terms — ordering, prices, payment, fulfilment, the right of withdrawal and complaints.",
  alternates: {
    canonical: "/en/terms",
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

export default function TermsPage() {
  return (
    <main className="pt-28">
      <article className="mx-auto max-w-3xl px-6 pb-24">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
          Shop
        </p>
        <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          Terms of Service
        </h1>
        <p className="mt-4 text-sm text-[var(--ink-soft)]">
          Last updated: July 11, 2026
        </p>

        <Section title="1. Seller">
          <p>
            The shop is run by <strong>{company.legalName}</strong>,{" "}
            {company.addressLine}, Poland, VAT&nbsp;ID&nbsp;(NIP)&nbsp;
            {company.nip} (the &ldquo;Seller&rdquo;). Contact: email{" "}
            <a
              href={`mailto:${company.email}`}
              className="text-[var(--ink)] underline underline-offset-4 hover:text-accent"
            >
              {company.email}
            </a>
            , phone{" "}
            <a
              href={`tel:${company.phoneE164}`}
              className="text-[var(--ink)] underline underline-offset-4 hover:text-accent"
            >
              {company.phoneDisplay}
            </a>
            .
          </p>
        </Section>

        <Section title="2. Placing an order">
          <p>
            You add products to the cart and place an order once logged in.
            Placing an order is an invitation to conclude a contract — after
            receiving it, the Seller contacts you to confirm scope, timeline and
            payment. The contract is concluded once the Seller confirms the order
            for fulfilment.
          </p>
        </Section>

        <Section title="3. Prices and payment">
          <p>
            Prices are shown in Polish złoty (PLN). Promotional prices apply for
            the duration of the promotion. The method and date of payment are
            agreed individually after the order is placed; the shop does not
            charge automatically at checkout.
          </p>
        </Section>

        <Section title="4. Fulfilment">
          <p>
            The timeline and scope are agreed after the order is confirmed. You
            can track progress and message the Seller in your panel, in the order
            details.
          </p>
        </Section>

        <Section title="5. Right of withdrawal (14 days)">
          <p>
            A consumer who concluded a distance contract may withdraw from it
            within <strong>14 days</strong> without giving a reason, by sending a
            statement to the Seller (e.g. by email at{" "}
            <a
              href={`mailto:${company.email}`}
              className="text-[var(--ink)] underline underline-offset-4 hover:text-accent"
            >
              {company.email}
            </a>
            ). The Seller refunds payments within 14 days of receiving the
            statement.
          </p>
          <p>
            <strong>Exceptions.</strong> The right of withdrawal does not apply,
            among others, to service contracts fully performed with the
            consumer&rsquo;s express prior consent and acknowledgement of losing
            that right, and to bespoke digital content whose delivery began with
            the consumer&rsquo;s express consent.
          </p>
        </Section>

        <Section title="6. Complaints">
          <p>
            The Seller must deliver a product that conforms to the contract.
            Complaints can be sent by email to{" "}
            <a
              href={`mailto:${company.email}`}
              className="text-[var(--ink)] underline underline-offset-4 hover:text-accent"
            >
              {company.email}
            </a>{" "}
            and are handled within 14 days.
          </p>
        </Section>

        <Section title="7. Personal data">
          <p>
            Data processing is described in the{" "}
            <Link
              href="/en/privacy"
              className="text-[var(--ink)] underline underline-offset-4 hover:text-accent"
            >
              Privacy policy
            </Link>
            .
          </p>
        </Section>

        <p className="mt-10 border-t border-[var(--line)] pt-6 text-xs leading-relaxed text-[var(--ink-soft)]">
          This is a general template, not legal advice. Adapt it to your actual
          sales model and consult a lawyer for consumer sales.
        </p>
      </article>
    </main>
  );
}
