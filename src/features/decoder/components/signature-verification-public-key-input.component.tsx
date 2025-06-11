import React, { ChangeEvent } from "react";
import { WidgetTextareaComponent } from "@/features/common/components/widget-textarea/widget-textarea.component";

interface SignatureVerificationPublicKeyInputComponentProps {
  publicKey: string;
  handlePublicKeyChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
}

export const SignatureVerificationPublicKeyInputComponent: React.FC<
  SignatureVerificationPublicKeyInputComponentProps
> = ({ publicKey, handlePublicKeyChange, placeholder }) => {
  return (
    <WidgetTextareaComponent
      onChange={handlePublicKeyChange}
      placeholder={placeholder}
      value={publicKey}
    ></WidgetTextareaComponent>
  );
};
