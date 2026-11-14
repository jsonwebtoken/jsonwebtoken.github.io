"use client";

import { UnexpectedErrorComponent } from "@/features/common/components/errors/unexpected-error/unexpected-error.component";
import React from "react";
import { getLayoutDictionary } from "@/features/localization/services/language-dictionary.service";
import { DEFAULT_LANGUAGE_CODE } from "@/features/localization/localization.config";
import { DEFAULT_THEME_VALUE } from "@/features/themes/theme.config";
import { ErrorPageComponent } from "@/features/common/components/errors/error-page/error-page.component";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const languageCode = DEFAULT_LANGUAGE_CODE;
  const themeCode = DEFAULT_THEME_VALUE;

  const layoutDictionary = getLayoutDictionary(languageCode);

  return (
    <ErrorPageComponent
      languageCode={languageCode}
      themeCode={themeCode}
    >
      <UnexpectedErrorComponent
        metadata={layoutDictionary.errors.unexpectedError}
        reset={reset}
      />
    </ErrorPageComponent>
  );
}
