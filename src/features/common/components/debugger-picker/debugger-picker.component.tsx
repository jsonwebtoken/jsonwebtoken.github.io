import React, { useEffect, useState } from "react";
import styles from "./debugger-picker.module.scss";
import Select, { SingleValue, OptionsOrGroups, GroupBase } from "react-select";
import { DebuggerPickerOptionModel } from "@/features/common/models/debugger-picker-option.model";
import { LibraryFilterLabel } from "@/features/libraries/models/library-filters.model";
import { isGroupedOptionsType } from "./utils";


interface PickerLabelProps {
  label: string | null;
}

const getGroupLabel = (
  options: OptionsOrGroups<
    DebuggerPickerOptionModel,
    GroupBase<DebuggerPickerOptionModel>
  >,
  selected: DebuggerPickerOptionModel
): LibraryFilterLabel | undefined => {
  if(!isGroupedOptionsType(options)) return undefined

  const group = (options as GroupBase<DebuggerPickerOptionModel>[]).find(
    (group) => group.options.some((opt) => opt.value === selected.value)
  );
  return group ? group.label as LibraryFilterLabel : undefined;
};

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
  options: OptionsOrGroups<
    DebuggerPickerOptionModel,
    GroupBase<DebuggerPickerOptionModel>
  >;
  isGrouped?: boolean;
  selectedOptionCode: DebuggerPickerOptionModel | null;
  handleSelection: (
    selection: string,
    parentLabel?: LibraryFilterLabel
  ) => void;
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

  const handleChange = (
    selection: SingleValue<DebuggerPickerOptionModel>
  ) => {
    if (!selection) {
      return;
    }
    const groupLabel = getGroupLabel(options, selection);
    handleSelection(selection.value, groupLabel);
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
