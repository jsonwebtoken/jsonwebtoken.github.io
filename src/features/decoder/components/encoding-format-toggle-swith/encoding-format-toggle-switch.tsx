import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./encoding-format-toggle-switch.module.scss";
import { EncodingValues } from "@/features/common/values/encoding.values";
import { useDecoderStore } from "@/features/decoder/services/decoder.store";
import { getPickersUiDictionary } from "@/features/localization/services/ui-language-dictionary.service";
import { Switch } from "react-aria-components";
import clsx from "clsx";

interface EncodingFormatToggleSwitchComponentProps {
  languageCode: string;
}

export const EncodingFormatToggleSwitchComponent: React.FC<
  EncodingFormatToggleSwitchComponentProps
> = ({ languageCode }) => {
  const dictionary = getPickersUiDictionary(languageCode);

  const handleSymmetricSecretKeyEncodingChange = useDecoderStore(
    (state) => state.handleSymmetricSecretKeyEncodingChange
  );

  const onSecretEncodingFormatChange = (event: ChangeEvent<HTMLInputElement>) => {
      handleSymmetricSecretKeyEncodingChange(event.target.checked ? EncodingValues.BASE64URL : EncodingValues.UTF8);
  };

  return (
    <div className={styles.container}>
      <div className={styles.label}>
        <span className={styles.fullLabel}>Base64URL Encoded?</span>
      </div>
      <label className={styles.switch__container}>
        <input type="checkbox" role="switch" className={styles.input} onChange={onSecretEncodingFormatChange}/>
        <span
          className={clsx(
            styles.picker__round,
            styles.picker__slider
          )}
        ></span>
      </label>
    </div>
  );
};
