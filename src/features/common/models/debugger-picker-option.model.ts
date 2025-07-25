import { LibraryFilterLabel } from "@/features/libraries/models/library-filters.model";

export interface DebuggerPickerOptionModel {
  label: LibraryFilterLabel;
  options: {
    value: any;
    label: string;
    isDisabled?: boolean
  }[];
}
