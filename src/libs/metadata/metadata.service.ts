import "server-only";

import { Metadata } from "next";
import { PageMetadataModel } from "@/features/common/models/page-metadata.model";
import { getCommonDictionary } from "@/features/localization/services/language-dictionary.service";
import { BASE_URL } from "@/libs/config/project.constants";
import { DEFAULT_LANGUAGE_CODE } from "@/features/localization/localization.config";

interface GeneratePageMetadataParams {
  languageCode: string;
  metadata: PageMetadataModel;
  pagePath: string;
  canonical?: string;
}

export async function generatePageMetadata(
  params: GeneratePageMetadataParams,
): Promise<Metadata> {
  const { languageCode, metadata, pagePath, canonical } = params;

  const commonDictionary = getCommonDictionary(languageCode);

  const baseUrl =
    languageCode === DEFAULT_LANGUAGE_CODE
      ? BASE_URL
      : new URL(languageCode, BASE_URL);

  const url = new URL(pagePath, baseUrl);

  return {
    ...metadata,
    alternates: {
      ...commonDictionary.alternates,
      canonical: canonical || commonDictionary.alternates.canonical,
    },
    openGraph: {
      ...commonDictionary.openGraph,
      title: metadata.title,
      description: metadata.description,
      url: url,
    },
  };
}
