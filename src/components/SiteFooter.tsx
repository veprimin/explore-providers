import Link from "next/link";
import { Logo } from "@/components/Logo";
import { categories, site, staticPages } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="on-dark mt-24 bg-forest pt-20 pb-8 text-[0.9375rem] text-[#f4f1e8]">
      <div className="container-shell">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,2fr)]">
          <div>
            <Link href="/" aria-label="Explore Providers home" className="inline-block no-underline">
              <Logo inverse />
            </Link>
            <p className="mt-4 max-w-sm leading-relaxed text-[#b9cdc7]">{site.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <nav aria-label="Treatment categories">
              <h2 className="mb-4 font-sans text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-yellow">
                Treatments
              </h2>
              <ul className="grid gap-1">
                {categories.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/category/${c.slug}/`} className="inline-flex min-h-9 items-center hover:text-white hover:underline">
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Site information">
              <h2 className="mb-4 font-sans text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-yellow">
                Site
              </h2>
              <ul className="grid gap-1 sm:grid-cols-2 sm:gap-x-6">
                {staticPages.map((p) => (
                  <li key={p.path}>
                    <Link href={p.path} className="inline-flex min-h-9 items-center hover:text-white hover:underline">
                      {p.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-14 space-y-5 border-t border-white/15 pt-8 text-sm text-[#b9cdc7]">
          <p className="max-w-4xl leading-relaxed">{site.disclosure}</p>
          <p className="text-xs">
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved. Not medical advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
