import { JwtDictionaryModel } from "@/features/localization/models/jwt-dictionary.model";

export const enJwtDictionary: JwtDictionaryModel = {
  libraries: {
    title: "Looking for a JWT library?",
    description:
      "Head on over to our libraries page to find a JWT library in your favorite language.",
    ctaButton: {
      label: "See all libraries",
      path: "/libraries",
    },
  },
  skills: {
    title: "Give your AI Agents JWT skills",
    description:
      "Use agent skills to decode, encode and validate JSON Web Tokens in your favorite agentic coding harness.",
    installAllSkills: "Install all skills",
    installSpecificSkill: "Install a specific skill",
    ctaButton: {
      label: "See the skills",
      path: "https://github.com/jsonwebtoken/jwt-skills",
      isExternal: true,
    },
  },
  assets: {
    badges: {
      title: "Badges",
      images: {
        viewOn: {
          src: "/img/badge.svg",
          alt: "View on JWT.io badge logo",
          height: 36,
          width: 138,
        },
        compatible: {
          src: "/img/badge-compatible.svg",
          alt: "JWT compatible badge logo",
          height: 36,
          width: 144,
        },
      },
    },
    logotype: {
      title: "Logotype",
      images: {
        icon: {
          src: "/img/icon.svg",
          alt: "JWT logo mark icon",
          width: 36,
          height: 36,
        },
        iconWithLabel: {
          src: "/img/logo-asset.svg",
          alt: "JWT logo",
          width: 72,
          height: 36,
        },
      },
    },
  },
};
