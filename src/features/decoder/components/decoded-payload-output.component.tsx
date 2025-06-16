import React from "react";
import { CardTabsWithTabPersistenceComponentProps } from "@/features/common/components/card-tabs/card-tabs.component";
import { DecodedPayloadComponent } from "@/features/decoder/components/decoded-payload.component";
import { useDecoderStore } from "@/features/decoder/services/decoder.store";
import { HomeDictionaryModel } from "@/features/localization/models/home-dictionary.model";
import { DECODED_PAYLOAD_FORMAT_KEY } from "@/features/decoder/config/decoder.config";
import { ClaimDescriptionVisibilityValues } from "@/features/common/values/claim-description-visibility.values";
import { ClaimsComponent } from "@/features/decoder/components/claims.component";
import { CardComponentProps } from "@/features/common/components/card/card.component";
import { useDebuggerStore } from "@/features/debugger/services/debugger.store";
import { dataTestidDictionary } from "@/libs/testing/data-testid.dictionary";
import { CardToolbarComponent } from "@/features/common/components/card-toolbar/card-toolbar.component";
import { CardToolbarCopyButtonComponent } from "@/features/common/components/card-toolbar-buttons/card-toolbar-copy-button/card-toolbar-copy-button.component";
import { CardToolbarResizeButtonComponent } from "@/features/common/components/card-toolbar-buttons/card-toolbar-resize-button/card-toolbar-resize-button.component";
import { CardToolbarDescriptionButtonComponent } from "@/features/common/components/card-toolbar-buttons/card-toolbar-description-button/card-toolbar-description-button.component";

type DecodedPayloadOutputComponentProps = {
  languageCode: string;
  dictionary: HomeDictionaryModel["decoder"]["decodedPayload"];
  decodedPayloadInitialTabId: string;
  descriptionVisibility: ClaimDescriptionVisibilityValues;
};

export const DecodedPayloadOutputComponent: React.FC<
  DecodedPayloadOutputComponentProps
> = ({
  languageCode,
  dictionary,
  decodedPayloadInitialTabId,
  descriptionVisibility,
}) => {
  const resizeId = "decoded_payload_output";

  const setDecodedPayloadTabIndex$ = useDebuggerStore(
    (state) => state.setDecodedPayloadTabId$,
  );
  const decodedPayloadDescriptionVisibility$ = useDebuggerStore(
    (state) => state.decodedPayloadDescriptionVisibility$,
  );

  const decodedPayload$ = useDecoderStore((state) => state.decodedPayload);

  const cards: CardComponentProps[] = [
    {
      id: dataTestidDictionary.decoder.decodedPayload.json.id,
      languageCode: languageCode,
      title: dictionary.tabs.json.label,
      compactTitle: dictionary.tabs.json.label,
      children: <DecodedPayloadComponent decodedPayload={decodedPayload$} />,
      slots: {
        toolbar: (
          <CardToolbarComponent ariaLabel={"Decoded payload toolbar"}>
            <CardToolbarCopyButtonComponent
              languageCode={languageCode}
              value={decodedPayload$}
            />
            <CardToolbarResizeButtonComponent
              languageCode={languageCode}
              resizeId={resizeId}
              isDisabled={!decodedPayload$}
            />
          </CardToolbarComponent>
        ),
      },
      options: {
        noPadding: true,
        isOutput: true,
      },
      messages: null,
    },
    {
      id: dataTestidDictionary.decoder.decodedPayload.table.id,
      languageCode: languageCode,
      title: dictionary.tabs.claims.label,
      compactTitle: dictionary.tabs.claims.label,
      children: (
        <ClaimsComponent
          decodedElement={decodedPayload$}
          descriptionVisibility={
            descriptionVisibility || decodedPayloadDescriptionVisibility$
          }
        />
      ),
      options: { noPadding: true, isOutput: true },
      slots: {
        toolbar: (
          <CardToolbarComponent ariaLabel={"Decoded payload toolbar"}>
            <CardToolbarDescriptionButtonComponent
              languageCode={languageCode}
              initialVisibility={descriptionVisibility}
              outputType="payload"
            />
            <CardToolbarResizeButtonComponent
              languageCode={languageCode}
              resizeId={resizeId}
              isDisabled={!decodedPayload$}
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
      tabPersistenceCookieKey={DECODED_PAYLOAD_FORMAT_KEY}
      initialTabId={decodedPayloadInitialTabId}
      languageCode={languageCode}
      title={dictionary.title}
      cards={cards}
      handleTabChange={setDecodedPayloadTabIndex$}
    />
  );
};
