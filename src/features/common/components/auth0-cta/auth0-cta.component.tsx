import React from "react";
import { getLocalizedSecondaryFont } from "@/libs/theme/fonts";
import clsx from "clsx";
import { Auth0DictionaryModel } from "@/features/localization/models/auth0-dictionary.model";
import styles from "./auth0-cta.module.scss";
import Link from "next/link";
import { ArrowHeadIconComponent } from "../../assets/arrow-head-icon.component";

interface Auth0CtaComponentProps {
  languageCode: string;
  dictionary: Auth0DictionaryModel["banner"];
}

export const Auth0CtaComponent: React.FC<Auth0CtaComponentProps> = ({
  languageCode,
  dictionary,
}) => {
  return (
    <div className={styles.cta_container}>
      <div className={styles.cta_wrapper}>
        <div className={styles.cta_content}>
          <div className={styles.cta_cta}>
            <div className={styles.cta__copy}>
              <div className={styles.cta__text}>
                <h3
                  className={clsx(
                    getLocalizedSecondaryFont(languageCode),
                    styles.cta__title
                  )}
                >
                  {dictionary.title}
                </h3>
                <p className={styles.cta__description}>
                  {dictionary.description}
                </p>
              </div>
              <Link
                className={styles.cta__button}
                href={dictionary.ctaButton.path}
              >
                {dictionary.ctaButton.label}
                <ArrowHeadIconComponent />
              </Link>
            </div>
            <div className={styles.cta__media}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
