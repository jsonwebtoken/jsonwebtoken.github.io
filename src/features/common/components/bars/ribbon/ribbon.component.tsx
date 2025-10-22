"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { LayoutDictionaryModel } from "@/features/localization/models/layout-dictionary.model";
import styles from "./ribbon.module.scss";
import { BoxComponent } from "@/features/common/components/box/box.component";
import { savePreferredLanguage } from "@/features/localization/services/ui-language.utils";
import Link from "next/link";
import {
  getSanitizedThemePickerCodeValue,
  isLightThemePreference,
  isSystemThemePreference,
} from "@/features/themes/services/theme.utils";
import { RibbonPickerComponent } from "@/features/common/components/bars/ribbon/ribbon-picker/ribbon-picker.component";
import { LightIconComponent } from "@/features/common/components/bars/ribbon/assets/light-icon.component";
import { DarkIconComponent } from "@/features/common/components/bars/ribbon/assets/dark-icon.component";
import { ThemeModel } from "@/features/common/models/theme.model";
import { useAppStore } from "@/features/common/services/app.store";
import { SystemIconComponent } from "@/features/common/components/bars/ribbon/assets/system-icon.component";
import {
  ThemeCookieValues,
  ThemePickerCodeValues,
} from "@/features/common/values/theme.values";
import { savePreferredThemeInCookie } from "@/features/themes/services/theme.client.utils";

interface RibbonComponentProps {
  themeCode: ThemeCookieValues;
  languageCode: string;
  dictionary: LayoutDictionaryModel["ribbon"];
}

export const RibbonComponent: React.FC<RibbonComponentProps> = ({
  themeCode,
  languageCode,
  dictionary,
}) => {
  const theme$ = useAppStore((state) => state.theme$);

  const sanitizedThemePickerCodeValue = useMemo(() => {
    return getSanitizedThemePickerCodeValue(themeCode);
  }, [themeCode]);

  const [currentTheme, setCurrentTheme] = useState<ThemeModel>(
    dictionary.themePicker.options.filter((element) =>
      isSystemThemePreference(themeCode)
        ? isSystemThemePreference(element.code)
        : element.code === sanitizedThemePickerCodeValue,
    )[0],
  );

  const themeOptions = useMemo(
    () =>
      dictionary.themePicker.options.map((option) => {
        return {
          code: option.code,
          full: {
            ...option,
            label: option.label,
            icon: isSystemThemePreference(option.code) ? (
              <SystemIconComponent />
            ) : isLightThemePreference(option.code) ? (
              <LightIconComponent />
            ) : (
              <DarkIconComponent />
            ),
          },
          compact: {
            ...option,
            label: null,
            icon: isSystemThemePreference(option.code) ? (
              <SystemIconComponent />
            ) : isLightThemePreference(option.code) ? (
              <LightIconComponent />
            ) : (
              <DarkIconComponent />
            ),
          },
        };
      }),
    [dictionary.themePicker.options],
  );

  const handleThemeSelection = useCallback(
    async (value: ThemePickerCodeValues) => {
      const themePreference = await savePreferredThemeInCookie(
        value,
        languageCode,
      );

      if (themePreference) {
        setCurrentTheme(themePreference);
      }
    },
    [languageCode],
  );

  const handleLanguageSelection = useCallback(async (value: string) => {
    await savePreferredLanguage(value);
  }, []);

  useEffect(() => {
    if (theme$) {
      setCurrentTheme(
        dictionary.themePicker.options.filter((element) =>
          isSystemThemePreference(themeCode)
            ? isSystemThemePreference(element.code)
            : element.code === sanitizedThemePickerCodeValue,
        )[0],
      );
    }
  }, [
    dictionary.themePicker.options,
    sanitizedThemePickerCodeValue,
    theme$,
    themeCode,
  ]);

  return (
    <>
      <BoxComponent
        contentAs="section"
        containerClassName={styles.container}
        wrapperClassName={styles.wrapper}
        contentClassName={styles.content}
        aria-label="Page options"
      >
        <div className={styles.cta}>
          <span className={styles.cta__title}>{dictionary.cta.title}</span>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href={dictionary.cta.link.url}
            className={styles.cta__description}
          >
            {dictionary.cta.description}
            <div className={styles.cta__arrow}>
              <svg
                aria-hidden={true}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M3.10449 12.9991L12.8917 3.21191"
                  stroke="#FBFBFB"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M3 3H13V13"
                  stroke="#FBFBFB"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </Link>
        </div>
        <div className={styles.actions}>
          <RibbonPickerComponent<ThemePickerCodeValues>
            label={null}
            compactLabel={null}
            icon={
              isSystemThemePreference(currentTheme.code) ? (
                <SystemIconComponent />
              ) : isLightThemePreference(currentTheme.code) ? (
                <LightIconComponent />
              ) : (
                <DarkIconComponent />
              )
            }
            languageCode={languageCode}
            selectedOptionCode={currentTheme.code}
            handleSelection={handleThemeSelection}
            options={themeOptions}
            aria={{
              buttonLabel: dictionary.themePicker.button.ariaLabel,
              listLabel: dictionary.themePicker.list.ariaLabel,
            }}
          />
        </div>
      </BoxComponent>
    </>
  );
};
