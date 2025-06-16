import React, { MouseEvent } from "react";
import styles from "./cookie-consent-modal.module.scss";
import { LayoutDictionaryModel } from "@/features/localization/models/layout-dictionary.model";
import { ModalStateValues } from "@/features/common/values/modal-state.values";
import { getModalsUiDictionary } from "@/features/localization/services/component-dictionary.service";

type CookieConsentModalComponentProps = {
  dictionary: LayoutDictionaryModel["footer"];
  languageCode: string;
  modalState: ModalStateValues;
  handleBackdropClick: () => void;
  handleModalClick: (e: MouseEvent<HTMLDivElement>) => void;
  handleModelClose: () => void;
};

export const CookieConsentModalComponent: React.FC<
  CookieConsentModalComponentProps
> = ({
  dictionary,
  languageCode,
  modalState,
  handleBackdropClick,
  handleModalClick,
  handleModelClose,
}) => {
  const modalsDictionary = getModalsUiDictionary(languageCode);

  return (
    <div
      className={styles.backdrop}
      aria-hidden={modalState === ModalStateValues.CLOSED}
      onClick={handleBackdropClick}
    >
      <div className={styles.wrapper} onClick={handleModalClick}>
        <div className={styles.modal}>
          <button
            className={styles.modal__closeButton}
            onClick={handleModelClose}
          />
          <div className={styles.modal__header}>
            <h4 className={styles.modal__title}>{dictionary.modal.title}</h4>
          </div>
          <div className={styles.modal__body}>
            <p className={styles.modal__paragraph}>
              {dictionary.modal.content}
            </p>
            <ul className={styles.modal__list}>
              {dictionary.modal.list.map(({ id }) => {
                const entry = modalsDictionary[id] || null;

                return (
                  <li className={styles.modal__listItem} key={id}>
                    {entry && <entry.Modal />}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
