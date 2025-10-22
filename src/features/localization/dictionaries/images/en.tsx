import { BrandDictionaryModel } from "../../models/brand-dictionary.model";

export const enBrandDictionary: BrandDictionaryModel = {
  alertMessage: "SVG copied to clipboard",
  tooltip: "Right-click or long-press for logo options",
  menu: {
    brand: {
      label: "Brand",
      svg: {
        copyLabel: "Copy Logo SVG",
        downloadLabel: "Download Logo",
      },
      symbol: {
        copyLabel: "Copy Symbol SVG",
        downloadLabel: "Download Symbol",
      },
      wordmark: {
        copyLabel: "Copy Wordmark SVG",
        downloadLabel: "Download Wordmark",
      },
    },
    tools: {
      label: "Tools",
      items: [
        { label: "Passkeys Playground", url: "https://learnpasskeys.io" },
        { label: "WebAuthn Playground", url: "https://webauthn.me" },
        { label: "OIDC Playground", url: "https://openidconnect.net" },
        { label: "SAML Tool", url: "https://samltool.io" },
      ],
    },
  },
};
