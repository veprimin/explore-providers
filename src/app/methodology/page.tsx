import type { Metadata } from "next";
import Link from "next/link";
import { PageBody, PageHeader, Section } from "@/components/PageHeader";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "How We Rank Providers",
  description:
    "The criteria behind our editorial scores, what we refuse to do with them, and how pricing is verified.",
  alternates: { canonical: `${site.url}/methodology/` },
};

const criteria = [
  {
    name: "Formula and evidence",
    weight: "Heaviest",
    detail:
      "What the actives are and at what doses. Whether the product is an FDA-approved medication or a compounded combination — and whether the provider is upfront about which.",
  },
  {
    name: "Pricing transparency",
    weight: "Heavy",
    detail:
      "Whether the real cost is published before you start an intake, whether promotional pricing is clearly separated from the renewal price, and whether the consultation is bundled or billed separately.",
  },
  {
    name: "Clinical process",
    weight: "Moderate",
    detail:
      "Whether a licensed clinician reviews the intake, how contraindications such as nitrate use and cardiovascular risk are screened, and whether the dose can be adjusted afterwards.",
  },
  {
    name: "Fit and honesty about it",
    weight: "Moderate",
    detail:
      "Who the service genuinely suits. A provider that is clear about who should not use it scores better than one that markets to everyone.",
  },
];

export default function MethodologyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Methodology"
        title="How we rank providers"
        intro="Every provider on this site carries an editorial score out of 10. This page explains what goes into it — and, just as importantly, what does not."
      />

      <div className="container-shell pt-12 md:pt-16">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b-2 border-slate-300">
                <th scope="col" className="py-2 pr-4 font-semibold">Criterion</th>
                <th scope="col" className="py-2 pr-4 font-semibold">Weight</th>
                <th scope="col" className="py-2 font-semibold">What we look at</th>
              </tr>
            </thead>
            <tbody>
              {criteria.map((c) => (
                <tr key={c.name} className="border-b border-slate-200 align-top">
                  <th scope="row" className="py-3 pr-4 text-left font-medium text-slate-900">
                    {c.name}
                  </th>
                  <td className="py-3 pr-4 text-slate-600">{c.weight}</td>
                  <td className="py-3 text-slate-600">{c.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <PageBody>
        <Section heading="The score is an opinion, and we label it as one">
          <p>
            The score is our editorial assessment. It is not an average of user
            ratings, because we do not collect verified user reviews. That
            distinction has consequences we hold ourselves to:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              We never render a score as stars, and never publish it as review or
              rating structured data. Doing so would present an in-house opinion
              as aggregated user sentiment — that is fabricated review data.
            </li>
            <li>
              Every score is shown with the words &ldquo;editorial score&rdquo;
              attached, not as a bare number.
            </li>
            <li>
              Scores can move. When a provider changes its formula or its pricing
              structure, the score is reassessed.
            </li>
          </ul>
        </Section>

        <Section heading="How pricing gets onto the site">
          <p>
            A price is only marked verified once it has been checked against the
            provider&apos;s own site, and the date of that check is recorded. Any
            comparison table built from unverified figures says so underneath it.
          </p>
          <p>
            Where a provider does not publish a price before intake, we show that
            plainly rather than leaving the cell blank. A missing price is
            information about the provider.
          </p>
        </Section>

        <Section heading="What money does not do">
          <p>
            Referral fees do not influence the score, the ranking order or
            whether a criticism stays in a review. Our{" "}
            <Link href="/disclosure/" className="underline underline-offset-2">
              advertising disclosure
            </Link>{" "}
            covers the commercial side in full, and our{" "}
            <Link href="/editorial-policy/" className="underline underline-offset-2">
              editorial policy
            </Link>{" "}
            covers how content is produced and corrected.
          </p>
        </Section>

        <Section heading="Tell us when we are wrong">
          <p>
            If a figure here is out of date or a formula description is
            inaccurate, email{" "}
            <a
              href={`mailto:${site.email.editorial}`}
              className="underline underline-offset-2"
            >
              {site.email.editorial}
            </a>
            . Corrections are made promptly and the page&apos;s updated date
            changes with them.
          </p>
        </Section>
      </PageBody>
    </>
  );
}
