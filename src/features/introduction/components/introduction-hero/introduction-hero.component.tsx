import React from "react";
import styles from "./introduction-hero.module.scss";
import { BoxComponent } from "@/features/common/components/box/box.component";
import { clsx } from "clsx";
import { getLocalizedSecondaryFont } from "@/libs/theme/fonts";
import { IntroductionDictionaryModel } from "@/features/localization/models/introduction-dictionary.model";

interface IntroductionHeroComponentProps {
  languageCode: string;
  dictionary: IntroductionDictionaryModel["hero"];
}

export const IntroductionHeroComponent: React.FC<
  IntroductionHeroComponentProps
> = ({ languageCode, dictionary }) => {
  return (
    <BoxComponent
      containerClassName={styles.container}
      contentClassName={styles.content}
    >
      <h1
        className={clsx(styles.title, getLocalizedSecondaryFont(languageCode))}
      >
        {dictionary.title}
      </h1>
    </BoxComponent>
  );
};
