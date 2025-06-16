import React, { ChangeEvent } from "react";
import { WidgetTextareaComponent } from "@/features/common/components/widget-textarea/widget-textarea.component";

interface SignatureVerificationSecretInputComponentProps {
  secret: string;
  handleSecretChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export const SignatureVerificationSecretInputComponent: React.FC<
  SignatureVerificationSecretInputComponentProps
> = ({ secret, handleSecretChange }) => {
  return (
    <WidgetTextareaComponent
      name="secret"
      onChange={handleSecretChange}
      value={secret}
    />
  );
};
