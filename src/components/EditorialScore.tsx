import Link from "next/link";
import type { Provider } from "@/lib/providers";

/**
 * Deliberately rendered as plain text with an explicit label, and never as
 * star markup or AggregateRating JSON-LD: we have no verified user reviews,
 * so presenting this as a user rating would be fabricated review data.
 */
export function EditorialScore({ provider }: { provider: Provider }) {
  return (
    <div className="my-6 rounded-md border border-slate-200 bg-slate-50 p-4">
      <p className="text-sm text-slate-600">
        <strong className="text-slate-900">Editorial score: {provider.editorialScore}/10</strong>
        {" — "}assigned by the Explore Providers editorial team.{" "}
        <Link href="/about/#methodology" className="underline">
          How we score
        </Link>
        . This is our opinion, not an average of user ratings.
      </p>
    </div>
  );
}
