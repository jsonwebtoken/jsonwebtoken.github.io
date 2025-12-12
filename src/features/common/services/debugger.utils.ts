import { DebuggerModeValues } from "@/features/common/values/debugger-mode.values";

export const getSanitizedDebuggerModeValues = (
  value: string | null,
): DebuggerModeValues | null => {
  if (
    value === DebuggerModeValues.SPLIT ||
    value === DebuggerModeValues.UNIFIED
  ) {
    return value;
  }

  return null;
};
