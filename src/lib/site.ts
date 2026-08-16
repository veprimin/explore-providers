export const site = {
  name: "Explore Providers",
  url: "https://www.exploreproviders.com",
  description:
    "Independent reviews and comparisons of telehealth providers for men's health and weight management.",
  // Logos live in one place so the host can change without touching content.
  assetBase: "https://assets.exploreproviders.com/logos",
  disclosure:
    "Explore Providers is supported by referral fees from advertisers presented on this site. This does not affect our editorial assessments. We are not a medical provider; information here is not medical advice.",
  email: {
    editorial: "editorial@exploreproviders.com",
    partners: "partners@exploreproviders.com",
    legal: "legal@exploreproviders.com",
    general: "hello@exploreproviders.com",
  },
} as const;

export const categories = [
  { slug: "ed-treatments", name: "ED Treatments", description: "Online providers for erectile dysfunction treatment." },
  { slug: "glp-1", name: "GLP-1 & Weight Loss", description: "Telehealth platforms prescribing semaglutide and tirzepatide." },
] as const;

export type CategorySlug = (typeof categories)[number]["slug"];

/**
 * Static routes that are not MDX posts. Kept here so the sitemap and the footer
 * read from one list — a page added to the app router but forgotten in the
 * sitemap is the usual way these pages go unindexed.
 */
export const staticPages = [
  { path: "/about/", label: "About" },
  { path: "/methodology/", label: "How We Rank" },
  { path: "/editorial-policy/", label: "Editorial Policy" },
  { path: "/disclosure/", label: "Advertising Disclosure" },
  { path: "/contact/", label: "Contact" },
  { path: "/privacy/", label: "Privacy Policy" },
  { path: "/terms/", label: "Terms of Use" },
] as const;

export function logoUrl(file: string): string {
  return `${site.assetBase}/${file}`;
}
