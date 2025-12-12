import React, { useEffect, useState } from "react";
import styles from "./token-encoder-encoding-format-picker.module.scss";
import { EncodingValues } from "@/features/common/values/encoding.values";
import { useEncoderStore } from "@/features/encoder/services/encoder.store";
import { getPickersUiDictionary } from "@/features/localization/services/ui-language-dictionary.service";
import { DebuggerPickerComponent } from "@/features/common/components/debugger-picker/debugger-picker.component";

interface TokenEncoderEncodingFormatPickerComponentProps {
  languageCode: string;
}

export const TokenEncoderEncodingFormatPickerComponent: React.FC<
  TokenEncoderEncodingFormatPickerComponentProps
> = ({ languageCode }) => {
  const dictionary = getPickersUiDictionary(languageCode);

  const handleSymmetricSecretKeyEncodingChange = useEncoderStore(
    (state) => state.handleSymmetricSecretKeyEncodingChange,
  );
  const controlledSymmetricSecretKey = useEncoderStore(
    (state) => state.controlledSymmetricSecretKey,
  );

  const [secretEncodingFormat, setSecretEncodingFormat] =
    useState<EncodingValues>(EncodingValues.UTF8);

  useEffect(() => {
    if (controlledSymmetricSecretKey) {
      setSecretEncodingFormat(controlledSymmetricSecretKey.encoding);
    }
  }, [controlledSymmetricSecretKey]);

  const onSecretEncodingFormatChange = (value: string) => {
    setSecretEncodingFormat(value as EncodingValues);

    handleSymmetricSecretKeyEncodingChange(value as EncodingValues);
  };

  return (
    <div className={styles.container}>
      <DebuggerPickerComponent
        languageCode={languageCode}
        label={dictionary.encodingFormatPicker.label}
        handleSelection={onSecretEncodingFormatChange}
        selectedOptionCode={{
          value: secretEncodingFormat,
          label: secretEncodingFormat,
        }}
        options={[
          {
            value: EncodingValues.UTF8,
            label: EncodingValues.UTF8,
          },
          {
            value: EncodingValues.BASE64URL,
            label: EncodingValues.BASE64URL,
          },
        ]}
        placeholder={null}
        minWidth="6.125rem"
      />
    </div>
  );
};
