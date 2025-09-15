import React, { PropsWithChildren } from "react";
import styles from "./site-brand.module.scss";
import Link from "next/link";
import { getImageDictionary } from "@/features/localization/services/images-dictionary.service";
import { SecondaryFont } from "@/libs/theme/fonts";
import clsx from "clsx";
import { JwtLogoComponent } from "../../assets/jwt-logo.component";
import { JwtWordmarkComponent } from "../../assets/jwt-wordmark.component";

interface SiteBrandComponentProps extends PropsWithChildren {
  path: string;
  languageCode: string;
}

export const SiteBrandComponent: React.FC<SiteBrandComponentProps> = ({
  path,
  languageCode,
}) => {
  const images = getImageDictionary(languageCode);

  return (
    <Link className={styles.brand} href={path} title={images.title}>
      <div className={styles.brand__logo}>
        <JwtLogoComponent />
      </div>
      <div className={styles.brand__wordmark}>
        <JwtWordmarkComponent />
      </div>
      <div className={clsx(SecondaryFont.className, styles.brand__headline)}>
        <span className={styles.brand__subtitle}>Debugger</span>
      </div>
    </Link>
  );
};
