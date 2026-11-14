import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const config = [
  ...nextCoreWebVitals,
  {
    // Both rules target the Pages Router; this is the App Router root layout,
    // which renders <head> itself and loads the font stylesheet per-locale.
    files: ["src/features/common/components/layout/page-layout/**"],
    rules: {
      "@next/next/no-head-element": "off",
      "@next/next/no-css-tags": "off",
    },
  },
];

export default config;
