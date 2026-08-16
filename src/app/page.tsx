import { PostCard } from "@/components/PostCard";
import { getAllPosts } from "@/lib/content";
import { site } from "@/lib/site";

export default function HomePage() {
  const posts = getAllPosts();
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">{site.name}</h1>
      <p className="mt-3 text-slate-600">{site.description}</p>
      <div className="mt-8">
        {posts.length === 0 ? (
          <p className="text-slate-500">No posts published yet.</p>
        ) : (
          posts.map((p) => <PostCard key={p.slug} post={p} />)
        )}
      </div>
    </>
  );
}
