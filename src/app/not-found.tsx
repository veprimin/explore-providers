import Link from "next/link";
import { categories } from "@/lib/site";

export default function NotFound() {
  return (
    <div className="container-shell py-24 text-center">
      <h1 className="text-3xl font-semibold text-slate-900">Page not found</h1>
      <p className="mt-3 text-slate-600">
        This page doesn&apos;t exist or has been removed.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
        >
          Back to homepage
        </Link>
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/category/${c.slug}/`}
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-800 hover:border-slate-400"
          >
            {c.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
