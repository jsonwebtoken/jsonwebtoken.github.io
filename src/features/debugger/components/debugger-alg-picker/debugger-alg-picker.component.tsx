import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./debugger-alg-picker.module.scss";
import { getPickersUiDictionary } from "@/features/localization/services/ui-language-dictionary.service";
import { useEncoderStore } from "@/features/encoder/services/encoder.store";
import { useDecoderStore } from "@/features/decoder/services/decoder.store";
import { useDebuggerStore } from "@/features/debugger/services/debugger.store";
import { DebuggerWidgetValues } from "@/features/common/values/debugger-widget.values";
import { DebuggerPickerComponent } from "@/features/common/components/debugger-picker/debugger-picker.component";
import {
  isMlDsaAlgorithm,
  jwsExampleAlgHeaderParameterValuesDictionary,
  type MlDsaAlgorithm,
} from "@/features/common/values/jws-alg-header-parameter-values.dictionary";
import { useButton } from "@react-aria/button";
import { DebuggerPickerOptionModel } from "@/features/common/models/debugger-picker-option.model";
import { isMlDsaSupported } from "@/features/common/services/jwt.service";

enum PickerStates {
  IDLE = "IDLE",
  PICKING = "PICKING",
}

interface DebuggerAlgPickerComponentProps {
  languageCode: string;
  label: string;
}

export const DebuggerAlgPickerComponent: React.FC<
  DebuggerAlgPickerComponentProps
> = ({ languageCode, label }) => {
  const activeWidget$ = useDebuggerStore((state) => state.activeWidget$);

  return (
    <WidgetAlgPickerComponent
      languageCode={languageCode}
      widget={activeWidget$}
      label={label}
    />
  );
};

interface WidgetAlgPickerComponentProps {
  languageCode: string;
  widget: DebuggerWidgetValues;
  label: string;
}

export const WidgetAlgPickerComponent: React.FC<
  WidgetAlgPickerComponentProps
> = ({ languageCode, widget, label }) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const { buttonProps } = useButton(
    {
      elementType: "span",
      preventFocusOnPress: true,
    },
    buttonRef,
  );

  const [pickerState, setPickerState] = useState<PickerStates>(
    PickerStates.IDLE,
  );
  const [mlDsaSupport, setMlDsaSupport] = useState<{
    isLoading: boolean;
    algorithms: Record<MlDsaAlgorithm, boolean>;
  }>({
    isLoading: true,
    algorithms: {
      "ML-DSA-44": false,
      "ML-DSA-65": false,
      "ML-DSA-87": false,
    },
  });

  useEffect(() => {
    setMlDsaSupport({
      isLoading: false,
      algorithms: {
        "ML-DSA-44": isMlDsaSupported("ML-DSA-44"),
        "ML-DSA-65": isMlDsaSupported("ML-DSA-65"),
        "ML-DSA-87": isMlDsaSupported("ML-DSA-87"),
      },
    });
  }, []);

  const dictionary = getPickersUiDictionary(languageCode);

  const selectEncoderAlg$ = useEncoderStore(
    (state) => state.selectEncodingExample,
  );

  const selectDecoderAlg$ = useDecoderStore(
    (state) => state.selectDecodingExample,
  );

  const selectExample = (value: string) => {
    const algorithm = value;

    if (widget === DebuggerWidgetValues.DECODER) {
      selectDecoderAlg$(algorithm);
    }

    if (widget === DebuggerWidgetValues.ENCODER) {
      selectEncoderAlg$(algorithm);
    }

    setPickerState(PickerStates.IDLE);
  };

  const noneAlgOptions: DebuggerPickerOptionModel[] = useMemo(() => {
    return Object.entries(
      jwsExampleAlgHeaderParameterValuesDictionary.unsecured,
    ).map((entry) => {
      const [key, value] = entry;

      return {
        value: key,
        label: value.name,
      };
    });
  }, []);

  const symmetricAlgOptions: DebuggerPickerOptionModel[] = useMemo(() => {
    return Object.entries(jwsExampleAlgHeaderParameterValuesDictionary.mac).map(
      (entry) => {
        const [key, value] = entry;

        return {
          value: key,
          label: value.name,
        };
      },
    );
  }, []);

  const asymmetricAlgOptions: DebuggerPickerOptionModel[] = useMemo(() => {
    return Object.entries(
      jwsExampleAlgHeaderParameterValuesDictionary.digitalSignature,
    ).map((entry) => {
      const [key, value] = entry;

      return {
        value: key,
        label: value.name,
        isDisabled: isMlDsaAlgorithm(key) && !mlDsaSupport.algorithms[key],
      };
    });
  }, [mlDsaSupport.algorithms]);

  const algOptions = useMemo(() => {
    return [...noneAlgOptions, ...symmetricAlgOptions, ...asymmetricAlgOptions];
  }, [noneAlgOptions, asymmetricAlgOptions, symmetricAlgOptions]);

  return (
    <div
      role="region"
      aria-label={label}
      aria-busy={mlDsaSupport.isLoading}
      className={styles.alg_picker}
    >
      <div className={styles.container}>
        <div className={styles.picker}>
          <div className={styles.picker__label}>
            <label className={styles.picker__fullName}>
              {dictionary.exampleAlgPicker.label}
            </label>
          </div>
          <div className={styles.picker__container}>
            <DebuggerPickerComponent
              label={null}
              data-has-label={label !== null}
              languageCode={languageCode}
              handleSelection={selectExample}
              options={algOptions}
              placeholder={dictionary.exampleAlgPicker.defaultValue}
              minWidth={null}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
