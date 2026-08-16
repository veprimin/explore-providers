import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/PostCard";
import { getPostsByCategory } from "@/lib/content";
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
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) notFound();

  const posts = getPostsByCategory(cat.slug);
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">{cat.name}</h1>
      <p className="mt-3 text-slate-600">{cat.description}</p>
      <div className="mt-8">
        {posts.length === 0 ? (
          <p className="text-slate-500">No posts in this category yet.</p>
        ) : (
          posts.map((p) => <PostCard key={p.slug} post={p} />)
        )}
      </div>
    </>
  );
}
