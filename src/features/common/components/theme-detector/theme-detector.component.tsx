"use client";

import React, { useEffect } from "react";
import { useAppStore } from "@/features/common/services/app.store";
import Cookies from "js-cookie";
import { PREFERRED_THEME_COOKIE_KEY } from "@/features/themes/theme.config";
import { getSanitizedThemeCookieValue } from "@/features/themes/services/theme.utils";
import { ThemeCookieValues } from "@/features/common/values/theme.values";

export const ThemeDetectorComponent: React.FC = () => {
  const setTheme$ = useAppStore((state) => state.setTheme$);

  useEffect(() => {
    const setTheme = (theme: ThemeCookieValues) => {
      document.documentElement.setAttribute("data-theme", theme);

      Cookies.set(PREFERRED_THEME_COOKIE_KEY, theme, {
        secure: true,
      });

      setTheme$(theme);
    };

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      const preferredThemeCookie = Cookies.get(PREFERRED_THEME_COOKIE_KEY);

      if (!preferredThemeCookie && e.matches) {
        setTheme(ThemeCookieValues.SYSTEM_DARK);

        return;
      }

      if (!preferredThemeCookie) {
        setTheme(ThemeCookieValues.SYSTEM_LIGHT);

        return;
      }

      const sanitizedThemeValue =
        getSanitizedThemeCookieValue(preferredThemeCookie);

      if (!sanitizedThemeValue) {
        return;
      }

      if (!sanitizedThemeValue.startsWith("system")) {
        return;
      }

      if (e.matches) {
        setTheme(ThemeCookieValues.SYSTEM_DARK);

        return;
      }

      setTheme(ThemeCookieValues.SYSTEM_LIGHT);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [setTheme$]);

  return null;
};
