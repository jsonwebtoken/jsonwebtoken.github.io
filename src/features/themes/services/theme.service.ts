import "server-only";

import { cookies } from "next/headers";
import { PREFERRED_THEME_COOKIE_KEY } from "@/features/themes/theme.config";
import { getSanitizedThemeCookieValue } from "@/features/themes/services/theme.utils";
import { ThemeCookieValues } from "@/features/common/values/theme.values";

export const getThemeCodeFromCookies = (): ThemeCookieValues => {
  const preferredThemeCookie = cookies().get(PREFERRED_THEME_COOKIE_KEY);

  if (!preferredThemeCookie) {
    return ThemeCookieValues.SYSTEM_DARK;
  }

  const sanitizedThemeValue = getSanitizedThemeCookieValue(
    preferredThemeCookie.value,
  );

  if (!sanitizedThemeValue) {
    return ThemeCookieValues.SYSTEM_DARK;
  }

  return sanitizedThemeValue;
};
