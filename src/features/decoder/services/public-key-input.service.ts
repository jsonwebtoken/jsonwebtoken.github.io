import {
  parseStringIntoValidJsonObject,
  stringifyJsonObject,
} from "@/features/common/services/jwt.service";
import { AsymmetricKeyFormatValues } from "@/features/common/values/asymmetric-key-format.values";

export const formatPublicKeyInput = (
  value: string,
  format: AsymmetricKeyFormatValues,
): string => {
  const trimmedValue = value.trim();

  if (format !== AsymmetricKeyFormatValues.JWK) {
    return trimmedValue;
  }

  const parseResult = parseStringIntoValidJsonObject(trimmedValue);

  if (parseResult.isErr()) {
    return trimmedValue;
  }

  const stringifyResult = stringifyJsonObject(parseResult.value);

  return stringifyResult.isOk() ? stringifyResult.value : trimmedValue;
};
