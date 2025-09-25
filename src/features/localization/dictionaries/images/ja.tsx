import { BrandDictionaryModel } from "../../models/brand-dictionary.model";

export const jaBrandDictionary: BrandDictionaryModel = {
  tooltip: "Right-click or long-press for logo options",
  menu: {
    brand: {
      label: "Brand",
      items: [
        { icon: "copy-icon.svg", label: "Copy Logo SVG", assetSrc: "logo.svg" },
        { icon: "download-icon.svg", label: "Download Logo", assetSrc: "logo.svg" },
        { icon: "copy-icon.svg", label: "Copy Symbol SVG", assetSrc: "symbol.svg" },
        { icon: "download-icon.svg", label: "Download Symbol", assetSrc: "symbol.svg" },
        { icon: "copy-icon.svg", label: "Copy Wordmark SVG", assetSrc: "wordmark.svg" },
        { icon: "download-icon.svg", label: "Download Wordmark", assetSrc: "wordmark.svg" },
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
