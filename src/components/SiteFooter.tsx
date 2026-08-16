import Link from "next/link";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-3xl space-y-4 px-5 py-10 text-sm text-slate-600">
        <p>{site.disclosure}</p>
        <div className="flex gap-4">
          <Link href="/about/" className="hover:text-slate-900">About</Link>
          <Link href="/disclosure/" className="hover:text-slate-900">Advertiser Disclosure</Link>
          <Link href="/contact/" className="hover:text-slate-900">Contact</Link>
        </div>
        <p className="text-xs text-slate-500">
          &copy; {new Date().getFullYear()} {site.name}. Not medical advice.
        </p>
      </div>
    </footer>
  );
}
