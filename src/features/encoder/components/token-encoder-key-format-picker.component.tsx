import React, { useEffect, useState } from "react";
import styles from "./token-encoder-key-format-picker.module.scss";
import { useEncoderStore } from "@/features/encoder/services/encoder.store";
import { getPickersUiDictionary } from "@/features/localization/services/ui-language-dictionary.service";
import { AsymmetricKeyFormatValues } from "@/features/common/values/asymmetric-key-format.values";
import { DebuggerPickerComponent } from "@/features/common/components/debugger-picker/debugger-picker.component";

interface TokenEncoderKeyFormatPickerComponentProps {
  languageCode: string;
}

export const TokenEncoderKeyFormatPickerComponent: React.FC<
  TokenEncoderKeyFormatPickerComponentProps
> = ({ languageCode }) => {
  const dictionary = getPickersUiDictionary(languageCode);

  const handlePrivateKeyFormatChange = useEncoderStore(
    (state) => state.handleAsymmetricPrivateKeyFormatChange
  );
  const controlledAsymmetricPrivateKey$ = useEncoderStore(
    (state) => state.controlledAsymmetricPrivateKey
  );

  const [keyFormat, setKeyFormat] = useState<AsymmetricKeyFormatValues>(
    AsymmetricKeyFormatValues.PEM
  );

  useEffect(() => {
    if (controlledAsymmetricPrivateKey$) {
      setKeyFormat(controlledAsymmetricPrivateKey$.format);
    }
  }, [controlledAsymmetricPrivateKey$]);

  const onPrivateKeyFormatChange = (value: string) => {
    setKeyFormat(value as AsymmetricKeyFormatValues);

    handlePrivateKeyFormatChange(value as AsymmetricKeyFormatValues);
  };

  return (
    <div className={styles.encoder__switch}>
      <div className={styles.container}>
        <div className={styles.picker}>
          <DebuggerPickerComponent
            languageCode={languageCode}
            label={dictionary.privateKeyFormatPicker.label}
            handleSelection={onPrivateKeyFormatChange}
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
      </div>
    </div>
  );
};
