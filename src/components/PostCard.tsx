import Link from "next/link";
import type { Post } from "@/lib/content";
import { categories } from "@/lib/site";

function categoryName(slug: string): string | undefined {
  return categories.find((c) => c.slug === slug)?.name;
}

/**
 * Editorial card in the ExploreMentalHealth style: teal uppercase category,
 * serif title, muted excerpt, and the whole card as one click target while
 * keeping a single accessible link.
 */
export function PostCard({ post }: { post: Post }) {
  const label = categoryName(post.category);

  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition hover:-translate-y-0.5 hover:border-line-sage hover:shadow-[0_6px_24px_-12px_rgba(7,63,58,0.18)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <p className="flex flex-wrap items-center gap-2 text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-teal">
        {label && <span>{label}</span>}
        <span className="tag">Review</span>
      </p>
      <h2 className="mt-3 text-[clamp(1.25rem,1.1rem+0.45vw,1.5rem)] leading-[1.22]">
        <Link
          href={`/${post.slug}/`}
          className="text-forest no-underline after:absolute after:inset-0 after:content-[''] group-hover:underline group-hover:decoration-1"
        >
          {post.title}
        </Link>
      </h2>
      <p className="mt-2 line-clamp-3 flex-1 text-[0.9375rem] leading-relaxed text-muted">{post.description}</p>
      <p className="mt-5 text-[0.8125rem] text-muted">
        <time dateTime={post.updated ?? post.date}>
          Updated{" "}
          {new Date(post.updated ?? post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </time>
      </p>
    </article>
  );
}
