import React from "react";
import { safeJsonParse } from "@/features/common/services/utils";
import styles from "./claims.module.scss";
import { jwtClaimsDictionary } from "@/features/decoder/jwt-claims.dictionary";
import { ClaimComponent } from "@/features/decoder/components/claim.component";
import { ClaimDescriptionVisibilityValues } from "@/features/common/values/claim-description-visibility.values";

interface ClaimsComponentProps {
  decodedElement: string;
  descriptionVisibility: ClaimDescriptionVisibilityValues;
}

export const ClaimsComponent: React.FC<ClaimsComponentProps> = ({
  decodedElement,
  descriptionVisibility,
}) => {
  const notAvailableValue = "N/A";
  const safeJsonParseResult = safeJsonParse(decodedElement);

  if (safeJsonParseResult.isErr()) {
    return (
      <div className={styles.table}>
        <ClaimComponent
          key={notAvailableValue}
          field={notAvailableValue}
          value={notAvailableValue}
          description={notAvailableValue}
          descriptionVisibility={descriptionVisibility}
        />
      </div>
    );
  }

  if (
    !(
      typeof safeJsonParseResult.value === "object" &&
      !Array.isArray(safeJsonParseResult.value) &&
      safeJsonParseResult.value !== null
    )
  ) {
    return (
      <div className={styles.table}>
        <ClaimComponent
          key={notAvailableValue}
          field={notAvailableValue}
          value={notAvailableValue}
          description={notAvailableValue}
          descriptionVisibility={descriptionVisibility}
        />
      </div>
    );
  }

  const claims = Object.entries(safeJsonParseResult.value);

  if (claims.length === 0) {
    return (
      <div className={styles.table}>
        <ClaimComponent
          key={notAvailableValue}
          field={notAvailableValue}
          value={notAvailableValue}
          description={notAvailableValue}
          descriptionVisibility={descriptionVisibility}
        />
      </div>
    );
  }

  return (
    <div className={styles.table}>
      {claims.map((entry) => {
        const [key, value] = entry;
        const description = jwtClaimsDictionary[key];

        return (
          <ClaimComponent
            key={key}
            field={key}
            value={value}
            description={description}
            descriptionVisibility={descriptionVisibility}
          />
        );
      })}
    </div>
  );
};
