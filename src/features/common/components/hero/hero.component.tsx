"use client";

import React from "react";
import { BoxComponent } from "@/features/common/components/box/box.component";
import styles from "./hero.module.scss";
import { HomeDictionaryModel } from "@/features/localization/models/home-dictionary.model";
import Link from "next/link";

interface HeroComponentProps {
  languageCode: string;
  dictionary: HomeDictionaryModel["info"];
}

export const HeroComponent: React.FC<HeroComponentProps> = ({ dictionary }) => {
  const description = dictionary.description.split(
    dictionary.resources.spec.name
  );

  return (
    <BoxComponent
      containerClassName={styles.container}
      contentClassName={styles.content}
      wrapperClassName={styles.wrapper}
    >
      <div className={styles.hero}>
        <p className={styles.modal}>
          <span className={styles.modal__text}>
            {
              <>
                {description[0]}
                <Link
                  target="_blank"
                  rel="noreferrer noopener"
                  href={dictionary.resources.spec.link}
                >
                  RFC 7519
                </Link>
                {description[1]}
              </>
            }
          </span>
        </p>
      </div>
      <hr className={styles.divider} />
    </BoxComponent>
  );
};
