"use client";

import React, { useEffect, useState } from "react";
import { CardComponent } from "@/features/common/components/card/card.component";
import { JwtEditorComponent } from "@/features/decoder/components/jwt-editor.component";
import { DEFAULT_JWT } from "@/features/decoder/services/token-decoder.service";
import { useDecoderStore } from "@/features/decoder/services/decoder.store";
import { TokenDecoderSignatureValidationComponent } from "@/features/decoder/components/token-decoder-signature-validation.component";
import { HomeDictionaryModel } from "@/features/localization/models/home-dictionary.model";
import { useDebuggerStore } from "@/features/debugger/services/debugger.store";
import { extractJwt } from "@/features/common/services/utils";
import { dataTestidDictionary } from "@/libs/testing/data-testid.dictionary";
import { CardToolbarComponent } from "@/features/common/components/card-toolbar/card-toolbar.component";
import { CardToolbarCopyButtonComponent } from "@/features/common/components/card-toolbar-buttons/card-toolbar-copy-button/card-toolbar-copy-button.component";
import { CardToolbarClearButtonComponent } from "@/features/common/components/card-toolbar-buttons/card-toolbar-clear-button/card-toolbar-clear-button.component";
import styles from "./jwt-input.module.scss";

type JwtInputComponentProps = {
  languageCode: string;
  dictionary: HomeDictionaryModel["decoder"]["jwtEditor"];
};

export const JwtInputComponent: React.FC<JwtInputComponentProps> = ({
  languageCode,
  dictionary,
}) => {
  const handleJwtChange$ = useDecoderStore((state) => state.handleJwtChange);
  const jwt$ = useDecoderStore((state) => state.jwt);
  const decodeErrors$ = useDecoderStore((state) => state.decodingErrors);

  const decoderInputs$ = useDebuggerStore((state) => state.decoderInputs$);

  const [token, setToken] = useState<string>(
    decoderInputs$.jwt || DEFAULT_JWT.token,
  );

  const clearValue = async () => {
    handleJwtChange$("");
  };

  const handleJwtChange = async (newValue: string) => {
    const cleanValue = extractJwt(newValue);

    setToken(cleanValue);

    handleJwtChange$(cleanValue);
  };

  useEffect(() => {
    setToken(jwt$);
  }, [jwt$]);

  return (
    <>
      <span className={styles.headline}>{dictionary.headline}</span>
      <CardComponent
        id={dataTestidDictionary.decoder.jwtEditor.id}
        languageCode={languageCode}
        title={dictionary.title}
        compactTitle={dictionary.compactTitle}
        options={{ fullWidth: true, noPadding: true }}
        messages={{
          success: [dictionary.successMessage],
          errors: decodeErrors$,
        }}
        slots={{
          notification: (
            <TokenDecoderSignatureValidationComponent
              id={dataTestidDictionary.decoder.jwtEditor.notificationBar.id}
            />
          ),
          toolbar: (
            <CardToolbarComponent ariaLabel={"JWT editor toolbar"}>
              <CardToolbarCopyButtonComponent
                languageCode={languageCode}
                value={token}
              />
              <CardToolbarClearButtonComponent
                languageCode={languageCode}
                onPress={clearValue}
                isDisabled={!token}
              />
            </CardToolbarComponent>
          ),
        }}
      >
        <JwtEditorComponent token={token} handleJwtChange={handleJwtChange} />
      </CardComponent>
    </>
  );
};
