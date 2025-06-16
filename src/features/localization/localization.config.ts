export const DEFAULT_LANGUAGE_CODE = "en";

export const PREFERRED_LANGUAGE_COOKIE_KEY = "preferred_language";

const withJapanese = process.env.NEXT_PUBLIC_WITH_JAPANESE === "enabled";

export const LANGUAGE_CODES = ["en"];

if (withJapanese) {
  LANGUAGE_CODES.push("ja");
}
