import { LayoutDictionaryModel } from "@/features/localization/models/layout-dictionary.model";
import { sitePaths } from "@/features/seo/site-tree";
import { BASE_URL } from "@/libs/config/project.constants";
import { ThemePickerCodeValues } from "@/features/common/values/theme.values";

const withJapanese = process.env.NEXT_PUBLIC_WITH_JAPANESE === "enabled";

export const enLayoutDictionary: LayoutDictionaryModel = {
  ribbon: {
    cta: {
      title: "Get up-to-speed with JSON Web Tokens.",
      description: "Get the JWT Handbook for free",
      link: {
        url: "https://auth0.com/resources/ebooks/jwt-handbook?utm_source=jwt&utm_medium=microsites&utm_campaign=jwt",
        icon: {
          label: "Arrow pointing northeast",
        },
      },
    },
    themePicker: {
      button: {
        ariaLabel: "Select page theme",
      },
      list: {
        ariaLabel: "List of page themes",
      },
      options: [
        {
          code: ThemePickerCodeValues.SYSTEM,
          label: "System",
        },
        {
          code: ThemePickerCodeValues.DARK,
          label: "Dark",
        },
        {
          code: ThemePickerCodeValues.LIGHT,
          label: "Light",
        },
      ],
    },
    languagePicker: {
      button: {
        ariaLabel: "Select page language",
      },
      list: {
        ariaLabel: "list of page languages",
      },
      options: [
        {
          code: "en",
          label: "English",
        },
      ],
    },
  },
  header: {
    links: [
      {
        label: "Debugger",
        path: sitePaths.home,
      },
      {
        label: "Introduction",
        path: sitePaths.introduction,
      },
      {
        label: "Libraries",
        path: sitePaths.libraries,
      },
      {
        label: "Ask",
        path: sitePaths.ask,
        isExternal: true,
      },
    ],
    labels: {
      close: "Close menu",
      open: "Open menu",
    },
  },
  footer: {
    site: {
      url: BASE_URL,
      label: "JWT Debugger",
    },
    copyright: `Copyright © ${new Date().getFullYear()} Okta. All rights reserved.`,
    resources: {
      title: "PRESENTED BY AUTH0",
      links: [
        {
          label: "Passkeys Playground",
          path: "https://learnpasskeys.io/",
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
          label: "SAML Tool",
          path: "https://samltool.io/",
        },
      ],
    },
    legal: {
      title: "LEGAL",
      links: [
        {
          label: "Privacy Policy",
          path: "https://www.okta.com/privacy-policy/",
        },
        {
          label: "Security",
          path: "https://trust.okta.com/",
        },
      ],
      modalTriggers: [
        {
          text: "Your Privacy Choices",
          icon: {
            url: "https://cdn.auth0.com/website/footer/ccpa.svg",
            alt: "A button that resembles a pill is divided into two pieces: on the right side, there’s an X mark; on the left side, there’s a checkmark.",
          },
        },
      ],
    },
    social: {
      title: "SOCIAL",
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
          path: "https://x.com/auth0",
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
  },
  errors: {
    notFound: {
      message: "Sorry, the page that you were looking for doesn't exist.",
      link: {
        path: "/",
        label: "Go home",
      },
    },
    unexpectedError: {
      message: "Sorry, an error occurred.",
      actions: {
        tryAgain: {
          label: "Try again",
        },
        report: {
          label: "Report this error",
          path: "https://community.auth0.com/new-topic?category=jwt&tags=issue,jwt&title=%5BIssue%5D%20&body=%28Please%20report%20any%20issue%20that%20you%20may%20have%20encountered%20while%20using%20the%20JWT%20Debugger%20site.%20To%20delete%20this%20post%20draft%2C%20click%20the%20Close%20button%20below%20and%20then%20click%20Discard.%29",
        },
      },
    },
  },
};

if (withJapanese) {
  enLayoutDictionary.ribbon.languagePicker.options.push({
    label: "日本語",
    code: "ja",
  });
}
