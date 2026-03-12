"use client";

import React, { useCallback } from "react";
import styles from "./assets.module.scss";
import { clsx } from "clsx";
import Image, { StaticImageData } from "next/image";
import { DownloadIconComponent } from "@/features/common/assets/download-icon.component";
import Link from "next/link";
import { BoxComponent } from "@/features/common/components/box/box.component";
import { JwtDictionaryModel } from "@/features/localization/models/jwt-dictionary.model";
import { getLocalizedSecondaryFont } from "@/libs/theme/fonts";
import viewOnImg from "./view-on.png";
import compatibleImg from "./jwt-compatible.png";
import iconImg from "./jwt.icon.png";
import iconWithLabelImg from "./jwt-label.icon.png";
import { createUrlPath } from "@/libs/utils/path.utils";
import { DEFAULT_LANGUAGE_CODE } from "@/features/localization/localization.config";
import { Button } from "react-aria-components";
import { ArrowHeadIconComponent } from "@/features/common/assets/arrow-head-icon.component";
import { Auth0DictionaryModel } from "@/features/localization/models/auth0-dictionary.model";
import { Auth0CtaComponent } from "@/features/common/components/auth0-cta/auth0-cta.component";

type AssetsComponentProps = {
  languageCode: string;
  jwtDictionary: JwtDictionaryModel;
  auth0Dictionary: Auth0DictionaryModel;
};

export const AssetsComponent: React.FC<AssetsComponentProps> = ({
  languageCode,
  jwtDictionary,
  auth0Dictionary,
}) => {
  const libraryLinkPath = createUrlPath([
    languageCode === DEFAULT_LANGUAGE_CODE ? "" : languageCode,
    jwtDictionary.libraries.ctaButton.path
      ? jwtDictionary.libraries.ctaButton.path
      : "",
  ]);

  return (
    <div className={styles.content}>
      <div className={clsx(styles.assets__column)}>
        <h4
          className={clsx(
            styles.assets__title,
            getLocalizedSecondaryFont(languageCode)
          )}
        >
          {jwtDictionary.libraries.title}
        </h4>
        <div className={styles.assets__content}>
          <p className={styles.assets__description}>
            {jwtDictionary.libraries.description}
          </p>
          <Link className={styles.asset__link} href={libraryLinkPath}>
            {jwtDictionary.libraries.ctaButton.label}
            <ArrowHeadIconComponent />
          </Link>
        </div>
      </div>
      <Auth0CtaComponent
        languageCode={languageCode}
        dictionary={auth0Dictionary.banner}
      />
    </div>
  );
};
