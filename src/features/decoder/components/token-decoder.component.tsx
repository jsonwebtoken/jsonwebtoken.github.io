"use client";

import React, { useEffect, useRef } from "react";
import { DecodedHeaderOutputComponent } from "@/features/decoder/components/decoded-header-output.component";
import { DecodedPayloadOutputComponent } from "@/features/decoder/components/decoded-payload-output.component";
import { JwtInputComponent } from "@/features/decoder/components/jwt-input.component";
import { SecretKeyInputComponent } from "@/features/decoder/components/secret-key-input.component";
import { useDecoderStore } from "@/features/decoder/services/decoder.store";
import { useRouter } from "next/navigation";
import {
  SupportedTokenHashParamValues,
  WARNING_PARAM_KEY,
  WARNING_PARAM_VALUE,
} from "@/libs/config/project.constants";
import { HomeDictionaryModel } from "@/features/localization/models/home-dictionary.model";
import { ClaimDescriptionVisibilityValues } from "@/features/common/values/claim-description-visibility.values";
import { useDebuggerStore } from "@/features/debugger/services/debugger.store";
import { SigningAlgCategoryValues } from "@/features/common/values/signing-alg-category.values";
import { AsymmetricKeyFormatValues } from "@/features/common/values/asymmetric-key-format.values";
import { WidgetComponent } from "@/features/common/components/widget/widget/widget.component";
import { dataTestidDictionary } from "@/libs/testing/data-testid.dictionary";
import { DebuggerWidgetValues } from "@/features/common/values/debugger-widget.values";
import { WidgetAlgPickerComponent } from "@/features/debugger/components/debugger-alg-picker/debugger-alg-picker.component";
import styles from "./token-decoder.module.scss";

interface TokenDecoderComponentProps {
  languageCode: string;
  dictionary: HomeDictionaryModel["decoder"];
  decodedHeaderInitialTabId: string;
  decodedPayloadInitialTabId: string;
  decodedHeaderDescriptionVisibility: ClaimDescriptionVisibilityValues;
  decodedPayloadDescriptionVisibility: ClaimDescriptionVisibilityValues;
  headlineConfig: { isVisible: boolean; actions?: React.ReactNode };
}

export const TokenDecoderComponent: React.FC<TokenDecoderComponentProps> = ({
  languageCode,
  dictionary,
  decodedHeaderInitialTabId,
  decodedPayloadInitialTabId,
  decodedHeaderDescriptionVisibility,
  decodedPayloadDescriptionVisibility,
  headlineConfig,
}) => {
  const isMounted = useRef(false);

  const router = useRouter();

  const decoderInputs$ = useDebuggerStore((state) => state.decoderInputs$);

  const loadDecoderInputs = useDecoderStore((state) => state.loadDecoderInputs);
  const handleJwtChange$ = useDecoderStore((state) => state.handleJwtChange);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);

      if (hash.includes("debugger-io?token=")) {
        const debugHash = window.location.hash
          .substring(1)
          .replace("debugger-io?", "");
        const debugHashParams = new URLSearchParams(debugHash);
        const token = debugHashParams.get(SupportedTokenHashParamValues.TOKEN);

        const currentUrl = window.location.href.split("#")[0];

        if (!(currentUrl && token)) {
          return;
        }

        const newUrl = `${currentUrl}#${SupportedTokenHashParamValues.TOKEN}=${token}`;

        window.location.replace(newUrl);

        return;
      }

      if (!hash.includes("=")) {
        return;
      }

      const hashParams = new URLSearchParams(hash);

      Object.values(SupportedTokenHashParamValues).forEach((hashParamKey) => {
        const token = hashParams.get(hashParamKey);

        if (token) {
          handleJwtChange$(token);
        }
      });
    };

    const handleWarning = () => {
      const search = window.location.search;

      const searchParams = new URLSearchParams(search);
      const warning = searchParams.get(WARNING_PARAM_KEY);

      if (warning === WARNING_PARAM_VALUE) {

        searchParams.delete(WARNING_PARAM_KEY);

        const currentUrl = window.location.href.split("?")[0];

        let newUrl = `${currentUrl}`;

        if (searchParams.size > 0) {
          newUrl += `?${searchParams.toString()}`;
        }

        if (window.location.hash) {
          newUrl += window.location.hash;
        }

        router.push(newUrl);
      }
    };

    window.addEventListener("hashchange", handleHashChange);

    handleHashChange();
    handleWarning();

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [handleJwtChange$, router]);

  useEffect(() => {
    if (isMounted.current) {
      return;
    }

    isMounted.current = true;

    if (!decoderInputs$.algType) {
      return;
    }

    if (!decoderInputs$.alg) {
      return;
    }

    if (decoderInputs$.jwt === undefined) {
      return;
    }

    if (decoderInputs$.algType === SigningAlgCategoryValues.NONE) {
      loadDecoderInputs({
        algType: SigningAlgCategoryValues.NONE,
        alg: decoderInputs$.alg,
        jwt: decoderInputs$.jwt,
      });
    }

    if (
      decoderInputs$.algType === SigningAlgCategoryValues.SYMMETRIC &&
      decoderInputs$.symmetricSecretKey !== undefined &&
      decoderInputs$.symmetricSecretKeyEncoding !== undefined
    ) {
      loadDecoderInputs({
        algType: SigningAlgCategoryValues.SYMMETRIC,
        alg: decoderInputs$.alg,
        jwt: decoderInputs$.jwt,
        symmetricSecretKey: decoderInputs$.symmetricSecretKey,
        symmetricSecretKeyEncoding: decoderInputs$.symmetricSecretKeyEncoding,
      });
    }

    if (decoderInputs$.algType === SigningAlgCategoryValues.ASYMMETRIC) {
      loadDecoderInputs({
        algType: SigningAlgCategoryValues.ASYMMETRIC,
        alg: decoderInputs$.alg,
        jwt: decoderInputs$.jwt,
        asymmetricPublicKey: decoderInputs$.asymmetricPublicKey || "",
        asymmetricPublicKeyFormat:
          decoderInputs$.asymmetricPublicKeyFormat ||
          useDebuggerStore.getState().stash$.asymmetricPrivateKeyFormat ||
          AsymmetricKeyFormatValues.PEM,
      });
    }
  }, [decoderInputs$, loadDecoderInputs, headlineConfig.isVisible]);

  return (
    <>
      <div className={styles.input__description}>
        <span>{dictionary.description}</span>
        <WidgetAlgPickerComponent
          label={dictionary.exampleGenerator.label}
          languageCode={languageCode}
          widget={DebuggerWidgetValues.DECODER}
        />
      </div>
      <WidgetComponent
        id={dataTestidDictionary.decoder.id}
        widget={DebuggerWidgetValues.DECODER}
        languageCode={languageCode}
        headlineConfig={headlineConfig}
        title={dictionary.title}
        description={dictionary.description}
        exampleGenerator={dictionary.exampleGenerator}
        contentInput={
          <JwtInputComponent
            dictionary={dictionary.jwtEditor}
            languageCode={languageCode}
          />
        }
        contentOutput={
          <>
            <DecodedHeaderOutputComponent
              languageCode={languageCode}
              dictionary={dictionary.decodedHeader}
              decodedHeaderInitialTabId={decodedHeaderInitialTabId}
              descriptionVisibility={decodedHeaderDescriptionVisibility}
            />
            <DecodedPayloadOutputComponent
              languageCode={languageCode}
              dictionary={dictionary.decodedPayload}
              decodedPayloadInitialTabId={decodedPayloadInitialTabId}
              descriptionVisibility={decodedPayloadDescriptionVisibility}
            />
            <SecretKeyInputComponent
              languageCode={languageCode}
              dictionary={dictionary.signatureVerification}
            />
          </>
        }
        warnings={null}
      />
    </>
  );
};
