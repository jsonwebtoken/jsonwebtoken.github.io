import { GroupBase, OptionsOrGroups } from "react-select";
import { DebuggerPickerOptionModel } from "../../models/debugger-picker-option.model";

export const isGroupedOptionsType = (
  options: OptionsOrGroups<
    DebuggerPickerOptionModel,
    GroupBase<DebuggerPickerOptionModel>
  >
): options is GroupBase<DebuggerPickerOptionModel>[] => {
    return "options" in options[0]
};
