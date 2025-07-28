import React from "react";
import { LibraryHeroComponent } from "@/features/libraries/components/library-hero/library-hero.component";
import { readFileSync } from "fs";
import { join } from "path";
import { Auth0CtaComponent } from "@/features/common/components/auth0-cta/auth0-cta.component";
import { LibraryResultsComponent } from "@/features/libraries/components/library-results/library-results.component";
import { LibraryDictionaryModel } from "@/features/libraries/models/library-dictionary.model";
import { LibraryCategoryModel } from "@/features/libraries/models/library-category.model";
import { DATA_PATH } from "@/libs/config/project-paths.constants";
import { DEFAULT_LANGUAGE_CODE } from "@/features/localization/localization.config";
import { getLibrariesDictionary } from "@/features/localization/services/language-dictionary.service";
import { StructuredData } from "@/features/seo/components/structured-data.component";
import { generateArticleStructuredData } from "@/features/seo/services/structured-data.service";
import { PageMetadataProps } from "@/features/common/models/page-metadata.props";
import { Metadata } from "next";
import { generatePageMetadata } from "@/libs/metadata/metadata.service";
import { createUrlPath } from "@/libs/utils/path.utils";
import { siteTree } from "@/features/seo/site-tree";
import { getAuth0Dictionary } from "@/features/localization/services/ui-language-dictionary.service";
import { LibraryModel } from "@/features/libraries/models/library.model";
import { LibrariesDictionaryModel } from "@/features/localization/models/libraries-dictionary.model";

export async function generateMetadata({
  params: { language },
}: PageMetadataProps): Promise<Metadata> {
  const dictionary: LibrariesDictionaryModel = getLibrariesDictionary(language);

  return generatePageMetadata({
    languageCode: language,
    metadata: dictionary.metadata,
    pagePath: createUrlPath([siteTree.root.sections.introduction.urlPath]),
  });
}

export default function Libraries({
  params: { language: languageCode = DEFAULT_LANGUAGE_CODE },
  searchParams,
}: {
  params: { language: string };
  searchParams?: {
    programming_language?: string;
    algorithm?: keyof LibraryModel["support"];
    support?: keyof LibraryModel["support"]
  };
}) {
  const librariesDictionary = getLibrariesDictionary(languageCode);
  const auth0Dictionary = getAuth0Dictionary(languageCode);

  const source = readFileSync(join(DATA_PATH, "libraries-next.json"), {
    encoding: "utf-8",
  });

  const programmingLanguage = searchParams?.programming_language;
  const algorithm = searchParams?.algorithm;
  const support = searchParams?.support;
  const query = programmingLanguage ?? algorithm ?? support ?? "";
  const dictionary = JSON.parse(source) as LibraryDictionaryModel;
  const allOptions = Object.keys(Object.values(dictionary)[0].libs[0].support);
  const indexAlgorithmStart = allOptions.findIndex(
    (option) => option == "hs256"
  );

  const categoryOptions: { id: string; name: string }[] = Object.values(
    dictionary
  ).map((library) => ({
    id: library.id,
    name: library.name,
  }));

  const supportOptions: { value: string; label: string }[] = allOptions
    .slice(0, indexAlgorithmStart)
    .map((key) => ({
      value: key,
      label: key.toUpperCase(),
    }));

  const algorithmOptions: { value: string; label: string }[] = allOptions
    .slice(indexAlgorithmStart)
    .map((key) => ({
      value: key,
      label: key.toUpperCase(),
    }));

  const categories: LibraryCategoryModel[] = programmingLanguage
    ? [dictionary[programmingLanguage]]
    : Object.values(dictionary);

  const categoryToFilter = algorithm ?? support

  const filteredCategories = categoryToFilter
    ? categories.map((category) => {
        const filteredLibs = category.libs.filter(
          (lib) => lib.support[categoryToFilter]
        );
        return {
          ...category,
          libs: filteredLibs,
        };
      })
    : categories;

  return (
    <>
      <StructuredData
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "JSON Web Tokens - jwt.io",
            url: "https://jwt.io",
            description:
              "Decode, verify and generate JSON Web Tokens with our online debugger.",
            image: "https://jwt.io/img/pic_logo.svg",
            publisher: {
              "@type": "Organization",
              name: "Auth0",
              legalName: "Auth0 Inc.",
              url: "https://auth0.com/",
              logo: "https://cdn.auth0.com/website/assets/pages/press/img/resources/auth0-logo-main-6001cece68.svg",
              foundingDate: "2013",
              sameAs: [
                "https://twitter.com/auth0",
                "https://www.facebook.com/getauth0/",
                "https://www.linkedin.com/company/auth0",
              ],
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "jwt.io",
                item: "https://jwt.io",
                description:
                  "JWT.IO allows you to decode, verify and generate JWT.",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Debugger",
                item: "https://jwt.io/#debugger-io",
                description:
                  "Decode, verify and generate JSON Web Tokens with our online debugger.",
              },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "jwt.io",
                item: "https://jwt.io",
                description:
                  "JWT.IO allows you to decode, verify and generate JWT.",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Libraries",
                item: "https://jwt.io/#libraries-io",
                description:
                  "An overview of Libraries for Token Signing/Verification in a variety of different programming languages.",
              },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "jwt.io",
                item: "https://jwt.io",
                description:
                  "JWT.IO allows you to decode, verify and generate JWT.",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Introduction",
                item: "https://jwt.io/introduction/",
                description: "An introduction to JSON Web Tokens.",
              },
            ],
          },
          generateArticleStructuredData({
            title: librariesDictionary.metadata.title,
            description: librariesDictionary.metadata.description,
            authors: librariesDictionary.metadata.authors,
            images: librariesDictionary.metadata.images,
            datePublished: librariesDictionary.metadata.datePublished,
            dateModified: librariesDictionary.metadata.dateModified,
          }),
        ]}
      />
      <LibraryHeroComponent
        languageCode={languageCode}
        query={query || librariesDictionary.filterPicker.defaultValue.value}
        categoryOptions={categoryOptions}
        algorithmOptions={algorithmOptions}
        supportOptions={supportOptions}
        dictionary={librariesDictionary}
      />
      <LibraryResultsComponent
        languageCode={languageCode}
        categories={filteredCategories}
        dictionary={librariesDictionary}
      />
      <Auth0CtaComponent
        languageCode={languageCode}
        dictionary={auth0Dictionary.banner}
      />
    </>
  );
}
