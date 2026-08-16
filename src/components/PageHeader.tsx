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
    <div className="border-b border-slate-200 bg-slate-50">
      <div className="container-shell py-12 md:py-16">
        <div className="max-w-3xl">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            {title}
          </h1>
          {intro && (
            <p className="mt-4 text-lg leading-relaxed text-slate-600">{intro}</p>
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
      <div className="measure space-y-10 text-base leading-relaxed text-slate-700">
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
      <h2 className="mb-3 text-xl font-bold text-slate-900">{heading}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}
