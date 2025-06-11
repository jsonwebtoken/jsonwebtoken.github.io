"use client";

import React from "react";
import { EditorComponent } from "@/features/common/components/code-editor/editor.component";

interface EncodedTokenComponentProps {
  encodedToken: string;
}

export const EncodedTokenComponent: React.FC<EncodedTokenComponentProps> = ({
  encodedToken,
}) => {
  const handleTokenEditorChange = async () => void 0;

  return (
    <EditorComponent
      value={encodedToken}
      readOnly={true}
      onValueChange={handleTokenEditorChange}
      highlight={(code) => {
        const parts = code.split(".");
        const lastIndex = parts.length - 1;

        return parts.map((part, index) => {
          const text = part.trim();
          const withDot = index !== lastIndex;

          if (index === 0) {
            return (
              <React.Fragment key={index}>
                <span className="ace_header">{text}</span>
                {withDot && <span className="ace_dot">.</span>}
              </React.Fragment>
            );
          }

          if (index === 1) {
            return (
              <React.Fragment key={index}>
                <span className="ace_payload">{text}</span>
                {withDot && <span className="ace_dot">.</span>}
              </React.Fragment>
            );
          }

          if (index === 2) {
            return (
              <React.Fragment key={index}>
                <span className="ace_signature">{text}</span>
                {withDot && <span className="ace_dot">.</span>}
              </React.Fragment>
            );
          }

          return (
            <React.Fragment key={index}>
              <span className="ace_text">{text}</span>
              {withDot && <span className="ace_dot">.</span>}
            </React.Fragment>
          );
        });
      }}
      padding={16}
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
