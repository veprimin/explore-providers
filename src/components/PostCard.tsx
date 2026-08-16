import Link from "next/link";
import type { Post } from "@/lib/content";
import { categories } from "@/lib/site";

function categoryName(slug: string): string | undefined {
  return categories.find((c) => c.slug === slug)?.name;
}

/**
 * Card rather than a stacked row, so the listing grids read at the full page
 * width instead of leaving a single narrow column on wide screens.
 */
export function PostCard({ post }: { post: Post }) {
  const label = categoryName(post.category);

  return (
    <article className="card flex h-full flex-col transition-shadow hover:shadow-md">
      {label && (
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {label}
        </p>
      )}
      <h2 className="mt-2 text-lg font-semibold leading-snug">
        <Link href={`/${post.slug}/`} className="text-slate-900 hover:underline">
          {post.title}
        </Link>
      </h2>
      <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{post.description}</p>
      <p className="mt-4 text-xs text-slate-500">
        <time dateTime={post.updated ?? post.date}>
          Updated{" "}
          {new Date(post.updated ?? post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      </p>
    </article>
  );
}
