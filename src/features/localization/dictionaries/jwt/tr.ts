import { JwtDictionaryModel } from "@/features/localization/models/jwt-dictionary.model";

export const trJwtDictionary: JwtDictionaryModel = {
  libraries: {
    title: "Bir JWT kütüphanesi mi arıyorsunuz?",
    description:
      "Favori programlama dilinizde bir JWT kütüphanesi bulmak için kütüphane sayfamıza göz atın.",
    ctaButton: {
      label: "Tüm kütüphaneleri gör",
      path: "/libraries",
    },
  },
  assets: {
    badges: {
      title: "Rozetler",
      images: {
        viewOn: {
          src: "/img/badge.svg",
          alt: "JWT.io üzerinde görüntüle rozeti logosu",
          height: 36,
          width: 138,
        },
        compatible: {
          src: "/img/badge-compatible.svg",
          alt: "JWT uyumlu rozet logosu",
          height: 36,
          width: 144,
        },
      },
    },
    logotype: {
      title: "Logo",
      images: {
        icon: {
          src: "/img/icon.svg",
          alt: "JWT logo simgesi",
          width: 36,
          height: 36,
        },
        iconWithLabel: {
          src: "/img/logo-asset.svg",
          alt: "JWT logosu",
          width: 72,
          height: 36,
        },
      },
    },
  },
};
