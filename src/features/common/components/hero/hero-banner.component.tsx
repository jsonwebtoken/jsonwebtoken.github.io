import React, { useRef, useState } from "react";
import styles from "./hero-banner-modal.module.scss";
import { HeroModalStateValues } from "@/features/home/values/hero-modal-state.values";
import Cookies from "js-cookie";
import { HeroModalTypeValues } from "@/features/home/values/hero-modal-type.values";
import { useButton } from "@react-aria/button";

interface HeroBannerComponentProps {
  initialModalState: HeroModalStateValues;
  modalType: HeroModalTypeValues;
  modalCookieKey: string;
  modalSummary: string;
  modalContent: React.ReactNode;
  modalCta: React.ReactNode | null;
}

export const HeroBannerComponent: React.FC<HeroBannerComponentProps> = ({
  initialModalState,
  modalType,
  modalCookieKey,
  modalSummary,
  modalContent,
  modalCta,
}) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [modalState, setModalState] =
    useState<HeroModalStateValues>(initialModalState);

  const { buttonProps } = useButton(
    {
      elementType: "span",
      preventFocusOnPress: true,
    },
    buttonRef,
  );

  const toggleVisibility = () => {
    setModalState((prevState) => {
      Cookies.set(
        modalCookieKey,
        prevState === HeroModalStateValues.OPEN
          ? HeroModalStateValues.CLOSED
          : HeroModalStateValues.OPEN,
        {
          secure: true,
        },
      );

      return prevState === HeroModalStateValues.OPEN
        ? HeroModalStateValues.CLOSED
        : HeroModalStateValues.OPEN;
    });
  };

  return (
    <p
      className={styles.modal}
      aria-expanded={modalState === HeroModalStateValues.OPEN}
      data-state={modalState}
      data-type={modalType}
    >
      {modalState === HeroModalStateValues.CLOSED && (
        <span>{modalSummary}</span>
      )}
      <button
        {...buttonProps}
        aria-label={
          modalState === HeroModalStateValues.CLOSED ? "Expand" : "Collapse"
        }
        ref={buttonRef}
        className={styles.modal__control}
        onClick={toggleVisibility}
        data-state={modalState}
        data-type={modalType}
      >
        <span className={styles.modal__controlIcon}>+</span>
      </button>
      {modalState === HeroModalStateValues.OPEN && (
        <>
          <span className={styles.modal__text}>{modalContent}</span>
          <span className={styles.modal__cta}>{modalCta}</span>
        </>
      )}
    </p>
  );
};
