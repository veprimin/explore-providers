import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { CTAButton } from "@/components/CTAButton";
import { EditorialScore } from "@/components/EditorialScore";
import { ProviderTable } from "@/components/ProviderTable";
import { getAllPosts, getPost } from "@/lib/content";
import { getProvider, getProviders } from "@/lib/providers";
import { site } from "@/lib/site";

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

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const provider = post.provider ? getProvider(post.provider) : undefined;

  // Components available inside MDX bodies.
  const components = {
    CTA: () =>
      provider ? <CTAButton provider={provider} /> : null,
    Score: () => (provider ? <EditorialScore provider={provider} /> : null),
    Compare: ({ vertical }: { vertical?: "ed" | "glp-1" }) => (
      <ProviderTable providers={getProviders(vertical)} />
    ),
  };

  return (
    <article>
      <h1 className="text-3xl font-bold leading-tight tracking-tight text-slate-900">
        {post.title}
      </h1>

      <div className="mt-4 space-y-1 text-sm text-slate-500">
        <p>
          By {post.author}
          {post.medicalReviewer && <> · Medically reviewed by {post.medicalReviewer}</>}
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

      <div className="prose-post mt-8">
        <MDXRemote source={post.body} components={components} />
      </div>
    </article>
  );
}
