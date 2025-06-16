import { HeroModalStateValues } from "@/features/home/values/hero-modal-state.values";

export const getSanitizedHeroModalStateValue = (
  value: string | null,
): HeroModalStateValues | null => {
  if (
    value === HeroModalStateValues.CLOSED ||
    value === HeroModalStateValues.OPEN
  ) {
    return value;
  }

  return null;
};
