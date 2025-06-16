"use client";

import React from "react";
import { getIntroductionContent } from "@/features/localization/services/ui-language-content.service";
import { ArticleComponent } from "@/features/common/components/article/article.component";

interface IntroductionArticleComponentProps {
  languageCode: string;
}

export const IntroductionArticleComponent: React.FC<
  IntroductionArticleComponentProps
> = ({ languageCode }) => {
  const { Component: Introduction } = getIntroductionContent({ languageCode });

  return (
    <ArticleComponent>
      <Introduction />
    </ArticleComponent>
  );
};
