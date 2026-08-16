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

  if (!provider?.affiliateUrl) {
    // No link configured yet - send the reader somewhere useful rather than 404.
    return NextResponse.redirect(new URL("/", "https://www.exploreproviders.com"), 302);
  }

  return NextResponse.redirect(provider.affiliateUrl, 302);
}
