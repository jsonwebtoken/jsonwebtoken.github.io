import { EncodingValues } from "@/features/common/values/encoding.values";
import { describe, expect, test } from "vitest";
import { TokenEncoderService } from "@/features/encoder/services/token-encoder.service";
import {
  DefaultTokensValues,
  DefaultTokenWithSecretModel,
} from "@/features/common/values/default-tokens.values";
import { EncoderResult } from "@/features/common/models/encoder-result.model";

describe("processSymmetricSecretKey", () => {
  describe("should encode a JWT for SYMMETRIC type with HMAC algorithm", () => {
    test("should return an object with a jwt and signingErrors should be null", async () => {
      const params = {
        header: JSON.stringify({ alg: "HS256", typ: "JWT" }),
        payload: JSON.stringify({
          sub: "1234567890",
          name: "John Doe",
          admin: true,
          iat: 1516239022,
        }),
        symmetricSecretKey: (
          DefaultTokensValues.HS256 as DefaultTokenWithSecretModel
        ).secret,
        symmetricSecretKeyEncoding: EncodingValues.UTF8,
      };
      const result =
        await TokenEncoderService.processSymmetricSecretKey(params);

      expect(result.isOk()).toBe(true);
      expect(result.unwrapOr({})).toEqual({
        jwt: DefaultTokensValues.HS256.token,
        signingErrors: null,
      });
    });

    test("should return an object with a jwt and signingErrors should not be null", async () => {
      const params = {
        header: JSON.stringify({ alg: "HS256", typ: "JWT" }),
        payload: JSON.stringify({
          sub: "1234567890",
          name: "John Doe",
          admin: true,
          iat: 1516239022,
        }),
        symmetricSecretKey: "secret",
        symmetricSecretKeyEncoding: EncodingValues.UTF8,
      };
      const algSize = 256;
      const result =
        await TokenEncoderService.processSymmetricSecretKey(params);

      expect(result.isOk()).toBe(true);
      expect((result.unwrapOr({}) as EncoderResult).jwt).not.toBeNull();
      expect((result.unwrapOr({}) as EncoderResult).signingErrors).toEqual(
        [`A key of ${algSize} bits or larger MUST be used with HS${algSize} as specified on [RFC 7518](https://datatracker.ietf.org/doc/html/rfc7518#section-3.2).`]
      );
    });
  });
});
