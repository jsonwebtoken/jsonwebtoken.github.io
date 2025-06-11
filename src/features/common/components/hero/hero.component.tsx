"use client";

import React from "react";
import { clsx } from "clsx";
import { BoxComponent } from "@/features/common/components/box/box.component";
import styles from "./hero.module.scss";
import { HeroMetadataModel } from "@/features/common/models/hero-metadata.model";
import { getLocalizedSecondaryFont } from "@/libs/theme/fonts";
import { HeroWarningBannerComponent } from "@/features/common/components/hero/hero-warning-banner.component";
import { HomeDictionaryModel } from "@/features/localization/models/home-dictionary.model";
import { HeroModalStateValues } from "@/features/home/values/hero-modal-state.values";
import { HeroInfoBannerComponent } from "@/features/common/components/hero/hero-info-banner.component";

interface HeroComponentProps {
  languageCode: string;
  dictionary: HeroMetadataModel;
  infoBanner: {
    dictionary: HomeDictionaryModel["info"];
    state: HeroModalStateValues;
  };
  warningBanner: {
    dictionary: HomeDictionaryModel["warning"];
    state: HeroModalStateValues;
  };
}

export const HeroComponent: React.FC<HeroComponentProps> = ({
  languageCode,
  dictionary,
  infoBanner,
  warningBanner,
}) => {
  return (
    <BoxComponent
      containerClassName={styles.container}
      contentClassName={styles.content}
      wrapperClassName={styles.wrapper}
    >
      <h1
        className={clsx(
          getLocalizedSecondaryFont(languageCode),
          styles.hero__title,
        )}
      >
        {dictionary.title}
      </h1>
      <div className={styles.hero}>
        <HeroInfoBannerComponent
          languageCode={languageCode}
          dictionary={infoBanner.dictionary}
          modalState={infoBanner.state}
        />
        <HeroWarningBannerComponent
          dictionary={warningBanner.dictionary}
          modalState={warningBanner.state}
        />
      </div>
    </BoxComponent>
  );
};
