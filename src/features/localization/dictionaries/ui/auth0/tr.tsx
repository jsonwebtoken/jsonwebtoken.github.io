import { Auth0DictionaryModel } from "@/features/localization/models/auth0-dictionary.model";
import { AUTH0_SIGNUP_URL } from "@/libs/config/project-paths.constants";
import { EBOOK_URL } from "@/libs/config/project.constants";

export const trAuth0Dictionary: Auth0DictionaryModel = {
  banner: {
    title: "JSON Web Token Kullanmaya Başlayın",
    description:
      "Auth0 ile herhangi bir platformda ve cihazda 10 dakikadan kısa sürede JWT kullanarak güvenli kimlik doğrulamayı uygulayın.",
    image: {
      url: "/images/en.login-box.svg",
      alt: "Auth0 Evrensel Giriş ekranının bir önizlemesi; kullanıcı adı, Google gibi bir sosyal bağlantı veya passkey ile giriş yapma seçeneklerini içermektedir.",
    },
    ctaButton: {
      path: AUTH0_SIGNUP_URL,
      label: "Ücretsiz hesap oluşturun",
    },
  },
  ebook: {
    title: "JWT El Kitabını Edinin",
    description:
      "JWT'nin nasıl ortaya çıktığını ve hangi sorunları çözmek için tasarlandığını öğrenin. Bugün ücretsiz indirin.",
    ctaButton: {
      label: "E-Kitabı İndir",
      url: EBOOK_URL,
    },
  },
};
