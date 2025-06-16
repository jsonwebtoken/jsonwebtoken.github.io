import "server-only";

import Negotiator from "negotiator";
import { cookies, headers } from "next/headers";
import { match } from "@formatjs/intl-localematcher";
import {
  DEFAULT_LANGUAGE_CODE,
  LANGUAGE_CODES,
  PREFERRED_LANGUAGE_COOKIE_KEY,
} from "@/features/localization/localization.config";

export const getLanguageCodeFromHeaders = (): string => {
  const preferredLanguageCookie = cookies().get(PREFERRED_LANGUAGE_COOKIE_KEY);

  if (preferredLanguageCookie) {
    const preferredLanguage = preferredLanguageCookie.value;
    const isSupportedLanguage = LANGUAGE_CODES.includes(preferredLanguage);

    return isSupportedLanguage ? preferredLanguage : DEFAULT_LANGUAGE_CODE;
  }

  try {
    const languages = new Negotiator({
      headers: Object.fromEntries(headers()),
    }).languages();

    return match(languages, LANGUAGE_CODES, DEFAULT_LANGUAGE_CODE);
  } catch (e) {
    return DEFAULT_LANGUAGE_CODE;
  }
};
