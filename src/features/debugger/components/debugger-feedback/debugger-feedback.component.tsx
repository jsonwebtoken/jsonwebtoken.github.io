import React from "react";
import styles from "./debugger-feedback.module.scss";
import { getLinksUiDictionary } from "@/features/localization/services/ui-language-dictionary.service";
import { BoxComponent } from "@/features/common/components/box/box.component";
import { dataTestidDictionary } from "@/libs/testing/data-testid.dictionary";
import Link from "next/link";

interface DebuggerFeedbackComponentProps {
  languageCode: string;
}

export const DebuggerFeedbackComponent: React.FC<
  DebuggerFeedbackComponentProps
> = ({ languageCode }) => {
  const dictionary = getLinksUiDictionary(languageCode);

  return (
    <BoxComponent
      data-testid={dataTestidDictionary.feedback.id}
      role="region"
      contentAs="section"
      contentClassName={styles.content}
    >
      <Link
        target="_blank"
        rel="noopener noreferrer"
        href={dictionary.feedback.path}
        className={styles.feedback__link}
      >
        {dictionary.feedback.label}
      </Link>
      <span className={styles.feedback__spacer}>{"|"}</span>
      <Link
        target="_blank"
        rel="noopener noreferrer"
        href={dictionary.issue.path}
        className={styles.feedback__link}
      >
        {dictionary.issue.label}
      </Link>
    </BoxComponent>
  );
};
