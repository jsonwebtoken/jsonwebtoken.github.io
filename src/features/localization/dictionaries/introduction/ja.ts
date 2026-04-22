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
        title: "JSON Web Tokenとは？",
        id: "what-is-json-web-token",
      },
      {
        title: "JSON Web Tokenはいつ使用すべきか？",
        id: "when-to-use-json-web-tokens",
      },
      {
        title: "JSON Web Tokenの構成は？",
        id: "what-is-json-web-token-structure",
      },
      {
        title: "JSON Web Tokenの仕組みとは？",
        id: "how-json-web-tokens-work",
      },
      {
        title: "JSON Web Tokenを使用すべき理由とは？",
        id: "why-use-json-web-tokens",
      },
      {
        title:
          "JWTのバリデーション（妥当性確認）とベリフィケーション（検証）の違い",
        id: "difference-validating-verifying-jwt",
      },
      {
        title: "JWTのデコーディングとエンコーディングの違い",
        id: "difference-decoding-encoding-jwt",
      },
    ],
  },
  faq: {
    items: [
      {
        question: "JSON Web Tokenとは？",
        answer:
          "JSON Web Token（JWT）は、当事者間で情報をJSONオブジェクトとして安全に伝送するためのコンパクトで自己完結型の方法を定義するオープンスタンダード（RFC 7519）です。この情報は、秘密鍵（HMACアルゴリズム）またはRSAやECDSAを使用した公開鍵/秘密鍵のペアでデジタル署名されているため、検証および信頼できます。",
      },
      {
        question: "JSON Web Tokenはいつ使用すべきか？",
        answer:
          "JWTは、認可（シングルサインオンを使用してログイン後にルート、サービス、リソースへのアクセスを許可する）および情報交換（改ざんされていないことを確認できる検証済み署名で当事者間で安全に情報を伝送する）に役立ちます。",
      },
      {
        question: "JSON Web Tokenの構成は？",
        answer:
          "JWTはドットで区切られた3つの部分で構成されます：ヘッダー（トークンタイプと署名アルゴリズムを含む）、ペイロード（クレーム - ユーザーに関する記述と追加データを含む）、署名（トークンが改ざんされていないことを保証）。各部分はBase64Urlエンコードされ、xxxxx.yyyyy.zzzzzの形式になります。",
      },
      {
        question: "JSON Web Tokenの仕組みとは？",
        answer:
          "ユーザーがログインすると、JWTを受け取ります。その後のリクエストでは、Bearerスキーマを使用してAuthorizationヘッダーでトークンが送信されます。サーバーはトークンの署名を検証し、保護されたリソースへのアクセスを許可します。このステートレスな仕組みにより、トークンは異なるドメイン間で使用できます。",
      },
      {
        question: "JSON Web Tokenを使用すべき理由とは？",
        answer:
          "JWTはSAMLトークン（XMLベース）よりもコンパクトで、HTMLおよびHTTP環境に最適です。JSONはXMLよりも解析が簡単で、ほとんどのプログラミング言語でオブジェクトに直接マッピングされます。JWTは非対称署名をサポートし、さまざまなプラットフォームやデバイス間でシームレスに動作します。",
      },
      {
        question:
          "JWTのバリデーション（妥当性確認）とベリフィケーション（検証）の違いとは？",
        answer:
          "バリデーションは、トークンの構造、形式、クレーム（有効期限や必須フィールドなど）をチェックします。ベリフィケーションは、トークンが信頼できる発行者によって発行され、改ざんされていないことを確認するために暗号署名を確認します。両方のステップは、安全なJWT処理に不可欠です。",
      },
      {
        question: "JWTのデコーディングとエンコーディングの違いとは？",
        answer:
          "エンコーディングはJWTを作成するプロセスです：ヘッダーとペイロードをJSONに変換し、Base64Urlエンコードして署名を生成します。デコーディングはこのプロセスを逆にします：トークンを分割し、各部分をBase64Urlデコードして、JSONを解析します。デコーディングだけでは署名は検証されません。",
      },
    ],
  },
};
