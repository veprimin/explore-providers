import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// This is a prerendered static blog with no ISR — every page is built ahead of
// time (see the SSG/Static routes in `next build`). Without an incremental
// cache override, OpenNext ships a no-op cache: the worker never finds the
// prerendered HTML, so it re-renders each page on demand in workerd. That path
// has no filesystem, so `getAllPosts()`'s `fs.readdirSync(content/posts)`
// returns nothing ("No posts published yet") and `dynamicParams = false`
// routes 404. The static-assets cache serves the prerendered `.cache` files
// straight from Workers static assets (the existing ASSETS binding — no R2/KV
// needed), which is exactly its intended use: serve prerendered data, never
// revalidate.
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
