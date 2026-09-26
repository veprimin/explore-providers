/**
 * Import every published post from mystudytimes.com's WordPress REST API into
 * content/posts/<slug>.html, ready to render as a live post.
 *
 * Re-runnable: it re-fetches all pages and overwrites the files it owns (the
 * ones carrying `source: mystudytimes` in their frontmatter). It never
 * overwrites a hand-migrated .mdx post with the same slug.
 *
 * What it changes in each body, and what it deliberately leaves alone:
 *
 * - Affiliate links are kept exactly as published (the mystudytimes.com/<slug>
 *   links). Only `rel="sponsored nofollow"` is added: they are paid links,
 *   and Google's link-spam policy requires them to be marked.
 * - The kk-star-ratings widget is stripped. It renders a 0/5 star block with a
 *   vote count, which is fabricated review data (hard constraint #5).
 * - <script>/<style> blocks, inline `style` and `on*` attributes are removed so
 *   the body can be rendered with dangerouslySetInnerHTML safely.
 * - Any slug on the 410 list (src/data/gone-urls.json) is taken off it, or the
 *   middleware would keep answering 410 for the newly published page.
 *
 * Usage: node scripts/import-mystudytimes.mjs
 */
import fs from "node:fs";
import path from "node:path";

const API = "https://www.mystudytimes.com/wp-json/wp/v2/posts";
const FIELDS = "id,slug,title,date,modified,content,excerpt";
const OUT = path.join(process.cwd(), "content", "posts");
const GONE = path.join(process.cwd(), "src", "data", "gone-urls.json");

const entities = {
  "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#039;": "'",
  "&nbsp;": " ", "&hellip;": "…",
};

function decode(s) {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&[a-z]+;/gi, (m) => entities[m] ?? m);
}

const text = (html) => decode(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();

function description(post) {
  const t = text(post.excerpt?.rendered ?? "") || text(post.content.rendered);
  if (t.length <= 160) return t;
  const cut = t.slice(0, 157);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

function clean(html, title) {
  let s = html;
  s = s.replace(/<div class="kk-star-ratings[\s\S]*?<div class="kksr-legend"[\s\S]*?<\/div>\s*<\/div>/gi, "");
  s = s.replace(/<script[\s\S]*?<\/script>/gi, "");
  s = s.replace(/<style[\s\S]*?<\/style>/gi, "");
  s = s.replace(/\s(?:style|on[a-z]+)=("[^"]*"|'[^']*')/gi, "");
  // Mark paid links; the href itself is left untouched.
  s = s.replace(/<a\b([^>]*)>/gi, (whole, attrs) => {
    if (!/href="https?:\/\/(?:www\.)?mystudytimes\.com\//i.test(attrs)) return whole;
    const rest = attrs.replace(/\srel=("[^"]*"|'[^']*')/i, "");
    return `<a${rest} rel="sponsored nofollow">`;
  });
  // The page renders the title as its H1; drop a leading heading that repeats it.
  s = s.trim().replace(/^<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/i, (whole, inner) =>
    text(inner).toLowerCase() === title.toLowerCase() ? "" : whole,
  );
  return s.replace(/\n{3,}/g, "\n\n").trim();
}

/** The two providers, from the CTA buttons (hrefs) and the "X vs Y" title (names). */
function providers(html, title) {
  const names = title.split(/[:—–|]/)[0].split(/\s+vs\.?\s+/i).map((n) => n.trim());
  const urls = [];
  for (const m of html.matchAll(/<a\b[^>]*class="[^"]*cta-provider-([ab])[^"]*"[^>]*href="([^"]+)"/gi)) {
    const i = m[1] === "a" ? 0 : 1;
    urls[i] ??= m[2];
  }
  for (const m of html.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*class="[^"]*cta-provider-([ab])[^"]*"/gi)) {
    const i = m[2] === "a" ? 0 : 1;
    urls[i] ??= m[1];
  }
  return [0, 1]
    .filter((i) => names[i] && urls[i])
    .map((i) => ({ name: names[i], url: urls[i] }));
}

const yaml = (v) => JSON.stringify(v);

function frontmatter(post, title, provs) {
  const lines = [
    "---",
    `title: ${yaml(title)}`,
    `description: ${yaml(description(post))}`,
    `category: "comparisons"`,
    `date: ${yaml(post.date.slice(0, 10))}`,
    `updated: ${yaml(post.modified.slice(0, 10))}`,
    `author: "Explore Providers Editorial Team"`,
    `source: "mystudytimes"`,
  ];
  if (provs.length) {
    lines.push("providers:");
    for (const p of provs) lines.push(`  - name: ${yaml(p.name)}`, `    url: ${yaml(p.url)}`);
  }
  lines.push("---", "");
  return lines.join("\n");
}

async function fetchAll() {
  const posts = [];
  for (let page = 1; ; page++) {
    const res = await fetch(`${API}?per_page=100&page=${page}&_fields=${FIELDS}`);
    if (res.status === 400) break; // past the last page
    if (!res.ok) throw new Error(`page ${page}: HTTP ${res.status}`);
    const batch = await res.json();
    posts.push(...batch);
    const total = Number(res.headers.get("x-wp-totalpages"));
    process.stdout.write(`\rfetched page ${page}/${total}`);
    if (!batch.length || page >= total) break;
  }
  process.stdout.write("\n");
  return posts;
}

const posts = await fetchAll();
fs.mkdirSync(OUT, { recursive: true });

const written = new Set();
let skipped = 0;
for (const post of posts) {
  if (fs.existsSync(path.join(OUT, `${post.slug}.mdx`))) {
    skipped++;
    continue;
  }
  const title = text(post.title.rendered);
  const provs = providers(post.content.rendered, title);
  const body = clean(post.content.rendered, title);
  fs.writeFileSync(path.join(OUT, `${post.slug}.html`), `${frontmatter(post, title, provs)}${body}\n`);
  written.add(post.slug);
}

// Remove imports that no longer exist upstream, so a deleted post does not linger.
let removed = 0;
for (const f of fs.readdirSync(OUT).filter((f) => f.endsWith(".html"))) {
  const slug = f.slice(0, -5);
  if (written.has(slug)) continue;
  if (fs.readFileSync(path.join(OUT, f), "utf8").includes('source: "mystudytimes"')) {
    fs.unlinkSync(path.join(OUT, f));
    removed++;
  }
}

const gone = JSON.parse(fs.readFileSync(GONE, "utf8"));
const keep = gone.filter((s) => !written.has(s));
if (keep.length !== gone.length) fs.writeFileSync(GONE, `${JSON.stringify(keep, null, 1)}\n`);

console.log(
  `wrote ${written.size}, skipped ${skipped} (existing .mdx), removed ${removed} stale, ` +
    `un-gone ${gone.length - keep.length}`,
);
