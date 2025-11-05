import { describe, it, expect, vi, beforeEach } from "vitest";
import { err, ok } from "neverthrow";
import { extractJwt } from "@/features/common/services/utils";
import {
  validateSymmetricSecret,
  validateAsymmetricKey,
  validateJwtFormat,
  isHmacAlg,
  isDigitalSignatureAlg,
  getStringifiedHeaderAndPayload,
  isSupportedAlg,
  parseStringIntoValidJsonObject,
  verifyMACedJwt,
} from "@/features/common/services/jwt.service";
import { downloadPublicKeyIfPossible } from "@/features/decoder/services/public-key.service";
import { AsymmetricKeyFormatValues } from "@/features/common/values/asymmetric-key-format.values";
import { EncodingValues } from "@/features/common/values/encoding.values";
import { JwtSignatureStatusValues } from "@/features/common/values/jwt-signature-status.values";
import { JwtTypeValues } from "@/features/common/values/jwt-type.values";
import { StringValues } from "@/features/common/values/string.values";
import {
  DebuggerInputValues
} from "@/features/common/values/debugger-input.values";
import { DebuggerTaskValues } from "@/features/common/values/debugger-task.values";
import { TokenDecoderService } from "@/features/decoder/services/token-decoder.service";

// Create Mocks
vi.mock("@/features/common/services/utils", () => ({
  extractJwt: vi.fn(),
}));

vi.mock("@/features/common/services/jwt.service", () => ({
  validateSymmetricSecret: vi.fn(),
  validateAsymmetricKey: vi.fn(),
  validateJwtFormat: vi.fn(),
  isHmacAlg: vi.fn(),
  isDigitalSignatureAlg: vi.fn(),
  getStringifiedHeaderAndPayload: vi.fn(),
  isSupportedAlg: vi.fn(),
  parseStringIntoValidJsonObject: vi.fn(),
  verifyMACedJwt: vi.fn(),
  verifyDigitallySignedJwt: vi.fn(),
}));

vi.mock("@/features/decoder/services/public-key.service", () => ({
  downloadPublicKeyIfPossible: vi.fn(),
}));

vi.mock("@/features/debugger/services/debugger.store", () => ({
  useDebuggerStore: vi.fn(() => ({
    getState: vi.fn(() => ({
      setStash$: vi.fn(),
    })),
  })),
}));

// Typed Mocks
const viExtractJwt = vi.mocked(extractJwt);
const viValidateSymmetricSecret = vi.mocked(validateSymmetricSecret);
const viValidateJwtFormat = vi.mocked(validateJwtFormat);
const viIsHmacAlg = vi.mocked(isHmacAlg);
const viIsDigitalSignatureAlg = vi.mocked(isDigitalSignatureAlg);
const viGetStringifiedHeaderAndPayload = vi.mocked(
  getStringifiedHeaderAndPayload,
);
const viIsSupportedAlg = vi.mocked(isSupportedAlg);
const viParseStringIntoValidJsonObject = vi.mocked(
  parseStringIntoValidJsonObject,
);
const viVerifyMACedJwt = vi.mocked(verifyMACedJwt);
const viDownloadPublicKeyIfPossible = vi.mocked(downloadPublicKeyIfPossible);

describe("handleJwtChange", () => {
  const mockJwt =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
  const mockParams = {
    alg: "HS256",
    symmetricSecretKey: "secret",
    symmetricSecretKeyEncoding: EncodingValues.UTF8,
    asymmetricPublicKey: "key",
    asymmetricPublicKeyFormat: AsymmetricKeyFormatValues.PEM,
    newToken: mockJwt,
  };

  const mockDecodedHeader = { alg: "HS256", typ: "JWT" };
  const mockDecodedPayload = {
    sub: "1234567890",
    name: "John Doe",
    iat: 1516239022,
  };
  const mockStringifiedHeader = '{ "alg": "HS256", "typ": "JWT" }';
  const mockStringifiedPayload =
    '{ "sub": "1234567890", "name": "John Doe", "iat": 1516239022 }';
  
  const mockCompactVerifyResult = {
    payload: new Uint8Array(1),
    protectedHeader: mockDecodedHeader,
  };

  // Reset mocks
  beforeEach(() => {
    vi.resetAllMocks();

    viExtractJwt.mockImplementation((t) => t);
    viIsHmacAlg.mockImplementation((alg) => alg.startsWith("HS"));
    viIsDigitalSignatureAlg.mockImplementation(
      (alg) => alg.startsWith("RS") || alg.startsWith("ES"),
    );
    viIsSupportedAlg.mockReturnValue(true);
    viValidateSymmetricSecret.mockResolvedValue(ok(new Uint8Array([1, 2, 3])));
    viGetStringifiedHeaderAndPayload.mockReturnValue(
      ok({
        header: mockStringifiedHeader,
        payload: mockStringifiedPayload,
      }),
    );
    viDownloadPublicKeyIfPossible.mockResolvedValue(
      err({
        message: "No jku/x5u/kid",
        task: DebuggerTaskValues.VERIFY,
        input: DebuggerInputValues.JWT,
      }),
    );
    viParseStringIntoValidJsonObject.mockReturnValue(
      err("Not JSON"),
    );
  });

  it("should return a warning if the new token is empty", async () => {
    const error = {
      message: "JWT must not be empty.",
      input: DebuggerInputValues.JWT,
      task: DebuggerTaskValues.DECODE,
    };

    viExtractJwt.mockReturnValue("");
    viValidateJwtFormat.mockReturnValue(err(error));

    const result = await TokenDecoderService.handleJwtChange({
      ...mockParams,
      newToken: " ",
    });

    expect(viExtractJwt).toHaveBeenCalledWith(" ");
    expect(result.jwt).toBe("");
    expect(result.signatureStatus).toBe(JwtSignatureStatusValues.WARNING);
    expect(result.signatureWarnings).toEqual([
      StringValues.editor.signatureWarning,
    ]);
    expect(result.decodedHeader).toBe("");
    expect(result.decodedPayload).toBe("");
  });

  it("should return decoding errors if JWT format is invalid", async () => {
    const error = {
      message: "Invalid format",
      input: DebuggerInputValues.JWT,
      task: DebuggerTaskValues.DECODE,
    };
    viValidateJwtFormat.mockReturnValue(err(error));

    const result = await TokenDecoderService.handleJwtChange(mockParams);

    expect(viValidateJwtFormat).toHaveBeenCalledWith(mockParams.newToken);
    expect(result.decodingErrors).toEqual([error.message]);
    expect(result.signatureStatus).toBe(JwtSignatureStatusValues.WARNING);
    expect(result.signatureWarnings).toEqual([
      StringValues.editor.signatureWarning,
    ]);
    expect(result.decodedHeader).toBe("");
    expect(result.decodedPayload).toBe("");
  });

  it("should show partial header/payload if format is invalid but data exists", async () => {
    const error = {
      message: "Invalid payload JSON",
      input: DebuggerInputValues.JWT,
      data: { header: mockDecodedHeader, payload: { sub: 123 } },
      task: DebuggerTaskValues.DECODE,
    };
    viValidateJwtFormat.mockReturnValue(err(error));

    viGetStringifiedHeaderAndPayload
      .mockImplementationOnce(
        () => ok({ header: mockStringifiedHeader, payload: "" }),
      ) // For header
      .mockImplementationOnce(() => ok({ header: "", payload: '{ "sub": 123 }' })); // For payload

    const result = await TokenDecoderService.handleJwtChange(mockParams);

    expect(result.decodingErrors).toEqual([error.message]);
    expect(result.alg).toBe(mockDecodedHeader.alg);
    expect(result.decodedHeader).toBe(mockStringifiedHeader);
    expect(result.decodedPayload).toBe('{ "sub": 123 }');
    expect(result.signatureStatus).toBe(JwtSignatureStatusValues.WARNING);
  });

  it("should handle Unsecured JWT (alg: none)", async () => {
    const unsecuredJwt = "eyJhbGciOiJub25lIn0.eyJzdWIiOiIxMjMifQ.";
    const decoded = { header: { alg: "none" }, payload: { sub: "123" } };
    viValidateJwtFormat.mockReturnValue(
      ok({
        type: JwtTypeValues.Unsecured,
        signingAlgorithm: "none",
        decoded: decoded,
      }),
    );
    viGetStringifiedHeaderAndPayload.mockReturnValue(
      ok({
        header: '{ "alg": "none" }',
        payload: '{ "sub": "123" }',
      }),
    );

    const result = await TokenDecoderService.handleJwtChange({
      ...mockParams,
      newToken: unsecuredJwt,
    });

    expect(result.alg).toBe("none");
    expect(result.decodedHeader).toBe('{ "alg": "none" }');
    expect(result.decodedPayload).toBe('{ "sub": "123" }');
    expect(result.signatureStatus).toBe(JwtSignatureStatusValues.WARNING);
    expect(result.signatureWarnings).toEqual([
      expect.stringContaining("Unsecured JWT"),
    ]);
    expect(result.verificationInputErrors).toEqual([
      "Can't verify signature for an Unsecured JWT.",
    ]);
  });

  it("should return VALID for a valid HMAC token and secret", async () => {
    viValidateJwtFormat.mockReturnValue(
      ok({
        type: JwtTypeValues.MACed,
        signingAlgorithm: mockDecodedHeader.alg,
        decoded: { header: mockDecodedHeader, payload: mockDecodedPayload },
      }),
    );
    viVerifyMACedJwt.mockResolvedValue(ok(mockCompactVerifyResult));

    const result = await TokenDecoderService.handleJwtChange(mockParams);

    expect(viValidateSymmetricSecret).toHaveBeenCalledWith({
      symmetricSecretKey: mockParams.symmetricSecretKey,
      symmetricSecretKeyEncoding: mockParams.symmetricSecretKeyEncoding,
    });
    expect(viVerifyMACedJwt).toHaveBeenCalledWith({
      jwt: mockParams.newToken,
      symmetricSecretKey: mockParams.symmetricSecretKey,
      symmetricSecretKeyEncoding: mockParams.symmetricSecretKeyEncoding,
    });
    expect(result.signatureStatus).toBe(JwtSignatureStatusValues.VALID);
    expect(result.verificationInputErrors).toBeNull();
    expect(result.symmetricSecretKey).toBe(mockParams.symmetricSecretKey);
    expect(result.controlledSymmetricSecretKey).toBeDefined();
  });

  it("should return INVALID for a valid HMAC token and *incorrect* secret", async () => {
    viValidateJwtFormat.mockReturnValue(
      ok({
        type: JwtTypeValues.MACed,
        signingAlgorithm: mockDecodedHeader.alg,
        decoded: { header: mockDecodedHeader, payload: mockDecodedPayload },
      }),
    );
    const error = {
      message: "Invalid signature",
      task: DebuggerTaskValues.VERIFY,
      input: DebuggerInputValues.KEY,
    };
    viVerifyMACedJwt.mockResolvedValue(err(error));

    const result = await TokenDecoderService.handleJwtChange(mockParams);

    expect(viVerifyMACedJwt).toHaveBeenCalled();
    expect(result.signatureStatus).toBe(JwtSignatureStatusValues.INVALID);
    expect(result.verificationInputErrors).toEqual([error.message]);
  });
});