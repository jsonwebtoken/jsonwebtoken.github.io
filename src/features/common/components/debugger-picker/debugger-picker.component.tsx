import React, { useEffect, useState } from "react";
import styles from "./debugger-picker.module.scss";
import Select, { SingleValue } from "react-select";
import { DebuggerPickerOptionModel } from "@/features/common/models/debugger-picker-option.model";

interface PickerLabelProps {
  label: string | null;
}

const PickerLabel: React.FC<PickerLabelProps> = ({ label }) => {
  return (
    <div className={styles.picker__label}>
      <span className={styles.picker__fullName}>{label}</span>
    </div>
  );
};

interface DebuggerPickerComponentProps {
  label: string | null;
  languageCode: string;
  options: DebuggerPickerOptionModel[];
  selectedOptionCode: DebuggerPickerOptionModel | null;
  handleSelection: (value: string) => void;
  placeholder: string | null;
  minWidth: string | null;
}

export const DebuggerPickerComponent: React.FC<
  DebuggerPickerComponentProps
> = ({
  label,
  options,
  handleSelection,
  selectedOptionCode,
  placeholder,
  minWidth,
}) => {
  const [isClient, setIsClient] = useState(false);

  const handleChange = (selection: SingleValue<DebuggerPickerOptionModel>) => {
    if (!selection) {
      return;
    }

    handleSelection(selection.value);
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className={styles.picker} data-has-label={label !== null}>
        <PickerLabel label={label} />
        <div className="react-select-placeholder"></div>
      </div>
    );
  }

  return (
    <div className={styles.picker} data-has-label={label !== null}>
      {label && <PickerLabel label={label} />}
      <Select
        aria-label={"Debugger picker"}
        className="react-select-container"
        onChange={handleChange}
        value={selectedOptionCode}
        options={options}
        menuPortalTarget={document.body}
        classNamePrefix={"react-select"}
        isSearchable={false}
        placeholder={placeholder}
        styles={{
          control: (base) => ({
            ...base,
            minHeight: "1.75rem",
            height: "1.75rem",
            ...(minWidth ? { minWidth: minWidth } : {}),
          }),

          valueContainer: (base) => ({
            ...base,
            height: "1.75rem",
            padding: "0 8px",
          }),

          input: (base) => ({
            ...base,
            margin: "0px",
          }),
          indicatorSeparator: () => ({
            display: "none",
          }),
          indicatorsContainer: (base) => ({
            ...base,
            height: "1.75rem",
          }),
        }}
      ></Select>
    </div>
  );
};
