import { JwtDictionaryModel } from "@/features/localization/models/jwt-dictionary.model";
import { sitePaths } from "@/features/seo/site-tree";

export const jaJwtDictionary: JwtDictionaryModel = {
  libraries: {
    title: "JWTライブラリをお探しですか？",
    description:
      "ライブラリページにアクセスして、お好きな言語のJWTライブラリを見つけてください。",
    ctaButton: {
      label: "すべてのライブラリ",
      path: sitePaths.libraries,
    },
  },
  skills: {
    title: "AIエージェントにJWT Skillsを追加",
    description:
      "Agent Skillsを利用し、エージェントハーネスでJSWON Web Tokensのデコード、エンコード、検証を実現しましょう。",
    installAllSkills: "すべてのSkillsをインストール",
    installSpecificSkill: "特定のSkillsをインストール",
    ctaButton: {
      label: "Skillsを確認",
      path: "https://github.com/jsonwebtoken/jwt-skills",
      isExternal: true,
    },
  },
  assets: {
    badges: {
      title: "バッジ",
      images: {
        viewOn: {
          src: "/img/badge.svg",
          alt: "「View on JWT.io」バッジロゴ ",
          height: 36,
          width: 138,
        },
        compatible: {
          src: "/img/badge-compatible.svg",
          alt: "「JWT compatible」バッジロゴ",
          height: 36,
          width: 144,
        },
      },
    },
    logotype: {
      title: "ロゴタイプ",
      images: {
        icon: {
          src: "/img/icon.svg",
          alt: "JWTロゴマークアイコン",
          width: 36,
          height: 36,
        },
        iconWithLabel: {
          src: "/img/logo-asset.svg",
          alt: "JWTロゴ",
          width: 72,
          height: 36,
        },
      },
    },
  },
};
