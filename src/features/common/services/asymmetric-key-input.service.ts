import {
  parseStringIntoValidJsonObject,
  stringifyJsonObject,
} from "@/features/common/services/jwt.service";
import { AsymmetricKeyFormatValues } from "@/features/common/values/asymmetric-key-format.values";

export const isJsonKeyFormat = (format: AsymmetricKeyFormatValues): boolean =>
  format === AsymmetricKeyFormatValues.JWK ||
  format === AsymmetricKeyFormatValues.JWKS;

export const detectAsymmetricKeyFormat = (
  value: string,
): AsymmetricKeyFormatValues | null => {
  const trimmedValue = value.trim();

  if (trimmedValue.startsWith("-----BEGIN ")) {
    return AsymmetricKeyFormatValues.PEM;
  }

  const parseResult = parseStringIntoValidJsonObject(trimmedValue);

  if (parseResult.isOk() && "kty" in parseResult.value) {
    return AsymmetricKeyFormatValues.JWK;
  }

  return null;
};

export const formatAsymmetricKeyInput = (
  value: string,
  format: AsymmetricKeyFormatValues,
): string => {
  const trimmedValue = value.trim();

  if (!isJsonKeyFormat(format)) {
    return trimmedValue;
  }

  const parseResult = parseStringIntoValidJsonObject(trimmedValue);

  if (parseResult.isErr()) {
    return trimmedValue;
  }

  const stringifyResult = stringifyJsonObject(parseResult.value);

  return stringifyResult.isOk() ? stringifyResult.value : trimmedValue;
};
