import React from "react";
import styles from "./hero-banner-modal.module.scss";
import { HomeDictionaryModel } from "@/features/localization/models/home-dictionary.model";
import { HeroModalStateValues } from "@/features/home/values/hero-modal-state.values";
import { JWT_INFO_STATE_KEY } from "@/features/home/config/home.config";
import Link from "next/link";
import { clsx } from "clsx";
import { createUrlPath } from "@/libs/utils/path.utils";
import { DEFAULT_LANGUAGE_CODE } from "@/features/localization/localization.config";
import { HeroBannerComponent } from "@/features/common/components/hero/hero-banner.component";
import { HeroModalTypeValues } from "@/features/home/values/hero-modal-type.values";

interface HeroInfoBannerComponentProps {
  languageCode: string;
  dictionary: HomeDictionaryModel["info"];
  modalState: HeroModalStateValues;
}

export const HeroInfoBannerComponent: React.FC<
  HeroInfoBannerComponentProps
> = ({ languageCode, dictionary, modalState }) => {
  const ctaPath = createUrlPath([
    languageCode === DEFAULT_LANGUAGE_CODE ? "" : languageCode,
    dictionary.ctaButton ? dictionary.ctaButton.path : "",
  ]);
  const secondaryCtaPath = createUrlPath([
    languageCode === DEFAULT_LANGUAGE_CODE ? "" : languageCode,
    dictionary.secondaryCtaButton ? dictionary.secondaryCtaButton.path : "",
  ]);

  const description = dictionary.description.split(
    dictionary.resources.spec.name,
  );

  return (
    <HeroBannerComponent
      initialModalState={modalState}
      modalType={HeroModalTypeValues.INFO}
      modalCookieKey={JWT_INFO_STATE_KEY}
      modalSummary={dictionary.summary}
      modalContent={
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
      modalCta={
        <>
          {dictionary.ctaButton && (
            <Link className={clsx(styles.modal__ctaLink)} href={ctaPath}>
              {dictionary.ctaButton.label}
            </Link>
          )}
          {dictionary.secondaryCtaButton && (
            <Link
              className={clsx(
                styles.modal__ctaLink,
                styles.modal__ctaButton__secondary,
              )}
              href={secondaryCtaPath}
            >
              {dictionary.secondaryCtaButton.label}
            </Link>
          )}
        </>
      }
    />
  );
};
