import React from "react";
import styles from "./claim.module.scss";
import { CardMessageComponent } from "@/features/common/components/card-message/card-message.component";
import {
  getTimeClaimProcessedValue,
  safeJsonStringify,
} from "@/features/common/services/utils";
import { clsx } from "clsx";
import { ClaimDescriptionVisibilityValues } from "@/features/common/values/claim-description-visibility.values";

const warningMessages: Record<string, string> = {
  time: "This value must be of type [`NumericDate`](https://datatracker.ietf.org/doc/html/rfc7519#section-2), representing seconds.",
};

const infoMessages: Record<string, string> = {
  time: "This value must be a [`NumericDate`](https://datatracker.ietf.org/doc/html/rfc7519#section-2) type, representing seconds.",
};

interface ClaimComponentProps {
  field: string;
  value: any;
  description?: string;
  descriptionVisibility?: ClaimDescriptionVisibilityValues;
}

export const ClaimComponent: React.FC<ClaimComponentProps> = ({
  field,
  value,
  description,
  descriptionVisibility,
}) => {
  let processedValue = value;
  let warningMessage: string | null = null;
  let infoMessage: string | null = null;
  let canRenderAsCode = false;

  if (
    field === "iat" ||
    field === "exp" ||
    field === "updated_at" ||
    field === "auth_time" ||
    field === "nbf"
  ) {
    const iatProcessResult = getTimeClaimProcessedValue(value);

    if (iatProcessResult.isOk()) {
      processedValue = `${value} (${iatProcessResult.value})`;
    }

    infoMessage = infoMessages["time"];
  }

  if (field === "exp") {
    const now = new Date();
    const exp = new Date(value * 1000);

    if (now > exp && warningMessages["exp"]) {
      warningMessage = warningMessages["exp"];
    }
  }

  if (field === "typ" && value !== "JWT") {
    warningMessage = warningMessages["typ"];
  }

  if (typeof value === "boolean") {
    processedValue = String(value);
  }

  if (typeof value === "object") {
    const safeJsonStringifyResult = safeJsonStringify(value);

    if (safeJsonStringifyResult.isErr()) {
      processedValue = `[object Object]`;
    }

    if (safeJsonStringifyResult.isOk()) {
      processedValue = safeJsonStringifyResult.value;
    }
  }

  if (typeof value === "object" && !Array.isArray(value) && value !== null) {
    const safeJsonStringifyResult = safeJsonStringify(value, null, 2);

    if (safeJsonStringifyResult.isOk()) {
      processedValue = safeJsonStringifyResult.value;
      canRenderAsCode = true;
    }
  }

  return (
    <>
      <div className={styles.row}>
        <var className={clsx(styles.cell, styles.field)}>{field}</var>
        <p
          className={clsx(styles.cell, styles.value)}
          data-full-width={
            !description ||
            descriptionVisibility === ClaimDescriptionVisibilityValues.HIDDEN
          }
        >
          {canRenderAsCode ? (
            <pre className={styles.value__code}>{processedValue}</pre>
          ) : (
            <span className={styles.value__text}>{processedValue}</span>
          )}
        </p>
        {descriptionVisibility === ClaimDescriptionVisibilityValues.VISIBLE &&
          description && (
            <div className={clsx(styles.cell, styles.description)}>
              <CardMessageComponent>{description}</CardMessageComponent>
            </div>
          )}
      </div>
      {warningMessage && (
        <div className={styles.row}>
          <div
            className={clsx(styles.cell, styles.message)}
            data-type="warning"
          >
            <CardMessageComponent>{warningMessage}</CardMessageComponent>
          </div>
        </div>
      )}
      {infoMessage && (
        <div className={styles.row}>
          <div className={clsx(styles.cell, styles.message)} data-type="info">
            <CardMessageComponent>{infoMessage}</CardMessageComponent>
          </div>
        </div>
      )}
    </>
  );
};
