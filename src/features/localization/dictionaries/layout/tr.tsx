import { LayoutDictionaryModel } from "@/features/localization/models/layout-dictionary.model";
import { sitePaths } from "@/features/seo/site-tree";
import { BASE_URL } from "@/libs/config/project.constants";
import { ThemePickerCodeValues } from "@/features/common/values/theme.values";

const withJapanese = process.env.NEXT_PUBLIC_WITH_JAPANESE === "enabled";

export const trLayoutDictionary: LayoutDictionaryModel = {
  ribbon: {
    cta: {
      title: "JSON Web Token ile hızınızı artırın.",
      description: "JWT El Kitabını ücretsiz edinin",
      link: {
        url: "https://auth0.com/resources/ebooks/jwt-handbook?utm_source=jwt&utm_medium=microsites&utm_campaign=jwt",
        icon: {
          label: "Sağ üste doğru ok işareti",
        },
      },
    },
    themePicker: {
      button: {
        ariaLabel: "Sayfa temasını seçin",
      },
      list: {
        ariaLabel: "Sayfa temaları listesi",
      },
      options: [
        {
          code: ThemePickerCodeValues.SYSTEM,
          label: "Sistem",
        },
        {
          code: ThemePickerCodeValues.DARK,
          label: "Koyu",
        },
        {
          code: ThemePickerCodeValues.LIGHT,
          label: "Açık",
        },
      ],
    },
  },
  header: {
    links: [
      {
        label: "Hata Ayıklayıcı",
        path: sitePaths.home,
      },
      {
        label: "Giriş",
        path: sitePaths.introduction,
      },
      {
        label: "Kütüphaneler",
        path: sitePaths.libraries,
      },
      {
        label: "Sor",
        path: sitePaths.ask,
        isExternal: true,
      },
    ],
    labels: {
      close: "Menüyü kapat",
      open: "Menüyü aç",
    },
  },
  footer: {
    site: {
      url: BASE_URL,
      label: "JWT Hata Ayıklayıcı",
    },
    copyright: `Telif Hakkı © ${new Date().getFullYear()} Okta. Tüm hakları saklıdır.`,
    resources: {
      title: "AUTH0 TARAFINDAN SUNULMAKTADIR",
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
          label: "SAML Aracı",
          path: "https://samltool.io/",
        },
      ],
    },
    legal: {
      title: "YASAL",
      links: [
        {
          label: "Gizlilik Politikası",
          path: "https://www.okta.com/privacy-policy/",
        },
        {
          label: "Güvenlik",
          path: "https://trust.okta.com/",
        },
      ],
      modalTriggers: [
        {
          text: "Gizlilik Tercihleriniz",
          icon: {
            url: "https://cdn.auth0.com/website/footer/ccpa.svg",
            alt: "Bir hap şeklindeki buton iki parçaya bölünmüştür: sağ tarafta bir X işareti; sol tarafta bir onay işareti bulunur.",
          },
        },
      ],
    },
    social: {
      title: "SOSYAL MEDYA",
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
      title: "Gizlilik Tercihleriniz",
      content:
        "İkamet ettiğiniz eyalete bağlı olarak, Kaliforniya'da ikamet edenler dahil, kişisel bilgilerinizin üçüncü taraf reklam ortaklarıyla belirli paylaşımları konusunda vazgeçme hakkınız bulunmaktadır. Kişisel bilgilerinizi, çerezler aracılığıyla veya potansiyel müşterilerin e-posta adres listelerini sağlayarak üçüncü taraf reklam ortaklarıyla paylaşabiliriz; böylece web üzerinde ilgili reklamlarla size ulaşabiliriz.",
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
        ariaLabel: "Sayfa dilini seçin",
      },
      list: {
        ariaLabel: "Sayfa dilleri listesi",
      },
      options: [
        {
          value: "en",
          label: "English",
        },
        {
          value: "tr",
          label: "Türkçe",
        },
      ],
    },
  },
  errors: {
    notFound: {
      message: "Üzgünüz, aradığınız sayfa bulunamadı.",
      link: {
        path: "/",
        label: "Ana sayfaya dön",
      },
    },
    unexpectedError: {
      message: "Üzgünüz, bir hata oluştu.",
      actions: {
        tryAgain: {
          label: "Tekrar dene",
        },
        report: {
          label: "Bu hatayı bildir",
          path: "https://community.auth0.com/new-topic?category=jwt&tags=issue,jwt&title=%5BIssue%5D%20&body=%28Please%20report%20any%20issue%20that%20you%20may%20have%20encountered%20while%20using%20the%20JWT%20Debugger%20site.%20To%20delete%20this%20post%20draft%2C%20click%20the%20Close%20button%20below%20and%20then%20click%20Discard.%29",
        },
      },
    },
  },
};

if (withJapanese) {
  trLayoutDictionary.footer.languagePicker.options.push({
    label: "日本語",
    value: "ja",
  });
}
