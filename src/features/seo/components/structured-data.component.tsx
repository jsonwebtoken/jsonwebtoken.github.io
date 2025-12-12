import React from "react";
import { ArticleStructuredDataModel } from "@/features/seo/models/article-structured-data.model";
import { BreadcrumbStructuredDataModel } from "@/features/seo/models/breadcrumb-structured-data.model";
import { HowToStructuredDataModel } from "@/features/seo/models/how-to-structured-data.model";
import { WebsiteStructuredDataModel } from "@/features/seo/models/website-structured-data.model";

interface StructuredDataProps {
  data:
    | ArticleStructuredDataModel
    | BreadcrumbStructuredDataModel
    | HowToStructuredDataModel
    | Array<
        | ArticleStructuredDataModel
        | BreadcrumbStructuredDataModel
        | HowToStructuredDataModel
        | WebsiteStructuredDataModel
      >;
}

export const StructuredData: React.FC<StructuredDataProps> = ({ data }) => {
  return (
    <script
      key="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};
