import React from "react";
import { StringValues } from "@/features/common/values/string.values";
import styles from "./token-decoder-signature-validation.module.scss";
import { clsx } from "clsx";
import { useDecoderStore } from "@/features/decoder/services/decoder.store";
import { JwtSignatureStatusValues } from "@/features/common/values/jwt-signature-status.values";
import { CardMessageComponent } from "@/features/common/components/card-message/card-message.component";
import { CheckIcon } from "@/features/common/components/icons/check/check-icon";

interface TokenDecoderSignatureValidationComponentProps {
  id: string;
}

export const TokenDecoderSignatureValidationComponent: React.FC<
  TokenDecoderSignatureValidationComponentProps
> = ({ id }) => {
  const signatureStatus$ = useDecoderStore((state) => state.signatureStatus);
  const signatureWarnings = useDecoderStore((state) => state.signatureWarnings);

  if (signatureStatus$ === JwtSignatureStatusValues.INVALID) {
    return (
      <div
        data-testid={`${id}__error`}
        role="status"
        className={clsx(styles.container, styles.invalid)}
      >
        {StringValues.editor.signatureInvalid}
      </div>
    );
  }

  if (signatureStatus$ === JwtSignatureStatusValues.VALID) {
    return (
      <div
        data-testid={`${id}__success`}
        role="status"
        className={clsx(styles.container, styles.valid)}
      >
        <CheckIcon />
        {StringValues.editor.signatureVerified}
      </div>
    );
  }

  if (
    signatureStatus$ === JwtSignatureStatusValues.WARNING &&
    signatureWarnings &&
    signatureWarnings.length > 0
  ) {
    return (
      <div
        data-testid={`${id}__warning`}
        role="status"
        className={clsx(styles.container, styles.warning)}
      >
        {signatureWarnings.map((warning, index) => (
          <CardMessageComponent key={index}>{warning}</CardMessageComponent>
        ))}
      </div>
    );
  }

  return null;
};
