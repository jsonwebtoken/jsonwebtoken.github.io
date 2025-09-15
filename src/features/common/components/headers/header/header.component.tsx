"use client";

import React, { useCallback, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { DEFAULT_LANGUAGE_CODE } from "@/features/localization/localization.config";
import { LayoutDictionaryModel } from "@/features/localization/models/layout-dictionary.model";
import { createUrlPath, getPathnameSegments } from "@/libs/utils/path.utils";
import { sitePaths } from "@/features/seo/site-tree";
import styles from "./header.module.scss";
import { BoxComponent } from "@/features/common/components/box/box.component";
import Link from "next/link";
import { SiteBrandComponent } from "@/features/common/components/site-brand/site-brand.component";
import { ThemePickerComponent } from "../../theme-picker/theme-picker.component";
import {
  getSanitizedThemePickerCodeValue,
  isLightThemePreference,
  isSystemThemePreference,
} from "@/features/themes/services/theme.utils";
import { SystemIconComponent } from "../../bars/ribbon/assets/system-icon.component";
import { LightIconComponent } from "../../bars/ribbon/assets/light-icon.component";
import { DarkIconComponent } from "../../bars/ribbon/assets/dark-icon.component";
import {
  ThemeCookieValues,
  ThemePickerCodeValues,
} from "@/features/common/values/theme.values";
import { ThemeModel } from "@/features/common/models/theme.model";
import { savePreferredThemeInCookie } from "@/features/themes/services/theme.client.utils";

interface HeaderComponentProps {
  themeCode: ThemeCookieValues;
  languageCode: string;
  dictionary: LayoutDictionaryModel;
}

export const HeaderComponent: React.FC<HeaderComponentProps> = ({
  themeCode,
  languageCode,
  dictionary,
}) => {
  const pathname = usePathname();
  const pathnameSegments = getPathnameSegments(pathname);
  const topSegment =
    languageCode === DEFAULT_LANGUAGE_CODE
      ? pathnameSegments[0]
      : pathnameSegments[1];
  const topSegmentPath = createUrlPath([topSegment]);

  const languagePathPrefix: string =
    languageCode === DEFAULT_LANGUAGE_CODE
      ? sitePaths.root
      : createUrlPath([languageCode]);

  const themeOptions = useMemo(
    () =>
      dictionary.ribbon.themePicker.options.map((option) => {
        return {
          code: option.code,
          label: option.label,
          icon: isSystemThemePreference(option.code) ? (
            <SystemIconComponent />
          ) : isLightThemePreference(option.code) ? (
            <LightIconComponent />
          ) : (
            <DarkIconComponent />
          ),
        };
      }),
    [dictionary.ribbon.themePicker.options]
  );

  const sanitizedThemePickerCodeValue = useMemo(() => {
    return getSanitizedThemePickerCodeValue(themeCode);
  }, [themeCode]);

  const [currentTheme, setCurrentTheme] = useState<ThemeModel>(
    dictionary.ribbon.themePicker.options.filter((element) =>
      isSystemThemePreference(themeCode)
        ? isSystemThemePreference(element.code)
        : element.code === sanitizedThemePickerCodeValue
    )[0]
  );

  const handleThemeSelection = useCallback(
    async (value: ThemePickerCodeValues) => {
      const themePreference = await savePreferredThemeInCookie(
        value,
        languageCode
      );

      if (themePreference) {
        setCurrentTheme(themePreference);
      }
    },
    [languageCode]
  );

  return (
    <BoxComponent
      contentAs="nav"
      containerClassName={styles.container}
      wrapperClassName={styles.wrapper}
      contentClassName={styles.content}
      aria-label="Main navigation"
    >
      <div className={styles.brand}>
        <SiteBrandComponent
          path={languagePathPrefix}
          languageCode={languageCode}
        />
      </div>
      <div className={styles.navContainer}>
        <div className={styles.navTabs}>
          <ul className={styles.navList}>
            {dictionary.header.links.map((link) => {
              const linkPath =
                languageCode === DEFAULT_LANGUAGE_CODE || link.isExternal
                  ? link.path
                  : createUrlPath([languagePathPrefix, link.path]);

              return (
                <li
                  className={styles.navList__item}
                  key={link.label}
                  data-active={topSegmentPath === link.path}
                >
                  <Link
                    {...(link.isExternal
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    href={linkPath}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className={styles.actions}>
        <ThemePickerComponent
          options={themeOptions}
          handleSelection={handleThemeSelection}
          selectedOptionCode={currentTheme.code}
        />
      </div>
    </BoxComponent>
  );
};
