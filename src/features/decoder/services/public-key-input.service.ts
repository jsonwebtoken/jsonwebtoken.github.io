import { detectAsymmetricKeyFormat } from "@/features/common/services/asymmetric-key-input.service";
import { isJwksInput } from "@/features/common/services/jwks.service";
import { AsymmetricKeyFormatValues } from "@/features/common/values/asymmetric-key-format.values";

export { formatAsymmetricKeyInput as formatPublicKeyInput } from "@/features/common/services/asymmetric-key-input.service";

export const detectPublicKeyFormat = (
  value: string,
): AsymmetricKeyFormatValues | null =>
  isJwksInput(value)
    ? AsymmetricKeyFormatValues.JWKS
    : detectAsymmetricKeyFormat(value);
