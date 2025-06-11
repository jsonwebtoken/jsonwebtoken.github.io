import React, { ChangeEvent } from "react";
import { WidgetTextareaComponent } from "@/features/common/components/widget-textarea/widget-textarea.component";

interface SigningPrivateKeyEditorComponentProps {
  privateKey: string;
  handlePrivateKeyChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  headerErrors: string[] | null;
  placeholder: string;
}

export const SigningPrivateKeyEditorComponent: React.FC<
  SigningPrivateKeyEditorComponentProps
> = ({ privateKey, handlePrivateKeyChange, headerErrors, placeholder }) => {
  return (
    <WidgetTextareaComponent
      disabled={headerErrors ? headerErrors.length > 0 : false}
      rows={5}
      name="private-key"
      onChange={handlePrivateKeyChange}
      placeholder={placeholder}
      value={privateKey}
    ></WidgetTextareaComponent>
  );
};
