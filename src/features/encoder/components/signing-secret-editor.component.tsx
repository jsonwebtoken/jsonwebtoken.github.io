import React, { ChangeEvent } from "react";
import { WidgetTextareaComponent } from "@/features/common/components/widget-textarea/widget-textarea.component";

interface SigningSecretEditorComponentProps {
  secret: string;
  handleSecretChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  headerErrors: string[] | null;
}

export const SigningSecretEditorComponent: React.FC<
  SigningSecretEditorComponentProps
> = ({ secret, handleSecretChange, headerErrors }) => {
  return (
    <WidgetTextareaComponent
      disabled={!!headerErrors && headerErrors.length > 0}
      name="secret"
      onChange={handleSecretChange}
      value={secret}
    />
  );
};
