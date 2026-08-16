import Link from "next/link";
import type { Provider } from "@/lib/providers";

/**
 * Sidebar rail on article pages. Server-rendered from the same provider
 * records as the comparison table — no client JS, and one source of truth for
 * ordering.
 */
export function ProviderAside({
  providers,
  heading,
  currentSlug,
}: {
  providers: Provider[];
  heading: string;
  currentSlug?: string;
}) {
  // Rank is taken from the full ordered list before anything is filtered out.
  // Numbering the filtered list instead renumbers everything below the current
  // provider, so the second-ranked provider shows as "1" on the top-ranked
  // provider's page — while the rail claims to be ordered by editorial score.
  // A provider without a usable affiliate URL still belongs in the ranking —
  // dropping it would leave a visible gap in the numbering — it just does not
  // get a link, because the click would be credited to another property.
  const list = providers
    .map((provider, index) => ({ provider, rank: index + 1 }))
    .filter(({ provider }) => provider.slug !== currentSlug)
    .slice(0, 5);
  if (list.length === 0) return null;

  return (
    <aside className="lg:sticky lg:top-8">
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          {heading}
        </h2>
        <ol className="mt-4 space-y-4">
          {list.map(({ provider: p, rank }) => (
            <li key={p.slug} className="flex gap-3">
              <span
                aria-hidden="true"
                className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white"
              >
                {rank}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-900">{p.name}</p>
                <p className="mt-1 text-xs leading-5 text-slate-600">{p.bestFor}</p>
                {p.affiliateReady && (
                  <a
                    href={`/go/${p.slug}/`}
                    rel="sponsored nofollow"
                    className="mt-2 inline-block text-xs font-medium text-slate-900 underline underline-offset-2"
                  >
                    {p.ctaLabel}
                  </a>
                )}
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-5 border-t border-slate-200 pt-4 text-xs leading-5 text-slate-500">
          Ordered by our editorial score, not by user ratings.{" "}
          <Link href="/methodology/" className="underline underline-offset-2">
            How we rank
          </Link>
          . Links to providers are paid placements — see our{" "}
          <Link href="/disclosure/" className="underline underline-offset-2">
            advertising disclosure
          </Link>
          .
        </p>
      </div>
    </aside>
  );
}
