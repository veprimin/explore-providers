import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryView } from "@/components/CategoryView";
import { categories, site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) return {};
  return {
    title: cat.name,
    description: cat.description,
    alternates: { canonical: `${site.url}/category/${cat.slug}/` },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!categories.some((c) => c.slug === slug)) notFound();
  return <CategoryView slug={slug} page={1} />;
}
