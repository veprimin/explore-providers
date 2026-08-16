import type { Provider } from "@/lib/providers";

/**
 * Inline affiliate link, for the mid-sentence links the migrated posts use
 * ("check current pricing here"). Same rules as CTAButton: routes through
 * /go/[partner] and is marked sponsored, so no affiliate URL is ever inlined
 * into content and a destination change stays a single edit.
 */
export function OutboundLink({
  provider,
  children,
}: {
  provider: Provider;
  children: React.ReactNode;
}) {
  return (
    <a
      href={`/go/${provider.slug}/`}
      rel="sponsored nofollow"
      className="font-medium text-slate-900 underline underline-offset-2"
    >
      {children}
    </a>
  );
}
