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
  startingPrice: number | null;
  priceNote: string | null;
  affiliateUrl: string;
  ctaLabel: string;
  logo: string;
  /** ISO date the pricing was last checked against the provider's own site. */
  lastVerified: string | null;
  pros: string[];
  cons: string[];
}

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
