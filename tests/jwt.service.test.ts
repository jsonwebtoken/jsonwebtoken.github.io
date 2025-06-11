import { describe, expect, test } from "vitest";
import { DefaultTokensValues } from "@/features/common/values/default-tokens.values";
import { validateJwtFormat } from "@/features/common/services/jwt.service";
import { JwtTypeValues } from "@/features/common/values/jwt-type.values";

describe("validateJwtFormat", () => {
  const tokenHS256 = DefaultTokensValues.hs256.token;
  const tokenHS384 = DefaultTokensValues.hs384.token;
  const tokenHS512 = DefaultTokensValues.hs512.token;
  const tokenRS256 = DefaultTokensValues.rs256.token;
  const tokenRS384 = DefaultTokensValues.rs384.token;
  const tokenRS512 = DefaultTokensValues.rs512.token;
  const unsecured =
    "eyJhbGciOiJub25lIn0.eyJpc3MiOiJqb2UiLA0KICJleHAiOjEzMDA4MTkzODAsDQogImh0dHA6Ly9leGFtcGxlLmNvbS9pc19yb290Ijp0cnVlfQ.";

  const invalidToken1 = "a.b.c";
  const invalidToken2 = "a.b";
  const invalidToken3 = "a.";
  const invalidToken4 = "a";
  const invalidToken5 = "";
  const invalidToken6 = "abc.123.@@@";
  const invalidToken7 =
    "eyJhbGciOiJIUzI1NiJ9.dGVzdA.Yysa_W8n99vc_zcHxetNl4qo8gNx1qZu63I0H5UTYAI";
  const invalidToken8 =
    "eyJhbGciOiJIUzI1N9.dGVzdA.Yysa_W8n99vc_zcHxetNl4qo8gNx1qZu63I0H5UTYAI";
  const invalidToken9 =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c.abc";

  test("input is a valid JWT", () => {
    const result1 = validateJwtFormat(tokenHS256);
    expect(result1.isErr()).toBe(false);
    expect(result1.isOk()).toBe(true);
    result1.map((value) =>
      expect(value).toStrictEqual({
        signingAlgorithm: "HS256",
        type: JwtTypeValues.MACed,
        encoded: {
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
          header: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
          payload:
            "eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ",
          signature: "SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
        },
        decoded: {
          header: {
            alg: "HS256",
            typ: "JWT",
          },
          payload: {
            sub: "1234567890",
            name: "John Doe",
            iat: 1516239022,
          },
        },
      }),
    );

    // const result2 = validateJwtFormat(tokenHS384);
    // expect(result2.isErr()).toBe(false);
    // expect(result2.isOk()).toBe(true);
    // result2.map((value) => expect(value).toBe(tokenHS384));
    //
    // const result3 = validateJwtFormat(tokenHS512);
    // expect(result3.isErr()).toBe(false);
    // expect(result3.isOk()).toBe(true);
    // result3.map((value) => expect(value).toBe(tokenHS512));
    //
    const result4 = validateJwtFormat(tokenRS256);
    expect(result4.isErr()).toBe(false);
    expect(result4.isOk()).toBe(true);
    result4.map((value) =>
      expect(value).toStrictEqual({
        signingAlgorithm: "RS256",
        type: JwtTypeValues.DigitallySigned,
        encoded: {
          token:
            "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.NHVaYe26MbtOYhSKkoKYdFVomg4i8ZJd8_-RU8VNbftc4TSMb4bXP3l3YlNWACwyXPGffz5aXHc6lty1Y2t4SWRqGteragsVdZufDn5BlnJl9pdR_kdVFUsra2rWKEofkZeIC4yWytE58sMIihvo9H1ScmmVwBcQP6XETqYd0aSHp1gOa9RdUPDvoXQ5oqygTqVtxaDr6wUFKrKItgBMzWIdNZ6y7O9E0DhEPTbE9rfBo6KTFsHAZnMg4k68CDp2woYIaXbmYTWcvbzIuHO7_37GT79XdIwkm95QJ7hYC9RiwrV7mesbY4PAahERJawntho0my942XheVLmGwLMBkQ",
          header: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9",
          payload:
            "eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0",
          signature:
            "NHVaYe26MbtOYhSKkoKYdFVomg4i8ZJd8_-RU8VNbftc4TSMb4bXP3l3YlNWACwyXPGffz5aXHc6lty1Y2t4SWRqGteragsVdZufDn5BlnJl9pdR_kdVFUsra2rWKEofkZeIC4yWytE58sMIihvo9H1ScmmVwBcQP6XETqYd0aSHp1gOa9RdUPDvoXQ5oqygTqVtxaDr6wUFKrKItgBMzWIdNZ6y7O9E0DhEPTbE9rfBo6KTFsHAZnMg4k68CDp2woYIaXbmYTWcvbzIuHO7_37GT79XdIwkm95QJ7hYC9RiwrV7mesbY4PAahERJawntho0my942XheVLmGwLMBkQ",
        },
        decoded: {
          header: {
            alg: "RS256",
            typ: "JWT",
          },
          payload: {
            sub: "1234567890",
            name: "John Doe",
            admin: true,
            iat: 1516239022,
          },
        },
      }),
    );

    // const result5 = validateJwtFormat(tokenRS384);
    // expect(result5.isErr()).toBe(false);
    // expect(result5.isOk()).toBe(true);
    // result5.map((value) => expect(value).toBe(tokenRS384));
    //
    // const result6 = validateJwtFormat(tokenRS512);
    // expect(result6.isErr()).toBe(false);
    // expect(result6.isOk()).toBe(true);
    // result6.map((value) => expect(value).toBe(tokenRS512));
    //
    const result7 = validateJwtFormat(unsecured);
    expect(result7.isErr()).toBe(false);
    expect(result7.isOk()).toBe(true);
    result7.map((value) =>
      expect(value).toStrictEqual({
        signingAlgorithm: "none",
        type: JwtTypeValues.Unsecured,
        encoded: {
          token:
            "eyJhbGciOiJub25lIn0.eyJpc3MiOiJqb2UiLA0KICJleHAiOjEzMDA4MTkzODAsDQogImh0dHA6Ly9leGFtcGxlLmNvbS9pc19yb290Ijp0cnVlfQ.",
          header: "eyJhbGciOiJub25lIn0",
          payload:
            "eyJpc3MiOiJqb2UiLA0KICJleHAiOjEzMDA4MTkzODAsDQogImh0dHA6Ly9leGFtcGxlLmNvbS9pc19yb290Ijp0cnVlfQ",
          signature: "",
        },
        decoded: {
          header: {
            alg: "none",
          },
          payload: {
            iss: "joe",
            exp: 1300819380,
            "http://example.com/is_root": true,
          },
        },
      }),
    );
  });

  test("input is not a valid JWT", () => {
    const result1 = validateJwtFormat(invalidToken1);
    expect(result1.isErr()).toBe(true);
    expect(result1.isOk()).toBe(false);
    result1.mapErr((error) =>
      expect(error).toStrictEqual([
        "The first segment, the JWT header, and the second segment, the JWT payload, must represent a completely valid JSON object conforming to RFC 7159.",
      ]),
    );

    const result2 = validateJwtFormat(invalidToken2);
    expect(result2.isErr()).toBe(true);
    expect(result2.isOk()).toBe(false);
    result2.mapErr((error) =>
      expect(error).toStrictEqual([
        "The first segment, the JWT header, and the second segment, the JWT payload, must represent a completely valid JSON object conforming to RFC 7159.",
      ]),
    );

    const result3 = validateJwtFormat(invalidToken3);
    expect(result3.isErr()).toBe(true);
    expect(result3.isOk()).toBe(false);
    result3.mapErr((error) =>
      expect(error).toStrictEqual([
        "The second (payload) segment cannot be an empty string.",
      ]),
    );

    const result4 = validateJwtFormat(invalidToken4);
    expect(result4.isErr()).toBe(true);
    expect(result4.isOk()).toBe(false);
    result4.mapErr((error) =>
      expect(error).toStrictEqual([
        "The JWT must contain at least one period ('.') character. Source: https://datatracker.ietf.org/doc/html/rfc7519#section-7.2",
      ]),
    );

    const result5 = validateJwtFormat(invalidToken5);
    expect(result5.isErr()).toBe(true);
    expect(result5.isOk()).toBe(false);
    result5.mapErr((error) =>
      expect(error).toStrictEqual([
        "The JWT must contain at least one period ('.') character. Source: https://datatracker.ietf.org/doc/html/rfc7519#section-7.2",
      ]),
    );

    const result6 = validateJwtFormat(invalidToken6);
    expect(result6.isErr()).toBe(true);
    expect(result6.isOk()).toBe(false);
    result6.mapErr((error) =>
      expect(error).toStrictEqual([
        "Each JWT segment must be a base64url-encoded. The third (signature) segment isn't.",
      ]),
    );

    const result7 = validateJwtFormat(invalidToken7);
    expect(result7.isErr()).toBe(true);
    expect(result7.isOk()).toBe(false);
    result7.mapErr((error) =>
      expect(error).toStrictEqual([
        "The second segment, the JWT payload, must represent a completely valid JSON object conforming to RFC 7159.",
      ]),
    );

    const result8 = validateJwtFormat(invalidToken8);
    expect(result8.isErr()).toBe(true);
    expect(result8.isOk()).toBe(false);
    result8.mapErr((error) =>
      expect(error).toStrictEqual([
        "The first segment, the JWT header, and the second segment, the JWT payload, must represent a completely valid JSON object conforming to RFC 7159.",
      ]),
    );

    const result9 = validateJwtFormat(invalidToken9);
    expect(result9.isErr()).toBe(true);
    expect(result9.isOk()).toBe(false);
    result9.mapErr((error) =>
      expect(error).toStrictEqual([
        "This tool only supports a JWT that uses the JWS Compact Serialization, which must have three base64url-encoded segments separated by two period ('.') characters. Source: https://datatracker.ietf.org/doc/html/rfc7516#section-9",
      ]),
    );
  });
});
