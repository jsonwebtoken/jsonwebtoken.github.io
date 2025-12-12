import React from "react";
import styles from "./widget-textarea.module.scss";
import { clsx } from "clsx";
import { MonoFont } from "@/libs/theme/fonts";

interface WidgetTextareaComponentProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const WidgetTextareaComponent: React.FC<WidgetTextareaComponentProps> = (
  props,
) => {
  return (
    <textarea
      {...props}
      className={clsx(MonoFont.className, styles.input)}
    ></textarea>
  );
};
