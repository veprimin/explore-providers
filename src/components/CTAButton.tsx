import type { Provider } from "@/lib/providers";

/**
 * Affiliate links always route through /go/[partner] so the destination can be
 * changed in one place, and always carry rel="sponsored nofollow".
 *
 * The visual treatment lives in the `.cta-button` class (see globals.css): it
 * has to win over the prose link styling that wraps every MDX body, so it is
 * defined there rather than as utilities on the element.
 */
export function CTAButton({ provider, label }: { provider: Provider; label?: string }) {
  return (
    <p className="my-6 text-center">
      <a href={`/go/${provider.slug}/`} rel="sponsored nofollow" className="cta-button">
        {label ?? provider.ctaLabel}
      </a>
    </p>
  );
}
