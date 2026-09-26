import type { MetadataRoute } from "next";
import { categoryHref, pageCount, PER_PAGE } from "@/components/CategoryView";
import { getAllPosts, getPostsByCategory, type Post } from "@/lib/content";
import { categories, site, staticPages } from "@/lib/site";

const modified = (p: Post) => new Date(p.updated ?? p.date);

/** Newest modification among a set of posts, so archives don't claim "now" on every build. */
function latest(posts: Post[]): Date | undefined {
  return posts.reduce<Date | undefined>((max, p) => {
    const d = modified(p);
    return !max || d > max ? d : max;
  }, undefined);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const all = getAllPosts();

  const posts = all.map((p) => ({
    url: `${site.url}/${p.slug}/`,
    lastModified: modified(p),
  }));

  // Every archive page, including /category/x/page/n/, dated by its own posts.
  const archives = categories.flatMap((c) => {
    const inCat = getPostsByCategory(c.slug);
    return Array.from({ length: pageCount(c.slug) }, (_, i) => ({
      url: `${site.url}${categoryHref(c.slug, i + 1)}`,
      lastModified: latest(inCat.slice(i * PER_PAGE, (i + 1) * PER_PAGE)) ?? new Date(),
    }));
  });

  // Reads the same list the footer renders, so a page cannot be added to the
  // nav and silently left out of the sitemap.
  const statics = staticPages.map((p) => ({
    url: `${site.url}${p.path}`,
    lastModified: new Date(),
  }));

  return [
    { url: `${site.url}/`, lastModified: latest(all) ?? new Date() },
    ...archives,
    ...statics,
    ...posts,
  ];
}
