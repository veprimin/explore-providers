import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

/** A provider named in an imported "X vs Y" comparison, with its own link. */
export interface ComparisonProvider {
  name: string;
  url: string;
  summary?: string;
}

export interface PostFrontmatter {
  title: string;
  description: string;
  category: string;
  date: string;
  updated?: string;
  author: string;
  /** Required for YMYL health content. */
  medicalReviewer?: string;
  /** Provider slug this post reviews, if it is a provider review. */
  provider?: string;
  /** The two providers an imported comparison covers, in page order. */
  providers?: ComparisonProvider[];
  draft?: boolean;
}

export interface Post extends PostFrontmatter {
  slug: string;
  body: string;
  /**
   * `mdx` for hand-migrated posts, `html` for the comparisons imported from
   * the WordPress REST API by scripts/import-mystudytimes.mjs, whose bodies are
   * already sanitised HTML and are rendered as-is rather than compiled.
   */
  format: "mdx" | "html";
}

function readPostFile(file: string): Post | null {
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const fm = data as PostFrontmatter;
  if (fm.draft) return null;
  return {
    ...fm,
    slug: file.replace(/\.(mdx?|html)$/, ""),
    body: content,
    format: file.endsWith(".html") ? "html" : "mdx",
  };
}

/*
 * Read once per process. With well over a thousand posts, re-reading the
 * directory on every getPost() call made the build quadratic in post count.
 */
let cache: { all: Post[]; bySlug: Map<string, Post> } | null = null;

function load() {
  if (cache) return cache;
  const all = fs.existsSync(POSTS_DIR)
    ? fs
        .readdirSync(POSTS_DIR)
        .filter((f) => /\.(mdx|html)$/.test(f))
        .map(readPostFile)
        .filter((p): p is Post => p !== null)
        .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    : [];
  cache = { all, bySlug: new Map(all.map((p) => [p.slug, p])) };
  return cache;
}

export function getAllPosts(): Post[] {
  return load().all;
}

export function getPost(slug: string): Post | undefined {
  return load().bySlug.get(slug);
}

export function getPostsByCategory(category: string): Post[] {
  return getAllPosts().filter((p) => p.category === category);
}
