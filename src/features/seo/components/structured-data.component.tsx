import React from "react";
import { ArticleStructuredDataModel } from "@/features/seo/models/article-structured-data.model";
import { BreadcrumbStructuredDataModel } from "@/features/seo/models/breadcrumb-structured-data.model";
import { HowToStructuredDataModel } from "@/features/seo/models/how-to-structured-data.model";
import { WebsiteStructuredDataModel } from "@/features/seo/models/website-structured-data.model";
import { OrganizationStructuredDataModel } from "@/features/seo/models/organization-structured-data.model";
import { FaqStructuredDataModel } from "@/features/seo/models/faq-structured-data.model";

interface StructuredDataProps {
  data:
    | ArticleStructuredDataModel
    | BreadcrumbStructuredDataModel
    | HowToStructuredDataModel
    | OrganizationStructuredDataModel
    | FaqStructuredDataModel
    | Array<
        | ArticleStructuredDataModel
        | BreadcrumbStructuredDataModel
        | HowToStructuredDataModel
        | WebsiteStructuredDataModel
        | OrganizationStructuredDataModel
        | FaqStructuredDataModel
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
