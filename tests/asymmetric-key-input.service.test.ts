import { describe, expect, test } from "vitest";
import {
  detectAsymmetricKeyFormat,
  toPrivateKeyFormat,
} from "@/features/common/services/asymmetric-key-input.service";
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

describe("toPrivateKeyFormat", () => {
  test("maps JWKS, which has no private key form, to PEM", () => {
    expect(toPrivateKeyFormat(AsymmetricKeyFormatValues.JWKS)).toBe(
      AsymmetricKeyFormatValues.PEM,
    );
  });

  test.each([AsymmetricKeyFormatValues.PEM, AsymmetricKeyFormatValues.JWK])(
    "keeps %s unchanged",
    (format) => {
      expect(toPrivateKeyFormat(format)).toBe(format);
    },
  );

  test("keeps an unset format unset", () => {
    expect(toPrivateKeyFormat(undefined)).toBeUndefined();
  });
});
