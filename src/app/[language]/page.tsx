import React from "react";
import { PageProps } from "@/features/common/models/page.props";
import { cookies } from "next/headers";
import { HomePageComponent } from "@/features/home/components/home-page/home-page.component";
import { DEFAULT_LANGUAGE_CODE } from "@/features/localization/localization.config";
import { PageMetadataProps } from "@/features/common/models/page-metadata.props";
import { Metadata } from "next";
import { getHomeDictionary } from "@/features/localization/services/language-dictionary.service";
import { generatePageMetadata } from "@/libs/metadata/metadata.service";
import { createUrlPath } from "@/libs/utils/path.utils";
import { siteTree } from "@/features/seo/site-tree";
import {
  DEBUGGER_MODE_KEY,
  DECODED_HEADER_DESCRIPTION_KEY,
  DECODED_HEADER_FORMAT_KEY,
  DECODED_PAYLOAD_DESCRIPTION_KEY,
  DECODED_PAYLOAD_FORMAT_KEY,
} from "@/features/decoder/config/decoder.config";
import { getSanitizedDescriptionVisibilityValue } from "@/features/common/services/decoder.utils";
import { ClaimDescriptionVisibilityValues } from "@/features/common/values/claim-description-visibility.values";
import { getSanitizedDebuggerModeValues } from "@/features/common/services/debugger.utils";
import { DebuggerModeValues } from "@/features/common/values/debugger-mode.values";
import { dataTestidDictionary } from "@/libs/testing/data-testid.dictionary";

export async function generateMetadata({
  params,
}: PageMetadataProps): Promise<Metadata> {
  const { language } = await params;
  const dictionary = getHomeDictionary(language);

  return generatePageMetadata({
    languageCode: language,
    metadata: dictionary.metadata,
    pagePath: createUrlPath([siteTree.root.urlPath]),
  });
}

export default async function Home({ params }: PageProps) {
  const { language = DEFAULT_LANGUAGE_CODE } = await params;
  const cookieStore = await cookies();

  const decodedHeaderInitialTabId =
    cookieStore.get(DECODED_HEADER_FORMAT_KEY)?.value ||
    dataTestidDictionary.decoder.decodedHeader.json.id;

  const decodedPayloadInitialTabId =
    cookieStore.get(DECODED_PAYLOAD_FORMAT_KEY)?.value ||
    dataTestidDictionary.decoder.decodedPayload.json.id;

  const decodedHeaderDescriptionVisibility =
    getSanitizedDescriptionVisibilityValue(
      cookieStore.get(DECODED_HEADER_DESCRIPTION_KEY)?.value || null,
    ) || ClaimDescriptionVisibilityValues.VISIBLE;
  const decodedPayloadDescriptionVisibility =
    getSanitizedDescriptionVisibilityValue(
      cookieStore.get(DECODED_PAYLOAD_DESCRIPTION_KEY)?.value || null,
    ) || ClaimDescriptionVisibilityValues.VISIBLE;

  const debuggerInitialMode: DebuggerModeValues =
    getSanitizedDebuggerModeValues(
      cookieStore.get(DEBUGGER_MODE_KEY)?.value || null,
    ) || DebuggerModeValues.SPLIT;

  return (
    <HomePageComponent
      languageCode={language}
      decodedHeaderInitialTabId={decodedHeaderInitialTabId}
      decodedPayloadInitialTabId={decodedPayloadInitialTabId}
      decodedHeaderDescriptionVisibility={decodedHeaderDescriptionVisibility}
      decodedPayloadDescriptionVisibility={decodedPayloadDescriptionVisibility}
      // debuggerInitialMode={debuggerInitialMode}
    />
  );
}
