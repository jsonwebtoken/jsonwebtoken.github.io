"use client";

import React, { MouseEvent, useState } from "react";
import Select, {
  SingleValue,
  OptionsOrGroups,
  GroupBase,
  NonceProvider,
} from "react-select";
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
import { Button } from "react-aria-components";
import { Auth0LogoComponent } from "../../assets/auth0-logo.component";
import { getBrandDictionary } from "@/features/localization/services/brand-dictionary.service";
import { savePreferredLanguage } from "@/features/localization/services/ui-language.utils";
import { UiLanguageModel } from "../../models/ui-language.model";
import { GlobeIconComponent } from "../bars/ribbon/assets/globe-icon.component";

interface FooterComponentProps {
  languageCode: string;
  dictionary: LayoutDictionaryModel["footer"];
}

export const FooterComponent: React.FC<FooterComponentProps> = ({
  languageCode,
  dictionary,
}) => {
  const currentLanguage = dictionary.languagePicker.options.filter(
    (element) => element.value === languageCode
  )[0];

  const handleChange = (selection: SingleValue<UiLanguageModel>) => {
    if (!selection) {
      return;
    }
    savePreferredLanguage(selection.value);
  };

  const [modalState, setModalState] = useState<ModalStateValues>(
    ModalStateValues.CLOSED
  );
  const images = getBrandDictionary(languageCode);

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
          <SiteBrandComponent
            path={languagePathPrefix}
            languageCode={languageCode}
          />
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
                    SecondaryFont.className
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
            <Auth0LogoComponent title={images.tooltip} />
          </Link>
          <span className={styles.bottomSection__copyright}>
            {dictionary.copyright}
          </span>
          {dictionary.languagePicker.options.length > 1 && (
            <div className={styles.subFooter__languagePicker}>
              <GlobeIconComponent />
              <Select
                aria-label={"Language picker"}
                className={styles.languageSelect__container}
                onChange={handleChange}
                options={
                  dictionary.languagePicker.options as OptionsOrGroups<
                    UiLanguageModel,
                    GroupBase<UiLanguageModel>
                  >
                }
                menuPortalTarget={document.body}
                classNamePrefix={"language-select"}
                isSearchable={false}
                placeholder={currentLanguage.label}
                value={currentLanguage}
                styles={{
                  control: (base, state) => ({
                    ...base,
                    fontSize: "0.875rem",
                    background: "transparent",
                    border: "none",
                    borderRadius: "0px",
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    minHeight: "2.5rem",
                    boxSizing: "border-box",
                    boxShadow: "none",
                  }),
                  input: (base) => ({
                    ...base,
                    margin: "0px",
                  }),
                  indicatorSeparator: () => ({
                    display: "none",
                  }),
                  indicatorsContainer: (base) => ({
                    ...base,
                    height: "20px",
                    alignSelf: "center",
                  }),
                  dropdownIndicator: (base) => ({
                    ...base,
                    padding: "0px",
                    height: "100%",
                    alignSelf: "center",
                  }),
                  valueContainer: (base) => ({
                    ...base,
                    padding: "0px",
                  }),
                  singleValue: (base) => ({
                    ...base,
                    color: "unset",
                  }),
                  menu: (base) => ({
                    ...base,
                    top: "unset",
                    bottom: "1.75rem",
                    right: "0",
                  }),
                }}
              />
            </div>
          )}
        </div>
      </BoxComponent>
    </footer>
  );
};
