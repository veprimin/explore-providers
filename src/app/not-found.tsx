import Link from "next/link";
import { categories } from "@/lib/site";

export default function NotFound() {
  return (
    <div className="container-shell py-24 text-center">
      <h1 className="text-[clamp(2.375rem,1.6rem+3.2vw,4.25rem)] leading-tight">Page not found</h1>
      <p className="mt-3 text-slate-600">
        This page doesn&apos;t exist or has been removed.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="btn"
        >
          Back to homepage
        </Link>
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/category/${c.slug}/`}
            className="btn-secondary"
          >
            {c.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
