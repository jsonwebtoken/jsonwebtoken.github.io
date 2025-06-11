import React from "react";
import styles from "./site-logo.module.scss";
import Image from "next/image";
import clsx from "clsx";
import { SecondaryFont } from "@/libs/theme/fonts";
import { getImageDictionary } from "@/features/localization/services/images-dictionary.service";

interface SiteLogoComponentProps {
  languageCode: string;
}

export const SiteLogoComponent: React.FC<SiteLogoComponentProps> = ({
  languageCode,
}) => {
  const images = getImageDictionary(languageCode);

  return (
    <div className={styles.container}>
      <Image
        aria-hidden={true}
        className={styles.brand__logo}
        src={images.logos.site.src}
        alt={images.logos.site.alt}
        sizes="100vw"
        style={{
          height: "100%",
          width: "auto",
        }}
        width={images.logos.site.width}
        height={images.logos.site.height}
      />
      <div className={clsx(SecondaryFont.className, styles.brand__headline)}>
        <span className={styles.brand__title}>JWT</span>
        <span className={styles.brand__subtitle}>Debugger</span>
      </div>
    </div>
  );
};
