import auth0Logo from "@/features/common/assets/auth0-logo.png";
import jwtLogo from "@/features/common/assets/jwt-flower.png";
import { ImagesDictionaryModel } from "@/features/localization/models/images-dictionary.model";

export const jaImagesDictionary: ImagesDictionaryModel = {
  logos: {
    site: {
      src: jwtLogo.src,
      alt: "異なる色の花びらを持つ花に似たトークン。",
      width: jwtLogo.width,
      height: jwtLogo.height,
    },
    auth0: {
      src: auth0Logo.src,
      alt: "“Auth0”ロゴ。盾の中央から四方八方に伸びる星が描かれている。",
      width: auth0Logo.width,
      height: auth0Logo.height,
    },
  },
};
