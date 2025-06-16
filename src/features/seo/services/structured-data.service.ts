import { ArticleStructuredDataModel } from "@/features/seo/models/article-structured-data.model";
import { ArticleMetadataModel } from "@/features/seo/models/article-metadata.model";
import { HowToStructuredDataModel } from "@/features/seo/models/how-to-structured-data.model";
import { HowToMetadataModel } from "@/features/seo/models/how-to-metadata.model";
import { HowToStep, ListItem } from "schema-dts";
import { BreadcrumbMetadataModel } from "@/features/seo/models/breadcrumb-metadata.model";
import { BreadcrumbStructuredDataModel } from "@/features/seo/models/breadcrumb-structured-data.model";
import { siteTree } from "@/features/seo/site-tree";
import { createUrlPath } from "@/libs/utils/path.utils";

export const generateArticleStructuredData = (
  article: ArticleMetadataModel,
): ArticleStructuredDataModel => {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: article.title,
    name: article.title,
    description: article.description,
    author: article.authors.map((author) => {
      return {
        "@type": "Person",
        name: author.name,
        url: author.url,
      };
    }),
    image: article.images,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
  };
};

export const generateHowToStructuredData = (
  howTo: HowToMetadataModel,
): HowToStructuredDataModel => {
  const steps: HowToStep[] = howTo.steps.map((step) => {
    return {
      "@type": "HowToStep",
      name: step.title,
      text: step.description,
    };
  });

  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: howTo.title,
    totalTime: howTo.totalTime,
    description: howTo.description,
    step: steps,
  };
};

export const createBreadcrumbListItem = (segments: string[]) => {
  return siteTree.originUrl + createUrlPath(segments);
};

export const generateBreadcrumbStructuredData = (
  metadata: BreadcrumbMetadataModel,
): BreadcrumbStructuredDataModel => {
  const itemList: ListItem[] = metadata.itemList.map((listItem) => {
    return {
      "@type": "ListItem",
      position: listItem.position,
      name: listItem.name,
      item: listItem.item,
    };
  });

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: itemList,
  };
};
