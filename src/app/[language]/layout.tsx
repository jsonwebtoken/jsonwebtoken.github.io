"use client"

import React, { useEffect } from "react";
import { Metadata } from "next";
import { DEFAULT_LANGUAGE_CODE } from "@/features/localization/localization.config";
import { cookies } from "next/headers";
import { PREFERRED_THEME_COOKIE_KEY } from "@/features/themes/theme.config";
import { PageLayoutComponent } from "@/features/common/components/layout/page-layout/page-layout.component";
import { PageMetadataProps } from "@/features/common/models/page-metadata.props";
import { getHomeDictionary } from "@/features/localization/services/language-dictionary.service";
import { generatePageMetadata } from "@/libs/metadata/metadata.service";
import { createUrlPath } from "@/libs/utils/path.utils";
import { siteTree } from "@/features/seo/site-tree";
import { ThemeCookieValues } from "@/features/common/values/theme.values";
import { getSanitizedThemeCookieValue } from "@/features/themes/services/theme.utils";

export async function generateStaticParams() {
  return [{ language: "en" }];
}

export async function generateMetadata({
  params: { language },
}: PageMetadataProps): Promise<Metadata> {
  const dictionary = getHomeDictionary(language);

  return generatePageMetadata({
    languageCode: language,
    metadata: dictionary.metadata,
    pagePath: createUrlPath([siteTree.root.urlPath]),
    canonical: `/${language}`,
  });
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { language: string };
}) {
  const { language: languageCode = DEFAULT_LANGUAGE_CODE } = params;

  const preferredThemeCookie = cookies().get(PREFERRED_THEME_COOKIE_KEY);

  const sanitizedThemeCookieValue = getSanitizedThemeCookieValue(
    preferredThemeCookie?.value || null,
  );

  const initialThemeCookieValue =
    sanitizedThemeCookieValue || ThemeCookieValues.SYSTEM_DARK;

    useEffect(() => {
      console.log("App mounted ounce");
      return () => console.log("App unmounted X")
    },[])

  return (
    <PageLayoutComponent
      languageCode={languageCode}
      themeCode={initialThemeCookieValue}
    >
      {children}
    </PageLayoutComponent>
  );
}
