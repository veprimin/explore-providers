import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

const config = [
  ...coreWebVitals,
  ...typescript,
  {
    ignores: [".next/**", ".open-next/**", "node_modules/**", ".wrangler/**"],
  },
  {
    rules: {
      // Hard requirement: routing is Next.js App Router (file-based) only.
      // A client-side router must never be introduced into this project.
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["react-router", "react-router-dom", "@remix-run/react"],
              message:
                "Routing must use the Next.js App Router (file-based). Do not add a client-side router.",
            },
          ],
        },
      ],
    },
  },
];

export default config;
