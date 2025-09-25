import { BrandDictionaryModel } from "../../models/brand-dictionary.model"

export const enBrandDictionary: BrandDictionaryModel = {
  tooltip: "Right-click or long-press for logo options",
  menu: {
    brand: {
      label: "Brand",
      items: [
        { type: "COPY", icon: "copy-icon.svg", label: "Copy Logo SVG", assetSrc: "logo.svg" },
        { type: "DOWNLOAD", icon: "download-icon.svg", label: "Download Logo", assetSrc: "logo.svg" },
        { type: "COPY", icon: "copy-icon.svg", label: "Copy Symbol SVG", assetSrc: "symbol.svg" },
        { type: "DOWNLOAD", icon: "download-icon.svg", label: "Download Symbol", assetSrc: "symbol.svg" },
        { type: "COPY", icon: "copy-icon.svg", label: "Copy Wordmark SVG", assetSrc: "wordmark.svg" },
        { type: "DOWNLOAD", icon: "download-icon.svg", label: "Download Wordmark", assetSrc: "wordmark.svg" },
      ],
    },
    tools: {
      label: "Tools",
      items: [
        { label: "Passkeys Playground", url: "https://learnpasskeys.io" },
        { label: "WebAuthn Playground", url: "https://webauthn.me" },
        { label: "OIDC Playground", url: "https://openidconnect.net" },
        { label: "SAML Tool", url: "https://samltool.io" }
      ],
    },
  },
};
