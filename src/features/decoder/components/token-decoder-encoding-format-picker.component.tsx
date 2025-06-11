import React, { useEffect, useState } from "react";
import styles from "./token-decoder-encoding-format-picker.module.scss";
import { EncodingValues } from "@/features/common/values/encoding.values";
import { useDecoderStore } from "@/features/decoder/services/decoder.store";
import { getPickersUiDictionary } from "@/features/localization/services/ui-language-dictionary.service";
import { DebuggerPickerComponent } from "@/features/common/components/debugger-picker/debugger-picker.component";

interface TokenDecoderEncodingFormatPickerComponentProps {
  languageCode: string;
}

export const TokenDecoderEncodingFormatPickerComponent: React.FC<
  TokenDecoderEncodingFormatPickerComponentProps
> = ({ languageCode }) => {
  const dictionary = getPickersUiDictionary(languageCode);

  const handleSymmetricSecretKeyEncodingChange = useDecoderStore(
    (state) => state.handleSymmetricSecretKeyEncodingChange,
  );
  const controlledSymmetricSecretKey = useDecoderStore(
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
        minWidth="6.125rem"
        placeholder={null}
      />
    </div>
  );
};
