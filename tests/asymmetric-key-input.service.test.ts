import { describe, expect, test } from "vitest";
import { detectAsymmetricKeyFormat } from "@/features/common/services/asymmetric-key-input.service";
import { AsymmetricKeyFormatValues } from "@/features/common/values/asymmetric-key-format.values";

describe("detectAsymmetricKeyFormat", () => {
  test.each([
    [
      '{"kty":"EC","crv":"P-256","x":"x-coordinate","y":"y-coordinate"}',
      AsymmetricKeyFormatValues.JWK,
    ],
    [
      "-----BEGIN PUBLIC KEY-----\npublic key\n-----END PUBLIC KEY-----",
      AsymmetricKeyFormatValues.PEM,
    ],
    [
      "-----BEGIN PRIVATE KEY-----\nprivate key\n-----END PRIVATE KEY-----",
      AsymmetricKeyFormatValues.PEM,
    ],
  ])("detects %s", (value, expectedFormat) => {
    expect(detectAsymmetricKeyFormat(value)).toBe(expectedFormat);
  });

  test.each(["", "not a key", "{}", "[]", "{invalid"])(
    "does not guess the format of %j",
    (value) => {
      expect(detectAsymmetricKeyFormat(value)).toBeNull();
    },
  );
});
