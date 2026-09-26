/**
 * Shared header band for the standalone (non-post) pages, so About, Contact
 * and the legal pages all sit on the same grid instead of each inventing one.
 */
export function PageHeader({
  eyebrow,
  title,
  intro,
  lastUpdated,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  lastUpdated?: string;
}) {
  return (
    <div className="border-b border-line bg-sage-light">
      <div className="container-shell py-14 md:py-20">
        <div className="max-w-3xl">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-4 text-[clamp(2.375rem,1.6rem+3.2vw,4.25rem)] leading-[1.08] tracking-[-0.02em]">
            {title}
          </h1>
          {intro && (
            <p className="mt-5 text-[clamp(1.1rem,1rem+0.5vw,1.4rem)] leading-relaxed text-muted">{intro}</p>
          )}
          {lastUpdated && (
            <p className="mt-4 text-sm text-slate-500">Last updated: {lastUpdated}</p>
          )}
        </div>
      </div>
    </div>
  );
}

/** Body wrapper: full-width shell, readable measure inside it. */
export function PageBody({ children }: { children: React.ReactNode }) {
  return (
    <div className="container-shell py-12 md:py-16">
      <div className="measure space-y-12 text-[1.0625rem] leading-[1.7] text-charcoal">
        {children}
      </div>
    </div>
  );
}

export function Section({
  id,
  heading,
  children,
}: {
  id?: string;
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-8">
      <h2 className="mb-4 text-[clamp(1.6rem,1.3rem+1vw,2rem)] leading-tight">{heading}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}
