import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./debugger-alg-picker.module.scss";
import { getPickersUiDictionary } from "@/features/localization/services/ui-language-dictionary.service";
import { useEncoderStore } from "@/features/encoder/services/encoder.store";
import {
  isEd25519Supported,
  isEd448Supported,
  isP521Supported,
} from "@/features/common/services/jwt.service";
import { useDecoderStore } from "@/features/decoder/services/decoder.store";
import { useDebuggerStore } from "@/features/debugger/services/debugger.store";
import { DebuggerWidgetValues } from "@/features/common/values/debugger-widget.values";
import { DebuggerPickerComponent } from "@/features/common/components/debugger-picker/debugger-picker.component";
import {
  algDictionary,
  jwsExampleAlgHeaderParameterValuesDictionary,
} from "@/features/common/values/jws-alg-header-parameter-values.dictionary";
import { useButton } from "@react-aria/button";
import { clsx } from "clsx";
import { PrimaryFont } from "@/libs/theme/fonts";
import { DebuggerPickerOptionModel } from "@/features/common/models/debugger-picker-option.model";

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
  const [canUseEs512, setCanUseEs512] = useState(false);
  const [canUseEd25519, setCanUseEd25519] = useState(false);
  const [canUseEd448, setCanUseEd448] = useState(false);

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

  const openPicker = () => {
    setPickerState(PickerStates.PICKING);
  };

  const closePicker = () => {
    setPickerState(PickerStates.IDLE);
  };

  useEffect(() => {
    (async function runEs512Check() {
      setCanUseEs512(await isP521Supported());
    })();

    (async function runEd25519Check() {
      setCanUseEd25519(await isEd25519Supported());
    })();

    (async function runEd448Check() {
      setCanUseEd448(await isEd448Supported());
    })();
  }, []);

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
    const digitalSignatureEntries = Object.entries(
      jwsExampleAlgHeaderParameterValuesDictionary.digitalSignature,
    );

    const asymmetricAlgOptions: DebuggerPickerOptionModel[] = [];

    for (let i = 0; i < digitalSignatureEntries.length; i++) {
      const entry = digitalSignatureEntries[i];

      const [key, value] = entry;

      if (key === algDictionary.ES512) {
        asymmetricAlgOptions.push({
          value: key,
          label: value.name,
          isDisabled: !canUseEs512,
        });

        continue;
      }

      if (key === algDictionary.Ed25519) {
        asymmetricAlgOptions.push({
          value: key,
          label: value.name,
          isDisabled: !canUseEd25519,
        });

        continue;
      }

      if (key === algDictionary.Ed448) {
        asymmetricAlgOptions.push({
          value: key,
          label: value.name,
          isDisabled: !canUseEd448,
        });

        continue;
      }

      asymmetricAlgOptions.push({
        value: key,
        label: value.name,
      });
    }

    return asymmetricAlgOptions;
  }, [canUseEd25519, canUseEd448, canUseEs512]);

  const algOptions = useMemo(() => {
    return [...noneAlgOptions, ...symmetricAlgOptions, ...asymmetricAlgOptions];
  }, [asymmetricAlgOptions, noneAlgOptions, symmetricAlgOptions]);

  return (
    <div role="region" aria-label={label} className={styles.picker}>
      {pickerState === PickerStates.IDLE && (
        <button
          role="button"
          className={clsx(styles.button, PrimaryFont.className)}
          onClick={openPicker}
        >
          {dictionary.exampleAlgPicker.label}
        </button>
      )}
      {pickerState === PickerStates.PICKING && (
        <>
          <DebuggerPickerComponent
            label={null}
            languageCode={languageCode}
            handleSelection={selectExample}
            selectedOptionCode={null}
            options={algOptions}
            placeholder={dictionary.exampleAlgPicker.defaultValue}
            minWidth={null}
          />
          <button
            {...buttonProps}
            aria-label={dictionary.exampleAlgPicker.closeButton.label}
            className={styles.closeButton}
            onClick={closePicker}
          >
            <span>+</span>
          </button>
        </>
      )}
    </div>
  );
};
