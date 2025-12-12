import React, { useRef } from "react";
import styles from "./card-toolbar.module.scss";
import { useToolbar } from "@react-aria/toolbar";

interface DebuggerToolbarComponentProps {
  ariaLabel: string;
  children: React.ReactNode;
}

export const CardToolbarComponent: React.FC<DebuggerToolbarComponentProps> = ({
  ariaLabel,
  children,
}) => {
  const divRef = useRef<HTMLDivElement | null>(null);

  const { toolbarProps } = useToolbar({ "aria-label": ariaLabel }, divRef);

  return (
    <div ref={divRef} {...toolbarProps} className={styles.container}>
      {children}
    </div>
  );
};
