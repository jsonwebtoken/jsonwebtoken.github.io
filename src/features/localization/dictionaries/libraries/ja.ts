import { LibrariesDictionaryModel } from "@/features/localization/models/libraries-dictionary.model";

export const jaLibrariesDictionary: LibrariesDictionaryModel = {
  metadata: {
    title: "JSON Web Tokenライブラリ - jwt.io",
    description:
      "JSON Web Tokenの操作に役立つライブラリの概要を、お好きな言語でご覧いただけます。",
    authors: [
      {
        name: "Auth0",
        url: "auth0.com",
      },
    ],
    images: ["/img/ja.facebook-card.png"],
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
      title: "JWT.IO - JSWON Web Tokensライブラリー",
      description:
        "JSON Web Tokenの操作に役立つライブラリの概要を、お好きな言語でご覧いただけます。",
      images: "/img/ja.twitter-card.png",
    },
    openGraph: {
      type: "website",
      title: "JWT.IO - JSWON Web Tokensライブラリー",
      description:
        "JSON Web Tokenの操作に役立つライブラリの概要を、お好きな言語でご覧いただけます。",
      locale: "ja_JP",
      url: "https://jwt.io/libraries",
      images: {
        url: "/img/ja.facebook-card.png",
        type: "image/png",
        width: 1200,
        height: 630,
      },
    },
  },
  title: "トークン署名/検証用ライブラリ",
  filterPicker: {
    label: "絞り込み",
    defaultValue: {
      label: "全て",
      value: "全て",
    },
  },
  result: {
    viewRepo: {
      label: "リポジトリを表示",
    },
    minimumVersion: {
      label: "最小バージョン",
      resource: {
        label: "詳細",
        url: "https://auth0.com/blog/critical-vulnerabilities-in-json-web-token-libraries/",
      },
    },
  },
};
