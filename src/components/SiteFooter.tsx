import Link from "next/link";
import { categories, site, staticPages } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-slate-50">
      <div className="container-shell py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="md:col-span-1">
            <p className="text-base font-semibold text-slate-900">{site.name}</p>
            <p className="mt-3 max-w-sm text-sm leading-6 text-slate-600">
              {site.description}
            </p>
          </div>

          <nav aria-label="Treatment categories">
            <p className="text-sm font-semibold text-slate-900">Treatments</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/category/${c.slug}/`} className="hover:text-slate-900">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Site information">
            <p className="text-sm font-semibold text-slate-900">Site</p>
            <ul className="mt-3 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
              {staticPages.map((p) => (
                <li key={p.path}>
                  <Link href={p.path} className="hover:text-slate-900">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 space-y-4 border-t border-slate-200 pt-8 text-sm text-slate-600">
          <p className="max-w-4xl">{site.disclosure}</p>
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} {site.name}. Not medical advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
