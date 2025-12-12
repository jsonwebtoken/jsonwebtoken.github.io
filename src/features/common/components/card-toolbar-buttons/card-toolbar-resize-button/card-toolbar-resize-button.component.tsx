import React from "react";
import { getButtonsUiDictionary } from "@/features/localization/services/ui-language-dictionary.service";
import {
  DebuggerOutputModalValues,
  useDebuggerStore,
} from "@/features/debugger/services/debugger.store";
import MaximizeIcon from "@/features/common/assets/maximize.svg";
import MinimizeIcon from "@/features/common/assets/minimize.svg";
import {
  CardToolbarButtonComponent,
  CardToolbarButtonComponentProps,
} from "@/features/common/components/card-toolbar-button/card-toolbar-button.component";

interface CardToolbarResizeButtonComponentProps
  extends Omit<CardToolbarButtonComponentProps, "variant"> {
  languageCode: string;
  resizeId: string;
}

export const CardToolbarResizeButtonComponent: React.FC<
  CardToolbarResizeButtonComponentProps
> = ({ languageCode, resizeId, ...props }) => {
  const dictionary = getButtonsUiDictionary(languageCode);

  const outputModalState$ = useDebuggerStore(
    (state) => state.outputModalState$,
  );
  const openOutputModal$ = useDebuggerStore((state) => state.openOutputModal$);
  const closeOutputModal$ = useDebuggerStore(
    (state) => state.closeOutputModal$,
  );

  return (
    <CardToolbarButtonComponent
      {...props}
      variant="icon"
      aria-label={dictionary.maximizeButton.label}
      onPress={
        outputModalState$ === DebuggerOutputModalValues.CLOSED
          ? () =>
              setTimeout(() => {
                openOutputModal$(resizeId);
              }, 0)
          : () =>
              setTimeout(() => {
                closeOutputModal$();
              }, 0)
      }
    >
      {outputModalState$ === DebuggerOutputModalValues.CLOSED ? (
        <MaximizeIcon />
      ) : (
        <MinimizeIcon />
      )}
    </CardToolbarButtonComponent>
  );
};
