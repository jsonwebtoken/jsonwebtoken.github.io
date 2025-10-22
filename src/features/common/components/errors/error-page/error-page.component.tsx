import React from "react";
import styles from "./error-page.module.scss";
import { ShellComponent } from "@/features/common/components/shell/shell.component";
import { MobileHeaderComponent } from "@/features/common/components/headers/mobile-header/mobile-header.component";
import { HeaderComponent } from "@/features/common/components/headers/header/header.component";
import { FooterComponent } from "@/features/common/components/footer/footer.component";
import { ThemeCookieValues } from "@/features/common/values/theme.values";
import { getLayoutDictionary } from "@/features/localization/services/language-dictionary.service";

interface ErrorPageComponentProps {
  languageCode: string;
  themeCode: ThemeCookieValues;
  children: React.ReactNode;
}

export const ErrorPageComponent: React.FC<ErrorPageComponentProps> = ({
  languageCode,
  themeCode,
  children,
}) => {
  const layoutDictionary = getLayoutDictionary(languageCode);

  return (
    <html lang={languageCode} data-theme={themeCode}>
      <ShellComponent languageCode={languageCode} themeCode={themeCode}>
        <header className={styles.header}>
          <MobileHeaderComponent
            languageCode={languageCode}
            dictionary={layoutDictionary}
            themeCode={themeCode}
          />
          <HeaderComponent
            languageCode={languageCode}
            dictionary={layoutDictionary}
            themeCode={themeCode}
          />
        </header>
        <main className={styles.main}>{children}</main>
        <FooterComponent
          languageCode={languageCode}
          dictionary={layoutDictionary.footer}
        />
      </ShellComponent>
    </html>
  );
};
