import Link from "next/link";
import { categories, site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="container-shell flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight text-slate-900">
          {site.name}
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-5 text-sm text-slate-600">
          {categories.map((c) => (
            <Link key={c.slug} href={`/category/${c.slug}/`} className="hover:text-slate-900">
              {c.name}
            </Link>
          ))}
          <Link href="/methodology/" className="hover:text-slate-900">
            How We Rank
          </Link>
        </nav>
      </div>
    </header>
  );
}
