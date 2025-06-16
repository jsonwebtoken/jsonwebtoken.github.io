import React from "react";
import { StructuredData } from "@/features/seo/components/structured-data.component";
import { generateArticleStructuredData } from "@/features/seo/services/structured-data.service";
import { Auth0CtaComponent } from "@/features/common/components/auth0-cta/auth0-cta.component";
import { getIntroductionDictionary } from "@/features/localization/services/language-dictionary.service";
import { IntroductionArticleComponent } from "@/features/introduction/components/introduction-article/introduction-article.component";
import { IntroductionHeroComponent } from "@/features/introduction/components/introduction-hero/introduction-hero.component";
import { EbookAdComponent } from "@/features/introduction/components/ebook-ad/ebook-ad.component";
import { getAuth0Dictionary } from "@/features/localization/services/ui-language-dictionary.service";
import { getComponentDictionary } from "@/features/localization/services/component-dictionary.service";

interface IntroductionPageComponentProps {
  languageCode: string;
}

export const IntroductionPageComponent: React.FC<
  IntroductionPageComponentProps
> = ({ languageCode }) => {
  const introductionDictionary = getIntroductionDictionary(languageCode);
  const auth0Dictionary = getAuth0Dictionary(languageCode);
  const componentDictionary = getComponentDictionary(languageCode);

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
            title: introductionDictionary.metadata.title,
            description: introductionDictionary.metadata.description,
            authors: introductionDictionary.metadata.authors,
            images: introductionDictionary.metadata.images,
            datePublished: introductionDictionary.metadata.datePublished,
            dateModified: introductionDictionary.metadata.dateModified,
          }),
        ]}
      />
      <IntroductionHeroComponent
        languageCode={languageCode}
        dictionary={introductionDictionary.hero}
      />
      <EbookAdComponent copy={componentDictionary.ebookAd} />
      <IntroductionArticleComponent languageCode={languageCode} />
      <Auth0CtaComponent
        languageCode={languageCode}
        dictionary={auth0Dictionary.banner}
      />
    </>
  );
};
