import Link from "next/link";
import { PostCard } from "@/components/PostCard";
import { ProviderTable } from "@/components/ProviderTable";
import { getAllPosts } from "@/lib/content";
import { getProviders } from "@/lib/providers";
import { categories, site } from "@/lib/site";

export default function HomePage() {
  const posts = getAllPosts();
  const edProviders = getProviders("ed");

  return (
    <>
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="container-shell py-14 md:py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              {site.name}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              {site.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  href={`/category/${c.slug}/`}
                  className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 hover:border-slate-400"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell py-12 md:py-16">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Latest reviews
          </h2>
          <Link
            href="/category/ed-treatments/"
            className="text-sm text-slate-600 underline underline-offset-2 hover:text-slate-900"
          >
            Browse ED treatments
          </Link>
        </div>

        {posts.length === 0 ? (
          <p className="mt-6 text-slate-500">No posts published yet.</p>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        )}
      </section>

      {edProviders.length > 0 && (
        <section className="border-t border-slate-200 bg-slate-50">
          <div className="container-shell py-12 md:py-16">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
              ED providers we cover
            </h2>
            <p className="mt-3 max-w-3xl text-slate-600">
              Ordered by our own editorial score. Scores are an editorial
              assessment, not an average of user ratings —{" "}
              <Link href="/methodology/" className="underline underline-offset-2">
                how we rank
              </Link>
              .
            </p>
            <ProviderTable providers={edProviders} />
          </div>
        </section>
      )}
    </>
  );
}
