import { describe, expect, test } from "vitest";
import { extractJwt } from "@/features/common/services/utils";

describe("extractJwt", () => {
  test("should return empty string for empty input", () => {
    expect(extractJwt("")).toBe("");
    expect(extractJwt(null as unknown as string)).toBe("");
    expect(extractJwt(undefined as unknown as string)).toBe("");
  });

  test("should extract JWT from normal input", () => {
    const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
    expect(extractJwt(jwt)).toBe(jwt);
  });

  test("should extract JWT with leading/trailing whitespace", () => {
    const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
    const jwtWithSpaces = `  ${jwt}  `;
    expect(extractJwt(jwtWithSpaces)).toBe(jwt);
  });

  test("should compact multiline JWTs by removing all whitespace", () => {
    const multilineJWT = `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.
eyJjbGllbnRfaWQiOiJZekV6TUdkb01ISm5PSEJpT0cxaWJEaHlOVEE9IiwicmVzcG9uc2Vf
dHlwZSI6ImNvZGUiLCJzY29wZSI6ImludHJvc2NwZWN0X3Rva2VucywgcmV2b2tlX3Rva2Vu
cyIsImlzcyI6ImJqaElSak0xY1hwYWEyMXpkV3RJU25wNmVqbE1iazQ0YlRsTlpqazNkWEU9
Iiwic3ViIjoiWXpFek1HZG9NSEpuT0hCaU9HMWliRGh5TlRBPSIsImF1ZCI6Imh0dHBzOi8v
bG9jYWxob3N0Ojg0NDMve3RpZH0ve2FpZH0vb2F1dGgyL2F1dGhvcml6ZSIsImp0aSI6IjE1
MTYyMzkwMjIiLCJleHAiOiIyMDIxLTA1LTE3VDA3OjA5OjQ4LjAwMCswNTQ1In0.
IxvaN4ER-PlPgLYzfRhk_JiY4VAow3GNjaK5rYCINFsEPa7VaYnRsaCmQVq8CTgddihEPPXe
t2laH8_c3WqxY4AeZO5eljwSCobCHzxYdOoFKbpNXIm7dqHg_5xpQz-YBJMiDM1ILOEsER8A
DyF4NC2sN0K_0t6xZLSAQIRrHvpGOrtYr5E-SllTWHWPmqCkX2BUZxoYNK2FWgQZpuUOD55H
fsvFXNVQa_5TFRDibi9LsT7Sd_az0iGB0TfAb0v3ZR0qnmgyp5pTeIeU5UqhtbgU9RnUCVmG
IK-SZYNvrlXgv9hiKAZGhLgeI8hO40utfT2YTYHgD2Aiufqo3RIbJA`;

    const compactedJWT = multilineJWT.replace(/\s+/g, "");
    expect(extractJwt(multilineJWT)).toBe(compactedJWT);
  });

  test("should extract JWT from text with other content", () => {
    const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
    const textWithJWT = `Here is my token: ${jwt} and some other text`;
    expect(extractJwt(textWithJWT)).toBe(jwt);
  });

  test("should compact JWT with internal spaces", () => {
    // This is a scenario where the JWT itself contains spaces (invalid, but should be handled)
    const jwtWithSpaces = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0 NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
    // The spaces should be removed by our new implementation
    const compactedJWT = jwtWithSpaces.replace(/\s+/g, "");
    expect(extractJwt(jwtWithSpaces)).toBe(compactedJWT);
  });
});