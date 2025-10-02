import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./encoding-format-toggle-switch.module.scss";
import { EncodingValues } from "@/features/common/values/encoding.values";
import { useDecoderStore } from "@/features/decoder/services/decoder.store";
import { getPickersUiDictionary } from "@/features/localization/services/ui-language-dictionary.service";
import { Switch } from "react-aria-components";
import clsx from "clsx";
import { useEncoderStore } from "@/features/encoder/services/encoder.store";

interface EncodingFormatToggleSwitchComponentProps {
  languageCode: string;
  isEncoding?: boolean;
}

export const EncodingFormatToggleSwitchComponent: React.FC<
  EncodingFormatToggleSwitchComponentProps
> = ({ languageCode, isEncoding = false }) => {
  const dictionary = getPickersUiDictionary(languageCode);

  const handleSymmetricSecretKeyEncodingChangeDe = useDecoderStore(
    (state) => state.handleSymmetricSecretKeyEncodingChange
  );

  const handleSymmetricSecretKeyEncodingChangeEn = useEncoderStore(
    (state) => state.handleSymmetricSecretKeyEncodingChange
  );

  const onSecretEncodingFormatChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    if (isEncoding) {
      handleSymmetricSecretKeyEncodingChangeEn(
        event.target.checked ? EncodingValues.BASE64URL : EncodingValues.UTF8
      );
      return;
    }
    handleSymmetricSecretKeyEncodingChangeDe(
      event.target.checked ? EncodingValues.BASE64URL : EncodingValues.UTF8
    );
  };

  return (
    <div className={clsx(styles.base_switch, isEncoding && styles.encoder)}>
      <div className={styles.container}>
        <div className={styles.label}>
          <span className={styles.fullLabel}>Base64URL Encoded?</span>
        </div>
        <label className={styles.switch__container}>
          <input
            type="checkbox"
            role="switch"
            className={styles.input}
            onChange={onSecretEncodingFormatChange}
          />
          <span
            className={clsx(styles.picker__round, styles.picker__slider)}
          ></span>
        </label>
      </div>
    </div>
  );
};
