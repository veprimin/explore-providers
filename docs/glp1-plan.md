# GLP-1 build plan (handoff)

Groundwork for the GLP-1 vertical. No GLP-1 pages exist yet; this doc is the
spec so the work can be picked up without re-deriving decisions.

## Scope — core GLP-1 only

Weight-loss GLP-1 reviews only. The TRT / testosterone / meal-kit rows tagged
`GLP-1` in [`url-map.csv`](url-map.csv) are **deferred** with NAD/TRT (per
CLAUDE.md "Order of work").

**Build these (core GLP-1):**

| Slug | Brand | Lifetime clicks | Notes |
|---|---|---|---|
| `yucca-health-review` | Yucca Health | 80 | Highest-traffic GLP-1 URL — build first |
| `maximus-review` | Maximus | 13 | Verify vertical against the dataset — Maximus skews testosterone; keep only if it is genuinely a GLP-1 offering, else defer with TRT |
| `fridays-review` | JoinFridays | 0 | |
| `medvi-review` | MedVi | 0 | |
| `mochi-review` | Mochi Health | 0 | |
| `ro-review` | Ro.co | 0 | Distinct from the ED `ro` provider — separate GLP-1 record/slug |
| `sesame-care-review` | Sesame Care | 0 | |
| `sprout-health-review` | Sprout Health | 0 | |
| `willow-review` | Willow | 0 | |

**Consolidate:** `yucca-health-reviews-2026-is-this-compounded-glp-1-semaglutide-tirzepatide-telehealth-platform-worth-it`
(0 clicks) is a duplicate of `yucca-health-review`. Do **not** build a second
page — add a single-hop 301 to `yucca-health-review` in
[`../src/data/redirects.json`](../src/data/redirects.json), matching the
established consolidation pattern.

**Defer (do not build now):** `medvi-meals-review-2026-…`,
`fridays-testosterone-test-review-2026-…`, `fridays-trt-review-2026-…`,
`maximus-review-expert-guided-ed-mens-performance-programs`.

## Data source

The org's maintained dataset is **`coachingautomation-design/new-design-next`**
— the source of truth for all verticals (ED came from
`data/providers/ed-care.ts`). Pull the GLP-1 provider records from there; find
the GLP-1 equivalent file under `data/providers/`.

This repo's session is scoped to `veprimin/explore-providers` and **cannot**
read that private repo (cross-owner add + MCP scope both block it). Extract the
GLP-1 records in a session that has access to `new-design-next`, then bring the
data here.

## Provider record shape

New file `src/data/providers-glp1.json`, typed by the existing `Provider`
interface in [`../src/lib/providers.ts`](../src/lib/providers.ts). Wire it in
with a second spread in `providers.ts` (`[...providersEd, ...providersGlp1]`).
`vertical: "glp-1"` is already a valid value and the category route already maps
`glp-1 → glp-1`.

Each record needs, taken from the dataset (never invented):

- `slug`, `name`, `vertical: "glp-1"`, `partner`
- `editorialScore` (editorial, 0–10 — never emitted as `AggregateRating`)
- `bestFor`, `format` (e.g. compounded/branded semaglutide / tirzepatide),
  `onset`, `duration`
- `startingPrice`, `priceNote`, `lastVerified` — **only if verified against the
  provider's own site**; otherwise `startingPrice: null`, `priceNote: null`,
  `lastVerified: null` → renders "Not published"
- `affiliateUrl`, `affiliateReady` — `affiliateReady: false` until a real URL
  for this property is confirmed; the record still shows in tables, just no CTA
- `ctaLabel`, `logo` (single host, `assets.exploreproviders.com/logos`)
- `pros[]`, `cons[]`

## Hard constraints (from CLAUDE.md — do not relax)

- **#5** Never emit `AggregateRating` structured data.
- **#6** Never publish unverified pricing — missing values render "Not
  published", and `lastVerified` is set only when checked.
- **#7** YMYL content needs a **named, credentialed medical reviewer**. Posts
  without one stay `draft: true` (excluded from build, sitemap, static params).
- Flat root-level slugs with trailing slash; no `/providers/` or `/compare/`
  prefixes. REWRITE means genuinely new copy, not a re-host of the thin
  originals that got the site deindexed.

## Build steps

1. Add GLP-1 records to `src/data/providers-glp1.json` from the dataset.
2. Spread it into `all` in `src/lib/providers.ts`.
3. Write one MDX review per surviving slug in `content/posts/` (frontmatter:
   `category: "glp-1"`, real `medicalReviewer` or `draft: true`). Reuse the MDX
   components: `<Score />`, `<Go>…</Go>`, `<Compare vertical="glp-1" />`, `<CTA />`.
4. Add the Yucca duplicate → canonical 301 in `src/data/redirects.json`.
5. `npm run check` (lint + typecheck + build) must pass before pushing.
