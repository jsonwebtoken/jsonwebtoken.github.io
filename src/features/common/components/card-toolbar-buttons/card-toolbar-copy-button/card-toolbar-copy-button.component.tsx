import React, { PropsWithChildren, useState } from "react";
import {
  CardToolbarButtonComponent,
  CardToolbarButtonComponentProps,
} from "@/features/common/components/card-toolbar-button/card-toolbar-button.component";
import { getButtonsUiDictionary } from "@/features/localization/services/ui-language-dictionary.service";

interface CardToolbarCopyButtonComponentProps
  extends Omit<PropsWithChildren<CardToolbarButtonComponentProps>, "variant"> {
  languageCode: string;
  value: string;
}

export const CardToolbarCopyButtonComponent: React.FC<
  CardToolbarCopyButtonComponentProps
> = ({ languageCode, value, isDisabled, ...props }) => {
  const dictionary = getButtonsUiDictionary(languageCode);

  const [isCopied, setIsCopied] = useState(false);

  const resetCopy = () => {
    if (isCopied) {
      setTimeout(() => setIsCopied(false), 500);
    }
  };
  const copyValue = async () => {
    await navigator.clipboard.writeText(value);
    setIsCopied(true);

    setTimeout(() => setIsCopied(false), 500);
  };
  return (
    <CardToolbarButtonComponent
      {...props}
      isDisabled={isDisabled || !value}
      onPress={copyValue}
      onBlur={resetCopy}
      variant="standard"
    >
      {isCopied
        ? dictionary.copyButton.done.label
        : dictionary.copyButton.idle.label}
    </CardToolbarButtonComponent>
  );
};
