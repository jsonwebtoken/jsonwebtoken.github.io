import { BrandDictionaryModel } from "../../models/brand-dictionary.model";

export const jaBrandDictionary: BrandDictionaryModel = {
  alertMessage: "SVG がクリップボードにコピーされました",
  tooltip: "右クリックまたは長押し (ロゴオプション)",
  menu: {
    brand: {
      label: "ブランド",
      svg: {
        copyLabel: "ロゴ SVG をコピー",
        downloadLabel: "ロゴをダウンロード",
      },
      symbol: {
        copyLabel: "シンボル SVG をコピー",
        downloadLabel: "シンボルをダウンロード",
      },
      wordmark: {
        copyLabel: "ワードマーク SVG をコピー",
        downloadLabel: "ワードマークをダウンロード",
      },
    },
    tools: {
      label: "ツール",
      items: [
        { label: "Passkeys Playground", url: "https://learnpasskeys.io" },
        { label: "WebAuthn Playground", url: "https://webauthn.me" },
        { label: "OIDC Playground", url: "https://openidconnect.net" },
        { label: "SAMLツール", url: "https://samltool.io" },
      ],
    },
  },
};
