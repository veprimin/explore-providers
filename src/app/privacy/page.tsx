import type { Metadata } from "next";
import Link from "next/link";
import { PageBody, PageHeader, Section } from "@/components/PageHeader";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Explore Providers collects, uses, shares and protects information about you when you use this site.",
  alternates: { canonical: `${site.url}/privacy/` },
};

const LAST_UPDATED = "August 2026";

export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy Policy" lastUpdated={LAST_UPDATED} />

      <PageBody>
        <p>
          This policy describes how Explore Providers (&ldquo;we&rdquo;,
          &ldquo;us&rdquo;) collects, uses and shares information about you when
          you use exploreproviders.com (the &ldquo;Site&rdquo;). By using the
          Site you agree to the practices described here.
        </p>

        <Section heading="1. Information we collect">
          <p>
            <strong>Information you give us.</strong> If you email us or submit a
            form, we receive whatever you send — typically your name, email
            address and the content of your message.
          </p>
          <p>
            <strong>Information collected automatically.</strong> When you visit
            the Site we collect technical information including:
          </p>
          <ul className="list-disc space-y-1.5 pl-6">
            <li>IP address and approximate geographic location</li>
            <li>Browser type and version, and operating system</li>
            <li>Pages visited and time spent on each</li>
            <li>The referring URL you arrived from</li>
            <li>Links clicked, including clicks through to providers</li>
            <li>UTM parameters and other marketing attribution data</li>
          </ul>
        </Section>

        <Section heading="2. Cookies and similar technologies">
          <p>
            We use cookies, pixels and browser storage to run the Site, measure
            how it is used, and attribute referrals. Broadly there are three
            kinds:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>Essential</strong> — required for the Site to function.
            </li>
            <li>
              <strong>Analytics</strong> — help us understand aggregate usage.
            </li>
            <li>
              <strong>Affiliate and marketing</strong> — set when you click a
              provider link, so a referral can be attributed.
            </li>
          </ul>
          <p>
            You can control cookies through your browser settings. Disabling
            them may affect how parts of the Site work.
          </p>
        </Section>

        <Section heading="3. How we use information">
          <ul className="list-disc space-y-1.5 pl-6">
            <li>To operate, maintain and improve the Site</li>
            <li>To respond to your enquiries</li>
            <li>To analyse traffic and improve our content</li>
            <li>To attribute affiliate referrals accurately</li>
            <li>To detect and prevent fraud or abuse</li>
            <li>To comply with legal obligations</li>
          </ul>
        </Section>

        <Section heading="4. Health information">
          <p>
            Explore Providers is a comparison and referral site. We are not a
            covered entity under HIPAA. Because the Site discusses healthcare
            services, however, you may end up telling us something health-related
            — for example, the condition you are researching. We treat that with
            additional care:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>We do not sell health-related information you share with us.</li>
            <li>
              Health details you send us are used to answer you, not to target
              unrelated advertising.
            </li>
            <li>
              When you click through to a provider, that provider&apos;s own
              privacy practices govern anything you share with them directly.
              Read their notice before submitting an intake form.
            </li>
          </ul>
        </Section>

        <Section heading="5. Sharing your information">
          <p>We do not sell your personal information. We share it only:</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>With service providers</strong> who help us run the Site,
              such as analytics and email vendors, under contract.
            </li>
            <li>
              <strong>With affiliate networks</strong>, when you click a provider
              link — limited technical data so the referral can be attributed.
            </li>
            <li>
              <strong>Where the law requires it</strong>, such as a court order.
            </li>
            <li>
              <strong>In a business transfer</strong>, if the site is merged with
              or acquired by another entity.
            </li>
          </ul>
        </Section>

        <Section heading="6. Third-party services">
          <p>
            The Site uses third-party analytics and affiliate platforms. These
            collect information independently under their own privacy policies.
          </p>
        </Section>

        <Section heading="7. Data retention">
          <p>
            We keep information only as long as needed for the purposes above,
            unless a longer period is required by law. Analytics data is
            typically retained for 26 months; email correspondence for up to two
            years.
          </p>
        </Section>

        <Section heading="8. Your rights">
          <p>
            Depending on where you live, you may have the right to access,
            correct, delete or port your personal data, and to opt out of certain
            processing. To exercise any of these, email{" "}
            <a
              href={`mailto:${site.email.legal}`}
              className="underline underline-offset-2"
            >
              {site.email.legal}
            </a>
            .
          </p>
        </Section>

        <Section heading="9. California residents">
          <p>
            Under the CCPA you have the right to know what personal information
            we collect and how it is used, to have it deleted, and to opt out of
            its sale. We do not sell personal information. Submit requests to{" "}
            <a
              href={`mailto:${site.email.legal}`}
              className="underline underline-offset-2"
            >
              {site.email.legal}
            </a>
            .
          </p>
        </Section>

        <Section heading="10. Children">
          <p>
            The Site is not directed to anyone under 13 and we do not knowingly
            collect information from children. If you believe we have, contact us
            and we will delete it.
          </p>
        </Section>

        <Section heading="11. Security">
          <p>
            We use reasonable technical and organisational measures to protect
            information. No method of transmission or storage is completely
            secure, and we cannot guarantee absolute security.
          </p>
        </Section>

        <Section heading="12. Changes to this policy">
          <p>
            We may update this policy. When we do, we revise the
            &ldquo;last updated&rdquo; date above. Continued use of the Site
            after a change means you accept the revised policy.
          </p>
        </Section>

        <Section heading="13. Contact">
          <p>
            Questions about this policy? Email{" "}
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
