import { HomeDictionaryModel } from "@/features/localization/models/home-dictionary.model";
import { sitePaths } from "@/features/seo/site-tree";

export const trHomeDictionary: HomeDictionaryModel = {
  metadata: {
    title: "JSON Web Tokens - jwt.io",
    description:
      "JSON Web Token (JWT), iki taraf arasında aktarılacak talepleri temsil etmenin kompakt ve URL dostu bir yoludur. JWT içindeki talepler, JSON Web Signature (JWS) kullanılarak dijital olarak imzalanan bir JSON nesnesi olarak kodlanır.",
    keywords: [
      "jwt",
      "jwt payload",
      "jwt header",
      "jwt signature",
      "json web token",
      "jwt debugger",
      "jwt encoder",
      "jwt decoder",
      "jwt verification",
    ],
    authors: [
      {
        name: "Auth0",
        url: "auth0.com",
      },
    ],
    images: ["/img/facebook-card.png"],
    datePublished: "2024-11-30T09:00:00-08:00",
    dateModified: "2024-11-30T09:00:00-08:00",
    twitter: {
      card: "summary_large_image",
      creator: "@auth0",
      title: "JWT.IO",
      description:
        "JSON Web Token, iki taraf arasında talepleri güvenli bir şekilde temsil etmek için kullanılan açık bir endüstri standardı olan RFC 7519 yöntemidir.",
      images: "/img/twitter-card.png",
    },
    openGraph: {
      type: "website",
      title: "JWT.IO",
      description:
        "JSON Web Token, iki taraf arasında talepleri güvenli bir şekilde temsil etmek için kullanılan açık bir endüstri standardı olan RFC 7519 yöntemidir.",
      locale: "tr_TR",
      url: "https://jwt.io/",
      images: {
        url: "/img/facebook-card.png",
        type: "image/png",
        width: 1200,
        height: 630,
      },
    },
  },
  hero: {
    title: "JSON Web Token (JWT) Hata Ayıklayıcı",
    description: null,
  },
  info: {
    description:
      "İki taraf arasında talepleri güvenli bir şekilde temsil etmek için kullanılan açık bir endüstri standardı olan RFC 7519 yöntemiyle JSON Web Token'ları çözümleyin, doğrulayın ve oluşturun.",
    resources: {
      spec: {
        name: "RFC 7519",
        link: "https://tools.ietf.org/html/rfc7519",
      },
    },
  },
  decoder: {
    title: "JWT Kod Çözücü",
    compactTitle: "Kod Çözücü",
    description:
      "Çözümlemek, doğrulamak ve onaylamak istediğiniz JWT'yi aşağıya yapıştırın.",
    syncButton: {
      label: "Kodlayıcı ile Senkronize Et",
      compactLabel: "Kodlayıcı ile Senkronize Et",
    },
    exampleGenerator: {
      label: "JWT örnek oluşturucu",
    },
    jwtEditor: {
      headline: "Kodlanmış Token",
      label: "JWT düzenleyici",
      title: "JSON Web Token (JWT)",
      compactTitle: "JWT",
      successMessage: "Geçerli JWT",
      autoFocusLabel: "Otomatik odaklanmayı etkinleştir",
    },
    decodedHeader: {
      title: "Çözülmüş Başlık",
      tabs: {
        json: {
          label: "JSON",
        },
        claims: {
          label: "Talep Detayları",
        },
      },
    },
    decodedPayload: {
      title: "Çözülmüş Yük",
      tabs: {
        json: {
          label: "JSON",
        },
        claims: {
          label: "Talep Detayları",
        },
      },
    },
    signatureVerification: {
      title: "JWT İmza Doğrulaması",
      subtitle: "(İsteğe Bağlı)",
      description: {
        secret: "JWT'yi imzalamak için kullanılan anahtarı aşağıya girin:",
        publicKey:
          "JWT'yi imzalamak için kullanılan açık anahtarı aşağıya girin:",
      },
      editor: {
        title: { secret: "Gizli Anahtar", publicKey: "Açık Anahtar" },
        successMessage: {
          secret: "Geçerli gizli anahtar",
          publicKey: "Geçerli açık anahtar",
        },
        placeholder: {
          secret: "Geçerli gizli anahtar",
          publicKey:
            "SPKI, PKCS #1, X.509 Sertifikası veya JWK string formatında Açık Anahtar.",
        },
      },
    },
  },
  encoder: {
    title: "JWT Kodlayıcı",
    compactTitle: "Kodlayıcı",
    description:
      "İmzalanmış bir JWT oluşturmak için aşağıdaki alanları doldurun.",
    syncButton: {
      label: "Kod Çözücü ile Senkronize Et",
      compactLabel: "Kod Çözücü ile Senkronize Et",
    },
    unsyncButton: {
      label: "Senkronizasyonu Kaldır",
      compactLabel: "Senkronizasyonu Kaldır",
    },
    exampleGenerator: {
      label: "Başlık, yük ve imza örnek oluşturucu",
    },
    headerEditor: {
      title: "Algoritma ve Token Türü",
      compactTitle: "Başlık",
      successMessage: "Geçerli başlık",
    },
    payloadEditor: {
      title: "Veri",
      compactTitle: "Yük",
      successMessage: "Geçerli yük",
    },
    signatureEditor: {
      title: {
        secret: "Gizli Anahtar",
        privateKey: "JWT İmzala: Özel Anahtar",
      },
      compactTitle: {
        secret: "JWT İmzala",
        privateKey: "JWT İmzala",
      },
      successMessage: {
        secret: "Geçerli gizli anahtar",
        privateKey: "Geçerli özel anahtar",
      },
      placeholder: {
        privateKey:
          "PKCS #8, PKCS #1 veya JWK string formatında Özel Anahtar. Anahtar tarayıcınızdan asla çıkmaz.",
      },
    },
    encodedJwt: {
      title: "Kodlanmış JWT",
      heading: "JWT İmzası",
    },
  },
};
