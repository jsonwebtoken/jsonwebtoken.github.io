import React from "react";
import { getLayoutDictionary } from "@/features/localization/services/language-dictionary.service";
import { getLanguageCodeFromHeaders } from "@/features/localization/services/app-language.service";
import { getThemeCodeFromCookies } from "@/features/themes/services/theme.service";
import { ErrorPageComponent } from "@/features/common/components/errors/error-page/error-page.component";
import { NotFoundComponent } from "@/features/common/components/errors/not-found/not-found.component";

export default function NotFound() {
  const languageCode = getLanguageCodeFromHeaders();
  const themeCode = getThemeCodeFromCookies();

  const layoutDictionary = getLayoutDictionary(languageCode);

  return (
    <ErrorPageComponent
      languageCode={languageCode}
      themeCode={themeCode}
    >
      <NotFoundComponent metadata={layoutDictionary.errors.notFound} />
    </ErrorPageComponent>
  );
}
