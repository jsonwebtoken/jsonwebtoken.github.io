import { Auth0DictionaryModel } from "@/features/localization/models/auth0-dictionary.model";
import { AUTH0_SIGNUP_URL_JA } from "@/libs/config/project-paths.constants";
import { EBOOK_URL_JA } from "@/libs/config/project.constants";

export const jaAuth0Dictionary: Auth0DictionaryModel = {
  banner: {
    title: "JSON Web Tokenの使用を開始",
    description:
      "どのスタックやデバイスでも、Auth0でJWTを使った安全な認証を10分以内で実装できます。",
    image: {
      url: "/images/en.login-box.svg",
      alt: "a preview of what Auth0 Universal Login looks like, featuring options to log in with a username, a social connection like Google, or a passkey.",
    },
    ctaButton: {
      path: AUTH0_SIGNUP_URL_JA,
      label: "無料アカウントを作成 ",
    },
  },
  ebook: {
    title: "JWTハンドブックを入手",
    description:
      "JWTがどのように誕生し、どのような問題を解決するのかについて学びましょう。今すぐ無料でダウンロードできます。",
    ctaButton: {
      label: "eBookをダウンロード",
      url: EBOOK_URL_JA,
    },
  },
};
