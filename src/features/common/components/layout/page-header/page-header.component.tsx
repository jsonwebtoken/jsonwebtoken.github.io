import React from "react";
import { RibbonComponent } from "@/features/common/components/bars/ribbon/ribbon.component";
import { MobileHeaderComponent } from "@/features/common/components/headers/mobile-header/mobile-header.component";
import { HeaderComponent } from "@/features/common/components/headers/header/header.component";
import { ThemeCookieValues } from "@/features/common/values/theme.values";
import { getLayoutDictionary } from "@/features/localization/services/language-dictionary.service";

interface PageHeaderComponentProps {
  languageCode: string;
  themeCode: ThemeCookieValues;
  siteLogo: React.ReactNode;
}

export const PageHeaderComponent: React.FC<PageHeaderComponentProps> = ({
  themeCode,
  languageCode,
  siteLogo,
}) => {
  const layoutDictionary = getLayoutDictionary(languageCode);

  return (
    <>
      <MobileHeaderComponent
        languageCode={languageCode}
        dictionary={layoutDictionary.header}
        siteLogo={siteLogo}
        ribbon={
          <RibbonComponent
            themeCode={themeCode}
            languageCode={languageCode}
            dictionary={layoutDictionary.ribbon}
          />
        }
      />
      <HeaderComponent
        languageCode={languageCode}
        dictionary={layoutDictionary.header}
        siteLogo={siteLogo}
        ribbon={
          <RibbonComponent
            themeCode={themeCode}
            languageCode={languageCode}
            dictionary={layoutDictionary.ribbon}
          />
        }
      />
    </>
  );
};
