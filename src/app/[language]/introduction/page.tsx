import React from "react";
import { DEFAULT_LANGUAGE_CODE } from "@/features/localization/localization.config";
import { PageProps } from "@/features/common/models/page.props";
import { IntroductionPageComponent } from "@/features/introduction/components/introduction-page/introduction-page.component";
import { PageMetadataProps } from "@/features/common/models/page-metadata.props";
import { Metadata } from "next";
import { getIntroductionDictionary } from "@/features/localization/services/language-dictionary.service";
import { generatePageMetadata } from "@/libs/metadata/metadata.service";
import { createUrlPath } from "@/libs/utils/path.utils";
import { siteTree } from "@/features/seo/site-tree";

export async function generateMetadata({
  params: { language },
}: PageMetadataProps): Promise<Metadata> {
  const dictionary = getIntroductionDictionary(language);

  return generatePageMetadata({
    languageCode: language,
    metadata: dictionary.metadata,
    pagePath: createUrlPath([siteTree.root.sections.introduction.urlPath]),
  });
}

export default function Introduction({
  params: { language: languageCode = DEFAULT_LANGUAGE_CODE },
}: PageProps) {
  return <IntroductionPageComponent languageCode={languageCode} />;
}
