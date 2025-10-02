import React, { useEffect, useState } from "react";
import { ClaimDescriptionVisibilityValues } from "@/features/common/values/claim-description-visibility.values";
import { getButtonsUiDictionary } from "@/features/localization/services/ui-language-dictionary.service";
import { useDebuggerStore } from "@/features/debugger/services/debugger.store";
import Cookies from "js-cookie";
import {
  DECODED_HEADER_DESCRIPTION_KEY,
  DECODED_PAYLOAD_DESCRIPTION_KEY,
} from "@/features/decoder/config/decoder.config";
import {
  CardToolbarButtonComponent,
  CardToolbarButtonComponentProps,
} from "@/features/common/components/card-toolbar-button/card-toolbar-button.component";
import { EyeOpenIcon } from "../../icons/eye-open/eye-open-icon";
import { EyeCloseIcon } from "../../icons/eye-close/eye-close-icon";

interface CardToolbarDescriptionButtonComponentProps
  extends Omit<CardToolbarButtonComponentProps, "variant"> {
  languageCode: string;
  initialVisibility: ClaimDescriptionVisibilityValues;
  outputType: "header" | "payload";
}

export const CardToolbarDescriptionButtonComponent: React.FC<
  CardToolbarDescriptionButtonComponentProps
> = ({ languageCode, initialVisibility, outputType, ...props }) => {
  const dictionary = getButtonsUiDictionary(languageCode);
  const setDescriptionVisibility$ = useDebuggerStore((state) =>
    outputType === "header"
      ? state.setDecodedHeaderDescriptionVisibility$
      : state.setDecodedPayloadDescriptionVisibility$
  );
  const descriptionVisibility$ = useDebuggerStore((state) =>
    outputType === "header"
      ? state.decodedHeaderDescriptionVisibility$
      : state.decodedPayloadDescriptionVisibility$
  );

  const [descVisibility, setDescVisibility] =
    useState<ClaimDescriptionVisibilityValues>(initialVisibility);

  const hideDescription = () => {
    setDescriptionVisibility$(ClaimDescriptionVisibilityValues.HIDDEN);

    Cookies.set(
      outputType === "header"
        ? DECODED_HEADER_DESCRIPTION_KEY
        : DECODED_PAYLOAD_DESCRIPTION_KEY,
      ClaimDescriptionVisibilityValues.HIDDEN,
      {
        secure: true,
      }
    );

    setDescriptionVisibility$(ClaimDescriptionVisibilityValues.HIDDEN);
  };

  const showDescription = () => {
    setDescriptionVisibility$(ClaimDescriptionVisibilityValues.VISIBLE);

    Cookies.set(
      outputType === "header"
        ? DECODED_HEADER_DESCRIPTION_KEY
        : DECODED_PAYLOAD_DESCRIPTION_KEY,
      ClaimDescriptionVisibilityValues.VISIBLE,
      {
        secure: true,
      }
    );

    setDescriptionVisibility$(ClaimDescriptionVisibilityValues.VISIBLE);
  };

  useEffect(() => {
    if (descriptionVisibility$) {
      setDescVisibility(descriptionVisibility$);
    }
  }, [descriptionVisibility$]);

  return (
    <CardToolbarButtonComponent
      {...props}
      variant="standard"
      tooltipText={
        descVisibility === ClaimDescriptionVisibilityValues.VISIBLE
          ? dictionary.hideDetailsButton.label
          : dictionary.showDetailsButton.label
      }
      onPress={
        descVisibility === ClaimDescriptionVisibilityValues.VISIBLE
          ? hideDescription
          : showDescription
      }
    >
      {descVisibility === ClaimDescriptionVisibilityValues.VISIBLE ? (
        <EyeCloseIcon />
      ) : (
        <EyeOpenIcon />
      )}
    </CardToolbarButtonComponent>
  );
};
