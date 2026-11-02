import { BrandDictionaryModel } from "../../models/brand-dictionary.model";

export const trBrandDictionary: BrandDictionaryModel = {
  alertMessage: "SVG panoya kopyalandı",
  tooltip: "Logo seçenekleri için sağ tıklayın veya uzun basın",
  menu: {
    brand: {
      label: "Marka",
      svg: {
        copyLabel: "Logo SVG Kopyala",
        downloadLabel: "Logo İndir",
      },
      symbol: {
        copyLabel: "Sembol SVG Kopyala",
        downloadLabel: "Sembol İndir",
      },
      wordmark: {
        copyLabel: "Yazı Logosu SVG Kopyala",
        downloadLabel: "Yazı Logosu İndir",
      },
    },
    tools: {
      label: "Araçlar",
      items: [
        { label: "Passkeys Playground", url: "https://learnpasskeys.io" },
        { label: "WebAuthn Playground", url: "https://webauthn.me" },
        { label: "OIDC Playground", url: "https://openidconnect.net" },
        { label: "SAML Aracı", url: "https://samltool.io" },
      ],
    },
  },
};
