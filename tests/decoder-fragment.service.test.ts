import { AsymmetricKeyFormatValues } from "@/features/common/values/asymmetric-key-format.values";
import { parseDecoderFragment } from "@/features/decoder/services/decoder-fragment.service";
import { describe, expect, test } from "vitest";

describe("parseDecoderFragment", () => {
  test.each(["token", "id_token", "access_token", "value"])(
    "parses the %s token alias",
    (tokenParam) => {
      expect(
        parseDecoderFragment(`#${tokenParam}=header.payload.signature`),
      ).toEqual({
        jwt: "header.payload.signature",
      });
    },
  );

  test("parses a token after unrelated fragment parameters", () => {
    expect(
      parseDecoderFragment(
        "#foo=bar&returnTo=%2Faccount&token=header.payload.signature",
      ),
    ).toEqual({
      jwt: "header.payload.signature",
    });
  });

  test("uses the historical token alias priority", () => {
    expect(
      parseDecoderFragment(
        "#token=token&value=value&access_token=access&id_token=id",
      ),
    ).toEqual({
      jwt: "id",
    });
  });

  test("skips an empty higher-priority alias", () => {
    expect(
      parseDecoderFragment("#id_token=&access_token=access&token=token"),
    ).toEqual({
      jwt: "access",
    });
  });

  test("uses the first repeated token value", () => {
    expect(parseDecoderFragment("#token=first&token=second")).toEqual({
      jwt: "first",
    });
  });

  test("does not fall through to a later repeated value when the first is empty", () => {
    expect(parseDecoderFragment("#token=&token=second")).toEqual({});
  });

  test("decodes encoded reserved characters", () => {
    expect(
      parseDecoderFragment(
        "#token=header.payload.signature&publicKey=line%201%0Aline%2B2%26line%3D3",
      ),
    ).toEqual({
      jwt: "header.payload.signature",
      publicKey: "line 1\nline+2&line=3",
      publicKeyFormat: AsymmetricKeyFormatValues.PEM,
    });
  });

  test("infers JWK for a valid non-array JSON object", () => {
    const publicKey = JSON.stringify({
      kty: "RSA",
      e: "AQAB",
      n: "example",
    });
    const params = new URLSearchParams({
      token: "header.payload.signature",
      publicKey,
    });

    expect(parseDecoderFragment(`#${params.toString()}`)).toEqual({
      jwt: "header.payload.signature",
      publicKey,
      publicKeyFormat: AsymmetricKeyFormatValues.JWK,
    });
  });

  test.each([
    ["an invalid JSON value", "{invalid"],
    ["a JSON array", "[]"],
    ["JSON null", "null"],
    ["a JSON string", '"key"'],
  ])("infers PEM for %s", (_description, publicKey) => {
    const params = new URLSearchParams({
      token: "header.payload.signature",
      publicKey,
    });

    expect(parseDecoderFragment(`#${params.toString()}`)).toEqual({
      jwt: "header.payload.signature",
      publicKey,
      publicKeyFormat: AsymmetricKeyFormatValues.PEM,
    });
  });

  test("uses the first repeated public key value", () => {
    expect(
      parseDecoderFragment("#token=jwt&publicKey=first&publicKey=second"),
    ).toEqual({
      jwt: "jwt",
      publicKey: "first",
      publicKeyFormat: AsymmetricKeyFormatValues.PEM,
    });
  });

  test("does not fall through to a later repeated public key when the first is empty", () => {
    expect(
      parseDecoderFragment("#token=jwt&publicKey=&publicKey=second"),
    ).toEqual({
      jwt: "jwt",
    });
  });

  test("treats the publicKey parameter name as case-sensitive", () => {
    expect(parseDecoderFragment("#token=jwt&publickey=ignored")).toEqual({
      jwt: "jwt",
    });
  });

  test("parses and normalizes a legacy fragment with a PEM public key", () => {
    const publicKey =
      "-----BEGIN PUBLIC KEY-----\nline+one/line=two\n-----END PUBLIC KEY-----";
    const params = new URLSearchParams({
      "debugger-io?token": "header.payload.signature",
      publicKey,
      foo: "bar",
    });
    const result = parseDecoderFragment(`#${params.toString()}`);

    expect(result).toEqual({
      jwt: "header.payload.signature",
      publicKey,
      publicKeyFormat: AsymmetricKeyFormatValues.PEM,
      normalizedHash: `#${new URLSearchParams({
        token: "header.payload.signature",
        publicKey,
        foo: "bar",
      }).toString()}`,
    });
  });

  test("parses and normalizes a legacy fragment with a JWK", () => {
    const publicKey = JSON.stringify({
      kty: "EC",
      crv: "P-256",
      x: "example-x",
      y: "example-y",
    });
    const params = new URLSearchParams({
      "debugger-io?token": "header.payload.signature",
      publicKey,
    });
    const normalizedParams = new URLSearchParams({
      token: "header.payload.signature",
      publicKey,
    });

    expect(parseDecoderFragment(`#${params.toString()}`)).toEqual({
      jwt: "header.payload.signature",
      publicKey,
      publicKeyFormat: AsymmetricKeyFormatValues.JWK,
      normalizedHash: `#${normalizedParams.toString()}`,
    });
  });

  test("preserves repeated unrelated parameters when normalizing legacy syntax", () => {
    expect(
      parseDecoderFragment(
        "#foo=first&debugger-io?token=jwt&foo=second&publicKey=key",
      ),
    ).toEqual({
      jwt: "jwt",
      publicKey: "key",
      publicKeyFormat: AsymmetricKeyFormatValues.PEM,
      normalizedHash: "#token=jwt&publicKey=key&foo=first&foo=second",
    });
  });

  test("prefers a regular alias over legacy syntax without normalizing", () => {
    expect(
      parseDecoderFragment("#debugger-io?token=legacy&value=regular"),
    ).toEqual({
      jwt: "regular",
    });
  });

  test("does not normalize regular fragment syntax", () => {
    expect(parseDecoderFragment("#token=jwt")).toEqual({
      jwt: "jwt",
    });
  });

  test.each([
    "",
    "#",
    "#foo=bar",
    "#publicKey=key",
    "#token=",
    "#debugger-io?token=",
  ])("returns no decoder inputs for %j", (hash) => {
    expect(parseDecoderFragment(hash)).toEqual({});
  });

  test("does not parse query-string input", () => {
    expect(parseDecoderFragment("?token=jwt")).toEqual({});
  });
});
