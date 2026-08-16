import Link from "next/link";
import type { Post } from "@/lib/content";

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="border-b border-slate-200 py-6 last:border-0">
      <h2 className="text-xl font-semibold leading-snug">
        <Link href={`/${post.slug}/`} className="text-slate-900 hover:underline">
          {post.title}
        </Link>
      </h2>
      <p className="mt-2 text-slate-600">{post.description}</p>
      <p className="mt-3 text-xs uppercase tracking-wide text-slate-500">
        <time dateTime={post.updated ?? post.date}>
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
