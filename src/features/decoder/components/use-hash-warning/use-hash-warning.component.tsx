"use client";

import React from "react";
import styles from "./use-hash-warning.module.scss";
import {
  HashWarningVisibilityValues,
  useDecoderStore,
} from "@/features/decoder/services/decoder.store";
import { getWarningsUiDictionary } from "@/features/localization/services/ui-language-dictionary.service";

interface UseHashWarningComponentProps {
  languageCode: string;
}

export const UseHashWarningComponent: React.FC<
  UseHashWarningComponentProps
> = ({ languageCode }) => {
  const useHashWarningVisibility = useDecoderStore(
    (state) => state.useHashWarningVisibility,
  );
  const hideUseHashWarning = useDecoderStore(
    (state) => state.hideUseHashWarning,
  );

  const dictionary = getWarningsUiDictionary(languageCode);

  if (useHashWarningVisibility === HashWarningVisibilityValues.VISIBLE) {
    return (
      <div className={styles.backdrop} onClick={hideUseHashWarning}>
        <div className={styles.container}>
          <button className={styles.button} onClick={hideUseHashWarning}>
            +
          </button>
          <dictionary.useHash.Modal />
        </div>
      </div>
    );
  }

  return null;
};
