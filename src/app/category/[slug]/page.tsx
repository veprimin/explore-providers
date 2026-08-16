import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/PostCard";
import { ProviderTable } from "@/components/ProviderTable";
import { getPostsByCategory } from "@/lib/content";
import { getProviders, type Vertical } from "@/lib/providers";
import { categories, site } from "@/lib/site";

export const dynamicParams = false;

/** Which provider vertical each content category maps onto, if any. */
const CATEGORY_VERTICAL: Record<string, Vertical> = {
  "ed-treatments": "ed",
  "glp-1": "glp-1",
};

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
  const providers = getProviders(CATEGORY_VERTICAL[cat.slug]);

  return (
    <>
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="container-shell py-12 md:py-16">
          <div className="max-w-3xl">
            <p className="eyebrow">Category</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
              {cat.name}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              {cat.description}
            </p>
          </div>
        </div>
      </section>

      <section className="container-shell py-12 md:py-16">
        {posts.length === 0 ? (
          <p className="text-slate-500">No posts in this category yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        )}

        {providers.length > 0 && (
          <div className="mt-16 border-t border-slate-200 pt-12">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
              Providers at a glance
            </h2>
            <ProviderTable providers={providers} />
          </div>
        )}
      </section>
    </>
  );
}
