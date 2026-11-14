import React, { ChangeEvent } from "react";
import { WidgetTextareaComponent } from "@/features/common/components/widget-textarea/widget-textarea.component";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-json";
import { EditorComponent } from "@/features/common/components/code-editor/editor.component";
import { AsymmetricKeyFormatValues } from "@/features/common/values/asymmetric-key-format.values";

interface SignatureVerificationPublicKeyInputComponentProps {
  publicKey: string;
  publicKeyFormat: AsymmetricKeyFormatValues;
  handlePublicKeyChange: (value: string) => void;
  placeholder: string;
}

export const SignatureVerificationPublicKeyInputComponent: React.FC<
  SignatureVerificationPublicKeyInputComponentProps
> = ({
  publicKey,
  publicKeyFormat,
  handlePublicKeyChange,
  placeholder,
}) => {
  if (publicKeyFormat === AsymmetricKeyFormatValues.JWK) {
    return (
      <EditorComponent
        value={publicKey}
        onValueChange={handlePublicKeyChange}
        highlight={(code) => highlight(code, languages.json, "json")}
        padding="1rem"
        placeholder={placeholder}
        style={{
          fontFamily: '"Roboto Mono", monospace',
          fontSize: 14,
          lineHeight: 1.4,
          border: "none",
          outline: "none",
        }}
      />
    );
  }

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    handlePublicKeyChange(event.target.value);
  };

  return (
    <WidgetTextareaComponent
      onChange={handleChange}
      placeholder={placeholder}
      value={publicKey}
    ></WidgetTextareaComponent>
  );
};
