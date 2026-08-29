import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const config = [
  ...nextCoreWebVitals,
  {
    // Both rules target the Pages Router. This is the App Router root layout, which
    // must render <head> itself, and the stylesheet is loaded per-locale on purpose
    // so Japanese fonts are not shipped to every visitor.
    files: ["src/features/common/components/layout/page-layout/**"],
    rules: {
      "@next/next/no-head-element": "off",
      "@next/next/no-css-tags": "off",
    },
  },
];

export default config;
