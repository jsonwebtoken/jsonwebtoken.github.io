import React, { PropsWithChildren } from "react";
import styles from "./card-message.module.scss";
import ReactMarkdown from "react-markdown";
import { clsx } from "clsx";
import { MonoFont } from "@/libs/theme/fonts";

export const CardMessageComponent: React.FC<PropsWithChildren> = ({
  children,
}) => {
  if (typeof children !== "string") {
    return null;
  }

  return (
    <ReactMarkdown
      components={{
        span: ({ node, ...props }) => {
          return <span className={styles.span} {...props} />;
        },
        p: ({ node, ...props }) => {
          return <p className={styles.p} {...props} />;
        },
        strong: ({ node, ...props }) => {
          return <strong className={styles.strong} {...props} />;
        },
        code: ({ node, ...props }) => {
          return (
            <code
              className={clsx(styles.code, MonoFont.className)}
              {...props}
            />
          );
        },
        a: ({ node, ...props }) => {
          return (
            <a
              className={styles.a}
              {...props}
              target="_blank"
              rel="noopener noreferrer"
            />
          );
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
};
