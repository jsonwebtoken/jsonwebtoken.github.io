import styles from "./theme-picker.module.scss";
import { ThemePickerCodeValues } from "../../values/theme.values";

interface ThemePickerComponentProps {
  options: {
    code: ThemePickerCodeValues;
    icon: React.ReactNode;
    label: string;
  }[];
  selectedOptionCode: string;
  handleSelection: (value: ThemePickerCodeValues) => Promise<void>;
}

enum PicketListItemStateValues {
  INACTIVE = "INACTIVE",
  ACTIVE = "ACTIVE",
}

export const ThemePickerComponent: React.FC<ThemePickerComponentProps> = ({
  options,
  selectedOptionCode,
  handleSelection,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {options.map((option) => {
          return (
            <div
              key={option.code}
              className={styles.option}
              data-active={
                option.code === selectedOptionCode
                  ? PicketListItemStateValues.ACTIVE
                  : PicketListItemStateValues.INACTIVE
              }
              title={option.label}
              onClick={async () => {
                console.log(option.label)
                await handleSelection(option.code);
              }}
            >
              <span className={styles.option__icon}>{option.icon}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
