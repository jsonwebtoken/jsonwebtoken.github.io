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

interface DownloadButtonProps {
  asset: StaticImageData;
  filename: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ asset, filename }) => {
  const downloadSVG = useCallback(
    (image: StaticImageData, filename: string) => {
      const link = document.createElement("a");
      link.href = image.src;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    [],
  );

  return (
    <Button
      className={styles.downloadButton}
      onPress={() => {
        setTimeout(() => {
          downloadSVG(asset, filename);
        }, 0);
      }}
    >
      <DownloadIconComponent />
    </Button>
  );
};

type AssetsComponentProps = {
  languageCode: string;
  dictionary: JwtDictionaryModel;
};

export const AssetsComponent: React.FC<AssetsComponentProps> = ({
  languageCode,
  dictionary,
}) => {
  const libraryLinkPath = createUrlPath([
    languageCode === DEFAULT_LANGUAGE_CODE ? "" : languageCode,
    dictionary.libraries.ctaButton.path
      ? dictionary.libraries.ctaButton.path
      : "",
  ]);

  return (
    <BoxComponent
      containerClassName={styles.container}
      contentClassName={styles.content}
    >
      <div className={clsx(styles.assets__column)}>
        <h4
          className={clsx(
            styles.assets__title,
            getLocalizedSecondaryFont(languageCode),
          )}
        >
          {dictionary.libraries.title}
        </h4>
        <div className={styles.assets__content}>
          <p className={styles.assets__description}>
            {dictionary.libraries.description}
          </p>
          <Link className={styles.asset__link} href={libraryLinkPath}>
            {dictionary.libraries.ctaButton.label}
          </Link>
        </div>
      </div>
      <div className={clsx(styles.assets__column)}>
        <h4
          className={clsx(
            styles.assets__title,
            getLocalizedSecondaryFont(languageCode),
          )}
        >
          {dictionary.assets.badges.title}
        </h4>
        <div className={styles.assets__content}>
          <div className={styles.card}>
            <Image
              {...dictionary.assets.badges.images.viewOn}
              alt={dictionary.assets.badges.images.viewOn.alt}
            />
            <DownloadButton
              filename={"view-on-jwt.badge.png"}
              asset={viewOnImg}
            />
          </div>
          <div className={styles.card}>
            <Image
              {...dictionary.assets.badges.images.compatible}
              alt={dictionary.assets.badges.images.compatible.alt}
            />
            <DownloadButton
              filename={"jwt-compatible.badge.png"}
              asset={compatibleImg}
            />
          </div>
        </div>
      </div>
      <div className={clsx(styles.assets__column)}>
        <h4
          className={clsx(
            styles.assets__title,
            getLocalizedSecondaryFont(languageCode),
          )}
        >
          {dictionary.assets.logotype.title}
        </h4>
        <div className={styles.assets__content}>
          <div className={styles.card}>
            <Image
              {...dictionary.assets.logotype.images.icon}
              alt={dictionary.assets.logotype.images.icon.alt}
            />
            <DownloadButton filename={"jwt.icon.png"} asset={iconImg} />
          </div>
          <div className={styles.card}>
            <Image
              {...dictionary.assets.logotype.images.iconWithLabel}
              alt={dictionary.assets.logotype.images.iconWithLabel.alt}
            />
            <DownloadButton
              filename={"jwt-label.icon.png"}
              asset={iconWithLabelImg}
            />
          </div>
        </div>
      </div>
    </BoxComponent>
  );
};
