import React from "react";
import { ProgressBar } from "react-aria-components";
import styles from "./spinner.module.scss";

export const Spinner = () => {
  return (
    <ProgressBar aria-label="Loading…" isIndeterminate>
      {() => (
        <div className={styles.circular__spinner}>
          <svg className={styles.spinner__svg} viewBox="0 0 20 20">
            <circle
              className={styles.spinner__circle}
              cx="10"
              cy="10"
              r="8"
              fill="none"
              strokeWidth="4"
            />
          </svg>
        </div>
      )}
    </ProgressBar>
  );
};
