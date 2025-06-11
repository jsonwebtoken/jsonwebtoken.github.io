import React from "react";
import { HeroComponent } from "@/features/common/components/hero/hero.component";
import { Auth0CtaComponent } from "@/features/common/components/auth0-cta/auth0-cta.component";
import {
  getHomeDictionary,
  getJwtDictionary,
} from "@/features/localization/services/language-dictionary.service";
import { AssetsComponent } from "@/features/home/components/assets/assets.component";
import { EbookComponent } from "@/features/common/components/ebook/ebook.component";
import { StructuredData } from "@/features/seo/components/structured-data.component";
import { HeroModalStateValues } from "@/features/home/values/hero-modal-state.values";
import { ClaimDescriptionVisibilityValues } from "@/features/common/values/claim-description-visibility.values";
import { DebuggerWidgetComponent } from "@/features/debugger/components/debugger-widget/debugger-widget.component";
import { getAuth0Dictionary } from "@/features/localization/services/ui-language-dictionary.service";

interface HomePageComponentProps {
  languageCode: string;
  decodedHeaderInitialTabId: string;
  decodedPayloadInitialTabId: string;
  decodedHeaderDescriptionVisibility: ClaimDescriptionVisibilityValues;
  decodedPayloadDescriptionVisibility: ClaimDescriptionVisibilityValues;
  jwtInfoState: HeroModalStateValues;
  jwtWarningState: HeroModalStateValues;
  // debuggerInitialMode: DebuggerModeValues;
}

export const HomePageComponent: React.FC<HomePageComponentProps> = ({
  languageCode,
  decodedHeaderInitialTabId,
  decodedPayloadInitialTabId,
  decodedHeaderDescriptionVisibility,
  decodedPayloadDescriptionVisibility,
  jwtInfoState,
  jwtWarningState,
  // debuggerInitialMode,
}) => {
  const homeDictionary = getHomeDictionary(languageCode);
  const auth0Dictionary = getAuth0Dictionary(languageCode);
  const jwtDictionary = getJwtDictionary(languageCode);

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
        ]}
      />
      <HeroComponent
        languageCode={languageCode}
        dictionary={homeDictionary.hero}
        infoBanner={{
          dictionary: homeDictionary.info,
          state: jwtInfoState,
        }}
        warningBanner={{
          dictionary: homeDictionary.warning,
          state: jwtWarningState,
        }}
      />
      <DebuggerWidgetComponent
        languageCode={languageCode}
        decodedHeaderInitialTabId={decodedHeaderInitialTabId}
        decodedPayloadInitialTabId={decodedPayloadInitialTabId}
        decodedHeaderDescriptionVisibility={decodedHeaderDescriptionVisibility}
        decodedPayloadDescriptionVisibility={
          decodedPayloadDescriptionVisibility
        }
        decoderDictionary={homeDictionary.decoder}
        encoderDictionary={homeDictionary.encoder}
        // debuggerInitialMode={debuggerInitialMode}
      />
      <aside>
        <EbookComponent
          languageCode={languageCode}
          dictionary={auth0Dictionary.ebook}
        />
        <AssetsComponent
          dictionary={jwtDictionary}
          languageCode={languageCode}
        />
        <Auth0CtaComponent
          languageCode={languageCode}
          dictionary={auth0Dictionary.banner}
        />
      </aside>
      {/*<CounterComponent />*/}
    </>
  );
};
