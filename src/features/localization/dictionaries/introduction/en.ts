import { IntroductionDictionaryModel } from "@/features/localization/models/introduction-dictionary.model";

export const enIntroductionDictionary: IntroductionDictionaryModel = {
  metadata: {
    title: "JSON Web Token Introduction - jwt.io",
    description:
      "Learn about JSON Web Tokens, what are they, how they work, when and why you should use them.",
    authors: [
      {
        name: "Auth0",
        url: "auth0.com",
      },
    ],
    images: ["/img/facebook-card.png"],
    keywords: ["json web token", "jwt", "rfc 7519", "security"],
    datePublished: "2024-11-30T09:00:00-08:00",
    dateModified: "2024-11-30T09:00:00-08:00",
    // TODO: Current site has also: meta(name='canonical', content='https://auth0.com/learn/json-web-tokens/') Verify with SEO team if that's still needed in any way
    twitter: {
      card: "summary_large_image",
      creator: "@auth0",
      title: "JWT.IO - JSON Web Tokens Introduction",
      description:
        "Learn about JSON Web Tokens, what are they, how they work, when and why you should use them.",
      images: "/img/twitter-card.png",
    },
    openGraph: {
      type: "website",
      title: "JWT.IO - JSON Web Tokens Introduction",
      description:
        "Learn about JSON Web Tokens, what are they, how they work, when and why you should use them.",
      locale: "en_US",
      url: "https://jwt.io/introduction",
      images: {
        url: "/img/facebook-card.png",
        type: "image/png",
        width: 1200,
        height: 630,
      },
    },
  },
  hero: {
    title: "Introduction to JSON Web Tokens",
    description:
      "Learn about JSON Web Tokens, what are they, how they work, when and why you should use them.",
  },
  content: {
    headings: [
      {
        title: "What is JSON Web Token?",
        id: "what-is-json-web-token",
      },
      {
        title: "When should you use JSON Web Tokens?",
        id: "when-to-use-json-web-tokens",
      },
      {
        title: "What is the JSON Web Token structure?",
        id: "what-is-json-web-token-structure",
      },
      {
        title: "How do JSON Web Tokens work?",
        id: "how-json-web-tokens-work",
      },
      {
        title: "Why should we use JSON Web Tokens?",
        id: "why-use-json-web-tokens",
      },
      {
        title: "Difference Between Validating and Verifying a JWT",
        id: "difference-validating-verifying-jwt",
      },
      {
        title: "Difference Between Decoding and Encoding a JWT",
        id: "difference-decoding-encoding-jwt",
      },
    ],
  },
};
