import { HomeDictionaryModel } from "@/features/localization/models/home-dictionary.model";
import { sitePaths } from "@/features/seo/site-tree";

export const enHomeDictionary: HomeDictionaryModel = {
  metadata: {
    title: "JSON Web Tokens - jwt.io",
    description:
      "JSON Web Token (JWT) is a compact URL-safe means of representing claims to be transferred between two parties. The claims in a JWT are encoded as a JSON object that is digitally signed using JSON Web Signature (JWS).",
    keywords: [
      "jwt",
      "jwt payload",
      "jwt header",
      "jwt signature",
      "json web token",
      "jwt debugger",
      "jwt encoder",
      "jwt decoder",
      "jwt verification",
    ],
    authors: [
      {
        name: "Auth0",
        url: "auth0.com",
      },
    ],
    images: ["/img/facebook-card.png"],
    datePublished: "2024-11-30T09:00:00-08:00",
    dateModified: "2024-11-30T09:00:00-08:00",
    twitter: {
      card: "summary_large_image",
      creator: "@auth0",
      title: "JWT.IO",
      description:
        "JSON Web Tokens are an open, industry standard RFC 7519 method for representing claims securely between two parties.",
      images: "/img/twitter-card.png",
    },
    openGraph: {
      type: "website",
      title: "JWT.IO",
      description:
        "JSON Web Tokens are an open, industry standard RFC 7519 method for representing claims securely between two parties.",
      locale: "en_US",
      url: "https://jwt.io/",
      images: {
        url: "/img/facebook-card.png",
        type: "image/png",
        width: 1200,
        height: 630,
      },
    },
  },
  hero: {
    title: "JSON Web Token (JWT) Debugger",
    description: null,
  },
  info: {
    description:
      "Decode, verify, and generate JSON Web Tokens, which are an open, industry standard RFC 7519 method for representing claims securely between two parties.",
    resources: {
      spec: {
        name: "RFC 7519",
        link: "https://tools.ietf.org/html/rfc7519",
      },
    },
  },
  decoder: {
    title: "JWT Decoder",
    compactTitle: "Decoder",
    description:
      "Paste a JWT below that you'd like to decode, validate, and verify.",
    syncButton: {
      label: "Sync with Encoder",
      compactLabel: "Sync with Encoder",
    },
    exampleGenerator: {
      label: "JWT example generator",
    },
    jwtEditor: {
      headline: "Encoded value",
      label: "JWT editor",
      title: "JSON Web Token (JWT)",
      compactTitle: "JWT",
      successMessage: "Valid JWT",
    },
    decodedHeader: {
      title: "Decoded Header",
      tabs: {
        json: {
          label: "JSON",
        },
        claims: {
          label: "Claims Table",
        },
      },
    },
    decodedPayload: {
      title: "Decoded Payload",
      tabs: {
        json: {
          label: "JSON",
        },
        claims: {
          label: "Claims Table",
        },
      },
    },
    signatureVerification: {
      title: "JWT Signature Verification",
      subtitle: "(Optional)",
      description: {
        secret: "Enter the secret used to sign the JWT below:",
        publicKey: "Enter the public key used to sign the JWT below:",
      },
      editor: {
        title: { secret: "Secret", publicKey: "Public Key" },
        successMessage: {
          secret: "Valid secret",
          publicKey: "Valid public key",
        },
        placeholder: {
          secret: "Valid secret",
          publicKey:
            "Public Key in SPKI, PKCS #1, X.509 Certificate, or JWK string format.",
        },
      },
    },
  },
  encoder: {
    title: "JWT Encoder",
    compactTitle: "Encoder",
    description: "Fill in the fields below to generate a signed JWT.",
    syncButton: {
      label: "Sync with Decoder",
      compactLabel: "Sync with Decoder",
    },
    unsyncButton: {
      label: "Unsync",
      compactLabel: "Unsync",
    },
    exampleGenerator: {
      label: "Header, payload, and signature example generator",
    },
    headerEditor: {
      title: "Header: Algorithm & Token Type",
      compactTitle: "Header",
      successMessage: "Valid header",
    },
    payloadEditor: {
      title: "Payload: Data",
      compactTitle: "Payload",
      successMessage: "Valid payload",
    },
    signatureEditor: {
      title: {
        secret: "Sign JWT: Secret",
        privateKey: "Sign JWT: Private Key",
      },
      compactTitle: {
        secret: "Sign JWT",
        privateKey: "Sign JWT",
      },
      successMessage: {
        secret: "Valid secret",
        privateKey: "Valid private key",
      },
      placeholder: {
        privateKey:
          "Private Key in PKCS #8, PKCS #1, or JWK string format. The key never leaves your browser.",
      },
    },
    encodedJwt: {
      title: "JSON Web Token",
    },
  },
};
