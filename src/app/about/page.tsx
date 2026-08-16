import type { Metadata } from "next";
import Link from "next/link";
import { PageBody, PageHeader, Section } from "@/components/PageHeader";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Who runs Explore Providers, how we choose which telehealth providers to cover, and how we make money.",
  alternates: { canonical: `${site.url}/about/` },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="About Explore Providers"
        intro="We compare online telehealth providers so you can see what a treatment actually involves, what it costs, and where the trade-offs are — before you hand over a card."
      />

      <PageBody>
        <Section heading="What we do">
          <p>
            Explore Providers reviews and compares telehealth companies that
            prescribe treatments for erectile dysfunction and weight management.
            Every provider we cover is assessed on the same points: what is
            actually in the treatment, how fast it works, how long it lasts,
            what it costs, and what the provider does not tell you up front.
          </p>
          <p>
            We are not a clinic and we do not prescribe anything. Nothing on
            this site is medical advice — see our{" "}
            <Link href="/terms/" className="underline underline-offset-2">
              Terms of Use
            </Link>
            .
          </p>
        </Section>

        <Section heading="What we changed, and why">
          <p>
            An earlier version of this site published several hundred
            near-identical &ldquo;X vs Y&rdquo; comparison pages generated from
            a template. They were thin, they repeated each other, and most of
            them never helped a single reader. We removed them rather than
            migrate them.
          </p>
          <p>
            What is left is a smaller set of pages that each cover one provider
            or one decision properly. If a page here is not more useful than the
            provider&apos;s own marketing, it should not exist.
          </p>
        </Section>

        <Section id="methodology" heading="How we score providers">
          <p>
            Each provider carries an <strong>editorial score out of 10</strong>.
            It is our assessment, assigned by our editorial team — not an
            average of user ratings, and not a clinical judgement. We hold no
            verified user reviews, so we never present these scores as star
            ratings or emit them as review data.
          </p>
          <p>The score weighs four things:</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>Formula and evidence.</strong> What the actives are, at
              what doses, and whether the product is an FDA-approved medication
              or a compounded combination.
            </li>
            <li>
              <strong>Pricing transparency.</strong> Whether the real cost is
              published before intake, and whether promotional pricing is
              distinguishable from what renews.
            </li>
            <li>
              <strong>Clinical process.</strong> Whether a licensed clinician
              reviews the intake, and how contraindications are screened.
            </li>
            <li>
              <strong>Fit.</strong> Who the provider genuinely suits, which is
              rarely everybody.
            </li>
          </ul>
          <p>
            A fuller breakdown, including how commercial relationships are kept
            out of the score, is on the{" "}
            <Link href="/methodology/" className="underline underline-offset-2">
              methodology page
            </Link>
            .
          </p>
        </Section>

        <Section heading="How we make money">
          <p>
            When you click through to a provider and sign up, we may earn a
            referral fee. It costs you nothing extra, and it does not buy a
            better score or a higher position. Our{" "}
            <Link href="/disclosure/" className="underline underline-offset-2">
              advertising disclosure
            </Link>{" "}
            explains the arrangement in full.
          </p>
        </Section>

        <Section heading="Corrections">
          <p>
            If something here is wrong — a price, a formula, a claim about how a
            service works — tell us and we will fix it. Email{" "}
            <a
              href={`mailto:${site.email.editorial}`}
              className="underline underline-offset-2"
            >
              {site.email.editorial}
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
