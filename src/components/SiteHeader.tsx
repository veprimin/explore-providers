import Link from "next/link";
import { Logo } from "@/components/Logo";
import { categories } from "@/lib/site";

/**
 * Two-tier header matching ExploreMentalHealth: a forest utility bar, then a
 * sticky cream main bar. Plain links only — no menu script, so it stays a
 * zero-JS server component. On narrow screens the nav wraps under the logo.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-[-36px] z-40">
      <div className="on-dark bg-forest text-[0.8125rem] text-[#f4f1e8]">
        <div className="container-shell flex h-9 items-center justify-between gap-4">
          <p className="font-semibold text-yellow">Independent telehealth reviews</p>
          <nav aria-label="Utility">
            <ul className="flex gap-5">
              <li><Link href="/about/" className="hover:underline">About</Link></li>
              <li className="hidden sm:block"><Link href="/editorial-policy/" className="hover:underline">Editorial Policy</Link></li>
              <li className="hidden sm:block"><Link href="/disclosure/" className="hover:underline">Advertising Disclosure</Link></li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="border-b border-line bg-cream/95 backdrop-blur-md">
        <div className="container-shell flex flex-wrap items-center gap-x-8 gap-y-1 py-3 md:h-[72px] md:flex-nowrap md:py-0">
          <Link href="/" aria-label="Explore Providers home" className="flex-none no-underline">
            <Logo />
          </Link>
          <nav aria-label="Primary" className="order-3 w-full md:order-none md:w-auto">
            <ul className="flex flex-wrap items-center gap-x-5 text-[0.9375rem] font-medium text-charcoal">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/category/${c.slug}/`} className="inline-flex min-h-10 items-center hover:text-forest hover:underline">
                    {c.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/methodology/" className="inline-flex min-h-10 items-center hover:text-forest hover:underline">
                  How We Rank
                </Link>
              </li>
            </ul>
          </nav>
          <Link href="/category/ed-treatments/" className="btn btn-sm ml-auto hidden sm:inline-flex">
            Compare Providers
          </Link>
        </div>
      </div>
    </header>
  );
}
