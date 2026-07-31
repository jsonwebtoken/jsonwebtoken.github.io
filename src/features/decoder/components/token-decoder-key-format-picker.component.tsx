import React from "react";
import styles from "./token-decoder-key-format-picker.module.scss";
import { useDecoderStore } from "@/features/decoder/services/decoder.store";
import { getPickersUiDictionary } from "@/features/localization/services/ui-language-dictionary.service";
import { AsymmetricKeyFormatValues } from "@/features/common/values/asymmetric-key-format.values";
import { DebuggerPickerComponent } from "@/features/common/components/debugger-picker/debugger-picker.component";

interface TokenDecoderKeyFormatPickerComponentProps {
  languageCode: string;
}

export const TokenDecoderKeyFormatPickerComponent: React.FC<
  TokenDecoderKeyFormatPickerComponentProps
> = ({ languageCode }) => {
  const dictionary = getPickersUiDictionary(languageCode);

  const handlePublicKeyFormatChange = useDecoderStore(
    (state) => state.handleAsymmetricPublicKeyFormatChange,
  );
  const keyFormat = useDecoderStore((state) => state.asymmetricPublicKeyFormat);

  const handlePrivateKeyFormatChange = (value: string) => {
    handlePublicKeyFormatChange(value as AsymmetricKeyFormatValues);
  };

  return (
    <div className={styles.container}>
      <DebuggerPickerComponent
        languageCode={languageCode}
        label={dictionary.publicKeyFormatPicker.label}
        handleSelection={handlePrivateKeyFormatChange}
        selectedOptionCode={{
          value: keyFormat,
          label: keyFormat,
        }}
        options={[
          {
            value: AsymmetricKeyFormatValues.PEM,
            label: AsymmetricKeyFormatValues.PEM,
          },
          {
            value: AsymmetricKeyFormatValues.JWK,
            label: AsymmetricKeyFormatValues.JWK,
          },
        ]}
        placeholder={null}
        minWidth="6.125rem"
      />
    </div>
  );
};
