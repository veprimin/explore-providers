import providersEd from "@/data/providers-ed.json";

export type Vertical = "ed" | "glp-1";

export interface Provider {
  slug: string;
  name: string;
  vertical: Vertical;
  partner: boolean;
  /**
   * Our own editorial assessment, 0-10. This is deliberately NOT a user rating:
   * it is never emitted as AggregateRating structured data, because we have no
   * verified user reviews to back it.
   */
  editorialScore: number;
  bestFor: string;
  format: string | null;
  onset: string | null;
  duration: string | null;
  /** Advertised "from" price where the provider publishes a monthly figure. */
  startingPrice: number | null;
  /**
   * Reader-facing summary of what the provider advertises — pack pricing,
   * per-dose cost, promotions. Rendered in the comparison table, so keep it
   * factual and short. Editorial to-dos do not belong here; an unchecked price
   * is expressed by `lastVerified: null`.
   */
  priceNote: string | null;
  affiliateUrl: string;
  ctaLabel: string;
  logo: string;
  /** ISO date the pricing was last checked against the provider's own site. */
  lastVerified: string | null;
  pros: string[];
  cons: string[];
}

/*
 * Provenance of the ED records, because the two halves came from different
 * places and carry different levels of confidence:
 *
 * - `affiliateUrl` for the eight providers with a legacy page was recovered
 *   from the live WordPress posts, so each keeps ExploreProviders' own sub-ID
 *   (`source_id=explore_providers`, `source=ep_reviews`, …) and attribution is
 *   unchanged from what the old site was earning on. Omzo and BetterMe Rx QMAX
 *   have no legacy page; their URLs come from the sister exploretreatments
 *   dataset and carry that site's sub-IDs, so they need re-issuing per network
 *   before either gets traffic.
 * - Pricing, formats and onset figures come from the sister repo
 *   `coachingautomation-design/new-design-next` (`data/providers/ed-care.ts`),
 *   which is the organisation's maintained provider dataset and is checked
 *   against the providers there. `lastVerified` is set to the date those
 *   figures were taken from it. Re-check when a provider changes its plans.
 */
const all: Provider[] = [...(providersEd as Provider[])];

const bySlug = new Map(all.map((p) => [p.slug, p]));

export function getProvider(slug: string): Provider | undefined {
  return bySlug.get(slug);
}

export function getProviders(vertical?: Vertical): Provider[] {
  const list = vertical ? all.filter((p) => p.vertical === vertical) : all;
  return [...list].sort((a, b) => b.editorialScore - a.editorialScore);
}

export function getPartners(vertical?: Vertical): Provider[] {
  return getProviders(vertical).filter((p) => p.partner);
}

/** Providers whose pricing has no verification date, or is older than `days`. */
export function getStalePricing(days = 30): Provider[] {
  const cutoff = Date.now() - days * 86_400_000;
  return all.filter(
    (p) => !p.lastVerified || new Date(p.lastVerified).getTime() < cutoff,
  );
}
