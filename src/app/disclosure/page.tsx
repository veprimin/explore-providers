import type { Metadata } from "next";
import Link from "next/link";
import { PageBody, PageHeader, Section } from "@/components/PageHeader";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Advertising Disclosure",
  description:
    "How Explore Providers earns money, what our provider relationships are, and what they do and do not affect.",
  alternates: { canonical: `${site.url}/disclosure/` },
};

export default function DisclosurePage() {
  return (
    <>
      <PageHeader
        eyebrow="Transparency"
        title="Advertising Disclosure"
        intro="We take referral fees from some of the providers on this site. Here is exactly how that works and where the line sits."
        lastUpdated="August 2026"
      />

      <PageBody>
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-900">
          <p className="font-semibold">In short</p>
          <p className="mt-1">
            This site contains affiliate links. If you click through to a
            provider and sign up, we may be paid a referral fee. It costs you
            nothing extra, and it does not buy a better score.
          </p>
        </div>

        <Section heading="How we make money">
          <p>
            Explore Providers earns almost all of its revenue from affiliate
            referrals. When a reader clicks through to a telehealth provider and
            completes a signup or purchase, the provider or its affiliate network
            may pay us a fee.
          </p>
          <p>
            Every outbound provider link on this site routes through{" "}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm">
              /go/
            </code>{" "}
            and is marked <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm">
              rel=&quot;sponsored nofollow&quot;
            </code>
            , so both you and search engines can tell a paid link from an
            editorial one.
          </p>
        </Section>

        <Section heading="What this means for you">
          <ul className="list-disc space-y-2 pl-6">
            <li>
              You pay the same price whether you come through us or go direct.
            </li>
            <li>
              Fees do not set our rankings. A provider that pays more does not
              move up.
            </li>
            <li>
              We may earn more from some providers than others. That difference
              is not reflected in any score.
            </li>
            <li>
              Where a provider we rate well has no commercial relationship with
              us, we still cover it.
            </li>
          </ul>
        </Section>

        <Section heading="Editorial independence">
          <p>
            Providers do not see reviews before they publish, and they do not get
            approval over wording, scores or rankings. If a provider asks us to
            raise a score, drop a criticism or pull a page in exchange for
            continued spend, we decline. The point of the site is that a reader
            can trust what it says.
          </p>
          <p>
            Any provider can ask us to correct a factual error — a price, a
            formula, an availability claim. Verified corrections are made
            promptly. Email{" "}
            <a
              href={`mailto:${site.email.editorial}`}
              className="underline underline-offset-2"
            >
              {site.email.editorial}
            </a>
            .
          </p>
        </Section>

        <Section heading="Scores are opinion, not user ratings">
          <p>
            Our editorial scores are assigned by our own team. We do not collect
            verified user reviews, so we never render these scores as star
            ratings and never publish them as review structured data. Presenting
            an in-house opinion as aggregated user sentiment would be fabricated
            review data, and we will not do it. See the{" "}
            <Link href="/methodology/" className="underline underline-offset-2">
              methodology page
            </Link>
            .
          </p>
        </Section>

        <Section heading="FTC compliance">
          <p>
            In line with the FTC&apos;s Guides Concerning the Use of Endorsements
            and Testimonials in Advertising (16 CFR Part 255), we disclose the
            material connections between this site and the providers reviewed
            here. This page, together with the disclosure in the footer of every
            page and the sponsored marking on outbound links, is that disclosure.
          </p>
        </Section>

        <Section heading="Questions">
          <p>
            If anything about our commercial arrangements is unclear, ask.{" "}
            <Link href="/contact/" className="underline underline-offset-2">
              Contact the editorial team
            </Link>
            .
          </p>
        </Section>
      </PageBody>
    </>
  );
}
