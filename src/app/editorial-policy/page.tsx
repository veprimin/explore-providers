import type { Metadata } from "next";
import Link from "next/link";
import { PageBody, PageHeader, Section } from "@/components/PageHeader";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Editorial Policy",
  description:
    "How Explore Providers writes, reviews and corrects health content, and the standards every page has to meet.",
  alternates: { canonical: `${site.url}/editorial-policy/` },
};

export default function EditorialPolicyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Standards"
        title="Editorial Policy"
        intro="This is health content about prescription treatments. These are the rules we hold our own pages to."
        lastUpdated="August 2026"
      />

      <PageBody>
        <Section heading="Medical review">
          <p>
            Pages covering prescription treatments are reviewed by a licensed
            clinician before publication. The reviewer is named on the page, next
            to the author. A page without a named, credentialed reviewer stays
            unpublished — we do not publish health content and add the review
            afterwards.
          </p>
          <p>
            Medical review checks factual and safety claims. It is not an
            endorsement of any provider, and reviewers have no involvement in
            scoring or commercial decisions.
          </p>
        </Section>

        <Section heading="Sourcing claims">
          <p>
            Claims about how a drug works, what it is approved for, and its risk
            profile are sourced to primary references — the FDA, NIH, PubMed and
            peer-reviewed journals — not to a provider&apos;s marketing page.
          </p>
          <p>
            Claims about a specific service — its formula, price, shipping,
            availability — are sourced to that provider and attributed as such.
            When a provider is the only source for a figure, we say so rather
            than presenting it as independently established.
          </p>
        </Section>

        <Section heading="Compounded medications">
          <p>
            Many treatments covered here are compounded combinations. We state
            plainly, on every page where it applies, that compounded products are
            not FDA-approved as finished combination products even when their
            individual ingredients are approved. That distinction is material to
            a reader&apos;s decision and it never gets buried.
          </p>
        </Section>

        <Section heading="What we will not publish">
          <ul className="list-disc space-y-2 pl-6">
            <li>
              Prices we have not checked. Unverified figures are labelled as such
              or left out.
            </li>
            <li>
              Editorial scores dressed up as user ratings, in any form —
              including review structured data.
            </li>
            <li>
              Efficacy claims a provider cannot support, repeated as if they were
              established fact.
            </li>
            <li>
              Thin, templated comparison pages produced at scale. The previous
              version of this site did that; it is why the content was rebuilt.
            </li>
            <li>
              Anything that reads as personalised medical advice.
            </li>
          </ul>
        </Section>

        <Section heading="Updates and corrections">
          <p>
            Provider pricing and formulas change often. Pages carry the date they
            were last updated, and that date moves only when the content actually
            changes.
          </p>
          <p>
            If we get something wrong we correct it and update the page date. For
            a material change to a factual claim, we note what changed. Report an
            error to{" "}
            <a
              href={`mailto:${site.email.editorial}`}
              className="underline underline-offset-2"
            >
              {site.email.editorial}
            </a>
            .
          </p>
        </Section>

        <Section heading="Independence">
          <p>
            Advertisers get no preview, no approval and no veto. See our{" "}
            <Link href="/disclosure/" className="underline underline-offset-2">
              advertising disclosure
            </Link>{" "}
            and{" "}
            <Link href="/methodology/" className="underline underline-offset-2">
              ranking methodology
            </Link>
            .
          </p>
        </Section>
      </PageBody>
    </>
  );
}
