# Explore Providers — Next.js rebuild

Migration of exploreproviders.com from WordPress to a static, blog-style
Next.js site on Cloudflare.

## Why the rebuild

The site lost effectively all search traffic between 18–26 June 2026 (0 clicks
since). Diagnosis from Search Console + a content audit:

- 398 of 459 posts were programmatic "X vs Y" pages generated from ~29 brands
  against one template, averaging ~550 words with empty pricing cells.
- 294 URLs never earned a single click.
- Nothing technically blocked indexing (`index, follow`, canonicals correct),
  so this is a content-quality problem, not a technical one.

A platform migration alone does not fix that. The content purge does.

## Stack

| | |
|---|---|
| Framework | Next.js 16.3.1, App Router |
| Rendering | Fully static (SSG) |
| Content | MDX in `content/posts/`, frontmatter via gray-matter |
| Styling | Tailwind CSS v4 |
| Hosting | Cloudflare Workers via `@opennextjs/cloudflare` |
| Routing | File-based only — **no client-side router** |

`react-router`, `react-router-dom` and `@remix-run/react` are blocked by an
ESLint `no-restricted-imports` rule. `npm run lint` fails if one is imported.

## URL strategy

Flat, root-level slugs, matching the existing WordPress structure. URLs that
earned traffic are preserved byte-identical, so no redirect is needed for them.

All migration behaviour is in `src/middleware.ts`:

| Case | Response | Source |
|---|---|---|
| Consolidated duplicates | **301**, single hop | `src/data/redirects.json` (5) |
| Purged pages | **410 Gone** | `src/data/gone-urls.json` (407) |
| Surviving pages | 200 | `content/posts/` |

410 rather than 404 signals deliberate permanent removal and de-indexes faster.
Purged pages are **not** redirected — mass redirects from thin pages onto
surviving hubs are treated as soft-404s.

Redirects are handled in middleware rather than `next.config.ts` because
`redirects()` strips the destination's trailing slash and then re-adds it,
producing a two-hop chain.

## Provider data

`src/data/providers-ed.json`, typed in `src/lib/providers.ts`. Single source of
truth for pricing, CTA labels and affiliate URLs.

Two deliberate constraints:

1. **`editorialScore` is never emitted as `AggregateRating` structured data.**
   The scores are our editorial opinion; we have no verified user reviews, so
   presenting them as ratings would be fabricated review data — an FTC problem
   and a Google structured-data violation.
2. **Missing values render as "Not published"**, never as a blank cell. Empty
   pricing cells were a defect in the old template.

Set `lastVerified` when pricing is checked. `getStalePricing()` lists records
older than 30 days.

## Affiliate links

All CTAs route through `/go/[partner]/`, which 302s to the provider's
`affiliateUrl` with `rel="sponsored nofollow"`. Changing an affiliate URL is one
edit in the JSON, not a find-and-replace across posts.

`/go/` is disallowed in robots.txt.

## Logos

Single host: `assets.exploreproviders.com/logos` (Cloudflare R2), configured in
`src/lib/site.ts`. The old data had logos across 18 hosts, 12 of them hotlinked
from providers' own domains, with 7 missing entirely.

## Commands

```bash
npm run dev        # local dev
npm run build      # Next.js production build
npm run check      # lint + typecheck + build
npm run build:cf   # build the Cloudflare worker (.open-next/)
npm run preview    # build and preview on Cloudflare Workers locally
npm run deploy     # build and deploy to Cloudflare
```

## Deployment

`wrangler.jsonc` declares a `build.command` of `npm run build:cf`, so
`npx wrangler deploy` produces `.open-next/` itself. No separate build step
needs configuring in the Cloudflare dashboard.

Without that hook, `wrangler deploy` detects the OpenNext project, delegates to
`opennextjs-cloudflare deploy`, and fails with *"Could not find compiled Open
Next config"* because nothing built the worker first.

CI runs `npm run build:cf` on every PR so a broken deploy surfaces before it
reaches Cloudflare.

## Status

Scaffold and migration mechanics are complete and verified. Content migration
is outstanding — see the ED page list in the URL map.

Posts with `draft: true` are excluded from the build, the sitemap and static
generation. The MEDVi QUAD pilot is currently a draft because it has a
placeholder medical reviewer and unverified pricing; both must be resolved
before it publishes.
