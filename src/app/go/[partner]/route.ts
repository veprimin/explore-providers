import { NextResponse } from "next/server";
import { getProviders, getProvider } from "@/lib/providers";

export const dynamicParams = false;

export function generateStaticParams() {
  return getProviders().map((p) => ({ partner: p.slug }));
}

/**
 * Single choke point for affiliate links. Keeping the destination here means an
 * affiliate URL change is one edit, not a find-and-replace across every post.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ partner: string }> },
) {
  const { partner } = await params;
  const provider = getProvider(partner);

  // `affiliateReady` is checked here as well as at every link site, because this
  // is the single choke point: a URL carrying another property's sub-IDs would
  // otherwise credit that property for clicks earned here.
  if (!provider?.affiliateUrl || !provider.affiliateReady) {
    // No usable link - send the reader somewhere useful rather than 404.
    return NextResponse.redirect(new URL("/", "https://www.exploreproviders.com"), 302);
  }

  return NextResponse.redirect(provider.affiliateUrl, 302);
}
