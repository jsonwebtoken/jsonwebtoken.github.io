import React, { useEffect, useId, useRef, useState } from "react";
import styles from "./ribbon-picker.module.scss";
import clsx from "clsx";
import { getLocalizedPrimaryFont } from "@/libs/theme/fonts";
import { useCloseElement } from "@/features/common/hooks/use-close-element";
import { ChevronIconComponent } from "@/features/common/components/bars/ribbon/assets/chevron-icon.component";

enum PickerStateValues {
  OPEN = "OPEN",
  CLOSED = "CLOSED",
}

interface PickerLabelProps {
  icon: React.ReactNode;
  label: string | null;
  compactLabel: string | null;
}

const PickerLabel: React.FC<PickerLabelProps> = ({
  icon,
  label,
  compactLabel,
}) => {
  return (
    <div className={styles.picker__label}>
      <div aria-hidden={true} className={styles.picker__icon}>
        {icon}
      </div>
      {label && <span className={styles.picker__fullName}>{label}</span>}
      {compactLabel && (
        <span className={styles.picker__shortName}>{compactLabel}</span>
      )}
      <span aria-hidden={true}>
        <ChevronIconComponent />
      </span>
    </div>
  );
};

enum PicketListItemStateValues {
  INACTIVE = "INACTIVE",
  ACTIVE = "ACTIVE",
}

interface PickerListItemProps<T> {
  languageCode: string;
  option: { icon: React.ReactNode | null; label: string | null; code: T };
  compactOption: {
    icon: React.ReactNode | null;
    label: string | null;
    code: T;
  };
  state: PicketListItemStateValues;
  handleClosing: () => void;
  handleSelection: (value: T) => Promise<void>;
}

const PickerListItem = <T,>({
  languageCode,
  option,
  compactOption,
  state,
  handleClosing,
  handleSelection,
}: PickerListItemProps<T>) => {
  return (
    <li
      role="menuitem"
      tabIndex={0}
      key={option.label}
      className={clsx(styles.picker__listItem)}
      data-active={state === PicketListItemStateValues.ACTIVE}
      onClick={async () => {
        if (state === PicketListItemStateValues.ACTIVE) {
          handleClosing();

          return;
        }

        await handleSelection(option.code);
      }}
    >
      <span
        className={clsx(
          styles.picker__listItem__label,
          styles.picker__fullName,
        )}
      >
        <span aria-hidden={true}>{option.icon}</span>
        <span className={getLocalizedPrimaryFont(languageCode)}>
          {option.label}
        </span>
      </span>
      <span
        className={clsx(
          styles.picker__listItem__label,
          styles.picker__shortName,
        )}
      >
        {compactOption.icon}
        <span className={getLocalizedPrimaryFont(languageCode)}>
          {compactOption.label}
        </span>
      </span>
    </li>
  );
};

interface RibbonPickerComponentProps<T> {
  icon: React.ReactNode;
  label: string | null;
  compactLabel: string | null;
  languageCode: string;
  options: {
    code: string;
    full: { icon: React.ReactNode; label: string | null; code: T };
    compact: { icon: React.ReactNode; label: string | null; code: T };
  }[];
  selectedOptionCode: string;
  handleSelection: (value: T) => Promise<void>;
  aria: {
    buttonLabel: string;
    listLabel: string;
  };
}

export const RibbonPickerComponent = <T,>({
  languageCode,
  icon,
  label,
  compactLabel,
  options,
  handleSelection,
  selectedOptionCode,
  aria,
}: RibbonPickerComponentProps<T>) => {
  const menuId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const [pickerState, setPickerState] = useState<PickerStateValues>(
    PickerStateValues.CLOSED,
  );

  const openPicker = () => {
    setPickerState(PickerStateValues.OPEN);
  };
  const closePicker = () => {
    setPickerState(PickerStateValues.CLOSED);
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLUListElement>) => {
    if (!listRef.current) {
      return;
    }

    const menuItems = listRef.current.querySelectorAll(`[role="menuitem"]`);

    if (menuItems.length === 0) {
      return;
    }

    const currentIndex = Array.from(menuItems).indexOf(
      document.activeElement as Element,
    );

    switch (e.key) {
      case "ArrowDown": {
        e.preventDefault();

        const nextIndex =
          currentIndex === menuItems.length - 1 ? 0 : currentIndex + 1;
        (menuItems[nextIndex] as HTMLElement).focus();

        return;
      }
      case "ArrowUp": {
        e.preventDefault();

        const nextIndex =
          currentIndex === 0 ? menuItems.length - 1 : currentIndex - 1;
        (menuItems[nextIndex] as HTMLElement).focus();

        return;
      }
      case "Tab": {
        e.preventDefault();
        closePicker();
        buttonRef.current?.focus();

        return;
      }
      case "Enter":
      case " ": {
        e.preventDefault();

        await handleSelection(options[currentIndex].code as T);

        closePicker();

        buttonRef.current?.focus();

        return;
      }
      case "Escape": {
        e.preventDefault();
        closePicker();
        buttonRef.current?.focus();
      }
    }
  };

  useEffect(() => {
    if (pickerState === PickerStateValues.OPEN && listRef.current) {
      const firstListItem = listRef.current.querySelector(`[role="menuitem"]`);

      if (firstListItem) {
        (firstListItem as HTMLElement).focus();
      }
    }
  }, [pickerState]);

  useCloseElement([buttonRef, listRef], closePicker);

  return (
    <button
      aria-label={aria.listLabel}
      aria-expanded={pickerState === PickerStateValues.OPEN}
      aria-controls={menuId}
      aria-haspopup={true}
      ref={buttonRef}
      className={styles.picker}
      data-has-label={label !== null}
      onClick={async (event) => {
        event.stopPropagation();

        if (pickerState === PickerStateValues.CLOSED) {
          openPicker();

          return;
        }

        closePicker();
      }}
    >
      <PickerLabel icon={icon} label={label} compactLabel={compactLabel} />
      {pickerState === PickerStateValues.OPEN && (
        <ul
          aria-label={aria.listLabel}
          id={menuId}
          role="menu"
          className={styles.picker__list}
          data-has-label={label !== null}
          ref={listRef}
          onKeyDown={handleKeyDown}
        >
          {options.map((option) => {
            return (
              <PickerListItem<T>
                key={option.code}
                languageCode={languageCode}
                option={option.full}
                compactOption={option.compact}
                state={
                  option.code === selectedOptionCode
                    ? PicketListItemStateValues.ACTIVE
                    : PicketListItemStateValues.INACTIVE
                }
                handleClosing={closePicker}
                handleSelection={handleSelection}
              />
            );
          })}
        </ul>
      )}
    </button>
  );
};
