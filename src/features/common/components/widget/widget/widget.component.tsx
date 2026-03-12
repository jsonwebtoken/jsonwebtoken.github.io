import React, { ReactNode, useId } from "react";
import styles from "./widget.module.scss";
import { BoxComponent } from "@/features/common/components/box/box.component";
import { DebuggerWidgetValues } from "@/features/common/values/debugger-widget.values";
import { clsx } from "clsx";
import { getLocalizedSecondaryFont } from "@/libs/theme/fonts";

interface WidgetComponentProps {
  id: string;
  widget: DebuggerWidgetValues;
  languageCode: string;
  headlineConfig: { isVisible: boolean; actions?: React.ReactNode };
  title: string;
  description: string;
  exampleGenerator: {
    label: string;
  };
  contentInput: ReactNode;
  contentOutput: ReactNode;
  warnings: string[] | null;
}

export const WidgetComponent: React.FC<WidgetComponentProps> = ({
  id,
  languageCode,
  headlineConfig,
  title,
  contentInput,
  contentOutput,
}) => {
  const widgetId = useId();

  return (
    <BoxComponent
      data-testid={id}
      role="region"
      contentAs="section"
      contentClassName={styles.content}
      aria-labelledby={headlineConfig.isVisible ? widgetId : undefined}
    >
      
      {headlineConfig.isVisible && (
        <h2
          id={widgetId}
          className={clsx(
            getLocalizedSecondaryFont(languageCode),
            styles.grid__title,
          )}
        >
          {title}
          {headlineConfig.actions}
        </h2>
      )}
      
      <div heap-ignore="true" className={styles.content__input}>
        {contentInput}
      </div>
      <div heap-ignore="true" className={styles.content__output}>
        {contentOutput}
      </div>
    </BoxComponent>
  );
};
