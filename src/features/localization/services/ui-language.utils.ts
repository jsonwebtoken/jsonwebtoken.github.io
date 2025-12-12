"use client";

import {
  DEFAULT_LANGUAGE_CODE,
  LANGUAGE_CODES,
  PREFERRED_LANGUAGE_COOKIE_KEY,
} from "@/features/localization/localization.config";
import { createUrlPath, getPathnameSegments } from "@/libs/utils/path.utils";
import Cookies from "js-cookie";

export async function savePreferredLanguage(languageCode: string) {
  const isSupportedLanguage = LANGUAGE_CODES.includes(languageCode);

  if (!isSupportedLanguage) {
    return;
  }

  const preferredLanguageCookie = Cookies.get(PREFERRED_LANGUAGE_COOKIE_KEY);

  const pathname = window.location.pathname;
  const pathnameSegments = getPathnameSegments(pathname);

  const pathnameHasLanguage = LANGUAGE_CODES.some(
    (language) =>
      pathname.startsWith(`/${language}/`) || pathname === `/${language}`,
  );

  /**
   * pathname: /ja/resources
   * languageCode: en
   *
   * Redirect /ja/resources to /resources
   */
  if (pathnameHasLanguage && languageCode === DEFAULT_LANGUAGE_CODE) {
    pathnameSegments.shift();

    Cookies.set(PREFERRED_LANGUAGE_COOKIE_KEY, languageCode, {
      secure: true,
    });

    window.location.replace(createUrlPath([...pathnameSegments]));

    return;
  }

  /**
   * pathname: /ja/resources
   * languageCode: ja | fr | de | etc.
   *
   * Redirect /ja/resources to /fr/resources,
   * if language in path is different from language selected
   */
  if (pathnameHasLanguage && languageCode !== DEFAULT_LANGUAGE_CODE) {
    const languagePathSegment = pathnameSegments.shift();

    if (languageCode === languagePathSegment) {
      return;
    }

    window.location.replace(createUrlPath([languageCode, ...pathnameSegments]));

    return;
  }

  /**
   * pathname: /resources
   * languageCode: en
   *
   * Don't redirect.
   */
  if (!pathnameHasLanguage && languageCode === DEFAULT_LANGUAGE_CODE) {
    if (!preferredLanguageCookie) {
      Cookies.set(PREFERRED_LANGUAGE_COOKIE_KEY, languageCode, {
        secure: true,
      });
    }

    return;
  }

  /**
   * pathname: /resources
   * languageCode: languageCode: ja | fr | de | etc.
   *
   * Redirect /resources to /ja/resources
   */
  if (!pathnameHasLanguage && languageCode !== DEFAULT_LANGUAGE_CODE) {
    Cookies.set(PREFERRED_LANGUAGE_COOKIE_KEY, languageCode, {
      secure: true,
    });

    window.location.replace(createUrlPath([languageCode, ...pathnameSegments]));

    return;
  }

  return;
}
