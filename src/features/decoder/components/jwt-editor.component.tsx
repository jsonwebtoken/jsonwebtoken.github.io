import React from "react";
import { EditorComponent } from "@/features/common/components/code-editor/editor.component";

interface JwtEditorComponentProps {
  token: string;
  handleJwtChange: (value: string) => void;
  autoFocus: boolean
}

export const JwtEditorComponent: React.FC<JwtEditorComponentProps> = ({
  token,
  autoFocus,
  handleJwtChange,
}) => {
  return (
    <EditorComponent
      aria-label="JWT editor input"
      value={token}
      autoFocus={autoFocus}
      focusOnWindowFocus={autoFocus}
      onValueChange={(code) => handleJwtChange(code)}
      highlight={(code) => {
        if (!code) {
          return (
            <React.Fragment>
              <span className="ace_text"> </span>
            </React.Fragment>
          );
        }

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
      padding="1rem"
      style={{
        fontFamily: '"Roboto Mono", monospace',
        fontSize: 14,
        lineHeight: 1.4,
        border: "none",
        outline: "none",
        minHeight: "4rem",
      }}
    />
  );
};
