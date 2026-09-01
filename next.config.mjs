import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next 16 writes AGENTS.md/CLAUDE.md on `next dev`; keep them out of the tree.
  agentRules: false,
  // Playwright runs both browser projects against one long-lived dev server.
  // Retain route entries so later Firefox tests do not reference evicted chunks.
  ...(process.env.CI
    ? {
        onDemandEntries: {
          maxInactiveAge: 10 * 60 * 1000,
          pagesBufferLength: 20,
        },
      }
    : {}),
  webpack(config) {
    config.module.rules.push(
      {
        test: /\.svg$/,
        resourceQuery: { not: /raw/ },
        use: {
          loader: "@svgr/webpack",
          options: {
            svgoConfig: {
              plugins: ["prefixIds"],
            },
            ref: true,
          },
        },
      },
      {
        test: /\.svg$/i,
        resourceQuery: /raw/, // Only apply this rule if '?raw' is present
        type: "asset/source",
      }
    );

    // @next/mdx registers its loader without an App Router layer, so .mdx misses
    // Next's React aliasing and dev crashes on "ReactCurrentDispatcher of undefined".
    const mdxRule = config.module.rules.find(
      (rule) => rule?.test?.toString() === /\.mdx$/.toString()
    );

    if (mdxRule) {
      mdxRule.resolve = {
        ...mdxRule.resolve,
        alias: {
          ...mdxRule.resolve?.alias,
          "react/jsx-runtime": "next/dist/compiled/react/jsx-runtime",
          "react/jsx-dev-runtime": "next/dist/compiled/react/jsx-dev-runtime",
        },
      };
    }

    return config;
  },
  images: {
    remotePatterns: [
      { hostname: "cdn.auth0.com" },
      { hostname: "auth0.com" },
      { hostname: "developer.auth0.com" },
      { hostname: "images.ctfassets.net" },
    ],
  },
  redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    providerImportSource: "@mdx-js/react",
  },
});

export default withMDX(nextConfig);
