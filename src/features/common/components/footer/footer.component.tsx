"use client";

import React, { MouseEvent, useState } from "react";
import { FooterIconsComponent } from "./footer-Icons.component";
import { MonoFont, SecondaryFont } from "@/libs/theme/fonts";
import Image from "next/image";
import clsx from "clsx";
import { LayoutDictionaryModel } from "@/features/localization/models/layout-dictionary.model";
import { BoxComponent } from "@/features/common/components/box/box.component";
import styles from "./footer.module.scss";
import Link from "next/link";
import { CookieConsentModalComponent } from "@/features/common/components/cookie-consent-modal/cookie-consent-modal.component";
import { ModalStateValues } from "@/features/common/values/modal-state.values";
import { DEFAULT_LANGUAGE_CODE } from "@/features/localization/localization.config";
import { sitePaths } from "@/features/seo/site-tree";
import { createUrlPath } from "@/libs/utils/path.utils";
import { SiteBrandComponent } from "@/features/common/components/site-brand/site-brand.component";
import { StaticImageMetadataModel } from "@/features/common/models/static-image-metadata.model";
import { Button } from "react-aria-components";

interface FooterComponentProps {
  languageCode: string;
  dictionary: LayoutDictionaryModel["footer"];
  auth0Logo: StaticImageMetadataModel;
  siteLogo: React.ReactNode;
}

export const FooterComponent: React.FC<FooterComponentProps> = ({
  languageCode,
  dictionary,
  auth0Logo,
  siteLogo,
}) => {
  const [modalState, setModalState] = useState<ModalStateValues>(
    ModalStateValues.CLOSED,
  );

  const languagePathPrefix: string =
    languageCode === DEFAULT_LANGUAGE_CODE
      ? sitePaths.root
      : createUrlPath([languageCode]);

  const closeModal = () => {
    document.body.classList.remove("mobile-scroll-lock");
    setModalState(ModalStateValues.CLOSED);
  };

  const openModal = () => {
    document.body.classList.add("mobile-scroll-lock");
    setModalState(ModalStateValues.OPEN);
  };

  const handleModalClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleBackdropClick = () => {
    closeModal();
  };

  return (
    <footer>
      <BoxComponent
        containerClassName={styles.container}
        wrapperClassName={styles.wrapper}
        contentClassName={styles.content}
      >
        <div className={styles.siteLogo}>
          <SiteBrandComponent path={languagePathPrefix}>
            {siteLogo}
          </SiteBrandComponent>
        </div>
        <div className={styles.resources}>
          <span className={clsx(styles.resources__title, MonoFont.className)}>
            {dictionary.resources.title}
          </span>
          <ul className={styles.resource__list}>
            {dictionary.resources.links.map((item) => (
              <li key={item.path}>
                <a
                  className={styles.resource__anchor}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.resources}>
          <span className={clsx(styles.resources__title, MonoFont.className)}>
            {dictionary.legal.title}
          </span>
          <ul className={styles.resource__list}>
            {dictionary.legal.links.map((item) => (
              <li key={item.path}>
                <a
                  className={styles.resource__anchor}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.label}
                </a>
              </li>
            ))}
            {dictionary.legal.modalTriggers.map((trigger) => (
              <li key={trigger.text}>
                <Button
                  onPress={() => {
                    openModal();
                  }}
                  className={clsx(
                    styles.resource__button,
                    SecondaryFont.className,
                  )}
                >
                  {trigger.text}
                  {trigger.icon && (
                    <Image
                      height={14}
                      width={30}
                      className={styles.privacyIcon}
                      src={trigger.icon.url}
                      alt={trigger.icon.alt}
                      aria-hidden="true"
                    />
                  )}
                </Button>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.resources}>
          <span className={clsx(styles.resources__title, MonoFont.className)}>
            {dictionary.social.title}
          </span>
          <ul className={styles.resource__list}>
            <FooterIconsComponent dictionary={dictionary.social} />
          </ul>
        </div>
        <CookieConsentModalComponent
          dictionary={dictionary}
          languageCode={languageCode}
          modalState={modalState}
          handleBackdropClick={handleBackdropClick}
          handleModalClick={handleModalClick}
          handleModelClose={closeModal}
        />
      </BoxComponent>
      <BoxComponent
        containerClassName={styles.subFooter__container}
        wrapperClassName={styles.subFooter__wrapper}
        contentClassName={styles.subFooter__content}
      >
        <div className={styles.bottomSection}>
          <Link
            className={styles.bottomSection__logo}
            rel="noreferrer noopener"
            target="_blank"
            href="https://auth0.com/"
          >
            <Image
              src={auth0Logo.src}
              alt={auth0Logo.alt}
              sizes="100vh"
              style={{
                width: "auto",
                height: "100%",
              }}
              height={auth0Logo.height}
              width={auth0Logo.width}
            />
          </Link>
          <span className={styles.bottomSection__copyright}>
            {dictionary.copyright}
          </span>
        </div>
      </BoxComponent>
    </footer>
  );
};
