import React, { useEffect, useRef } from "react";
import styles from "./debugger-toolbar.module.scss";
import { BoxComponent } from "@/features/common/components/box/box.component";
import { useDebuggerStore } from "@/features/debugger/services/debugger.store";
import { clsx } from "clsx";
import { SecondaryFont } from "@/libs/theme/fonts";
import { HomeDictionaryModel } from "@/features/localization/models/home-dictionary.model";
import { DebuggerModeValues } from "@/features/common/values/debugger-mode.values";
import { DebuggerWidgetValues } from "@/features/common/values/debugger-widget.values";
import { dataTestidDictionary } from "@/libs/testing/data-testid.dictionary";

interface DebuggerToolbarComponentProps {
  decoderDictionary: HomeDictionaryModel["decoder"];
  encoderDictionary: HomeDictionaryModel["encoder"];
  mode: DebuggerModeValues;
}

export const DebuggerToolbarComponent: React.FC<
  DebuggerToolbarComponentProps
> = ({ decoderDictionary, encoderDictionary, mode }) => {
  const tabRefs = useRef<Array<HTMLLIElement | null>>([]);
  const activeWidget$ = useDebuggerStore((state) => state.activeWidget$);
  const setActiveWidget$ = useDebuggerStore((state) => state.setActiveWidget$);
  const isDecoder = activeWidget$ === DebuggerWidgetValues.DECODER;
  
  useEffect(() => {
    tabRefs.current[isDecoder ? 0 : 1]?.focus();
  }, [isDecoder]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLLIElement>) => {
    const { key } = e;

    if (key == "ArrowRight" || key == "ArrowLeft") {
      setActiveWidget$(
        isDecoder ? DebuggerWidgetValues.ENCODER : DebuggerWidgetValues.DECODER
      );
      e.preventDefault();
    }
    tabRefs.current[isDecoder ? 0 : 1]?.focus();
  };

  if (mode === DebuggerModeValues.UNIFIED) {
    return (
      <BoxComponent
        role="region"
        contentAs="section"
        contentClassName={styles.content}
      >
        <div role="toolbar" className={styles.toolbar}>
          <ul
            role="tablist"
            className={clsx(styles.tabs, SecondaryFont.className)}
          >
            <li
              role="tab"
              className={styles.titleTab}
              onClick={() => {
                setActiveWidget$(DebuggerWidgetValues.DECODER);
              }}
              onKeyDown={handleKeyDown}
              data-active={activeWidget$ === DebuggerWidgetValues.DECODER}
              data-testid={dataTestidDictionary.debugger.decoderTab.id}
              aria-selected={activeWidget$ === DebuggerWidgetValues.DECODER}
              aria-controls={`${DebuggerWidgetValues.DECODER}-panel`}
              ref={(el) => {
                tabRefs.current[0] = el;
              }}
              tabIndex={activeWidget$ === DebuggerWidgetValues.DECODER ? 0 : -1}
            >
              <span className={styles.titleTab__compactLabel}>
                {decoderDictionary.compactTitle}
              </span>
              <span className={styles.titleTab__fullLabel}>
                {decoderDictionary.title}
              </span>
            </li>
            <li
              role="tab"
              className={styles.titleTab}
              onKeyDown={handleKeyDown}
              onClick={() => {
                setActiveWidget$(DebuggerWidgetValues.ENCODER);
              }}
              data-active={activeWidget$ === DebuggerWidgetValues.ENCODER}
              data-testid={dataTestidDictionary.debugger.encoderTab.id}
              aria-selected={activeWidget$ === DebuggerWidgetValues.ENCODER}
              aria-controls={`${DebuggerWidgetValues.ENCODER}-panel`}
              ref={(el) => {
                tabRefs.current[1] = el;
              }}
              tabIndex={activeWidget$ === DebuggerWidgetValues.ENCODER ? 0 : -1}
            >
              <span className={styles.titleTab__compactLabel}>
                {encoderDictionary.compactTitle}
              </span>
              <span className={styles.titleTab__fullLabel}>
                {encoderDictionary.title}
              </span>
            </li>
          </ul>
          {/*<DebuggerSwitchComponent*/}
          {/*  mode={mode}*/}
          {/*  widget={activeWidget$}*/}
          {/*  label={encoderDictionary.unsyncButton.label}*/}
          {/*  compactLabel={encoderDictionary.unsyncButton.compactLabel}*/}
          {/*/>*/}
        </div>
      </BoxComponent>
    );
  }

  return null;
};
