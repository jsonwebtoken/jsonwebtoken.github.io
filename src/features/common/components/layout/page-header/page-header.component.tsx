"use client";

import React from "react";
import { MobileHeaderComponent } from "@/features/common/components/headers/mobile-header/mobile-header.component";
import { HeaderComponent } from "@/features/common/components/headers/header/header.component";
import { ThemeCookieValues } from "@/features/common/values/theme.values";
import { getLayoutDictionary } from "@/features/localization/services/language-dictionary.service";

interface PageHeaderComponentProps {
  languageCode: string;
  themeCode: ThemeCookieValues;
}

export const PageHeaderComponent: React.FC<PageHeaderComponentProps> = ({
  themeCode,
  languageCode,
}) => {
  const layoutDictionary = getLayoutDictionary(languageCode);

  return (
    <header>
      <MobileHeaderComponent
        themeCode={themeCode}
        languageCode={languageCode}
        dictionary={layoutDictionary}
      />
      <HeaderComponent
        themeCode={themeCode}
        languageCode={languageCode}
        dictionary={layoutDictionary}
      />
    </header>
  );
};
