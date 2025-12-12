"use client";

import { PREFERRED_THEME_COOKIE_KEY } from "@/features/themes/theme.config";
import Cookies from "js-cookie";
import { getLayoutDictionary } from "@/features/localization/services/language-dictionary.service";
import { ThemeModel } from "@/features/common/models/theme.model";
import {
  ThemeCookieValues,
  ThemePickerCodeValues,
} from "@/features/common/values/theme.values";
import {
  getSanitizedThemeCookieValue,
  getSanitizedThemePickerCodeValue,
} from "@/features/themes/services/theme.utils";

export async function savePreferredThemeInCookie(
  selectedThemePickerCode: ThemePickerCodeValues,
  languageCode: string,
): Promise<ThemeModel | null> {
  const sanitizedThemePickerCodeValue = getSanitizedThemePickerCodeValue(
    selectedThemePickerCode,
  );

  if (!sanitizedThemePickerCodeValue) {
    return null;
  }

  const preferredThemeCookie = Cookies.get(PREFERRED_THEME_COOKIE_KEY);

  if (
    preferredThemeCookie &&
    preferredThemeCookie === sanitizedThemePickerCodeValue
  ) {
    return null;
  }

  if (sanitizedThemePickerCodeValue === ThemePickerCodeValues.SYSTEM) {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    if (mediaQuery.matches) {
      Cookies.set(PREFERRED_THEME_COOKIE_KEY, ThemeCookieValues.SYSTEM_DARK, {
        secure: true,
      });
      document.body.setAttribute("data-theme", ThemeCookieValues.SYSTEM_DARK);
      document.documentElement.setAttribute(
        "data-theme",
        ThemeCookieValues.SYSTEM_DARK,
      );

      const dictionary = getLayoutDictionary(languageCode);

      return dictionary.ribbon.themePicker.options.filter(
        (element) => element.code === selectedThemePickerCode,
      )[0];
    }

    Cookies.set(PREFERRED_THEME_COOKIE_KEY, ThemeCookieValues.SYSTEM_LIGHT, {
      secure: true,
    });
    document.body.setAttribute("data-theme", ThemeCookieValues.SYSTEM_LIGHT);
    document.documentElement.setAttribute(
      "data-theme",
      ThemeCookieValues.SYSTEM_LIGHT,
    );

    const dictionary = getLayoutDictionary(languageCode);

    return dictionary.ribbon.themePicker.options.filter(
      (element) => element.code === selectedThemePickerCode,
    )[0];
  }

  const sanitizedThemeCookieValue = getSanitizedThemeCookieValue(
    selectedThemePickerCode,
  );

  if (!sanitizedThemeCookieValue) {
    return null;
  }

  Cookies.set(PREFERRED_THEME_COOKIE_KEY, sanitizedThemeCookieValue, {
    secure: true,
  });

  document.body.setAttribute("data-theme", sanitizedThemeCookieValue);
  document.documentElement.setAttribute(
    "data-theme",
    sanitizedThemeCookieValue,
  );

  const dictionary = getLayoutDictionary(languageCode);

  return dictionary.ribbon.themePicker.options.filter(
    (element) => element.code === sanitizedThemePickerCodeValue,
  )[0];
}
