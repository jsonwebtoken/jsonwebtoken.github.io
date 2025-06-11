"use client";

import React, { useEffect, useRef } from "react";
import { EncodedJwtOutputComponent } from "@/features/encoder/components/encoded-jwt-output.component";
import { TokenEncoderInputComponent } from "@/features/encoder/components/token-encoder-input.component";
import { useEncoderStore } from "@/features/encoder/services/encoder.store";
import { HomeDictionaryModel } from "@/features/localization/models/home-dictionary.model";
import { useDebuggerStore } from "@/features/debugger/services/debugger.store";
import { SigningAlgCategoryValues } from "@/features/common/values/signing-alg-category.values";
import { WidgetComponent } from "@/features/common/components/widget/widget/widget.component";
import { dataTestidDictionary } from "@/libs/testing/data-testid.dictionary";
import { DebuggerWidgetValues } from "@/features/common/values/debugger-widget.values";

interface TokenEncoderComponentProps {
  languageCode: string;
  dictionary: HomeDictionaryModel["encoder"];
  headlineConfig: { isVisible: boolean; actions?: React.ReactNode };
}

export const TokenEncoderComponent: React.FC<TokenEncoderComponentProps> = ({
  languageCode,
  dictionary,
  headlineConfig,
}) => {
  const isMounted = useRef(false);

  const encodingWarnings$ = useEncoderStore((state) => state.encodingWarnings);
  const encoderInputs$ = useDebuggerStore((state) => state.encoderInputs$);
  const loadEncoderInputs = useEncoderStore((state) => state.loadEncoderInputs);

  useEffect(() => {
    if (isMounted.current) {
      return;
    }

    isMounted.current = true;

    if (!encoderInputs$.algType) {
      return;
    }

    if (!encoderInputs$.alg) {
      return;
    }

    if (
      encoderInputs$.header === undefined ||
      encoderInputs$.payload === undefined
    ) {
      return;
    }

    if (encoderInputs$.algType === SigningAlgCategoryValues.NONE) {
      loadEncoderInputs({
        algType: SigningAlgCategoryValues.NONE,
        alg: encoderInputs$.alg,
        header: encoderInputs$.header,
        payload: encoderInputs$.payload,
      });
    }

    if (
      encoderInputs$.algType === SigningAlgCategoryValues.SYMMETRIC &&
      encoderInputs$.symmetricSecretKey !== undefined &&
      encoderInputs$.symmetricSecretKeyEncoding !== undefined
    ) {
      loadEncoderInputs({
        algType: SigningAlgCategoryValues.SYMMETRIC,
        alg: encoderInputs$.alg,
        header: encoderInputs$.header,
        payload: encoderInputs$.payload,
        symmetricSecretKey: encoderInputs$.symmetricSecretKey,
        symmetricSecretKeyEncoding: encoderInputs$.symmetricSecretKeyEncoding,
      });
    }

    if (
      encoderInputs$.algType === SigningAlgCategoryValues.ASYMMETRIC &&
      encoderInputs$.asymmetricPrivateKeyFormat !== undefined
    ) {
      loadEncoderInputs({
        algType: SigningAlgCategoryValues.ASYMMETRIC,
        alg: encoderInputs$.alg,
        header: encoderInputs$.header,
        payload: encoderInputs$.payload,
        asymmetricPrivateKey: encoderInputs$.asymmetricPrivateKey || "",
        asymmetricPrivateKeyFormat: encoderInputs$.asymmetricPrivateKeyFormat,
      });
    }

    if (encoderInputs$.algType === SigningAlgCategoryValues.NOOP) {
      loadEncoderInputs({
        algType: SigningAlgCategoryValues.NOOP,
        alg: encoderInputs$.alg,
        header: encoderInputs$.header,
        payload: encoderInputs$.payload,
      });
    }
  }, [encoderInputs$, loadEncoderInputs, headlineConfig.isVisible]);

  return (
    <WidgetComponent
      id={dataTestidDictionary.encoder.id}
      widget={DebuggerWidgetValues.ENCODER}
      languageCode={languageCode}
      headlineConfig={headlineConfig}
      title={dictionary.title}
      description={dictionary.description}
      exampleGenerator={dictionary.exampleGenerator}
      contentInput={
        <TokenEncoderInputComponent
          languageCode={languageCode}
          dictionary={dictionary}
        />
      }
      contentOutput={
        <EncodedJwtOutputComponent
          languageCode={languageCode}
          dictionary={dictionary.encodedJwt}
        />
      }
      warnings={encodingWarnings$}
    />
  );
};
