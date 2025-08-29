import React from "react";
import { getButtonsUiDictionary } from "@/features/localization/services/ui-language-dictionary.service";
import {
  CardToolbarButtonComponent,
  CardToolbarButtonComponentProps,
} from "@/features/common/components/card-toolbar-button/card-toolbar-button.component";
import { ClearIcon } from "../../icons/clear/clear-icon";

interface CardToolbarClearButtonComponentProps
  extends Omit<CardToolbarButtonComponentProps, "variant"> {
  languageCode: string;
}

export const CardToolbarClearButtonComponent: React.FC<
  CardToolbarClearButtonComponentProps
> = ({ languageCode, ...props }) => {
  const dictionary = getButtonsUiDictionary(languageCode);

  return (
    <CardToolbarButtonComponent
      {...props}
      variant="standard"
      tooltipText={dictionary.clearButton.label}
    >
      <ClearIcon />
    </CardToolbarButtonComponent>
  );
};
