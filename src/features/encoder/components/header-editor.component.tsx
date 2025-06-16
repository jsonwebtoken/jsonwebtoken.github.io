import React from "react";
import { highlight, languages } from "prismjs";

import "prismjs/components/prism-json";
import { EditorComponent } from "@/features/common/components/code-editor/editor.component";

interface HeaderEditorComponentProps {
  header: string;
  handleHeaderChange: (newValue: string) => void;
}

export const HeaderEditorComponent: React.FC<HeaderEditorComponentProps> = ({
  header,
  handleHeaderChange,
}) => {
  return (
    <EditorComponent
      value={header}
      onValueChange={handleHeaderChange}
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
