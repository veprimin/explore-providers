import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/content";
import { categories, site, staticPages } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().map((p) => ({
    url: `${site.url}/${p.slug}/`,
    lastModified: new Date(p.updated ?? p.date),
  }));
  const cats = categories.map((c) => ({
    url: `${site.url}/category/${c.slug}/`,
    lastModified: new Date(),
  }));
  // Reads the same list the footer renders, so a page cannot be added to the
  // nav and silently left out of the sitemap.
  const statics = staticPages.map((p) => ({
    url: `${site.url}${p.path}`,
    lastModified: new Date(),
  }));
  return [
    { url: `${site.url}/`, lastModified: new Date() },
    ...cats,
    ...statics,
    ...posts,
  ];
}
