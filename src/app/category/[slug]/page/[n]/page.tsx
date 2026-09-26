import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryView, categoryHref, pageCount } from "@/components/CategoryView";
import { categories, site } from "@/lib/site";

export const dynamicParams = false;

/** Page 1 lives at /category/x/ itself, so paginated routes start at 2. */
export function generateStaticParams() {
  return categories.flatMap((c) =>
    Array.from({ length: pageCount(c.slug) - 1 }, (_, i) => ({ slug: c.slug, n: String(i + 2) })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; n: string }>;
}): Promise<Metadata> {
  const { slug, n } = await params;
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) return {};
  return {
    title: `${cat.name} — Page ${n}`,
    description: cat.description,
    alternates: { canonical: `${site.url}${categoryHref(slug, Number(n))}` },
  };
}

export default async function CategoryPagedPage({
  params,
}: {
  params: Promise<{ slug: string; n: string }>;
}) {
  const { slug, n } = await params;
  const page = Number(n);
  if (!categories.some((c) => c.slug === slug) || !(page >= 2 && page <= pageCount(slug))) notFound();
  return <CategoryView slug={slug} page={page} />;
}
