import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/content";
import { categories, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().map((p) => ({
    url: `${site.url}/${p.slug}/`,
    lastModified: new Date(p.updated ?? p.date),
  }));
  const cats = categories.map((c) => ({
    url: `${site.url}/category/${c.slug}/`,
    lastModified: new Date(),
  }));
  return [{ url: `${site.url}/`, lastModified: new Date() }, ...cats, ...posts];
}
