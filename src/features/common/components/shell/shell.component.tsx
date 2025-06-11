"use client";

import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";

import { saveUTM } from "@/features/analytics/services/save-utm";
import { COOKIE_LEVELS } from "@/features/analytics/models/cookie-levels.constants";
import { OnetrustScriptComponent } from "@/features/analytics/components/onetrust-script.component";
import { CLIENT_CONFIG } from "@/features/analytics/services/config";
import { COOKIE_CONSENT_STATUS } from "@/features/analytics/models/cookie-consent-status.constants";
import { GoogleTagManager } from "@next/third-parties/google";
import styles from "./shell.module.scss";
import { UiLocalizationService } from "@/features/localization/services/ui-localization.service";
import { clsx } from "clsx";
import {
  getLocalizedPrimaryFont,
  JapaneseFont,
  MonoFont,
  PrimaryFont,
  SecondaryFont,
} from "@/libs/theme/fonts";
import { ThemeDetectorComponent } from "@/features/common/components/theme-detector/theme-detector.component";
import { ThemeCookieValues } from "@/features/common/values/theme.values";
import { AbTestingScriptComponent } from "@/features/analytics/components/ab-testing-script/ab-testing-script.component";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

interface ShellComponentProps extends PropsWithChildren {
  languageCode: string;
  themeCode: ThemeCookieValues;
}

export const ShellComponent: React.FC<ShellComponentProps> = ({
  children,
  languageCode,
  themeCode,
}) => {
  const [consentLevel, setConsentLevel] = useState<string | null>(null);

  UiLocalizationService.init(languageCode);

  const handleConsentChange = useCallback(
    (e: any) => {
      if (
        e.data === COOKIE_CONSENT_STATUS.EXPRESSED_CONSENT &&
        window.OnetrustActiveGroups !== consentLevel
      ) {
        setConsentLevel(window.OnetrustActiveGroups);
      }

      if (e.data === COOKIE_CONSENT_STATUS.WAITING_FOR_CONSENT) {
        // eslint-disable-next-line new-cap
        window.OneTrust.OnConsentChanged(() =>
          setConsentLevel(window.OnetrustActiveGroups),
        );
      }
    },
    [consentLevel],
  );

  useEffect(() => {
    window.addEventListener("message", handleConsentChange, false);
    saveUTM();

    return () => window.removeEventListener("message", handleConsentChange);
  }, [handleConsentChange]);

  useEffect(() => {
    /**
     * At some point, the original jwt.io website used to store tokens and keys in LocalStorage
     * as a feature for people to see the last JWT they used.
     * That feature was removed as it was identified as a security risk.
     * This clean-up logic was added to remove existing tokens in LocalStorage from users who
     * were affected by the feature.
     * We are keeping this logic as part of legacy code. But, the number of users still affected should be close to zero.
     */
    try {
      if (typeof localStorage === "undefined") {
        return;
      }

      localStorage.removeItem("lastToken");
      localStorage.removeItem("lastPublicKey");
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <body
      className={clsx(
        getLocalizedPrimaryFont(languageCode),
        styles.container,
        PrimaryFont.variable,
        SecondaryFont.variable,
        JapaneseFont.variable,
        MonoFont.variable,
      )}
      data-theme={themeCode}
    >
      <OnetrustScriptComponent
        id={CLIENT_CONFIG.DEVELOPERS_DATA_DOMAIN_ID_ONETRUST}
      />
      {children}
      {consentLevel &&
        consentLevel.includes(COOKIE_LEVELS.NECESSARY.toString()) &&
        process.env.NEXT_PUBLIC_IS_PROD &&
        GTM_ID && (
          <>
            <GoogleTagManager gtmId={GTM_ID} />
            <AbTestingScriptComponent />
          </>
        )}
      <ThemeDetectorComponent />
    </body>
  );
};
