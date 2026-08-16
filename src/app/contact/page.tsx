import type { Metadata } from "next";
import { PageBody, PageHeader, Section } from "@/components/PageHeader";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Reach the Explore Providers team about corrections, partnerships, legal matters or general questions.",
  alternates: { canonical: `${site.url}/contact/` },
};

const desks = [
  {
    title: "Editorial and corrections",
    desc: "Factual disputes, pricing that has moved, or questions about how we scored a provider.",
    email: site.email.editorial,
  },
  {
    title: "Partnerships and advertising",
    desc: "Provider listing enquiries and affiliate partnerships.",
    email: site.email.partners,
  },
  {
    title: "Legal and privacy",
    desc: "Privacy requests, copyright notices, and other legal matters.",
    email: site.email.legal,
  },
  {
    title: "Everything else",
    desc: "General questions about the site.",
    email: site.email.general,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Get in touch"
        intro="Pick the right inbox below and we will get your message to the person who can actually answer it."
      />

      <div className="container-shell py-12 md:py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {desks.map((d) => (
            <div key={d.email} className="card flex h-full flex-col">
              <h2 className="text-base font-semibold text-slate-900">{d.title}</h2>
              <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">
                {d.desc}
              </p>
              <a
                href={`mailto:${d.email}`}
                className="mt-4 break-words text-sm font-medium text-slate-900 underline underline-offset-2"
              >
                {d.email}
              </a>
            </div>
          ))}
        </div>
      </div>

      <PageBody>
        <Section heading="Response times">
          <p>
            We aim to reply within two business days. If you are reporting a
            factual error or a legal matter, say so in the subject line and we
            will move it up the queue.
          </p>
        </Section>

        <Section heading="We cannot give medical advice">
          <p>
            We are not a medical provider and we cannot tell you whether a
            treatment is right for you, adjust a dose, or comment on your
            symptoms. For anything clinical, speak to a licensed healthcare
            professional. If you are having a medical emergency, call your local
            emergency number.
          </p>
        </Section>

        <Section heading="Provider listing requests">
          <p>
            If you represent a telehealth provider and want to be considered for
            coverage, email{" "}
            <a
              href={`mailto:${site.email.partners}`}
              className="underline underline-offset-2"
            >
              {site.email.partners}
            </a>
            . Reviews are written independently, inclusion is not guaranteed, and
            a commercial relationship does not change what we publish.
          </p>
        </Section>
      </PageBody>
    </>
  );
}
