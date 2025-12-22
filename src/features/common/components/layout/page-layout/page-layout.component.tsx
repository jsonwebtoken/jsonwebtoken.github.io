import React, { PropsWithChildren } from "react";
import styles from "./page-layout.module.scss";
import { getLayoutDictionary } from "@/features/localization/services/language-dictionary.service";
import { ShellComponent } from "@/features/common/components/shell/shell.component";
import { FooterComponent } from "@/features/common/components/footer/footer.component";
import { ThemeCookieValues } from "@/features/common/values/theme.values";
import { PageHeaderComponent } from "@/features/common/components/layout/page-header/page-header.component";

interface LayoutComponentProps extends PropsWithChildren {
  languageCode: string;
  themeCode: ThemeCookieValues;
}

export const PageLayoutComponent: React.FC<LayoutComponentProps> = ({
  languageCode,
  themeCode,
  children,
}) => {
  const layoutDictionary = getLayoutDictionary(languageCode);

  return (
    <html lang={languageCode} data-theme={themeCode}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const setTheme = function(theme) {
                  document.documentElement.setAttribute('data-theme', theme);
                  document.cookie = 'preferred_theme=' + encodeURIComponent(theme) + '; path=/; max-age=31536000'; // 1 year
                };

                // Function to get cookie value
                const getCookie = function(name) {
                  let cookieValue = null;
                  if (document.cookie && document.cookie !== '') {
                    const cookies = document.cookie.split(';');
                    for (let i = 0; i < cookies.length; i++) {
                      const cookie = cookies[i].trim();
                      if (cookie.substring(0, name.length + 1) === (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                      }
                    }
                  }
                  return cookieValue;
                };

                // Check if cookie exists and has a valid value
                const cookieValue = getCookie('preferred_theme');
                const validThemes = ['dark', 'light', 'system-dark', 'system-light'];
                
                if (cookieValue && validThemes.includes(cookieValue)) {
                  setTheme(cookieValue);
                  return;
                }

                // If no valid cookie, detect system preference
                if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                  setTheme('system-dark');
                  return;
                }
                  
                setTheme('system-light');
              })();
            `,
          }}
        />
      </head>
      {/* <ShellComponent languageCode={languageCode} themeCode={themeCode}>
        <PageHeaderComponent
          languageCode={languageCode}
          themeCode={themeCode}
        />
        <main className={styles.main}>{children}</main>
        <FooterComponent
          languageCode={languageCode}
          dictionary={layoutDictionary.footer}
        />
      </ShellComponent> */}
    </html>
  );
};
