import type { Metadata } from "next";
import { company } from "@/lib/company";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How I handle data from the contact form. A simple, honest privacy note.",
  alternates: {
    canonical: "/en/privacy",
    languages: { "pl-PL": "/polityka-prywatnosci", en: "/en/privacy" },
  },
  robots: { index: false, follow: true },
};

const EMAIL = "kontakt@programujzmateuszem.pl";

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

export default function EnPrivacyPage() {
  return (
    <main className="pt-28">
      <article className="mx-auto max-w-3xl px-6 pb-24">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
          Privacy
        </p>
        <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          Privacy policy
        </h1>
        <p className="mt-4 text-sm text-[var(--ink-soft)]">
          Last updated: July 1, 2026
        </p>

        <Section title="Data controller">
          <p>
            The data controller is {company.legalName}, {company.addressLine},
            Poland, VAT&nbsp;ID&nbsp;(NIP)&nbsp;{company.nip}. For anything about
            privacy, email me at{" "}
            <a
              href={`mailto:${EMAIL}`}
              className="text-[var(--ink)] underline underline-offset-4 hover:text-accent"
            >
              {EMAIL}
            </a>{" "}
            or call{" "}
            <a
              href={`tel:${company.phoneE164}`}
              className="text-[var(--ink)] underline underline-offset-4 hover:text-accent"
            >
              {company.phoneDisplay}
            </a>
            .
          </p>
        </Section>

        <Section title="What data I collect">
          <p>
            Only what you enter in the contact form: your name, email address and
            the message. Providing it is voluntary but necessary for me to reply.
          </p>
        </Section>

        <Section title="Why I process it">
          <p>
            I use the data solely to get back to you and answer your inquiry. I
            don&apos;t sell it or use it for marketing without your consent.
          </p>
        </Section>

        <Section title="Who else processes it">
          <p>
            The form is handled by Web3Forms — your message passes through their
            system and lands in my inbox. Beyond that, I use email to carry on the
            conversation.
          </p>
        </Section>

        <Section title="How long I keep it">
          <p>
            I keep correspondence for as long as it&apos;s needed to handle your
            case, then for a reasonable time in case of follow-ups. You can ask me
            to delete it at any point.
          </p>
        </Section>

        <Section title="Your rights">
          <p>
            You have the right to access your data, correct it, delete it and
            object to processing. To exercise these, email me at the address
            above.
          </p>
        </Section>

        <Section title="Cookies and analytics">
          <p>
            This site uses no tracking cookies and no third-party analytics. I
            don&apos;t profile visitors.
          </p>
        </Section>

        <Section title="Changes">
          <p>
            I may update this policy from time to time — the version with the date
            shown at the top applies.
          </p>
        </Section>

        <p className="mt-10 border-t border-[var(--line)] pt-6 text-xs leading-relaxed text-[var(--ink-soft)]">
          This is general privacy information, not legal advice. If you run a
          business, it&apos;s worth tailoring it to your situation.
        </p>
      </article>
    </main>
  );
}
