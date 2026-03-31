import { LibrariesDictionaryModel } from "@/features/localization/models/libraries-dictionary.model";

export const trLibrariesDictionary: LibrariesDictionaryModel = {
  metadata: {
    title: "JSON Web Token Kütüphaneleri - jwt.io",
    description:
      "Favori programlama dilinizde JSON Web Token ile çalışmanızı sağlayan kütüphanelere genel bir bakış atın.",
    authors: [
      {
        name: "Auth0",
        url: "auth0.com",
      },
    ],
    images: ["/img/facebook-card.png"],
    keywords: [
      "json web token kütüphaneleri",
      "jwt kütüphaneleri",
      "jwt kodlayıcı kütüphaneleri",
      "jwt kod çözücü kütüphaneleri",
      "jwt doğrulama kütüphaneleri",
    ],
    datePublished: "2024-11-30T09:00:00-08:00",
    dateModified: "2024-11-30T09:00:00-08:00",
    twitter: {
      card: "summary_large_image",
      creator: "@auth0",
      title: "JWT.IO - JSON Web Token Kütüphaneleri",
      description:
        "Favori programlama dilinizde JSON Web Token ile çalışmanızı sağlayan kütüphanelere genel bir bakış atın.",
      images: "/img/twitter-card.png",
    },
    openGraph: {
      type: "website",
      title: "JWT.IO - JSON Web Token Kütüphaneleri",
      description:
        "Favori programlama dilinizde JSON Web Token ile çalışmanızı sağlayan kütüphanelere genel bir bakış atın.",
      locale: "tr_TR",
      url: "https://jwt.io/libraries",
      images: {
        url: "/img/facebook-card.png",
        type: "image/png",
        width: 1200,
        height: 630,
      },
    },
  },
  title: "Token İmzalama/Doğrulama Kütüphaneleri",
  filterPicker: {
    label: "Filtrele",
    defaultValue: {
      label: "Tümü",
      value: "all",
    },
  },
  result: {
    viewRepo: {
      label: "Depoyu görüntüle",
    },
    minimumVersion: {
      label: "Minimum sürüm",
      resource: {
        label: "Daha fazla bilgi",
        url: "https://auth0.com/blog/critical-vulnerabilities-in-json-web-token-libraries/",
      },
    },
  },
};
