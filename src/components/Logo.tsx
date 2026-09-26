/**
 * Explore Providers wordmark, drawn in the same system as ExploreMentalHealth:
 * the archway mark with the yellow sun, "Explore" in the italic serif and the
 * rest in the sans.
 */
export function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 whitespace-nowrap leading-none ${
        inverse ? "text-white" : "text-forest"
      }`}
    >
      <svg viewBox="0 0 32 36" width="28" height="32" aria-hidden="true" focusable="false" className="flex-none">
        <path d="M3 35V16a13 13 0 0 1 26 0v19" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <circle cx="16" cy="24" r="5.5" fill="#E8C94B" />
        <path d="M9 35h14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <span className="inline-flex items-baseline">
        <span className="font-serif text-[1.55rem] font-medium italic tracking-tight">Explore</span>
        <span className="ml-[0.12em] font-sans text-[1.02rem] font-semibold tracking-tight">Providers</span>
      </span>
    </span>
  );
}
