import React from "react";
import styles from "./error-banner.module.scss";
import clsx from "clsx";
import { getLocalizedSecondaryFont } from "@/libs/theme/fonts";
import NextArrow from "@/features/common/assets/arrow-right.svg";
import Link from "next/link";

interface ErrorBannerComponentProps {
  languageCode: string;
  message: string;
  navLink: {
    path: string;
    label: string;
    shouldOpenNewTab: boolean;
  };
  ctaButton: {
    label: string;
    handleClick: () => void;
  } | null;
}

export const ErrorBannerComponent: React.FC<ErrorBannerComponentProps> = ({
  languageCode,
  message,
  navLink,
  ctaButton,
}) => {
  return (
    <div className={styles.banner}>
      <div className={styles.banner__header}>
        <span
          className={clsx(
            getLocalizedSecondaryFont(languageCode),
            styles.banner__title,
          )}
        >
          {message}
        </span>
      </div>
      <div className={styles.banner__actions}>
        <div className={styles.banner__action}>
          <Link className={styles.banner__actionLabel} href={navLink.path}>
            {navLink.label}
            <div className={styles.banner__actionIcon}>
              <NextArrow />
            </div>
          </Link>
        </div>
        {ctaButton && (
          <div className={styles.banner__action}>
            <button
              className={styles.banner__actionLabel}
              onClick={ctaButton.handleClick}
            >
              {ctaButton.label}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
