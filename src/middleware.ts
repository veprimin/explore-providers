import { NextResponse, type NextRequest } from "next/server";
import gone from "@/data/gone-urls.json";
import redirects from "@/data/redirects.json";

/**
 * All URL-migration behaviour lives here so the rules are in one place.
 *
 * Consolidation redirects are handled in middleware rather than via
 * next.config `redirects()` because that path strips the trailing slash from
 * the destination and then re-adds it, producing a two-hop chain. Setting the
 * Location header directly keeps every consolidated URL to a single hop.
 *
 * Removed pages return 410 Gone rather than 404: 410 signals a deliberate,
 * permanent removal and drops the URL from the index faster. They are
 * deliberately NOT redirected — mass redirects from removed thin pages onto
 * surviving hubs are treated as soft-404s and read as manipulative.
 */
const goneUrls = new Set(gone as string[]);
const redirectMap = redirects as Record<string, string>;

export function middleware(request: NextRequest) {
  const slug = request.nextUrl.pathname.replace(/^\/|\/$/g, "");

  const target = redirectMap[slug];
  if (target) {
    const url = new URL(`/${target}/`, request.url);
    return NextResponse.redirect(url, 301);
  }

  if (goneUrls.has(slug)) {
    return new NextResponse(null, { status: 410, statusText: "Gone" });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/|api/|favicon.ico|.*\\..*).*)"],
};
