"use client";

import React from "react";
import { getIntroductionContent } from "@/features/localization/services/ui-language-content.service";
import { ArticleComponent } from "@/features/common/components/article/article.component";
import styles from "./introduction-article.module.scss";
import { SidebarNavComponent } from "../sidebar-nav/sidebar-nav.component";
import { EbookAdComponent } from "../ebook-ad/ebook-ad.component";
import { getComponentDictionary } from "@/features/localization/services/component-dictionary.service";
import { IntroductionDictionaryModel } from "@/features/localization/models/introduction-dictionary.model";
import { IntroductionHeroComponent } from "../introduction-hero/introduction-hero.component";

interface IntroductionArticleComponentProps {
  languageCode: string;
  introductionDictionary: IntroductionDictionaryModel;
}

export const IntroductionArticleComponent: React.FC<
  IntroductionArticleComponentProps
> = ({ languageCode, introductionDictionary }) => {
  const Introduction = getIntroductionContent({ languageCode });
  const componentDictionary = getComponentDictionary(languageCode);

  return (
    <div className={styles.container}>
      <SidebarNavComponent introductionDictionary={introductionDictionary} />
      <div className={styles.content}>
        <IntroductionHeroComponent languageCode={languageCode} dictionary={introductionDictionary.hero} />
        <EbookAdComponent copy={componentDictionary.ebookAd} />
        <ArticleComponent>{Introduction}</ArticleComponent>
      </div>
    </div>
  );
};
