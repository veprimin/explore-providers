import type { Provider } from "@/lib/providers";

/**
 * Affiliate links always route through /go/[partner] so the destination can be
 * changed in one place, and always carry rel="sponsored nofollow".
 */
export function CTAButton({ provider, label }: { provider: Provider; label?: string }) {
  return (
    <p className="my-6">
      <a
        href={`/go/${provider.slug}/`}
        rel="sponsored nofollow"
        className="inline-block rounded-md bg-slate-900 px-5 py-3 text-center font-medium text-white hover:bg-slate-700"
      >
        {label ?? provider.ctaLabel}
      </a>
    </p>
  );
}
