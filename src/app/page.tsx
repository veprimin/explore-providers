import Link from "next/link";
import { PostCard } from "@/components/PostCard";
import { ProviderTable } from "@/components/ProviderTable";
import { getAllPosts } from "@/lib/content";
import { getProviders } from "@/lib/providers";
import { categories, site } from "@/lib/site";

export default function HomePage() {
  const all = getAllPosts();
  const posts = all.filter((p) => p.category !== "comparisons");
  const comparisons = all.filter((p) => p.category === "comparisons").slice(0, 6);
  const edProviders = getProviders("ed");

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="container-shell grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div className="max-w-3xl">
            <p className="eyebrow">Independent telehealth reviews</p>
            <h1 className="mt-5 text-[clamp(2.75rem,1.6rem+4.8vw,5.5rem)] leading-[1.04] tracking-[-0.025em]">
              Clear answers. <span className="font-serif italic">Better</span>{" "}
              <span className="hl">treatment</span> decisions.
            </h1>
            <p className="mt-6 max-w-2xl text-[clamp(1.1rem,1rem+0.5vw,1.4rem)] leading-relaxed text-muted">
              {site.description}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              {categories.map((c, i) => (
                <Link key={c.slug} href={`/category/${c.slug}/`} className={i === 0 ? "btn" : "btn-secondary"}>
                  {c.name}
                </Link>
              ))}
            </div>
          </div>

          <aside className="rounded-[28px] bg-sage p-8 md:p-10">
            <p className="eyebrow">How we review</p>
            <ul className="mt-6 space-y-5 text-[0.9375rem] leading-relaxed text-charcoal">
              <li>
                <strong className="block font-serif text-xl font-normal text-forest">What&apos;s actually in it</strong>
                Ingredients, format and dose, checked against the provider&apos;s own site.
              </li>
              <li>
                <strong className="block font-serif text-xl font-normal text-forest">What it really costs</strong>
                Missing prices say &ldquo;Not published&rdquo; — never a guess.
              </li>
              <li>
                <strong className="block font-serif text-xl font-normal text-forest">Scores are opinion</strong>
                Editorial assessments, not user ratings.
              </li>
            </ul>
            <Link href="/methodology/" className="link-arrow mt-7">
              How we rank
            </Link>
          </aside>
        </div>
      </section>

      <section className="container-shell py-16 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Latest</p>
            <h2 className="mt-3 text-[clamp(1.875rem,1.45rem+1.7vw,2.875rem)] leading-[1.12]">Latest reviews</h2>
          </div>
          <Link href="/category/ed-treatments/" className="link-arrow">
            Browse ED treatments
          </Link>
        </div>

        {posts.length === 0 ? (
          <p className="mt-6 text-muted">No posts published yet.</p>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        )}
      </section>

      {comparisons.length > 0 && (
        <section className="border-t border-line">
          <div className="container-shell py-16 md:py-24">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow">Head to head</p>
                <h2 className="mt-3 text-[clamp(1.875rem,1.45rem+1.7vw,2.875rem)] leading-[1.12]">Latest comparisons</h2>
              </div>
              <Link href="/category/comparisons/" className="link-arrow">
                All comparisons
              </Link>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {comparisons.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {edProviders.length > 0 && (
        <section className="bg-sage-light">
          <div className="container-shell py-16 md:py-24">
            <p className="eyebrow">Compare</p>
            <h2 className="mt-3 text-[clamp(1.875rem,1.45rem+1.7vw,2.875rem)] leading-[1.12]">ED providers we cover</h2>
            <p className="mt-4 max-w-3xl text-lg text-muted">
              Ordered by our own editorial score. Scores are an editorial
              assessment, not an average of user ratings —{" "}
              <Link href="/methodology/" className="text-teal underline underline-offset-2">
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
