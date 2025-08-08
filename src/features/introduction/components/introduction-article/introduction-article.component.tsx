"use client";

import React from "react";
import { getIntroductionContent } from "@/features/localization/services/ui-language-content.service";
import { ArticleComponent } from "@/features/common/components/article/article.component";
import styles from "./introduction-article.module.scss";
import { SidebarNavComponent } from "../sidebar-nav/sidebar-nav.component";

interface IntroductionArticleComponentProps {
  languageCode: string;
}

export const IntroductionArticleComponent: React.FC<
  IntroductionArticleComponentProps
> = ({ languageCode }) => {
  const Introduction = getIntroductionContent({ languageCode });

  return (
    <div className={styles.container}>
      <SidebarNavComponent languageCode={languageCode} />
      <ArticleComponent>{Introduction}</ArticleComponent>
    </div>
  );
};
