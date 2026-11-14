import React, { PropsWithChildren } from "react";
import styles from "./page-layout.module.scss";
import { getLayoutDictionary } from "@/features/localization/services/language-dictionary.service";
import { ShellComponent } from "@/features/common/components/shell/shell.component";
import { FooterComponent } from "@/features/common/components/footer/footer.component";
import { ThemeCookieValues } from "@/features/common/values/theme.values";
import { PageHeaderComponent } from "@/features/common/components/layout/page-header/page-header.component";

// WebCrypto PQC origin trial:
// https://developer.chrome.com/origintrials/#/view_trial/1379790335835635713
const WEB_CRYPTO_PQC_ORIGIN_TRIAL_TOKEN =
  "AnishhJF49gYd6FyezhA4gjpUPHOtlKPeoII1gtrsUrI6G1WVbIvL1AkNsBe9GQgen/8TIHHpWa8I8nFjbZObwMAAABneyJvcmlnaW4iOiJodHRwczovL3d3dy5qd3QuaW86NDQzIiwiZmVhdHVyZSI6IldlYkNyeXB0b0FkZGl0aW9uYWxBbGdvcml0aG1zMjAyNjA2IiwiZXhwaXJ5IjoxNzkyNDU0NDAwfQ==";

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
    // The inline script below rewrites data-theme before hydration, so this
    // element's attributes are expected to differ from the server render.
    <html lang={languageCode} data-theme={themeCode} suppressHydrationWarning>
      <head>
        <meta
          httpEquiv="origin-trial"
          content={WEB_CRYPTO_PQC_ORIGIN_TRIAL_TOKEN}
        />
        {languageCode === "ja" && (
          <link rel="stylesheet" href="/fonts/japanese-fonts.css" />
        )}
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
      <ShellComponent languageCode={languageCode} themeCode={themeCode}>
        <PageHeaderComponent
          languageCode={languageCode}
          themeCode={themeCode}
        />
        <main className={styles.main}>{children}</main>
        <FooterComponent
          languageCode={languageCode}
          dictionary={layoutDictionary.footer}
        />
      </ShellComponent>
    </html>
  );
};
