import {
  ThemeCookieValues,
  ThemePickerCodeValues,
} from "@/features/common/values/theme.values";

export const isSystemThemePreference = (value: string) =>
  value.startsWith(ThemePickerCodeValues.SYSTEM);

export const isLightThemePreference = (value: string) =>
  value === ThemePickerCodeValues.LIGHT;

export const getSanitizedThemeCookieValue = (
  value: string | null,
): ThemeCookieValues | null => {
  if (
    value === ThemeCookieValues.LIGHT ||
    value === ThemeCookieValues.DARK ||
    value === ThemeCookieValues.SYSTEM_LIGHT ||
    value === ThemeCookieValues.SYSTEM_DARK
  ) {
    return value;
  }

  return null;
};

export const getSanitizedThemePickerCodeValue = (
  value: string | null,
): ThemePickerCodeValues | null => {
  if (
    value === ThemePickerCodeValues.LIGHT ||
    value === ThemePickerCodeValues.DARK ||
    value === ThemePickerCodeValues.SYSTEM
  ) {
    return value;
  }

  return null;
};
