# CLAUDE.md — ExploreProviders rebuild

Working context for this repo. Full diagnosis and data in
[`docs/migration-context.md`](docs/migration-context.md). Per-URL decisions in
[`docs/url-map.csv`](docs/url-map.csv).

## What this project is

Migrating **exploreproviders.com** (telehealth affiliate site — GLP-1 weight
loss and ED) from WordPress to a static Next.js site on Cloudflare Workers,
while purging the thin programmatic content that got the site deindexed.

**The site has had 0 Google clicks since 26 June 2026.** The rebuild is not
primarily a performance project — it is a content purge with a platform change
attached. Rebuilding the same pages on Next.js would reproduce the penalty.

## Hard constraints

These are not preferences. Do not relax them without asking.

1. **No client-side router.** Routing is the Next.js App Router, file-based,
   only. `react-router`, `react-router-dom` and `@remix-run/react` are blocked
   by an ESLint `no-restricted-imports` rule enforced in CI.
2. **Latest Next.js.** Currently 16.3.1. Do not downgrade.
3. **Basic blog, not a web app.** WordPress-style templates: post feed, post,
   category, hub. Server Components, near-zero client JS. No interactive
   comparison tools or dashboards.
4. **Flat root-level URLs.** `/some-post-slug/` with a trailing slash. No
   `/compare/` or `/providers/` prefixes — explicitly rejected by the owner.
5. **Never emit `AggregateRating` structured data.** Provider scores are
   editorial opinion with no verified user reviews behind them. Rendering them
   as ratings would be fabricated review data (FTC + Google spam policy). The
   site is already penalised; do not make it worse.
6. **Never publish unverified pricing.** Set `lastVerified` when a price is
   checked against the provider's own site. Missing values render
   "Not published", never a blank cell.
7. **YMYL content needs a named medical reviewer.** This is health content
   (GLP-1, ED). Posts without a real credentialed reviewer stay `draft: true`.
8. **Never mass-redirect purged pages to hubs.** They return 410 Gone. Bulk
   redirects from thin pages onto surviving pages read as soft-404s.

## Current state

`main` has the working scaffold. CI is green on Node 22 and 24.

**Done:** Next.js 16 App Router scaffold, blog templates, typed provider data
layer, `/go/[partner]` affiliate redirects, 410/301 migration middleware
(verified against a running server), Cloudflare deploy via `wrangler.jsonc`
`build.command`, CI.

**Not done:** essentially all content. If deployed today the site has zero
published posts, the 9 parked ED partner pages 404, and every affiliate CTA
falls through to the homepage.

## Blocked on the owner

| Blocker | Needed for |
|---|---|
| ED affiliate URLs + current pricing | Every ED CTA; provider JSON covers GLP-1 only |
| A named medical reviewer | Publishing any health page |
| Access to `coachingautomation-design/new-design-next` | Design reference. Cross-owner repos cannot be attached to a session scoped to `veprimin` — needs a **new session started with that repo as the source** |

## Order of work

ED first, then GLP-1. NAD/TRT later. ED pages historically earned ~59 clicks
each versus ~4.7 for GLP-1 pages — roughly 12x more efficient — and hold the
only top-10 rankings the site ever had.

## Commands

```bash
npm run dev        # local dev
npm run check      # lint + typecheck + build (what CI runs)
npm run build:cf   # build the Cloudflare worker
npm run deploy     # build and deploy
```

## Data access

Google Search Console is reachable through the **Supermetrics** MCP server, not
a direct GSC integration:

- `ds_id: "GW"`, account `sc-domain:exploreproviders.com`
- Earliest supported start date is **2025-04-16**; earlier dates error
- Useful fields: `page`, `query`, `clicks`, `impressions`, `position`, `Date`

The live WordPress site still serves and its REST API is open — useful for
pulling original content during migration:

```
https://www.exploreproviders.com/wp-json/wp/v2/posts?per_page=100&page=N
```

## Gotchas already hit

- `next.config.ts` `redirects()` strips the destination's trailing slash then
  re-adds it, producing a **two-hop chain**. Redirects live in
  `src/middleware.ts` instead, setting `Location` directly.
- `wrangler deploy` needs `.open-next/` to already exist. `wrangler.jsonc`
  declares `build.command` so the deploy is self-sufficient — do not remove it.
- `eslint-config-next` 16 breaks under the `FlatCompat` shim. Use its native
  flat config exports.
