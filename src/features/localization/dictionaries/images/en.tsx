import auth0Logo from "@/features/common/assets/auth0-logo.png";
import jwtLogo from "@/features/common/assets/jwt-flower.png";
import { ImagesDictionaryModel } from "@/features/localization/models/images-dictionary.model";

export const enImagesDictionary: ImagesDictionaryModel = {
  logos: {
    site: {
      src: jwtLogo.src,
      alt: "A token that resembles a flower with petals of a different color.",
      width: jwtLogo.width,
      height: jwtLogo.height,
    },
    auth0: {
      src: auth0Logo.src,
      alt: "This logo has the word “Auth0” and a shield on its left side. The shield has a four-pointed star inside, which spans across its surface.",
      width: auth0Logo.width,
      height: auth0Logo.height,
    },
  },
};
