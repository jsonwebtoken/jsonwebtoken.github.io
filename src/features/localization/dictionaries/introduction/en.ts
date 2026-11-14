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
  faq: {
    items: [
      {
        question: "What is JSON Web Token?",
        answer:
          "JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed using a secret (with the HMAC algorithm) or a public/private key pair using RSA or ECDSA.",
      },
      {
        question: "When should you use JSON Web Tokens?",
        answer:
          "JWTs are useful for Authorization (allowing users to access routes, services, and resources after login using Single Sign-On) and Information Exchange (securely transmitting information between parties with verified signatures that ensure the content hasn't been tampered with).",
      },
      {
        question: "What is the JSON Web Token structure?",
        answer:
          "A JWT consists of three parts separated by dots: Header (contains the token type and signing algorithm), Payload (contains the claims - statements about the user and additional data), and Signature (ensures the token hasn't been altered). Each part is Base64Url encoded, resulting in the format: xxxxx.yyyyy.zzzzz",
      },
      {
        question: "How do JSON Web Tokens work?",
        answer:
          "When a user logs in, they receive a JWT. For subsequent requests, the token is sent in the Authorization header using the Bearer schema. The server verifies the token's signature and grants access to protected resources. This stateless mechanism allows the token to be used across different domains.",
      },
      {
        question: "Why should we use JSON Web Tokens?",
        answer:
          "JWTs are more compact than SAML tokens (XML-based), making them ideal for HTML and HTTP environments. JSON is simpler to parse than XML and maps directly to objects in most programming languages. JWTs support asymmetric signing and work seamlessly across different platforms and devices.",
      },
      {
        question: "What is the difference between validating and verifying a JWT?",
        answer:
          "Validation checks the token's structure, format, and claims (like expiration time and required fields). Verification confirms the cryptographic signature to ensure the token was issued by a trusted party and hasn't been tampered with. Both steps are essential for secure JWT processing.",
      },
      {
        question: "What is the difference between decoding and encoding a JWT?",
        answer:
          "Encoding is the process of creating a JWT: converting the header and payload to JSON, Base64Url encoding them, and generating the signature. Decoding reverses this process: splitting the token, Base64Url decoding each part, and parsing the JSON. Decoding alone doesn't verify the signature.",
      },
    ],
  },
};
