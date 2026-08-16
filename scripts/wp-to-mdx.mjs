/**
 * One-off migration helper: WordPress REST payload -> MDX post body.
 *
 * Run against a JSON file saved from
 *   /wp-json/wp/v2/posts?slug=<slug>
 *
 * Two things it must get right, both of them constraints from CLAUDE.md:
 *
 * 1. The old posts carry a `kk-star-ratings` widget rendering a 0/5 star block
 *    with a vote count. That is exactly the fabricated-review-data problem
 *    constraint 5 exists to prevent, so the widget is stripped, not converted.
 * 2. Affiliate CTAs were inline `<button onclick="location.href=...">` and raw
 *    anchors. Those become `<CTA />`, which routes through /go/[partner] and
 *    carries rel="sponsored nofollow". No affiliate URL is left inline.
 *
 * Usage: node scripts/wp-to-mdx.mjs <input.json>
 */
import fs from "node:fs";

const entities = {
  "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#039;": "'",
  "&#8217;": "’", "&#8216;": "‘", "&#8220;": "“", "&#8221;": "”",
  "&#8211;": "–", "&#8212;": "—", "&#038;": "&", "&nbsp;": " ",
  "&hellip;": "…", "&#8230;": "…",
};

function decode(s) {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&[a-z]+;/gi, (m) => entities[m] ?? m);
}

/**
 * WordPress "pretty link" paths. These look internal but are 301s onto an
 * affiliate network (e.g. /rodeo -> track.revoffers.com), and there is no such
 * route on the rebuilt site, so treating them as internal links would both
 * lose the commission and ship a 404. They are affiliate links.
 */
const PRETTY_LINKS = new Set(["/rodeo"]);

function isPrettyLink(href) {
  try {
    return PRETTY_LINKS.has(new URL(href).pathname.replace(/\/+$/, "") || "/");
  } catch {
    return false;
  }
}

/** Placeholder for an affiliate anchor, so inline() can emit <Go> not a raw URL. */
const GO_OPEN = "⟦GO⟧";
const GO_CLOSE = "⟦/GO⟧";

/** Inline HTML -> markdown, for the contents of a block-level element. */
function inline(html) {
  return decode(
    html
      .replace(/<(strong|b)>(.*?)<\/\1>/gis, "**$2**")
      .replace(/<(em|i)>(.*?)<\/\1>/gis, "_$2_")
      .replace(/<br\s*\/?>/gi, " ")
      .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gis, "[$2]($1)")
      .replace(/<[^>]+>/g, ""),
  )
    .replace(/\s+/g, " ")
    .trim()
    .replace(new RegExp(`${GO_OPEN}\\s*${GO_CLOSE}`, "g"), "") // empty anchor
    .replace(new RegExp(`${GO_OPEN}(.*?)${GO_CLOSE}`, "gs"), "<Go>$1</Go>")
    .trim();
}

/**
 * Split a list body into its direct-child <li> contents, tracking depth so a
 * nested <ul> inside an item does not terminate it early. The old posts lean
 * on two-level lists ("**Tadalafil**" with dosage/price/best-for beneath), and
 * a non-greedy regex silently drops the parent label on every one of them.
 */
function topLevelItems(body) {
  const items = [];
  const tagRe = /<(\/?)(ul|ol|li)(?:\s[^>]*)?>/gi;
  let depth = 0;
  let start = -1;
  let m;

  while ((m = tagRe.exec(body)) !== null) {
    const closing = m[1] === "/";
    const tag = m[2].toLowerCase();

    if (tag === "li") {
      if (!closing) {
        if (depth === 0) start = tagRe.lastIndex;
        depth++;
      } else {
        depth--;
        if (depth === 0 && start >= 0) {
          items.push(body.slice(start, m.index));
          start = -1;
        }
      }
    } else if (depth === 0) {
      // A <ul>/<ol> outside any <li> is the wrapper itself; ignore it.
      continue;
    }
  }
  return items;
}

/** Render a <ul>/<ol> body as markdown, recursing into nested lists. */
function renderList(body, ordered, indent = 0) {
  const pad = "  ".repeat(indent);
  return topLevelItems(body)
    .map((item, i) => {
      const nested = [...item.matchAll(/<(ul|ol)(?:\s[^>]*)?>([\s\S]*)<\/\1>/gi)];
      const own = inline(item.replace(/<(ul|ol)(?:\s[^>]*)?>[\s\S]*<\/\1>/gi, ""));
      const marker = ordered ? `${i + 1}.` : "-";
      const lines = own ? [`${pad}${marker} ${own}`] : [];
      for (const n of nested) {
        const sub = renderList(n[2], n[1].toLowerCase() === "ol", indent + 1);
        if (sub) lines.push(sub);
      }
      return lines.join("\n");
    })
    .filter(Boolean)
    .join("\n");
}

export function convert(html) {
  let s = html;

  // 1. Strip the star-rating widget entirely (see note 1 above).
  s = s.replace(/<div class="kk-star-ratings[\s\S]*?<div class="kksr-legend"[\s\S]*?<\/div>\s*<\/div>/gi, "");
  s = s.replace(/<div class="kk-star-ratings[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/gi, "");

  // 2. Affiliate CTAs -> the <CTA /> component. The old posts use two markups
  //    for the same button — `<button onclick=…>` and `<a href=…><button>` —
  //    and both sit inside a bare styled <div>, which the block scanner below
  //    does not descend into. Both must be turned into a CTA marker up here or
  //    the review migrates with no call to action at all.
  s = s.replace(/<a[^>]*href="[^"]*"[^>]*>\s*<button[^>]*>[\s\S]*?<\/button>\s*<\/a>/gi, "\n\n<CTA />\n\n");
  s = s.replace(/<div[^>]*>\s*<button[^>]*onclick=[\s\S]*?<\/button>\s*<\/div>/gi, "\n\n<CTA />\n\n");
  s = s.replace(/<button[^>]*onclick=[\s\S]*?<\/button>/gi, "\n\n<CTA />\n\n");

  // 3. Inline affiliate anchors. Several posts link out mid-sentence rather
  //    than through a button, and those URLs must not survive into the MDX —
  //    every affiliate click has to go through /go/[partner] so it carries
  //    rel="sponsored nofollow" and stays swappable in one place. Anything
  //    pointing at exploreproviders.com is an internal link and is kept.
  s = s.replace(
    /<a[^>]*href="(https?:\/\/[^"]*)"[^>]*>([\s\S]*?)<\/a>/gi,
    (whole, href, text) => {
      const internal = /(^|\/\/|\.)(?:www\.)?exploreproviders\.com/i.test(href);
      return internal && !isPrettyLink(href) ? whole : `${GO_OPEN}${text}${GO_CLOSE}`;
    },
  );

  s = s.replace(/<script[\s\S]*?<\/script>/gi, "");
  s = s.replace(/<style[\s\S]*?<\/style>/gi, "");

  const out = [];
  const openRe = /<(h[1-6]|p|ul|ol|blockquote|table)(?:\s[^>]*)?>/gi;
  let last = 0;
  let m;

  while ((m = openRe.exec(s)) !== null) {
    const tag = m[1].toLowerCase();
    if (m.index < last) continue; // inside a block already consumed

    // Find this element's own closing tag, counting nested same-name tags so a
    // <ul> containing a <ul> closes at the right place rather than the first
    // </ul> it meets.
    const pairRe = new RegExp(`<(/?)${tag}(?:\\s[^>]*)?>`, "gi");
    pairRe.lastIndex = m.index;
    let depth = 0;
    let end = -1;
    let p;
    while ((p = pairRe.exec(s)) !== null) {
      depth += p[1] === "/" ? -1 : 1;
      if (depth === 0) {
        end = p.index;
        break;
      }
    }
    if (end < 0) continue; // unbalanced markup, skip

    const body = s.slice(m.index + m[0].length, end);

    // Preserve any <CTA /> markers sitting between blocks.
    if (s.slice(last, m.index).includes("<CTA />")) out.push("<CTA />");
    last = pairRe.lastIndex;
    openRe.lastIndex = last;

    if (/^h[1-6]$/i.test(tag)) {
      const level = Math.max(2, Number(tag[1])); // never emit a second H1
      const text = inline(body);
      if (text) out.push(`${"#".repeat(level)} ${text}`);
    } else if (tag === "p") {
      const text = inline(body);
      // A paragraph that is nothing but the affiliate link was a styled button
      // in the original, so render it as the real CTA rather than a bare link.
      if (/^\*{0,2}<Go>[\s\S]*<\/Go>\*{0,2}$/.test(text)) out.push("<CTA />");
      else if (text) out.push(text);
    } else if (tag === "blockquote") {
      const text = inline(body);
      if (text) out.push(`> ${text}`);
    } else if (tag === "ul" || tag === "ol") {
      const list = renderList(body, tag === "ol");
      if (list) out.push(list);
    } else if (tag === "table") {
      const rows = [...body.matchAll(/<tr(?:\s[^>]*)?>([\s\S]*?)<\/tr>/gi)].map((tr) =>
        [...tr[1].matchAll(/<t[hd](?:\s[^>]*)?>([\s\S]*?)<\/t[hd]>/gi)].map((c) => inline(c[1])),
      );
      if (rows.length) {
        const width = Math.max(...rows.map((r) => r.length));
        const pad = (r) => [...r, ...Array(width - r.length).fill("")];
        out.push(
          [
            `| ${pad(rows[0]).join(" | ")} |`,
            `| ${Array(width).fill("---").join(" | ")} |`,
            ...rows.slice(1).map((r) => `| ${pad(r).join(" | ")} |`),
          ].join("\n"),
        );
      }
    }
  }

  if (s.slice(last).includes("<CTA />")) out.push("<CTA />");

  return out
    .join("\n\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/(?:<CTA \/>\n\n)+<CTA \/>/g, "<CTA />") // collapse adjacent CTAs
    .trim();
}

if (process.argv[1]?.endsWith("wp-to-mdx.mjs")) {
  const payload = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
  const post = Array.isArray(payload) ? payload[0] : payload;
  process.stdout.write(convert(post.content.rendered) + "\n");
}
