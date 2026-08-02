import { IntroductionDictionaryModel } from "@/features/localization/models/introduction-dictionary.model";

export const trIntroductionDictionary: IntroductionDictionaryModel = {
  metadata: {
    title: "JSON Web Token'a Giriş - jwt.io",
    description:
      "JSON Web Token hakkında bilgi edinin: ne olduklarını, nasıl çalıştıklarını, ne zaman ve neden kullanmanız gerektiğini öğrenin.",
    authors: [
      {
        name: "Auth0",
        url: "auth0.com",
      },
    ],
    images: ["/img/facebook-card.png"],
    keywords: ["json web token", "jwt", "rfc 7519", "güvenlik"],
    datePublished: "2024-11-30T09:00:00-08:00",
    dateModified: "2024-11-30T09:00:00-08:00",
    twitter: {
      card: "summary_large_image",
      creator: "@auth0",
      title: "JWT.IO - JSON Web Token'a Giriş",
      description:
        "JSON Web Token hakkında bilgi edinin: ne olduklarını, nasıl çalıştıklarını, ne zaman ve neden kullanmanız gerektiğini öğrenin.",
      images: "/img/twitter-card.png",
    },
    openGraph: {
      type: "website",
      title: "JWT.IO - JSON Web Token'a Giriş",
      description:
        "JSON Web Token hakkında bilgi edinin: ne olduklarını, nasıl çalıştıklarını, ne zaman ve neden kullanmanız gerektiğini öğrenin.",
      locale: "tr_TR",
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
    title: "JSON Web Token'a Giriş",
    description:
      "JSON Web Token hakkında bilgi edinin: ne olduklarını, nasıl çalıştıklarını, ne zaman ve neden kullanmanız gerektiğini öğrenin.",
  },
  content: {
    headings: [
      {
        title: "JSON Web Token Nedir?",
        id: "what-is-json-web-token",
      },
      {
        title: "JSON Web Token Ne Zaman Kullanılmalıdır?",
        id: "when-to-use-json-web-tokens",
      },
      {
        title: "JSON Web Token Yapısı Nedir?",
        id: "what-is-json-web-token-structure",
      },
      {
        title: "JSON Web Token Nasıl Çalışır?",
        id: "how-json-web-tokens-work",
      },
      {
        title: "Neden JSON Web Token Kullanmalıyız?",
        id: "why-use-json-web-tokens",
      },
      {
        title: "JWT Doğrulama ve Onaylama Arasındaki Fark",
        id: "difference-validating-verifying-jwt",
      },
      {
        title: "JWT Kodlama ve Kod Çözme Arasındaki Fark",
        id: "difference-decoding-encoding-jwt",
      },
    ],
  },
};
