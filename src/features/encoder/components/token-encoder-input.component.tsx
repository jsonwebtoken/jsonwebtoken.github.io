"use client";

import React, {
  ChangeEvent,
  Fragment,
  useCallback,
  useEffect,
  useState,
} from "react";
import { HeaderEditorComponent } from "@/features/encoder/components/header-editor.component";
import {
  CardComponent,
  CardComponentProps,
} from "@/features/common/components/card/card.component";
import { PayloadEditorComponent } from "@/features/encoder/components/payload-editor.component";
import { TokenEncoderKeyFormatPickerComponent } from "@/features/encoder/components/token-encoder-key-format-picker.component";
import { SigningSecretEditorComponent } from "@/features/encoder/components/signing-secret-editor.component";
import { SigningPrivateKeyEditorComponent } from "@/features/encoder/components/signing-private-key-editor.component";
import { CardTabsComponent } from "@/features/common/components/card-tabs/card-tabs.component";
import styles from "./token-encoder-input.module.scss";
import { useEncoderStore } from "@/features/encoder/services/encoder.store";
import { HomeDictionaryModel } from "@/features/localization/models/home-dictionary.model";
import {
  DEFAULT_HEADER,
  DEFAULT_PAYLOAD,
  DEFAULT_SYMMETRIC_SECRET,
} from "@/features/encoder/services/encoder.config";
import {
  isDigitalSignatureAlg,
  isHmacAlg,
  isNoneAlg,
} from "@/features/common/services/jwt.service";
import { dataTestidDictionary } from "@/libs/testing/data-testid.dictionary";
import { CardToolbarComponent } from "@/features/common/components/card-toolbar/card-toolbar.component";
import { CardToolbarClearButtonComponent } from "@/features/common/components/card-toolbar-buttons/card-toolbar-clear-button/card-toolbar-clear-button.component";
import { EncodingFormatToggleSwitchComponent } from "@/features/decoder/components/encoding-format-toggle-swith/encoding-format-toggle-switch";

type HeaderInputComponentProps = {
  languageCode: string;
  dictionary: HomeDictionaryModel["encoder"];
};

export const TokenEncoderInputComponent: React.FC<
  HeaderInputComponentProps
> = ({ languageCode, dictionary }) => {
  const alg$ = useEncoderStore((state) => state.alg);
  const headerErrors$ = useEncoderStore((state) =>
    state.headerErrors && state.headerErrors.length > 0
      ? state.headerErrors
      : null
  );
  const headerWarnings$ = useEncoderStore((state) =>
    state.headerWarnings && state.headerWarnings.length > 0
      ? state.headerWarnings
      : null
  );
  const payloadErrors$ = useEncoderStore((state) =>
    state.payloadErrors && state.payloadErrors.length > 0
      ? state.payloadErrors
      : null
  );
  const signingErrors$ = useEncoderStore((state) =>
    state.signingErrors && state.signingErrors.length > 0
      ? state.signingErrors
      : null
  );
  const controlledHeader$ = useEncoderStore((state) => state.controlledHeader);
  const controlledPayload$ = useEncoderStore(
    (state) => state.controlledPayload
  );
  const controlledSymmetricSecretKey$ = useEncoderStore(
    (state) => state.controlledSymmetricSecretKey
  );
  const controlledAsymmetricPrivateKey$ = useEncoderStore(
    (state) => state.controlledAsymmetricPrivateKey
  );

  const [header, setHeader] = useState<string>(DEFAULT_HEADER);
  const [payload, setPayload] = useState<string>(DEFAULT_PAYLOAD);
  const [secret, setSecret] = useState<string>(DEFAULT_SYMMETRIC_SECRET);
  const [privateKey, setPrivateKey] = useState<string>("");

  useEffect(() => {
    setHeader(controlledHeader$.value);
  }, [controlledHeader$]);

  useEffect(() => {
    setPayload(controlledPayload$.value);
  }, [controlledPayload$]);

  useEffect(() => {
    if (controlledSymmetricSecretKey$) {
      setSecret(controlledSymmetricSecretKey$.value);
    }
  }, [controlledSymmetricSecretKey$]);

  useEffect(() => {
    if (controlledAsymmetricPrivateKey$) {
      setPrivateKey(controlledAsymmetricPrivateKey$.value);
    }
  }, [controlledAsymmetricPrivateKey$]);

  const handleHeaderChange$ = useEncoderStore(
    (state) => state.handleHeaderChange
  );
  const resetControlledHeader$ = useEncoderStore(
    (state) => state.resetControlledHeader
  );
  const handlePayloadChange$ = useEncoderStore(
    (state) => state.handlePayloadChange
  );
  const resetControlledPayload$ = useEncoderStore(
    (state) => state.resetControlledPayload
  );
  const handleSymmetricSecretKeyChange$ = useEncoderStore(
    (state) => state.handleSymmetricSecretKeyChange
  );
  const resetControlledSymmetricSecretKey$ = useEncoderStore(
    (state) => state.resetControlledSymmetricSecretKey
  );
  const handleAsymmetricPrivateKeyChange$ = useEncoderStore(
    (state) => state.handleAsymmetricPrivateKeyChange
  );
  const resetControlledAsymmetricPrivateKey$ = useEncoderStore(
    (state) => state.resetControlledAsymmetricPrivateKey
  );

  const clearHeader = async () => {
    handleHeaderChange$("");
    resetControlledHeader$();
  };

  const clearPayload = async () => {
    handlePayloadChange$("");
    resetControlledPayload$();
  };

  const clearSecretKey = async () => {
    if (headerErrors$ && headerErrors$.length > 0) {
      return;
    }

    if (isHmacAlg(alg$)) {
      handleSymmetricSecretKeyChange$("");
      resetControlledSymmetricSecretKey$();
    }

    if (isDigitalSignatureAlg(alg$)) {
      handleAsymmetricPrivateKeyChange$("");
      resetControlledAsymmetricPrivateKey$();
    }
  };

  const handleHeaderChange = useCallback(
    (newValue: string) => {
      const cleanValue = newValue.trim();

      setHeader(cleanValue);

      handleHeaderChange$(cleanValue);
    },
    [handleHeaderChange$]
  );

  const handlePayloadChange = useCallback(
    (newValue: string) => {
      const cleanValue = newValue.trim();

      setPayload(cleanValue);

      handlePayloadChange$(cleanValue);
    },
    [handlePayloadChange$]
  );

  const handleSymmetricSecretKeyChange = async (
    e: ChangeEvent<HTMLTextAreaElement>
  ) => {
    const key = e.target.value;

    const cleanValue = key.trim();

    setSecret(cleanValue);

    handleSymmetricSecretKeyChange$(cleanValue);
  };

  const handleAsymmetricPrivateKeyChange = async (
    e: ChangeEvent<HTMLTextAreaElement>
  ) => {
    const key = e.target.value;

    const cleanValue = key.trim();

    setPrivateKey(cleanValue);

    handleAsymmetricPrivateKeyChange$(cleanValue);
  };

  const cards: CardComponentProps[] = [
    {
      id: dataTestidDictionary.encoder.headerEditor.id,
      languageCode: languageCode,
      title: dictionary.headerEditor.title,
      compactTitle: dictionary.headerEditor.compactTitle,
      hasHeaderIcon: true,
      children: (
        <HeaderEditorComponent
          header={header}
          handleHeaderChange={handleHeaderChange}
        />
      ),
      messages: {
        success: [dictionary.headerEditor.successMessage],
        errors: headerErrors$,
        warnings: headerWarnings$,
      },
      slots: {
        toolbar: (
          <CardToolbarComponent ariaLabel={"Header editor toolbar"}>
            <CardToolbarClearButtonComponent
              languageCode={languageCode}
              onPress={clearHeader}
              isDisabled={!header}
            />
          </CardToolbarComponent>
        ),
      },
      options: { noPadding: true },
    },
    {
      id: dataTestidDictionary.encoder.payloadEditor.id,
      languageCode: languageCode,
      title: dictionary.payloadEditor.title,
      compactTitle: dictionary.payloadEditor.compactTitle,
      children: (
        <PayloadEditorComponent
          payload={payload}
          handlePayloadChange={handlePayloadChange}
        />
      ),
      hasHeaderIcon: true,
      messages: {
        success: [dictionary.payloadEditor.successMessage],
        errors: payloadErrors$,
      },
      slots: {
        toolbar: (
          <CardToolbarComponent ariaLabel={"Payload editor toolbar"}>
            <CardToolbarClearButtonComponent
              languageCode={languageCode}
              onPress={clearPayload}
              isDisabled={!payload}
            />
          </CardToolbarComponent>
        ),
      },
      options: { noPadding: true },
    },
  ];

  if (isHmacAlg(alg$) || isDigitalSignatureAlg(alg$)) {
    cards.push({
      id: dataTestidDictionary.encoder.secretKeyEditor.id,
      languageCode: languageCode,
      hasHeaderIcon: true,
      title: isHmacAlg(alg$)
        ? dictionary.signatureEditor.title.secret
        : dictionary.signatureEditor.title.privateKey,
      compactTitle: isHmacAlg(alg$)
        ? dictionary.signatureEditor.compactTitle.secret
        : dictionary.signatureEditor.compactTitle.privateKey,
      options: {
        noPadding: true,
      },
      children: (
        <>
          {isHmacAlg(alg$) && (
            <SigningSecretEditorComponent
              secret={secret}
              handleSecretChange={handleSymmetricSecretKeyChange}
              headerErrors={headerErrors$}
            />
          )}
          {isDigitalSignatureAlg(alg$) && (
            <SigningPrivateKeyEditorComponent
              privateKey={privateKey}
              handlePrivateKeyChange={handleAsymmetricPrivateKeyChange}
              headerErrors={headerErrors$}
              placeholder={dictionary.signatureEditor.placeholder.privateKey}
            />
          )}
        </>
      ),
      messages: {
        success: [
          isHmacAlg(alg$)
            ? dictionary.signatureEditor.successMessage.secret
            : dictionary.signatureEditor.successMessage.privateKey,
        ],
        errors: signingErrors$,
      },
      slots: {
        toolbar: (
          <CardToolbarComponent
            ariaLabel={`${isHmacAlg(alg$) ? "Secret" : "Private key"} editor toolbar`}
          >
            <CardToolbarClearButtonComponent
              languageCode={languageCode}
              onPress={clearSecretKey}
              isDisabled={
                (headerErrors$ && headerErrors$.length > 0) ||
                (isHmacAlg(alg$) && !secret) ||
                (isDigitalSignatureAlg(alg$) && !privateKey)
              }
            />
          </CardToolbarComponent>
        ),
      },
    });
  }

  return (
    <>
      <div heap-ignore="true" className={styles.encoderCards}>
        {cards.map((props) => (
          <Fragment key={props.title}>
            {props.id === dataTestidDictionary.encoder.secretKeyEditor.id ? (
              <div className={styles.headline_container}>
                <h4 className={styles.headline}>{props.compactTitle}</h4>
                {isHmacAlg(alg$) ? (
                  <EncodingFormatToggleSwitchComponent
                    languageCode={languageCode}
                    isEncoding
                  />
                ) : (
                  <TokenEncoderKeyFormatPickerComponent
                    languageCode={languageCode}
                  />
                )}
              </div>
            ) : (
              <h4 className={styles.headline}>{props.compactTitle}</h4>
            )}
            <CardComponent {...props} />
          </Fragment>
        ))}
      </div>
      <div heap-ignore="true" className={styles.encoderCardTabs}>
        <CardTabsComponent
          resizeId={"token_encoder_input"}
          title={null}
          languageCode={languageCode}
          cards={cards}
        />
      </div>
    </>
  );
};
