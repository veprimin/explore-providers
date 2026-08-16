import type { Provider } from "@/lib/providers";

function cell(value: string | number | null, fallback = "Not published") {
  if (value === null || value === "") {
    return <span className="text-slate-400">{fallback}</span>;
  }
  return <>{value}</>;
}

/**
 * Static comparison table. Every cell renders from the typed provider record,
 * so a missing value shows as an explicit "Not published" rather than the
 * silent empty cells the old WordPress template produced.
 */
export function ProviderTable({ providers }: { providers: Provider[] }) {
  return (
    <div className="my-8">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[52rem] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b-2 border-slate-300">
              <th scope="col" className="py-2 pr-4 font-semibold">Provider</th>
              <th scope="col" className="py-2 pr-4 font-semibold">Format</th>
              <th scope="col" className="py-2 pr-4 font-semibold">Onset</th>
              <th scope="col" className="py-2 pr-4 font-semibold">Duration</th>
              <th scope="col" className="py-2 pr-4 font-semibold">Price</th>
              <th scope="col" className="py-2 font-semibold">Best for</th>
            </tr>
          </thead>
          <tbody>
            {providers.map((p) => (
              <tr key={p.slug} className="border-b border-slate-200 align-top">
                <th scope="row" className="py-3 pr-4 text-left font-medium text-slate-900">
                  {p.name}
                </th>
                <td className="py-3 pr-4">{cell(p.format)}</td>
                <td className="py-3 pr-4">{cell(p.onset)}</td>
                <td className="py-3 pr-4">{cell(p.duration)}</td>
                <td className="py-3 pr-4">
                  {p.startingPrice !== null ? (
                    <>
                      <span className="font-medium text-slate-900">
                        From ${p.startingPrice}/mo
                      </span>
                      {p.priceNote && (
                        <span className="mt-1 block text-xs text-slate-500">
                          {p.priceNote}
                        </span>
                      )}
                    </>
                  ) : (
                    cell(p.priceNote)
                  )}
                </td>
                <td className="py-3">{cell(p.bestFor)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PricingFootnote providers={providers} />
    </div>
  );
}

function PricingFootnote({ providers }: { providers: Provider[] }) {
  const dates = providers
    .map((p) => p.lastVerified)
    .filter((d): d is string => Boolean(d))
    .sort();

  // Reader-facing either way. The unverified branch used to carry an
  // instruction aimed at editors, which is not something to ship to readers.
  if (dates.length === 0) {
    return (
      <p className="mt-3 text-xs text-slate-500">
        Prices shown are the provider&apos;s own advertised figures and have not
        been independently confirmed by us. Providers change pricing and
        promotions frequently — check the provider&apos;s site for current rates
        before ordering.
      </p>
    );
  }

  return (
    <p className="mt-3 text-xs text-slate-500">
      Pricing last verified {new Date(dates[0]).toLocaleDateString("en-US")}.
      Prices change frequently — check the provider&apos;s site for current rates.
    </p>
  );
}
