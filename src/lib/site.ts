export const site = {
  name: "Explore Providers",
  url: "https://www.exploreproviders.com",
  description:
    "Independent reviews and comparisons of telehealth providers for men's health and weight management.",
  // Logos live in one place so the host can change without touching content.
  assetBase: "https://assets.exploreproviders.com/logos",
  disclosure:
    "Explore Providers is supported by referral fees from advertisers presented on this site. This does not affect our editorial assessments. We are not a medical provider; information here is not medical advice.",
} as const;

export const categories = [
  { slug: "ed-treatments", name: "ED Treatments", description: "Online providers for erectile dysfunction treatment." },
  { slug: "glp-1", name: "GLP-1 & Weight Loss", description: "Telehealth platforms prescribing semaglutide and tirzepatide." },
] as const;

export type CategorySlug = (typeof categories)[number]["slug"];

export function logoUrl(file: string): string {
  return `${site.assetBase}/${file}`;
}
