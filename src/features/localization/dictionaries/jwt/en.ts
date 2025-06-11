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
