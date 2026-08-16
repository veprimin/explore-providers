import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Flat, WordPress-style URLs keep their trailing slash so migrated URLs
  // stay byte-identical to what Google already has indexed.
  trailingSlash: true,

};

export default nextConfig;
