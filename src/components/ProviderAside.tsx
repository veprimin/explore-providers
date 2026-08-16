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
  const list = providers.filter((p) => p.slug !== currentSlug).slice(0, 5);
  if (list.length === 0) return null;

  return (
    <aside className="lg:sticky lg:top-8">
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          {heading}
        </h2>
        <ol className="mt-4 space-y-4">
          {list.map((p, i) => (
            <li key={p.slug} className="flex gap-3">
              <span
                aria-hidden="true"
                className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white"
              >
                {i + 1}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-900">{p.name}</p>
                <p className="mt-1 text-xs leading-5 text-slate-600">{p.bestFor}</p>
                <a
                  href={`/go/${p.slug}/`}
                  rel="sponsored nofollow"
                  className="mt-2 inline-block text-xs font-medium text-slate-900 underline underline-offset-2"
                >
                  {p.ctaLabel}
                </a>
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
