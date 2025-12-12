import React, { useId } from "react";
import styles from "./debugger-switch.module.scss";
import { useDebuggerStore } from "@/features/debugger/services/debugger.store";
import { clsx } from "clsx";
import { MonoFont } from "@/libs/theme/fonts";
import { DebuggerModeValues } from "@/features/common/values/debugger-mode.values";
import { testingDictionary } from "@/features/common/testing.dictionary";
import { DebuggerWidgetValues } from "@/features/common/values/debugger-widget.values";

interface DebuggerSwitchComponentProps {
  mode: DebuggerModeValues;
  widget: DebuggerWidgetValues;
  label: string;
  compactLabel: string;
}

export const DebuggerSwitchComponent: React.FC<DebuggerSwitchComponentProps> = (
  props,
) => {
  const ariaId = useId();
  const { mode, widget, label, compactLabel } = props;

  const setMode$ = useDebuggerStore((state) => state.setMode$);

  const toggleSwitch = () => {
    if (mode === DebuggerModeValues.SPLIT) {
      setMode$(DebuggerModeValues.UNIFIED, widget);
    }

    if (mode === DebuggerModeValues.UNIFIED) {
      setMode$(DebuggerModeValues.SPLIT, widget);
    }
  };

  return (
    <div
      aria-label={testingDictionary.decoder.widget.toolbar.label}
      className={styles.container}
    >
      <div id={ariaId} className={clsx(MonoFont.className, styles.label)}>
        <span className={styles.compactLabel}>{compactLabel}</span>
        <span className={styles.fullLabel}>{label}</span>
      </div>
      <label className={styles.switch}>
        <input
          aria-labelledby={ariaId}
          type="checkbox"
          checked={mode === DebuggerModeValues.UNIFIED}
          onChange={toggleSwitch}
          aria-checked={mode === DebuggerModeValues.UNIFIED}
          role="switch"
          aria-label={testingDictionary.decoder.widget.toolbar.input.label}
        />
        <span className={clsx(styles.slider, styles.round)}></span>
      </label>
    </div>
  );
};
