import React from "react";
import styles from "./ebook.module.scss";
import Link from "next/link";
import { BoxComponent } from "@/features/common/components/box/box.component";
import { clsx } from "clsx";
import { getLocalizedSecondaryFont } from "@/libs/theme/fonts";
import { Auth0DictionaryModel } from "@/features/localization/models/auth0-dictionary.model";
import NextArrow from "@/features/common/assets/arrow-right.svg";

type EbookComponentProps = {
  languageCode: string;
  dictionary: Auth0DictionaryModel["ebook"];
};

export const EbookComponent: React.FC<EbookComponentProps> = ({
  languageCode,
  dictionary,
}) => {
  return (
    <BoxComponent
      containerClassName={styles.container}
      wrapperClassName={styles.wrapper}
      contentClassName={styles.content}
    >
      <div className={styles.ebookBanner__copy}>
        <span
          className={clsx(
            getLocalizedSecondaryFont(languageCode),
            styles.ebookBanner__title,
          )}
        >
          {dictionary.title}
        </span>
        <span className={styles.ebookBanner__description}>
          {dictionary.description}
        </span>
        <Link
          className={styles.ebookBanner__link}
          href={dictionary.ctaButton.url}
          target="_blank"
          rel="noreferrer noopener"
        >
          {dictionary.ctaButton.label}
          <div className={styles.ebookBanner__linkIcon}>
            <NextArrow />
          </div>
        </Link>
      </div>
    </BoxComponent>
  );
};
