import { describe, expect, test } from "vitest";
import { formatPublicKeyInput } from "@/features/decoder/services/public-key-input.service";
import { AsymmetricKeyFormatValues } from "@/features/common/values/asymmetric-key-format.values";

describe("formatPublicKeyInput", () => {
  test("formats valid JWK objects", () => {
    expect(
      formatPublicKeyInput(
        '{"kty":"RSA","n":"modulus","e":"AQAB"}',
        AsymmetricKeyFormatValues.JWK,
      ),
    ).toBe(
      JSON.stringify(
        {
          kty: "RSA",
          n: "modulus",
          e: "AQAB",
        },
        null,
        2,
      ),
    );
  });

  test.each(["not JSON", "[]", "null"])(
    "leaves invalid JWK input unchanged: %s",
    (value) => {
      expect(
        formatPublicKeyInput(value, AsymmetricKeyFormatValues.JWK),
      ).toBe(value);
    },
  );

  test("leaves PEM input unchanged", () => {
    const pem =
      "-----BEGIN PUBLIC KEY-----\npublic key\n-----END PUBLIC KEY-----";

    expect(formatPublicKeyInput(pem, AsymmetricKeyFormatValues.PEM)).toBe(pem);
  });
});
