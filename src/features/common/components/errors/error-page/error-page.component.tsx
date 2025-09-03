import React from "react";
import styles from "./error-page.module.scss";
import { ShellComponent } from "@/features/common/components/shell/shell.component";
import { MobileHeaderComponent } from "@/features/common/components/headers/mobile-header/mobile-header.component";
import { HeaderComponent } from "@/features/common/components/headers/header/header.component";
import { FooterComponent } from "@/features/common/components/footer/footer.component";
import { LayoutDictionaryModel } from "@/features/localization/models/layout-dictionary.model";
import { ThemeCookieValues } from "@/features/common/values/theme.values";
import { getImageDictionary } from "@/features/localization/services/images-dictionary.service";

interface ErrorPageComponentProps {
  languageCode: string;
  themeCode: ThemeCookieValues;
  dictionary: LayoutDictionaryModel;
  children: React.ReactNode;
}

export const ErrorPageComponent: React.FC<ErrorPageComponentProps> = ({
  languageCode,
  themeCode,
  dictionary,
  children,
}) => {

  return (
    <html lang={languageCode} data-theme={themeCode}>
      <ShellComponent languageCode={languageCode} themeCode={themeCode}>
        <header className={styles.header}>
          <MobileHeaderComponent
            languageCode={languageCode}
            dictionary={dictionary.header}
          />
          <HeaderComponent
            languageCode={languageCode}
            dictionary={dictionary.header}
          />
        </header>
        <main className={styles.main}>{children}</main>
        <FooterComponent
          languageCode={languageCode}
          dictionary={dictionary.footer}
        />
      </ShellComponent>
    </html>
  );
};
