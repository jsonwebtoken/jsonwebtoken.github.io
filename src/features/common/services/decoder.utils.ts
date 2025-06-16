import { ClaimDescriptionVisibilityValues } from "@/features/common/values/claim-description-visibility.values";

export const getSanitizedDescriptionVisibilityValue = (
  value: string | null,
): ClaimDescriptionVisibilityValues | null => {
  if (
    value === ClaimDescriptionVisibilityValues.VISIBLE ||
    value === ClaimDescriptionVisibilityValues.HIDDEN
  ) {
    return value;
  }

  return null;
};
