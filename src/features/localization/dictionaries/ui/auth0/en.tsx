import { Auth0DictionaryModel } from "@/features/localization/models/auth0-dictionary.model";
import { AUTH0_SIGNUP_URL } from "@/libs/config/project-paths.constants";
import { EBOOK_URL } from "@/libs/config/project.constants";

export const enAuth0Dictionary: Auth0DictionaryModel = {
  banner: {
    title: "Get Started with JSON Web Tokens",
    description:
      "Securely implement authentication with JWTs using Auth0 on any stack and any device in less than 10 minutes.",
    image: {
      url: "/images/en.login-box.svg",
      alt: "a preview of what Auth0 Universal Login looks like, featuring options to log in with a username, a social connection like Google, or a passkey.",
    },
    ctaButton: {
      path: AUTH0_SIGNUP_URL,
      label: "Create a free account",
    },
  },
  ebook: {
    title: "Get the JWT Handbook",
    description:
      "Learn how JWT came to be and what problems it was designed to tackle. Download it today for free.",
    ctaButton: {
      label: "Download Ebook",
      url: EBOOK_URL,
    },
  },
};
