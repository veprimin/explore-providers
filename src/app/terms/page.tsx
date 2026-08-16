import type { Metadata } from "next";
import Link from "next/link";
import { PageBody, PageHeader, Section } from "@/components/PageHeader";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "The terms governing access to Explore Providers, including our medical disclaimer and limitation of liability.",
  alternates: { canonical: `${site.url}/terms/` },
};

const LAST_UPDATED = "August 2026";

export default function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms of Use" lastUpdated={LAST_UPDATED} />

      <PageBody>
        <p>
          Please read these Terms of Use (&ldquo;Terms&rdquo;) before using
          exploreproviders.com (the &ldquo;Site&rdquo;). By accessing the Site
          you agree to be bound by them. If you do not agree, please do not use
          the Site.
        </p>

        <Section heading="1. Acceptance">
          <p>
            Using the Site means you accept these Terms and our{" "}
            <Link href="/privacy/" className="underline underline-offset-2">
              Privacy Policy
            </Link>
            . We may update these Terms; continued use after a change is
            acceptance of it.
          </p>
        </Section>

        <Section heading="2. This is not medical advice">
          <p>
            Everything on this Site is for general information and education
            only. Nothing here is medical advice, diagnosis or treatment, and
            nothing here creates a doctor-patient relationship. Always speak to a
            qualified healthcare professional before starting, changing or
            stopping any treatment.
          </p>
          <p>
            Our provider scores and rankings reflect consumer-facing research —
            formula, price, process and fit. They are not clinical assessments
            and they are not a recommendation for your individual situation.
          </p>
        </Section>

        <Section heading="3. Affiliate links and compensation">
          <p>
            This Site contains affiliate links. If you click through to a
            provider and sign up, we may earn a referral fee. This does not
            change the price you pay. See our{" "}
            <Link href="/disclosure/" className="underline underline-offset-2">
              advertising disclosure
            </Link>{" "}
            for the details.
          </p>
        </Section>

        <Section heading="4. Accuracy of information">
          <p>
            Telehealth providers change pricing, formulas and availability
            frequently. We work to keep this Site current but make no warranty
            that it is complete or error-free. Verify anything that matters to
            your decision directly with the provider before you buy.
          </p>
        </Section>

        <Section heading="5. Intellectual property">
          <p>
            The content on this Site is owned by Explore Providers or its
            suppliers and is protected by intellectual property law. You may not
            reproduce, distribute or create derivative works from it beyond
            personal, non-commercial use without our written permission.
          </p>
        </Section>

        <Section heading="6. Third-party links">
          <p>
            We link to third-party sites, including telehealth providers. We do
            not control them and are not responsible for their content, pricing,
            privacy practices or terms.
          </p>
        </Section>

        <Section heading="7. Limitation of liability">
          <p>
            To the fullest extent permitted by law, Explore Providers is not
            liable for any indirect, incidental, special, consequential or
            punitive damages arising from your use of, or inability to use, this
            Site. That includes damages arising from reliance on provider
            information, health decisions made on the basis of Site content, or
            transactions with third-party providers found through this Site.
          </p>
        </Section>

        <Section heading="8. Disclaimer of warranties">
          <p>
            The Site and its content are provided &ldquo;as is&rdquo; and
            &ldquo;as available&rdquo; without warranties of any kind, express or
            implied, including merchantability, fitness for a particular purpose
            and non-infringement.
          </p>
        </Section>

        <Section heading="9. Acceptable use">
          <p>You agree not to use this Site to:</p>
          <ul className="list-disc space-y-1.5 pl-6">
            <li>Engage in unlawful activity</li>
            <li>Transmit harmful, offensive or disruptive content</li>
            <li>Scrape or harvest data without our written consent</li>
            <li>Attempt to gain unauthorised access to the Site or its systems</li>
            <li>Impersonate any person or entity</li>
          </ul>
        </Section>

        <Section heading="10. Governing law">
          <p>
            These Terms are governed by the laws of the United States, without
            regard to conflict of law principles.
          </p>
        </Section>

        <Section heading="11. Contact">
          <p>
            Questions about these Terms? Email{" "}
            <a
              href={`mailto:${site.email.legal}`}
              className="underline underline-offset-2"
            >
              {site.email.legal}
            </a>{" "}
            or use the{" "}
            <Link href="/contact/" className="underline underline-offset-2">
              contact page
            </Link>
            .
          </p>
        </Section>
      </PageBody>
    </>
  );
}
