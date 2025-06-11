import React from "react";
import { getLocalizedSecondaryFont } from "@/libs/theme/fonts";
import clsx from "clsx";
import { Auth0DictionaryModel } from "@/features/localization/models/auth0-dictionary.model";
import { BoxComponent } from "@/features/common/components/box/box.component";
import styles from "./auth0-cta.module.scss";
import Link from "next/link";
import NextArrow from "@/features/common/assets/arrow-right.svg";

interface Auth0CtaComponentProps {
  languageCode: string;
  dictionary: Auth0DictionaryModel["banner"];
}

export const Auth0CtaComponent: React.FC<Auth0CtaComponentProps> = ({
  languageCode,
  dictionary,
}) => {
  return (
    <BoxComponent
      containerClassName={styles.container}
      contentClassName={styles.content}
      wrapperClassName={styles.wrapper}
    >
      <div className={styles.cta}>
        <div className={styles.cta__copy}>
          <div className={styles.cta__text}>
            <h3
              className={clsx(
                getLocalizedSecondaryFont(languageCode),
                styles.cta__title,
              )}
            >
              {dictionary.title}
            </h3>
            <p className={styles.cta__description}>{dictionary.description}</p>
          </div>
          {dictionary.ctaButton && (
            <Link
              target="_blank"
              rel="noopener noreferrer"
              className={styles.button}
              href={dictionary.ctaButton.path}
            >
              {dictionary.ctaButton.label}
              <div className={styles.button__arrow}>
                <NextArrow />
              </div>
            </Link>
          )}
        </div>
        <div className={styles.cta__media} />
      </div>
    </BoxComponent>
  );
};
