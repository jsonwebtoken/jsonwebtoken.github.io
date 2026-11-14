import React from "react";
import styles from "./skills-cta.module.scss";
import { clsx } from "clsx";
import Link from "next/link";
import { JwtDictionaryModel } from "@/features/localization/models/jwt-dictionary.model";
import { getLocalizedSecondaryFont } from "@/libs/theme/fonts";
import { ArrowHeadIconComponent } from "@/features/common/assets/arrow-head-icon.component";
import { SkillsCardComponent } from "./skills-card.component";

interface SkillsCtaComponentProps {
  languageCode: string;
  dictionary: JwtDictionaryModel["skills"];
}

export const SkillsCtaComponent: React.FC<SkillsCtaComponentProps> = ({
  languageCode,
  dictionary,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h4
          className={clsx(
            styles.title,
            getLocalizedSecondaryFont(languageCode),
          )}
        >
          {dictionary.title}
        </h4>
        <div className={styles.content}>
          <p className={styles.description}>{dictionary.description}</p>
          <Link
            className={styles.link}
            href={dictionary.ctaButton.path}
            target="_blank"
            rel="noreferrer noopener"
          >
            {dictionary.ctaButton.label}
            <ArrowHeadIconComponent />
          </Link>
        </div>
      </div>
      <div className={styles.right}>
        <SkillsCardComponent languageCode={languageCode} dictionary={dictionary} />
      </div>
    </div>
  );
};
