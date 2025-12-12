"use client";

import React, { useEffect, useState } from "react";
import { TokenDecoderComponent } from "@/features/decoder/components/token-decoder.component";
import { TokenEncoderComponent } from "@/features/encoder/components/token-encoder.component";
import { ClaimDescriptionVisibilityValues } from "@/features/common/values/claim-description-visibility.values";
import { HomeDictionaryModel } from "@/features/localization/models/home-dictionary.model";
import { useDebuggerStore } from "@/features/debugger/services/debugger.store";
import { DebuggerToolbarComponent } from "@/features/debugger/components/debugger-toolbar/debugger-toolbar.component";
import { DebuggerModeValues } from "@/features/common/values/debugger-mode.values";
import { DebuggerWidgetValues } from "@/features/common/values/debugger-widget.values";
import { DebuggerSwitchComponent } from "@/features/debugger/components/debugger-switch/debugger-switch.component";
import { DebuggerFeedbackComponent } from "@/features/debugger/components/debugger-feedback/debugger-feedback.component";
import styles from "./debugger-widget.module.scss";
import { dataTestidDictionary } from "@/libs/testing/data-testid.dictionary";

interface DebuggerWidgetComponentProps {
  languageCode: string;
  decodedHeaderInitialTabId: string;
  decodedPayloadInitialTabId: string;
  decodedHeaderDescriptionVisibility: ClaimDescriptionVisibilityValues;
  decodedPayloadDescriptionVisibility: ClaimDescriptionVisibilityValues;
  decoderDictionary: HomeDictionaryModel["decoder"];
  encoderDictionary: HomeDictionaryModel["encoder"];
  // debuggerInitialMode: DebuggerModeValues;
}

export const DebuggerWidgetComponent: React.FC<
  DebuggerWidgetComponentProps
> = ({
  languageCode,
  decodedHeaderDescriptionVisibility: initialDecodedHeaderDescriptionVisibility,
  decodedHeaderInitialTabId,
  decodedPayloadDescriptionVisibility:
    initialDecodedPayloadDescriptionVisibility,
  decodedPayloadInitialTabId,
  decoderDictionary,
  encoderDictionary,
  // debuggerInitialMode,
}) => {
  const activeWidget$ = useDebuggerStore((state) => state.activeWidget$);
  const mode$ = useDebuggerStore((state) => state.mode$);
  const setMode$ = useDebuggerStore((state) => state.setMode$);

  const decodedHeaderTabId$ = useDebuggerStore(
    (state) => state.decodedHeaderTabId$,
  );
  const decodedPayloadTabId$ = useDebuggerStore(
    (state) => state.decodedPayloadTabId$,
  );
  const decodedHeaderDescriptionVisibility$ = useDebuggerStore(
    (state) => state.decodedHeaderDescriptionVisibility$,
  );
  const decodedPayloadDescriptionVisibility$ = useDebuggerStore(
    (state) => state.decodedPayloadDescriptionVisibility$,
  );

  const [mode, setMode] = useState<DebuggerModeValues>(
    DebuggerModeValues.UNIFIED,
  );
  const [decodedHeaderTabId, setDecodedHeaderTabId] = useState<string>(
    decodedHeaderInitialTabId,
  );
  const [decodedPayloadTabId, setDecodedPayloadTabId] = useState<string>(
    decodedPayloadInitialTabId,
  );
  const [
    decodedHeaderDescriptionVisibility,
    setDecodedHeaderDescriptionVisibility,
  ] = useState<ClaimDescriptionVisibilityValues>(
    initialDecodedHeaderDescriptionVisibility,
  );
  const [
    decodedPayloadDescriptionVisibility,
    setDecodedPayloadDescriptionVisibility,
  ] = useState<ClaimDescriptionVisibilityValues>(
    initialDecodedPayloadDescriptionVisibility,
  );

  useEffect(() => {
    if (decodedHeaderTabId$ === null) {
      return;
    }

    setDecodedHeaderTabId(decodedHeaderTabId$);
  }, [decodedHeaderTabId$]);

  useEffect(() => {
    if (decodedPayloadTabId$ === null) {
      return;
    }

    setDecodedPayloadTabId(decodedPayloadTabId$);
  }, [decodedPayloadTabId$]);

  useEffect(() => {
    if (decodedHeaderDescriptionVisibility$ === null) {
      return;
    }

    setDecodedHeaderDescriptionVisibility(decodedHeaderDescriptionVisibility$);
  }, [decodedHeaderDescriptionVisibility$]);

  useEffect(() => {
    if (decodedPayloadDescriptionVisibility$ === null) {
      return;
    }

    setDecodedPayloadDescriptionVisibility(
      decodedPayloadDescriptionVisibility$,
    );
  }, [decodedPayloadDescriptionVisibility$]);

  // useEffect(() => {
  //   setMode$(debuggerInitialMode, activeWidget$);
  // }, []);

  // useEffect(() => {
  //   if (!mode$) {
  //     return;
  //   }
  //
  //   setMode(mode$);
  //
  //   const sanitizedDebuggerModeValue = getSanitizedDebuggerModeValues(mode$);
  //
  //   if (sanitizedDebuggerModeValue) {
  //     Cookies.set(DEBUGGER_MODE_KEY, sanitizedDebuggerModeValue, {
  //       secure: true,
  //     });
  //   }
  // }, [debuggerInitialMode, mode$]);

  if (mode === DebuggerModeValues.UNIFIED) {
    return (
      <div
        className={styles.container}
        data-mode={mode}
        data-testid={dataTestidDictionary.debugger.id}
      >
        <DebuggerToolbarComponent
          mode={mode}
          decoderDictionary={decoderDictionary}
          encoderDictionary={encoderDictionary}
        />
        {activeWidget$ === DebuggerWidgetValues.DECODER && (
          <TokenDecoderComponent
            headlineConfig={{ isVisible: false }}
            languageCode={languageCode}
            dictionary={decoderDictionary}
            decodedHeaderInitialTabId={decodedHeaderTabId}
            decodedPayloadInitialTabId={decodedPayloadTabId}
            decodedHeaderDescriptionVisibility={
              decodedHeaderDescriptionVisibility
            }
            decodedPayloadDescriptionVisibility={
              decodedPayloadDescriptionVisibility
            }
          />
        )}
        {activeWidget$ === DebuggerWidgetValues.ENCODER && (
          <TokenEncoderComponent
            headlineConfig={{ isVisible: false }}
            languageCode={languageCode}
            dictionary={encoderDictionary}
          />
        )}
        <DebuggerFeedbackComponent languageCode={languageCode} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <TokenDecoderComponent
        headlineConfig={{
          isVisible: true,
          actions: (
            <DebuggerSwitchComponent
              mode={mode}
              widget={DebuggerWidgetValues.DECODER}
              label={decoderDictionary.syncButton.label}
              compactLabel={decoderDictionary.syncButton.compactLabel}
            />
          ),
        }}
        languageCode={languageCode}
        dictionary={decoderDictionary}
        decodedHeaderInitialTabId={decodedHeaderTabId}
        decodedPayloadInitialTabId={decodedPayloadTabId}
        decodedHeaderDescriptionVisibility={decodedHeaderDescriptionVisibility}
        decodedPayloadDescriptionVisibility={
          decodedPayloadDescriptionVisibility
        }
      />
      <DebuggerFeedbackComponent languageCode={languageCode} />
      <TokenEncoderComponent
        headlineConfig={{
          isVisible: true,
          actions: (
            <DebuggerSwitchComponent
              mode={mode}
              widget={DebuggerWidgetValues.ENCODER}
              label={encoderDictionary.syncButton.label}
              compactLabel={encoderDictionary.syncButton.compactLabel}
            />
          ),
        }}
        languageCode={languageCode}
        dictionary={encoderDictionary}
      />
    </div>
  );
};
