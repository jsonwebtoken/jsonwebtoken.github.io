import { LibrariesDictionaryModel } from "@/features/localization/models/libraries-dictionary.model";

export const enLibrariesDictionary: LibrariesDictionaryModel = {
  metadata: {
    title: "JSON Web Token Libraries - jwt.io",
    description:
      "Find an overview of libraries that help you work with JSON Web Tokens in your favorite language.",
    authors: [
      {
        name: "Auth0",
        url: "auth0.com",
      },
    ],
    images: ["/img/facebook-card.png"],
    keywords: [
      "json web token libraries",
      "jwt libraries",
      "jwt encoder libraries",
      "jwt decoder libraries",
      "jwt verification libraries",
    ],
    datePublished: "2024-11-30T09:00:00-08:00",
    dateModified: "2024-11-30T09:00:00-08:00",
    // TODO: Current site has also: meta(name='canonical', content='https://auth0.com/learn/json-web-tokens/') Verify with SEO team if that's still needed in any way
    twitter: {
      card: "summary_large_image",
      creator: "@auth0",
      title: "JWT.IO - JSON Web Tokens Libraries",
      description:
        "Find an overview of libraries that help you work with JSON Web Tokens in your favorite language.",
      images: "/img/twitter-card.png",
    },
    openGraph: {
      type: "website",
      title: "JWT.IO - JSON Web Tokens Libraries",
      description:
        "Find an overview of libraries that help you work with JSON Web Tokens in your favorite language.",
      locale: "en_US",
      url: "https://jwt.io/libraries",
      images: {
        url: "/img/facebook-card.png",
        type: "image/png",
        width: 1200,
        height: 630,
      },
    },
  },
  title: "Libraries for Token Signing/Verification",
  filterPicker: {
    label: "Filter by",
    defaultValue: {
      label: "All",
      value: "all",
    },
  },
  result: {
    viewRepo: {
      label: "View repo",
    },
    minimumVersion: {
      label: "Minimum version",
      resource: {
        label: "Learn more",
        url: "https://auth0.com/blog/critical-vulnerabilities-in-json-web-token-libraries/",
      },
    },
  },
};
