import Link from "next/link";
import { PostCard } from "@/components/PostCard";
import { ProviderTable } from "@/components/ProviderTable";
import { getPostsByCategory } from "@/lib/content";
import { getProviders, type Vertical } from "@/lib/providers";
import { categories } from "@/lib/site";

export const PER_PAGE = 24;

/** Which provider vertical each content category maps onto, if any. */
const CATEGORY_VERTICAL: Partial<Record<string, Vertical>> = {
  "ed-treatments": "ed",
  "glp-1": "glp-1",
};

export function pageCount(slug: string): number {
  return Math.max(1, Math.ceil(getPostsByCategory(slug).length / PER_PAGE));
}

export function categoryHref(slug: string, page: number): string {
  return page <= 1 ? `/category/${slug}/` : `/category/${slug}/page/${page}/`;
}

/**
 * Category archive, paginated WordPress-style (/category/x/, /category/x/page/2/).
 * The comparisons category alone holds well over a thousand posts, so a single
 * unpaginated grid is not an option.
 */
export function CategoryView({ slug, page }: { slug: string; page: number }) {
  const cat = categories.find((c) => c.slug === slug)!;
  const all = getPostsByCategory(slug);
  const pages = pageCount(slug);
  const posts = all.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const vertical = CATEGORY_VERTICAL[slug];
  const providers = vertical && page === 1 ? getProviders(vertical) : [];

  return (
    <>
      <section className="border-b border-line bg-sage-light">
        <div className="container-shell py-14 md:py-20">
          <div className="max-w-3xl">
            <p className="eyebrow">Category{page > 1 && ` · Page ${page} of ${pages}`}</p>
            <h1 className="mt-4 text-[clamp(2.375rem,1.6rem+3.2vw,4.25rem)] leading-[1.08] tracking-[-0.02em]">
              {cat.name}
            </h1>
            <p className="mt-5 text-[clamp(1.1rem,1rem+0.5vw,1.4rem)] leading-relaxed text-muted">
              {cat.description}
            </p>
          </div>
        </div>
      </section>

      <section className="container-shell py-12 md:py-16">
        {posts.length === 0 ? (
          <p className="text-muted">No posts in this category yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        )}

        {pages > 1 && (
          <nav aria-label="Pagination" className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8">
            {page > 1 ? (
              <Link href={categoryHref(slug, page - 1)} rel="prev" className="btn-secondary btn-sm">
                ← Newer
              </Link>
            ) : (
              <span />
            )}
            <p className="text-sm text-muted">
              Page {page} of {pages}
            </p>
            {page < pages ? (
              <Link href={categoryHref(slug, page + 1)} rel="next" className="btn btn-sm">
                Older →
              </Link>
            ) : (
              <span />
            )}
          </nav>
        )}

        {providers.length > 0 && (
          <div className="mt-16 border-t border-line pt-12">
            <h2 className="text-[clamp(1.875rem,1.45rem+1.7vw,2.875rem)] leading-[1.12]">
              Providers at a glance
            </h2>
            <ProviderTable providers={providers} />
          </div>
        )}
      </section>
    </>
  );
}
