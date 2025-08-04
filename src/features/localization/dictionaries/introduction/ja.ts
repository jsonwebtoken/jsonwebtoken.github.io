import { IntroductionDictionaryModel } from "@/features/localization/models/introduction-dictionary.model";

export const jaIntroductionDictionary: IntroductionDictionaryModel = {
  metadata: {
    title: "JSON Web Tokenの概要 - jwt.io",
    description:
      "JSON Web Tokenとは何か、どのように機能するのか、いつ、なぜ使用する必要があるのかについて学びましょう。",
    authors: [
      {
        name: "Auth0",
        url: "auth0.com",
      },
    ],
    images: ["/img/ja.facebook-card.png"],
    keywords: ["json web token", "jwt", "rfc 7519", "security"],
    datePublished: "2024-11-30T09:00:00-08:00",
    dateModified: "2024-11-30T09:00:00-08:00",
    // TODO: Current site has also: meta(name='canonical', content='https://auth0.com/learn/json-web-tokens/') Verify with SEO team if that's still needed in any way
    twitter: {
      card: "summary_large_image",
      creator: "@auth0",
      title: "JWT.IO - JSON Web Tokenの概要",
      description:
        "JSON Web Tokenとは何か、どのように機能するのか、いつ、なぜ使用する必要があるのかについて学びましょう。",
      images: "/img/ja.twitter-card.png",
    },
    openGraph: {
      type: "website",
      title: "JWT.IO - JSON Web Tokenの概要",
      description:
        "JSON Web Tokenとは何か、どのように機能するのか、いつ、なぜ使用する必要があるのかについて学びましょう。",
      locale: "ja_JP",
      url: "https://jwt.io/introduction",
      images: {
        url: "/img/ja.facebook-card.png",
        type: "image/png",
        width: 1200,
        height: 630,
      },
    },
  },
  hero: {
    title: "JSON Web Tokenの概要",
    description:
      "JSON Web Tokenとは何か、どのように機能するのか、いつ、なぜ使用する必要があるのかについて学びましょう。",
  },
  content: {
    headings: [
      {
        title: "What is JSON Web Token?",
        id: "json-web-token",
      },
      {
        title: "When should you use JSON Web Tokens?",
        id: "usage",
      },
      {
        title: "What is the JSON Web Token structure?",
        id: "structure",
      },
      {
        title: "How do JSON Web Tokens work?",
        id: "work",
      },
      {
        title: "Why should we use JSON Web Tokens?",
        id: "usage-reason",
      },
      {
        title: "Difference Between Validating and Verifying a JWT",
        id: "validate-verify",
      },
      {
        title: "Difference Between Decoding and Encoding a JWT",
        id: "decode-encode",
      },
    ],
  },
};
