import React, { ChangeEvent, useEffect, useState } from "react";
import { TokenDecoderEncodingFormatPickerComponent } from "@/features/decoder/components/token-decoder-encoding-format-picker.component";
import { SignatureVerificationSecretInputComponent } from "@/features/decoder/components/signature-verification-secret-input.component";
import { SignatureVerificationPublicKeyInputComponent } from "@/features/decoder/components/signature-verification-public-key-input.component";
import { CardWithHeadlineComponent } from "@/features/common/components/card/card.component";
import { DEFAULT_JWT } from "@/features/decoder/services/token-decoder.service";
import { TokenDecoderKeyFormatPickerComponent } from "@/features/decoder/components/token-decoder-key-format-picker.component";
import { useDecoderStore } from "@/features/decoder/services/decoder.store";
import { HomeDictionaryModel } from "@/features/localization/models/home-dictionary.model";
import { useDebuggerStore } from "@/features/debugger/services/debugger.store";
import { SigningAlgCategoryValues } from "@/features/common/values/signing-alg-category.values";
import {
  isDigitalSignatureAlg,
  isHmacAlg,
  isNoneAlg,
} from "@/features/common/services/jwt.service";
import { dataTestidDictionary } from "@/libs/testing/data-testid.dictionary";
import { CardToolbarComponent } from "@/features/common/components/card-toolbar/card-toolbar.component";
import { CardToolbarCopyButtonComponent } from "@/features/common/components/card-toolbar-buttons/card-toolbar-copy-button/card-toolbar-copy-button.component";
import { CardToolbarClearButtonComponent } from "@/features/common/components/card-toolbar-buttons/card-toolbar-clear-button/card-toolbar-clear-button.component";
import { NOOP_ALG } from "@/features/common/values/constants";

type SecretKeyInputComponentProps = {
  languageCode: string;
  dictionary: HomeDictionaryModel["decoder"]["signatureVerification"];
};

export const SecretKeyInputComponent: React.FC<
  SecretKeyInputComponentProps
> = ({ languageCode, dictionary }) => {
  const handleSymmetricSecretKeyChange$ = useDecoderStore(
    (state) => state.handleSymmetricSecretKeyChange,
  );
  const handleAsymmetricPublicKeyChange$ = useDecoderStore(
    (state) => state.handleAsymmetricPublicKeyChange,
  );
  const resetControlledSymmetricSecretKey$ = useDecoderStore(
    (state) => state.resetControlledSymmetricSecretKey,
  );
  const resetControlledAsymmetricPublicKey$ = useDecoderStore(
    (state) => state.resetControlledAsymmetricPublicKey,
  );

  const alg$ = useDecoderStore((state) => state.alg);
  const verificationInputErrors$ = useDecoderStore(
    (state) => state.verificationInputErrors,
  );
  const controlledSymmetricSecretKey = useDecoderStore(
    (state) => state.controlledSymmetricSecretKey,
  );
  const controlledAsymmetricPublicKey = useDecoderStore(
    (state) => state.controlledAsymmetricPublicKey,
  );

  const decoderInputs$ = useDebuggerStore((state) => state.decoderInputs$);

  const [secret, setSecret] = useState<string>(
    decoderInputs$.algType === SigningAlgCategoryValues.SYMMETRIC &&
      decoderInputs$.symmetricSecretKey
      ? decoderInputs$.symmetricSecretKey
      : DEFAULT_JWT.secret,
  );
  const [publicKey, setPublicKey] = useState<string>("");

  useEffect(() => {
    if (controlledSymmetricSecretKey) {
      setSecret(controlledSymmetricSecretKey.value.trim());
    }
  }, [controlledSymmetricSecretKey]);

  useEffect(() => {
    if (controlledAsymmetricPublicKey) {
      setPublicKey(controlledAsymmetricPublicKey.value.trim());
    }
  }, [controlledAsymmetricPublicKey]);

  const clearValue = async () => {
    if (isHmacAlg(alg$)) {
      handleSymmetricSecretKeyChange$("");
      resetControlledSymmetricSecretKey$();
    }

    if (isDigitalSignatureAlg(alg$)) {
      handleAsymmetricPublicKeyChange$("");
      resetControlledAsymmetricPublicKey$();
    }
  };

  const handleSymmetricSecretKeyChange = async (
    e: ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const key = e.target.value;

    const cleanValue = key.trim();

    setSecret(cleanValue);

    handleSymmetricSecretKeyChange$(cleanValue);
  };

  const handleAsymmetricPublicKeyChange = async (
    e: ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const key = e.target.value;

    const cleanValue = key.trim();

    setPublicKey(cleanValue);

    handleAsymmetricPublicKeyChange$(cleanValue);
  };

  if (isNoneAlg(alg$)) {
    return null;
  }

  if (alg$ === NOOP_ALG) {
    return null;
  }

  return (
    <CardWithHeadlineComponent
      id={dataTestidDictionary.decoder.secretKeyEditor.id}
      sectionHeadline={{
        title: dictionary.title,
        titleTag: dictionary.subtitle,
        description: isHmacAlg(alg$)
          ? dictionary.description.secret
          : dictionary.description.publicKey,
      }}
      languageCode={languageCode}
      messages={{
        errors: verificationInputErrors$,
        success: [
          isHmacAlg(alg$)
            ? dictionary.editor.successMessage.secret
            : dictionary.editor.successMessage.publicKey,
        ],
      }}
      options={{ noPadding: true }}
      title={
        isHmacAlg(alg$)
          ? dictionary.editor.title.secret
          : dictionary.editor.title.publicKey
      }
      compactTitle={
        isHmacAlg(alg$)
          ? dictionary.editor.title.secret
          : dictionary.editor.title.publicKey
      }
      slots={{
        toolbar: (
          <CardToolbarComponent ariaLabel={"JWT editor toolbar"}>
            <CardToolbarCopyButtonComponent
              languageCode={languageCode}
              value={isHmacAlg(alg$) ? secret : publicKey}
            />
            <CardToolbarClearButtonComponent
              languageCode={languageCode}
              onPress={clearValue}
              isDisabled={isHmacAlg(alg$) ? !secret : !publicKey}
            />
          </CardToolbarComponent>
        ),
      }}
    >
      {isHmacAlg(alg$) && (
        <SignatureVerificationSecretInputComponent
          handleSecretChange={handleSymmetricSecretKeyChange}
          secret={secret}
        />
      )}
      {isDigitalSignatureAlg(alg$) && (
        <SignatureVerificationPublicKeyInputComponent
          publicKey={publicKey}
          handlePublicKeyChange={handleAsymmetricPublicKeyChange}
          placeholder={dictionary.editor.placeholder.publicKey}
        />
      )}
      {isNoneAlg(alg$) && null}
    </CardWithHeadlineComponent>
  );
};
