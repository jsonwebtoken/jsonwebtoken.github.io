import { describe, expect, test } from "vitest";
import { DefaultTokensValues } from "@/features/common/values/default-tokens.values";
import { validateJwtFormat } from "@/features/common/services/jwt.service";
import { JwtTypeValues } from "@/features/common/values/jwt-type.values";
import { DebuggerTaskValues } from "@/features/common/values/debugger-task.values";
import { DebuggerInputValues } from "@/features/common/values/debugger-input.values";

describe("validateJwtFormat", () => {
  const tokenHS256 = DefaultTokensValues.HS256.token;
  const tokenHS384 = DefaultTokensValues.HS384.token;
  const tokenHS512 = DefaultTokensValues.HS512.token;
  const tokenRS256 = DefaultTokensValues.RS256.token;
  const tokenRS384 = DefaultTokensValues.RS384.token;
  const tokenRS512 = DefaultTokensValues.RS512.token;
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
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c.abc";

  test("input is a valid JWT", () => {
    const result1 = validateJwtFormat(tokenHS256);
    expect(result1.isErr()).toBe(false);
    expect(result1.isOk()).toBe(true);
    result1.map((value) =>
      expect(value).toStrictEqual({
        decoded: {
          header: {
            alg: "HS256",
            typ: "JWT",
          },
          payload: {
            admin: true,
            sub: "1234567890",
            name: "John Doe",
            iat: 1516239022,
          },
        },
        signingAlgorithm: "HS256",
        type: JwtTypeValues.MACed,
      })
    );

    const result2 = validateJwtFormat(tokenHS384);
    expect(result2.isErr()).toBe(false);
    expect(result2.isOk()).toBe(true);
    result2.map((value) =>
      expect(value).toStrictEqual({
        type: JwtTypeValues.MACed,
        signingAlgorithm: "HS384",
        decoded: {
          header: { alg: "HS384", typ: "JWT" },
          payload: {
            sub: "1234567890",
            name: "John Doe",
            admin: true,
            iat: 1516239022,
          },
        },
      })
    );

    const result3 = validateJwtFormat(tokenHS512);
    expect(result3.isErr()).toBe(false);
    expect(result3.isOk()).toBe(true);
    result3.map((value) =>
      expect(value).toStrictEqual({
        type: JwtTypeValues.MACed,
        signingAlgorithm: "HS512",
        decoded: {
          header: { alg: "HS512", typ: "JWT" },
          payload: {
            sub: "1234567890",
            name: "John Doe",
            admin: true,
            iat: 1516239022,
          },
        },
      })
    );

    const result4 = validateJwtFormat(tokenRS256);
    expect(result4.isErr()).toBe(false);
    expect(result4.isOk()).toBe(true);
    result4.map((value) =>
      expect(value).toStrictEqual({
        signingAlgorithm: "RS256",
        type: JwtTypeValues.DigitallySigned,
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
      })
    );

    const result5 = validateJwtFormat(tokenRS384);
    expect(result5.isErr()).toBe(false);
    expect(result5.isOk()).toBe(true);
    result5.map((value) =>
      expect(value).toStrictEqual({
        type: JwtTypeValues.DigitallySigned,
        signingAlgorithm: "RS384",
        decoded: {
          header: { alg: "RS384", typ: "JWT" },
          payload: {
            sub: "1234567890",
            name: "John Doe",
            admin: true,
            iat: 1516239022,
          },
        },
      })
    );

    const result6 = validateJwtFormat(tokenRS512);
    expect(result6.isErr()).toBe(false);
    expect(result6.isOk()).toBe(true);
    result6.map((value) =>
      expect(value).toStrictEqual({
        type: JwtTypeValues.DigitallySigned,
        signingAlgorithm: "RS512",
        decoded: {
          header: { alg: "RS512", typ: "JWT" },
          payload: {
            sub: "1234567890",
            name: "John Doe",
            admin: true,
            iat: 1516239022,
          },
        },
      })
    );

    const result7 = validateJwtFormat(unsecured);
    expect(result7.isErr()).toBe(false);
    expect(result7.isOk()).toBe(true);
    result7.map((value) =>
      expect(value).toStrictEqual({
        signingAlgorithm: "none",
        type: JwtTypeValues.Unsecured,
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
      })
    );
  });

  test("input is not a valid JWT", () => {
    const result1 = validateJwtFormat(invalidToken1);
    expect(result1.isErr()).toBe(true);
    expect(result1.isOk()).toBe(false);
    result1.mapErr((error) =>
      expect(error).toStrictEqual({
        task: DebuggerTaskValues.DECODE,
        input: DebuggerInputValues.JWT,
        message: `This tool only supports a JWT that uses the JWS Compact Serialization, which must have three base64url-encoded segments separated by two period ('.') characters as defined on [RFC 7515](https://datatracker.ietf.org/doc/html/rfc7515#section-3.3)`,
      })
    );

    const result2 = validateJwtFormat(invalidToken2);
    expect(result2.isErr()).toBe(true);
    expect(result2.isOk()).toBe(false);
    result2.mapErr((error) =>
      expect(error).toStrictEqual({
        task: DebuggerTaskValues.DECODE,
        input: DebuggerInputValues.JWT,
        message: `This tool only supports a JWT that uses the JWS Compact Serialization, which must have three base64url-encoded segments separated by two period ('.') characters as defined on [RFC 7515](https://datatracker.ietf.org/doc/html/rfc7515#section-3.3)`,
      })
    );

    const result3 = validateJwtFormat(invalidToken3);
    expect(result3.isErr()).toBe(true);
    expect(result3.isOk()).toBe(false);
    result3.mapErr((error) =>
      expect(error).toStrictEqual({
        task: DebuggerTaskValues.DECODE,
        input: DebuggerInputValues.JWT,
        message: `This tool only supports a JWT that uses the JWS Compact Serialization, which must have three base64url-encoded segments separated by two period ('.') characters as defined on [RFC 7515](https://datatracker.ietf.org/doc/html/rfc7515#section-3.3)`,
      })
    );

    const result4 = validateJwtFormat(invalidToken4);
    expect(result4.isErr()).toBe(true);
    expect(result4.isOk()).toBe(false);
    result4.mapErr((error) =>
      expect(error).toStrictEqual({
        task: DebuggerTaskValues.DECODE,
        input: DebuggerInputValues.JWT,
        message: `This tool only supports a JWT that uses the JWS Compact Serialization, which must have three base64url-encoded segments separated by two period ('.') characters as defined on [RFC 7515](https://datatracker.ietf.org/doc/html/rfc7515#section-3.3)`,
      })
    );

    const result5 = validateJwtFormat(invalidToken5);
    expect(result5.isErr()).toBe(true);
    expect(result5.isOk()).toBe(false);
    result5.mapErr((error) =>
      expect(error).toStrictEqual({
        task: DebuggerTaskValues.DECODE,
        input: DebuggerInputValues.JWT,
        message: `JWT must not be empty.`,
      })
    );

    const result6 = validateJwtFormat(invalidToken6);
    expect(result6.isErr()).toBe(true);
    expect(result6.isOk()).toBe(false);
    result6.mapErr((error) =>
      expect(error).toStrictEqual({
        task: DebuggerTaskValues.DECODE,
        input: DebuggerInputValues.JWT,
        message: `This tool only supports a JWT that uses the JWS Compact Serialization, which must have three base64url-encoded segments separated by two period ('.') characters as defined on [RFC 7515](https://datatracker.ietf.org/doc/html/rfc7515#section-3.3)`,
      })
    );

    const result7 = validateJwtFormat(invalidToken7);
    expect(result7.isErr()).toBe(true);
    expect(result7.isOk()).toBe(false);
    result7.mapErr((error) =>
      expect(error).toStrictEqual({
        task: DebuggerTaskValues.DECODE,
        input: DebuggerInputValues.JWT,
        message: `The second segment, the JWT payload, must represent a completely valid JSON object conforming to [RFC 7519](https://datatracker.ietf.org/doc/html/rfc7519#section-3).`,
        data: {
          header: {
            alg: "HS256",
          },
          payload: "test",
        },
      })
    );

    const result8 = validateJwtFormat(invalidToken8);
    expect(result8.isErr()).toBe(true);
    expect(result8.isOk()).toBe(false);
    result8.mapErr((error) =>
      expect(error).toStrictEqual({
        task: DebuggerTaskValues.DECODE,
        input: DebuggerInputValues.JWT,
        message: `This tool only supports a JWT that uses the JWS Compact Serialization, which must have three base64url-encoded segments separated by two period ('.') characters as defined on [RFC 7515](https://datatracker.ietf.org/doc/html/rfc7515#section-3.3)`,
      })
    );

    const result9 = validateJwtFormat(invalidToken9);
    expect(result9.isErr()).toBe(true);
    expect(result9.isOk()).toBe(false);
    result9.mapErr((error) =>
      expect(error).toStrictEqual({
        task: DebuggerTaskValues.DECODE,
        input: DebuggerInputValues.JWT,
        message: `This tool only supports a JWT that uses the JWS Compact Serialization, which must have three base64url-encoded segments separated by two period ('.') characters as defined on [RFC 7515](https://datatracker.ietf.org/doc/html/rfc7515#section-3.3)`,
      })
    );
  });
});
