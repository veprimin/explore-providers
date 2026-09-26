import Link from "next/link";
import type { Provider } from "@/lib/providers";
import type { ComparisonProvider } from "@/lib/content";

function Row({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="flex justify-between gap-4 border-t border-line py-2.5 text-sm">
      <dt className="text-muted">{label}</dt>
      <dd className={`text-right font-medium ${value ? "text-charcoal" : "text-slate-400"}`}>
        {value ?? "Not published"}
      </dd>
    </div>
  );
}

function price(p: Provider): string | null {
  if (p.startingPrice !== null) return `From $${p.startingPrice}/mo`;
  return p.priceNote;
}

/**
 * Provider card that sits beside the post title in the hero.
 *
 * The score is shown as labelled editorial text, never as stars or rating
 * markup (hard constraint #5). A provider whose affiliate URL is not issued
 * for this site gets no CTA, same as everywhere else.
 */
export function HeroProviderCard({ provider }: { provider: Provider }) {
  return (
    <aside className="rounded-[28px] border border-line bg-white p-6 shadow-[0_6px_24px_-12px_rgba(7,63,58,0.18)] md:p-7">
      <p className="eyebrow">Provider at a glance</p>
      <p className="mt-3 font-serif text-3xl leading-tight text-forest">{provider.name}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted">{provider.bestFor}</p>
      <dl className="mt-5">
        <Row label="Editorial score" value={`${provider.editorialScore}/10`} />
        <Row label="Format" value={provider.format} />
        <Row label="Onset" value={provider.onset} />
        <Row label="Price" value={price(provider)} />
      </dl>
      {provider.affiliateReady && (
        <a href={`/go/${provider.slug}/`} rel="sponsored nofollow" className="cta-button mt-5 w-full">
          {provider.ctaLabel}
        </a>
      )}
      <p className="mt-4 text-xs leading-5 text-muted">
        Score is our editorial opinion, not a user rating.{" "}
        <Link href="/disclosure/" className="underline underline-offset-2">
          We may earn a commission
        </Link>
        .
      </p>
    </aside>
  );
}

/** Two-provider variant for the imported "X vs Y" comparisons. */
export function HeroComparisonCard({ providers }: { providers: ComparisonProvider[] }) {
  return (
    <aside className="rounded-[28px] border border-line bg-white p-6 shadow-[0_6px_24px_-12px_rgba(7,63,58,0.18)] md:p-7">
      <p className="eyebrow">Compare providers</p>
      <ul className="mt-4 divide-y divide-line">
        {providers.map((p, i) => (
          <li key={p.url} className="py-4 first:pt-1 last:pb-0">
            <p className="font-serif text-2xl leading-tight text-forest">{p.name}</p>
            {p.summary && <p className="mt-1 text-sm leading-relaxed text-muted">{p.summary}</p>}
            <a
              href={p.url}
              rel="sponsored nofollow"
              target="_blank"
              className={`cta-button mt-3 w-full ${i > 0 ? "cta-button--alt" : ""}`}
            >
              Visit {p.name}
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs leading-5 text-muted">
        Links to providers are paid placements —{" "}
        <Link href="/disclosure/" className="underline underline-offset-2">
          advertising disclosure
        </Link>
        .
      </p>
    </aside>
  );
}
