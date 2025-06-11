import React from "react";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-json";
import { EditorComponent } from "@/features/common/components/code-editor/editor.component";

interface PayloadEditorComponentProps {
  payload: string;
  handlePayloadChange: (newValue: string) => void;
}

export const PayloadEditorComponent: React.FC<PayloadEditorComponentProps> = ({
  payload,
  handlePayloadChange,
}) => {
  if (payload === null) {
    return;
  }

  return (
    <EditorComponent
      value={payload}
      onValueChange={handlePayloadChange}
      highlight={(code) => highlight(code, languages.json, "json")}
      padding="1rem"
      style={{
        fontFamily: '"Roboto Mono", monospace',
        fontSize: 14,
        lineHeight: 1.4,
        border: "none",
        outline: "none",
      }}
    />
  );
};
