import { LayoutDictionaryModel } from "@/features/localization/models/layout-dictionary.model";
import { sitePaths } from "@/features/seo/site-tree";
import { BASE_URL } from "@/libs/config/project.constants";
import { ThemePickerCodeValues } from "@/features/common/values/theme.values";

const withJapanese = process.env.NEXT_PUBLIC_WITH_JAPANESE === "enabled";

export const jaLayoutDictionary: LayoutDictionaryModel = {
  ribbon: {
    cta: {
      title: "より詳しくJSON Web Token (JWT) を知るには？",
      description: "「JWTハンドブック」をダウンロード",
      link: {
        url: "https://auth0.com/resources/ebooks/jp-jwt-handbook",
        icon: {
          label: "北東を指す矢",
        },
      },
    },
    themePicker: {
      button: {
        ariaLabel: "ページのテーマを選択してください",
      },
      list: {
        ariaLabel: "ページテーマの一覧",
      },
      options: [
        {
          code: ThemePickerCodeValues.SYSTEM,
          label: "自動",
        },
        {
          code: ThemePickerCodeValues.DARK,
          label: "ダーク",
        },
        {
          code: ThemePickerCodeValues.LIGHT,
          label: "ライト",
        },
      ],
    },
  },
  header: {
    links: [
      {
        label: "デバッガー",
        path: sitePaths.home,
      },
      {
        label: "JWTの概要",
        path: sitePaths.introduction,
      },
      {
        label: "ライブラリ",
        path: sitePaths.libraries,
      },
      {
        label: "コミュニティ",
        path: sitePaths.ask,
        isExternal: true,
      },
    ],
    labels: {
      close: "メニューを閉じる",
      open: "メニューと開く",
    },
  },
  footer: {
    site: {
      url: BASE_URL,
      label: "JWTデバッガー",
    },
    copyright: `Copyright © ${new Date().getFullYear()} Okta. All rights reserved.`,
    resources: {
      title: "Auth0が運営する姉妹サイト",
      links: [
        {
          label: "Passkeys Playground",
          path: "https://learnpasskeys.io/ja",
        },
        {
          label: "WebAuthn Playground",
          path: "https://webauthn.me/",
        },
        {
          label: "OIDC Playground",
          path: "https://openidconnect.net/",
        },
        {
          label: "SAMLツール",
          path: "https://samltool.io/",
        },
      ],
    },
    legal: {
      title: "リーガル",
      links: [
        {
          label: "プライバシーポリシー",
          path: "https://www.okta.com/privacy-policy/",
        },
        {
          label: "セキュリティ",
          path: "https://trust.okta.com/",
        },
      ],
      modalTriggers: [
        {
          text: "Your Privacy Choices",
          icon: {
            url: "https://cdn.auth0.com/website/footer/ccpa.svg",
            alt: "薬の錠剤を模したボタンは2つに分かれており、右側にはXマーク、左側にはチェックマークがある。",
          },
        },
      ],
    },
    social: {
      title: "ソーシャル",
      links: {
        youtube: {
          label: "YouTube",
          path: "https://www.youtube.com/oktadev",
        },
        facebook: {
          label: "Facebook",
          path: "https://www.facebook.com/Okta/",
        },
        twitter: {
          label: "Twitter",
          path: "https://x.com/auth0_jp",
        },
        linkedin: {
          label: "LinkedIn",
          path: "https://www.linkedin.com/company/oktadev/",
        },
      },
    },
    modal: {
      title: "Your Privacy Choices",
      content:
        "Depending on your state of residence, including if you are a California resident, you have the right to opt out of certain sharing of personal information with third-party ad partners. We may share personal information with third-party ad partners, such as through cookies or by providing lists of email addresses for potential customers, so that we can reach them across the web with relevant ads.",
      list: [
        {
          id: "cookies",
        },
        {
          id: "email",
        },
      ],
    },
    languagePicker: {
      button: {
        ariaLabel: "ページの言語を選択してください",
      },
      list: {
        ariaLabel: "ページ言語の一覧",
      },
      options: [
        {
          value: "en",
          label: "English",
        },
      ],
    },
  },
  errors: {
    notFound: {
      message: "申し訳ございませんが、お探しのページは存在しません。",
      link: {
        path: "/",
        label: "ホームへ ",
      },
    },
    unexpectedError: {
      message: "申し訳ございませんが、エラーが発生しました。",
      actions: {
        tryAgain: {
          label: "もう一度入力してください",
        },
        report: {
          label: "問題を報告する",
          path: "https://community.auth0.com/new-topic?category=jwt&tags=issue,jwt&title=%5BIssue%5D%20&body=%28Please%20report%20any%20issue%20that%20you%20may%20have%20encountered%20while%20using%20the%20JWT%20Debugger%20site.%20To%20delete%20this%20post%20draft%2C%20click%20the%20Close%20button%20below%20and%20then%20click%20Discard.%29",
        },
      },
    },
  },
};

if (withJapanese) {
  jaLayoutDictionary.footer.languagePicker.options.push({
    label: "日本語",
    value: "ja",
  });
}
