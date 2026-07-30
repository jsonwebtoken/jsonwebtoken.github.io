import { expect, test, type Page } from "@playwright/test";
import { dataTestidDictionary } from "@/libs/testing/data-testid.dictionary";
import type {
  JwtDictionaryModel,
  JwtSignedWithDigitalModel,
  UnsecuredJwtModel,
} from "./e2e.models";
import jwts from "./jwt.json" with { type: "json" };

type FragmentEntry = readonly [name: string, value: string];
type PublicKeyFormat = "JWK" | "PEM";

const E2E_BASE_URL = "http://localhost:1234";
const TestJwts = (jwts as JwtDictionaryModel).byAlgorithm;
const unsecuredJwt = (TestJwts.none as UnsecuredJwtModel).jwt;
const ps256Jwt = TestJwts.PS256 as JwtSignedWithDigitalModel;

// Regression fixture from https://github.com/jsonwebtoken/jsonwebtoken.github.io/issues/942
const ISSUE_942_TOKEN =
  "eyJraWQiOiIyNTkzYzg0YzMyYzhlMzFlNDY2YjZlOGZiOGJjNzQ0MGE4MTU5MDFjYjFhNjU4NjkwM2Y1ZDIwOWRiODUyYjgyIiwiYWxnIjoiUFMyNTYifQ.eyJzdWIiOiJKZExrU1dHY2YwbWZIeE16Wk5vdEgiLCJhdWQiOiJodHRwczovL210bHMtYXMub3BlbmZpbmFuY2UtZGV2LnFpdGVjaC5hcHAvdG9rZW4iLCJuYmYiOjE3Nzc5Mzg0NTEsImlzcyI6IkpkTGtTV0djZjBtZkh4TXpaTm90SCIsImV4cCI6MTc3NzkzODUxMSwiaWF0IjoxNzc3OTM4NDUxLCJqdGkiOiJhMERyeFJNMHJZRVB1NDg4Y1lCNSJ9.AF-dA2khA6eKzWYD61emzXsAi_-EZ3iy-sIoDj6JB32iM1a89_7iljYFWQRohAWkxlkkQTD4zOVu-uy878M3BBKradLYeSjZ07izGsvJ3F9nz4EdRAkEsy00gOMMpvgi9dFUfNGGoeVMPX8o6ymc1epCqOZBSBleT7khHnYuL6TxYrPz4dPkTpPvNdxEc-1pMJx-60khjlBRdoz0ZPq3iDfKr4tEDKNIjUvoFsT0i7DFLnVlUTYp8lAnQGpTMyqJceRzG9oMfrfUwn73aIUVg4ccMJyNQTc0aYTVYEjHD1TN-YtbqPmXzjyA_35HV4fWACa3x7blCmnx3JuoHPXZog";
const ISSUE_942_PUBLIC_KEY = JSON.stringify({
  kty: "RSA",
  e: "AQAB",
  use: "sig",
  kid: "2593c84c32c8e31e466b6e8fb8bc7440a815901cb1a6586903f5d209db852b82",
  alg: "PS256",
  n: "vf-KwU0bhvI0XaBvLd3vs3GFRv2NA4GMfpjr-2wtNfNiTVedxhTJpC5vlG601k0CyS3zMjnfSVLorN-bXhiyWnYzK6ZDRkZn1tFriWPCu39gdHN7DWLQ_GtlacgsEQDyPf8vhHn8_Xj19ZAE08PPnFR51mVfNwkSpAQNAm0wjaTBL2FVBOHK_vcGZ-svlc8gXK-NfhGBZRP9agmWZs5qPwLV1fpPWsul38lU6S1KbE92aKT00O8DxNS8VdiEx9qJ6Msjy7cP8xOG-EfzFT9XGpZIHma_5M8OpgIfkhrJvkNCQz1-i-uwI2eMw-qppZgDJZ7a5wTOamOAVI0sdTrFCw",
});

const createFragment = (entries: readonly FragmentEntry[], legacy = false) => {
  const params = new URLSearchParams();

  for (const [name, value] of entries) {
    params.append(name, value);
  }

  return `#${legacy ? "debugger-io?" : ""}${params.toString()}`;
};

const gotoFragment = async (
  page: Page,
  entries: readonly FragmentEntry[],
  legacy = false,
) => {
  await page.goto(`${E2E_BASE_URL}/${createFragment(entries, legacy)}`);
};

const expectTokenLoaded = async (page: Page, token: string) => {
  await expect(
    page
      .getByTestId(dataTestidDictionary.decoder.jwtEditor.id)
      .getByRole("textbox"),
  ).toHaveValue(token);
};

const expectPublicKeyLoaded = async ({
  page,
  publicKey,
  publicKeyFormat,
}: {
  page: Page;
  publicKey: string;
  publicKeyFormat: PublicKeyFormat;
}) => {
  const jwtEditor = page.getByTestId(dataTestidDictionary.decoder.jwtEditor.id);
  const publicKeyEditor = page.getByTestId(
    dataTestidDictionary.decoder.secretKeyEditor.id,
  );
  const publicKeyRegion = page
    .getByRole("region")
    .filter({ has: publicKeyEditor });

  await expect(publicKeyEditor.getByRole("textbox")).toHaveValue(publicKey);
  await expect(
    publicKeyEditor.getByTestId(
      dataTestidDictionary.decoder.secretKeyEditor.statusBar.success.id,
    ),
  ).toBeVisible();
  await expect(
    publicKeyRegion.getByText(publicKeyFormat, { exact: true }),
  ).toBeVisible();
  await expect(
    jwtEditor.getByTestId(
      dataTestidDictionary.decoder.jwtEditor.notificationBar.success.id,
    ),
  ).toBeVisible();
  await expect(
    page.getByText(/Unable to retrieve public key from issuer/),
  ).toHaveCount(0);
};

const expectLegacyFragmentNormalized = async ({
  page,
  token,
  publicKey,
  unrelatedValue,
}: {
  page: Page;
  token: string;
  publicKey: string;
  unrelatedValue?: string;
}) => {
  await expect
    .poll(() => page.evaluate(() => window.location.hash))
    .not.toContain("debugger-io?");

  const hash = await page.evaluate(() => window.location.hash);
  const params = new URLSearchParams(hash.slice(1));

  expect(params.get("token")).toBe(token);
  expect(params.get("publicKey")).toBe(publicKey);

  if (unrelatedValue !== undefined) {
    expect(params.get("context")).toBe(unrelatedValue);
  }
};

test.describe("decoder fragment token aliases", () => {
  for (const alias of ["id_token", "access_token", "value", "token"]) {
    test(`loads a JWT from #${alias}`, async ({ page }) => {
      await gotoFragment(page, [[alias, unsecuredJwt]]);

      await expectTokenLoaded(page, unsecuredJwt);
    });
  }

  test("loads a token after unrelated fragment parameters", async ({
    page,
  }) => {
    await gotoFragment(page, [
      ["context", "preserved"],
      ["token", unsecuredJwt],
    ]);

    await expectTokenLoaded(page, unsecuredJwt);
    expect(new URL(page.url()).hash).toContain("context=preserved&token=");
  });

  test("uses the historical alias priority deterministically", async ({
    page,
  }) => {
    const createUnsecuredJwt = (source: string) =>
      `${Buffer.from(JSON.stringify({ alg: "none" })).toString("base64url")}.${Buffer.from(JSON.stringify({ source })).toString("base64url")}.`;
    const tokens = {
      token: createUnsecuredJwt("token"),
      value: createUnsecuredJwt("value"),
      accessToken: createUnsecuredJwt("access_token"),
      idToken: createUnsecuredJwt("id_token"),
    };

    await gotoFragment(page, [
      ["token", tokens.token],
      ["value", tokens.value],
      ["access_token", tokens.accessToken],
      ["id_token", tokens.idToken],
    ]);

    await expectTokenLoaded(page, tokens.idToken);
  });
});

test.describe("decoder fragment public keys", () => {
  const cases = [
    {
      syntax: "canonical",
      keyFormat: "PEM",
      fixture: ps256Jwt.withPemKey,
      legacy: false,
    },
    {
      syntax: "canonical",
      keyFormat: "JWK",
      fixture: ps256Jwt.withJwkKey,
      legacy: false,
    },
    {
      syntax: "legacy",
      keyFormat: "PEM",
      fixture: ps256Jwt.withPemKey,
      legacy: true,
    },
    {
      syntax: "legacy",
      keyFormat: "JWK",
      fixture: ps256Jwt.withJwkKey,
      legacy: true,
    },
  ] as const;

  for (const { syntax, keyFormat, fixture, legacy } of cases) {
    test(`loads and verifies a ${keyFormat} key from a ${syntax} fragment`, async ({
      page,
    }) => {
      const publicKey =
        typeof fixture.publicKey === "string"
          ? fixture.publicKey
          : JSON.stringify(fixture.publicKey);
      const entries: FragmentEntry[] = [
        ["token", fixture.jwt],
        ["publicKey", publicKey],
      ];

      if (legacy) {
        entries.push(["context", "preserved"]);
      }

      await gotoFragment(page, entries, legacy);

      await expectTokenLoaded(page, fixture.jwt);
      await expectPublicKeyLoaded({
        page,
        publicKey,
        publicKeyFormat: keyFormat,
      });

      if (legacy) {
        await expectLegacyFragmentNormalized({
          page,
          token: fixture.jwt,
          publicKey,
          unrelatedValue: "preserved",
        });
      }
    });
  }

  test("loads and verifies the exact legacy fragment from issue #942", async ({
    page,
  }) => {
    await gotoFragment(
      page,
      [
        ["token", ISSUE_942_TOKEN],
        ["publicKey", ISSUE_942_PUBLIC_KEY],
      ],
      true,
    );

    await expectTokenLoaded(page, ISSUE_942_TOKEN);
    await expectPublicKeyLoaded({
      page,
      publicKey: ISSUE_942_PUBLIC_KEY,
      publicKeyFormat: "JWK",
    });
    await expectLegacyFragmentNormalized({
      page,
      token: ISSUE_942_TOKEN,
      publicKey: ISSUE_942_PUBLIC_KEY,
    });
  });
});
