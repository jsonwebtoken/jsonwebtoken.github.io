import { LibraryFilterLabel } from "@/features/libraries/models/library-filters.model";

export interface DebuggerPickerOptionModel {
  value: any;
  label: string | LibraryFilterLabel;
  isDisabled?: boolean;
}
