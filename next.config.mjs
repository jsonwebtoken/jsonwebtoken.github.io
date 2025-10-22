import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
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
