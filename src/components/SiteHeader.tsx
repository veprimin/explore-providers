import Link from "next/link";
import { categories, site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-6 px-5 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight text-slate-900">
          {site.name}
        </Link>
        <nav className="flex items-center gap-5 text-sm text-slate-600">
          {categories.map((c) => (
            <Link key={c.slug} href={`/category/${c.slug}/`} className="hover:text-slate-900">
              {c.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
