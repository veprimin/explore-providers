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
    <div className="my-8 overflow-x-auto">
      <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b-2 border-slate-300">
            <th className="py-2 pr-4 font-semibold">Provider</th>
            <th className="py-2 pr-4 font-semibold">Format</th>
            <th className="py-2 pr-4 font-semibold">Onset</th>
            <th className="py-2 pr-4 font-semibold">From</th>
            <th className="py-2 font-semibold">Best for</th>
          </tr>
        </thead>
        <tbody>
          {providers.map((p) => (
            <tr key={p.slug} className="border-b border-slate-200 align-top">
              <td className="py-3 pr-4 font-medium text-slate-900">{p.name}</td>
              <td className="py-3 pr-4">{cell(p.format)}</td>
              <td className="py-3 pr-4">{cell(p.onset)}</td>
              <td className="py-3 pr-4">
                {p.startingPrice ? `$${p.startingPrice}/mo` : cell(null)}
              </td>
              <td className="py-3">{cell(p.bestFor)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <PricingFootnote providers={providers} />
    </div>
  );
}

function PricingFootnote({ providers }: { providers: Provider[] }) {
  const dates = providers
    .map((p) => p.lastVerified)
    .filter((d): d is string => Boolean(d))
    .sort();

  if (dates.length === 0) {
    return (
      <p className="mt-3 text-xs text-slate-500">
        Pricing has not yet been verified for this table. Verify against each
        provider&apos;s own site before publishing.
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
