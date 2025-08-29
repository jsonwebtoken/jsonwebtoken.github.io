import React, { PropsWithChildren, useId } from "react";
import styles from "./card.module.scss";
import { clsx } from "clsx";
import { getLocalizedSecondaryFont, MonoFont } from "@/libs/theme/fonts";
import { CardMessageComponent } from "@/features/common/components/card-message/card-message.component";
import { HeaderIcon } from "../icons/header/header-icon";
import { CheckIcon } from "../icons/check/check-icon";

export interface CardComponentProps extends PropsWithChildren {
  id: string;
  languageCode: string;
  title: string;
  compactTitle: string;
  hasHeaderIcon?: boolean;
  options: Partial<{
    noPadding: boolean;
    fullWidth: boolean;
    fullHeight: boolean;
    isOutput: boolean;
    hideTitle: boolean;
    frameless: boolean;
  }> | null;

  slots: Partial<{
    notification: React.ReactNode | null;
    toolbar: React.ReactNode;
    footer: React.ReactNode | null;
  }> | null;

  messages: Partial<{
    errors: string[] | null;
    warnings: string[] | null;
    success: string[] | null;
  }> | null;
}

export const CardComponent: React.FC<CardComponentProps> = (props) => {
  const {
    id,
    title,
    compactTitle,
    children,
    options = {
      noPadding: false,
      frameless: false,
      hideTitle: false,
    },
    messages,
    slots,
    hasHeaderIcon = false,
  } = props;

  const cardId = useId();

  const [titleKey, titleValue] = title
    .split(":")
    .map((element) => element.trim());

  const canRenderTitle = !(options && options.hideTitle);

  return (
    <div
      data-testid={id}
      aria-labelledby={canRenderTitle ? cardId : undefined}
      aria-label={canRenderTitle ? undefined : title}
      heap-ignore="true"
      className={clsx(
        MonoFont.className,
        styles.card,
        options && options.fullWidth && styles.card__hasFullWidth,
        options && options.fullHeight && styles.card__hasFullHeight
      )}
      data-type={options && options.isOutput ? "output" : "input"}
      data-frameless={options && options.frameless}
    >
      {!options?.hideTitle && (
        <>
          {titleKey && (
            <div className={styles.card__headline}>
              {titleKey && !compactTitle && (
                <div className={styles.card__heading_title_container}>
                  {hasHeaderIcon && <HeaderIcon />}
                  <h4 id={cardId}>
                    <span className={styles.card__titleKey}>
                      {titleKey}
                      {titleValue && `: `}
                    </span>
                    {titleValue && (
                      <span className={styles.card__titleValue}>
                        {titleValue}
                      </span>
                    )}
                  </h4>
                </div>
              )}
              {titleKey && compactTitle && (
                <>
                  <div className={styles.card__heading_title_container}>
                    {hasHeaderIcon && <HeaderIcon />}
                    <h4 id={cardId} className={styles.card__fullTitle}>
                      <span className={styles.card__titleKey}>
                        {titleKey}
                        {titleValue && `: `}
                      </span>
                      {titleValue && (
                        <span className={styles.card__titleValue}>
                          {titleValue}
                        </span>
                      )}
                    </h4>
                  </div>
                  <h4 id={cardId} className={styles.card__compactTitle}>
                    <span className={styles.card__titleKey}>
                      {compactTitle}
                    </span>
                  </h4>
                </>
              )}
              {slots?.toolbar}
            </div>
          )}
        </>
      )}
      <div className={styles.card__content}>
        <div
          className={styles.card__body}
          data-no-padding={
            options && options.noPadding ? options.noPadding : undefined
          }
        >
          {children}
        </div>
      </div>
      {messages && messages.errors && messages.errors.length > 0 ? (
        <div
          data-testid={`${id}___statusBar__error`}
          role="status"
          className={clsx(styles.card__status, styles.card__error)}
        >
          {messages.errors.map((line, index) => {
            return (
              <CardMessageComponent key={index}>{line}</CardMessageComponent>
            );
          })}
        </div>
      ) : messages?.success ? (
        <div
          data-testid={`${id}___statusBar__success`}
          role="status"
          className={clsx(styles.card__status, styles.card__success)}
        >
          {messages.success.map((line, index) => {
            return (
              <>
              <CheckIcon />
              <CardMessageComponent key={index}>{line}</CardMessageComponent>
              </>
            );
          })}
        </div>
      ) : null}
      {slots?.notification}
      {messages && messages.warnings && messages.warnings.length > 0 && (
        <div
          data-testid={`${id}___statusBar__warning`}
          role="status"
          className={clsx(styles.card__status, styles.card__warning)}
        >
          {messages.warnings.map((line, index) => {
            return (
              <CardMessageComponent key={index}>{line}</CardMessageComponent>
            );
          })}
        </div>
      )}
      {slots?.footer && (
        <div className={styles.card__action}>{slots.footer}</div>
      )}
    </div>
  );
};

export const FramelessCardComponent: React.FC<CardComponentProps> = (props) => {
  return (
    <CardComponent {...props} options={{ ...props.options, frameless: true }} />
  );
};

export interface CardWithHeadlineComponentProps extends CardComponentProps {
  sectionHeadline: {
    title: string;
    titleTag?: string;
    description?: string;
  } | null;
}

export const CardWithHeadlineComponent: React.FC<
  CardWithHeadlineComponentProps
> = ({ sectionHeadline, languageCode, ...props }) => {
  const regionId = useId();

  return (
    <div role="region" aria-labelledby={regionId}>
      {sectionHeadline && (
        <>
          <h3
            id={regionId}
            className={clsx(
              styles.cardHeadline__title,
              getLocalizedSecondaryFont(languageCode)
            )}
          >
            {sectionHeadline.title}
            {sectionHeadline.titleTag && (
              <span className={styles.cardHeadline__titleTag}>
                {sectionHeadline.titleTag}
              </span>
            )}
          </h3>
          {sectionHeadline.description && (
            <p className={styles.cardHeadline__description}>
              {sectionHeadline.description}
            </p>
          )}
        </>
      )}
      <CardComponent languageCode={languageCode} {...props} />
    </div>
  );
};
