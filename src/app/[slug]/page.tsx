import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { CTAButton } from "@/components/CTAButton";
import { EditorialScore } from "@/components/EditorialScore";
import { mdxHeading } from "@/components/Heading";
import { OutboundLink } from "@/components/OutboundLink";
import { ProviderAside } from "@/components/ProviderAside";
import { ProviderTable } from "@/components/ProviderTable";
import { getAllPosts, getPost } from "@/lib/content";
import { getProvider, getProviders, type Vertical } from "@/lib/providers";
import { categories, site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `${site.url}/${post.slug}/` },
    openGraph: { title: post.title, description: post.description, type: "article" },
  };
}

const CATEGORY_VERTICAL: Record<string, Vertical> = {
  "ed-treatments": "ed",
  "glp-1": "glp-1",
};

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const provider = post.provider ? getProvider(post.provider) : undefined;
  const vertical = CATEGORY_VERTICAL[post.category];
  const category = categories.find((c) => c.slug === post.category);

  // Components available inside MDX bodies.
  const components = {
    // Headings carry anchor ids so the hand-built tables of contents in the
    // migrated posts actually jump somewhere.
    h2: mdxHeading(2),
    h3: mdxHeading(3),
    h4: mdxHeading(4),
    CTA: () => (provider ? <CTAButton provider={provider} /> : null),
    Score: () => (provider ? <EditorialScore provider={provider} /> : null),
    // Inline affiliate link from the migrated copy. With no provider on the
    // post it degrades to plain text rather than linking nowhere.
    Go: ({ children }: { children?: React.ReactNode }) =>
      provider ? (
        <OutboundLink provider={provider}>{children}</OutboundLink>
      ) : (
        <>{children}</>
      ),
    Compare: ({ vertical: v }: { vertical?: Vertical }) => (
      <ProviderTable providers={getProviders(v)} />
    ),
  };

  return (
    <>
      <div className="border-b border-slate-200 bg-slate-50">
        <div className="container-shell py-10 md:py-14">
          <div className="max-w-3xl">
            {category && (
              <Link
                href={`/category/${category.slug}/`}
                className="eyebrow hover:text-slate-700"
              >
                {category.name}
              </Link>
            )}
            <h1 className="mt-2 text-4xl font-bold leading-tight tracking-tight text-slate-900">
              {post.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              {post.description}
            </p>
            <div className="mt-5 space-y-1 text-sm text-slate-500">
              <p>
                By {post.author}
                {post.medicalReviewer && (
                  <> · Medically reviewed by {post.medicalReviewer}</>
                )}
              </p>
              <p>
                <time dateTime={post.updated ?? post.date}>
                  Updated{" "}
                  {new Date(post.updated ?? post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/*
        Full-width shell with the body copy held to a readable measure, and the
        page's spare width given to the provider rail rather than to margin.
      */}
      <div className="container-shell py-10 md:py-14">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <article className="prose-post measure min-w-0">
            <MDXRemote source={post.body} components={components} />
          </article>

          {vertical && (
            <ProviderAside
              providers={getProviders(vertical)}
              heading={
                vertical === "ed" ? "Top-rated ED providers" : "Top-rated providers"
              }
              currentSlug={post.provider}
            />
          )}
        </div>
      </div>
    </>
  );
}
