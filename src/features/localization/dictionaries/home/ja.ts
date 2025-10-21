import { HomeDictionaryModel } from "@/features/localization/models/home-dictionary.model";
import { sitePaths } from "@/features/seo/site-tree";

export const jaHomeDictionary: HomeDictionaryModel = {
  metadata: {
    title: "JSON Web Tokens - jwt.io",
    description:
      "JSON Web Token（JWT）は、2つの当事者間でクレームを伝達するための、コンパクトでURLセーフな形式です。JWT内のクレームは、JSONオブジェクトとしてエンコードされ、JSON Web Signature（JWS）を使用してデジタル署名されます。",
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
    images: ["/img/ja.facebook-card.png"],
    datePublished: "2024-11-30T09:00:00-08:00",
    dateModified: "2024-11-30T09:00:00-08:00",
    twitter: {
      card: "summary_large_image",
      creator: "@auth0",
      title: "JWT.IO",
      description:
        "JSON Web Tokenは、2つの当事者間でクレームを安全に表現するための、オープンな業界標準（RFC 7519）です。",
      images: "/img/ja.twitter-card.png",
    },
    openGraph: {
      type: "website",
      title: "JWT.IO",
      description:
        "JSON Web Tokenは、2つの当事者間でクレームを安全に表現するための、オープンな業界標準（RFC 7519）です。",
      locale: "ja_JP",
      url: "https://jwt.io/",
      images: {
        url: "/img/ja.facebook-card.png",
        type: "image/png",
        width: 1200,
        height: 630,
      },
    },
  },
  hero: {
    title: "JSON Web Token（JWT）デバッガー",
    description: null,
  },
  info: {
    description:
      "JSON Web Tokenをデコード、検証、生成します。JSON Web Tokenは、2つの当事者間でクレームを安全に表現するための、オープンな業界標準（RFC 7519）です。",
    resources: {
      spec: {
        name: "RFC 7519",
        link: "https://tools.ietf.org/html/rfc7519",
      },
    },
  },
  decoder: {
    title: "JWTデコーダー",
    compactTitle: "デコーダー",
    description: "デコード、確認、検証を行うJWTを以下に貼り付けてください.",
    syncButton: {
      label: "エンコーダーと同期",
      compactLabel: "エンコーダーと同期",
    },
    exampleGenerator: {
      label: "JWTサンプルジェネレーター",
    },
    jwtEditor: {
      headline: "エンコードされた値 ",
      label: "JWTエディター",
      title: "JSON Web Token (JWT)",
      compactTitle: "JWT",
      successMessage: "有効なJWT",
      autoFocusLabel: "オートフォーカスを有効にする",
    },
    decodedHeader: {
      title: "デコードされたヘッダー",
      tabs: {
        json: {
          label: "JSON",
        },
        claims: {
          label: "クレームの表",
        },
      },
    },
    decodedPayload: {
      title: "デコードされたペイロード",
      tabs: {
        json: {
          label: "JSON",
        },
        claims: {
          label: "クレームの表",
        },
      },
    },
    signatureVerification: {
      title: "JWT署名の検証",
      subtitle: "（オプション）",
      description: {
        secret: "以下にJWTの署名に使用されたシークレットを入力します。",
        publicKey: "以下にJWTの署名に使用された公開鍵を入力します。",
      },
      editor: {
        title: { secret: "シークレット", publicKey: "公開鍵" },
        successMessage: {
          secret: "有効なシークレット",
          publicKey: "有効な公開鍵",
        },
        placeholder: {
          secret: "有効なシークレット",
          publicKey:
            "SPKI、PKCS #1、X.509証明書、またはJWK文字列形式の公開鍵。",
        },
      },
    },
  },
  encoder: {
    title: "JWTエンコーダー",
    compactTitle: "エンコーダー",
    description:
      "署名されたJWTを生成するために以下のフィールドを入力してください。",
    syncButton: {
      label: "デコーダーと同期",
      compactLabel: "デコーダーと同期",
    },
    unsyncButton: {
      label: "同期を解除",
      compactLabel: "同期を解除",
    },
    exampleGenerator: {
      label: "ヘッダー、ペイロード、署名サンプルジェネレーター",
    },
    headerEditor: {
      title: "アルゴリズムとトークンタイプ",
      compactTitle: "ヘッダー",
      successMessage: "有効なヘッダー",
    },
    payloadEditor: {
      title: "データ",
      compactTitle: "ペイロード",
      successMessage: "有効なペイロード",
    },
    signatureEditor: {
      title: {
        secret: "シークレット",
        privateKey: "JWTに署名：秘密鍵",
      },
      compactTitle: {
        secret: "JWTに署名",
        privateKey: "JWTに署名",
      },
      successMessage: {
        secret: "有効なシークレット",
        privateKey: "有効な秘密鍵",
      },
      placeholder: {
        privateKey:
          "PKCS #8、PKCS #1、またはJWK文字列形式での秘密鍵。鍵がブラウザから外部に送信されることはありません。",
      },
    },
    encodedJwt: {
      title: "JSON Web Token",
    },
  },
};
