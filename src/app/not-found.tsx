import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-16 text-center">
      <h1 className="text-2xl font-semibold text-slate-900">Page not found</h1>
      <p className="mt-3 text-slate-600">
        This page doesn&apos;t exist or has been removed.
      </p>
      <Link href="/" className="mt-6 inline-block underline">
        Back to homepage
      </Link>
    </div>
  );
}
