import React from "react";
import { CardTabsWithTabPersistenceComponentProps } from "@/features/common/components/card-tabs/card-tabs.component";
import { DecodedHeaderComponent } from "@/features/decoder/components/decoded-header.component";
import { useDecoderStore } from "@/features/decoder/services/decoder.store";
import { HomeDictionaryModel } from "@/features/localization/models/home-dictionary.model";
import { DECODED_HEADER_FORMAT_KEY } from "@/features/decoder/config/decoder.config";
import { CardComponentProps } from "@/features/common/components/card/card.component";
import { ClaimDescriptionVisibilityValues } from "@/features/common/values/claim-description-visibility.values";
import { ClaimsComponent } from "@/features/decoder/components/claims.component";
import { useDebuggerStore } from "@/features/debugger/services/debugger.store";
import { dataTestidDictionary } from "@/libs/testing/data-testid.dictionary";
import { CardToolbarComponent } from "@/features/common/components/card-toolbar/card-toolbar.component";
import { CardToolbarCopyButtonComponent } from "@/features/common/components/card-toolbar-buttons/card-toolbar-copy-button/card-toolbar-copy-button.component";
import { CardToolbarResizeButtonComponent } from "@/features/common/components/card-toolbar-buttons/card-toolbar-resize-button/card-toolbar-resize-button.component";
import { CardToolbarDescriptionButtonComponent } from "@/features/common/components/card-toolbar-buttons/card-toolbar-description-button/card-toolbar-description-button.component";

interface DecodedHeaderOutputComponentProps {
  languageCode: string;
  dictionary: HomeDictionaryModel["decoder"]["decodedHeader"];
  decodedHeaderInitialTabId: string;
  descriptionVisibility: ClaimDescriptionVisibilityValues;
}

export const DecodedHeaderOutputComponent: React.FC<
  DecodedHeaderOutputComponentProps
> = ({
  decodedHeaderInitialTabId,
  languageCode,
  dictionary,
  descriptionVisibility,
}) => {
  const resizeId = "decoded_header_output";
  const setDecodedHeaderTabValue$ = useDebuggerStore(
    (state) => state.setDecodedHeaderTabId$,
  );
  const decodedHeaderDescriptionVisibility$ = useDebuggerStore(
    (state) => state.decodedHeaderDescriptionVisibility$,
  );

  const decodedHeader$ = useDecoderStore((state) => state.decodedHeader);

  const cards: CardComponentProps[] = [
    {
      id: dataTestidDictionary.decoder.decodedHeader.json.id,
      languageCode: languageCode,
      title: dictionary.tabs.json.label,
      compactTitle: dictionary.tabs.json.label,
      children: <DecodedHeaderComponent decodedHeader={decodedHeader$} />,
      slots: {
        toolbar: (
          <CardToolbarComponent ariaLabel={"Decoded header toolbar"}>
            <CardToolbarCopyButtonComponent
              languageCode={languageCode}
              value={decodedHeader$}
            />
            <CardToolbarResizeButtonComponent
              languageCode={languageCode}
              resizeId={resizeId}
              isDisabled={!decodedHeader$}
            />
          </CardToolbarComponent>
        ),
      },
      options: { noPadding: true, isOutput: true },
      messages: null,
    },
    {
      id: dataTestidDictionary.decoder.decodedHeader.table.id,
      languageCode: languageCode,
      title: dictionary.tabs.claims.label,
      compactTitle: dictionary.tabs.claims.label,
      children: (
        <ClaimsComponent
          decodedElement={decodedHeader$}
          descriptionVisibility={
            descriptionVisibility || decodedHeaderDescriptionVisibility$
          }
        />
      ),
      options: { noPadding: true, isOutput: true },
      slots: {
        toolbar: (
          <CardToolbarComponent ariaLabel={"Decoded header toolbar"}>
            <CardToolbarDescriptionButtonComponent
              languageCode={languageCode}
              initialVisibility={descriptionVisibility}
              outputType="header"
            />
            <CardToolbarResizeButtonComponent
              languageCode={languageCode}
              resizeId={resizeId}
              isDisabled={!decodedHeader$}
            />
          </CardToolbarComponent>
        ),
      },
      messages: null,
    },
  ];

  return (
    <CardTabsWithTabPersistenceComponentProps
      resizeId={resizeId}
      tabPersistenceCookieKey={DECODED_HEADER_FORMAT_KEY}
      initialTabId={decodedHeaderInitialTabId}
      languageCode={languageCode}
      title={dictionary.title}
      cards={cards}
      handleTabChange={setDecodedHeaderTabValue$}
    />
  );
};
