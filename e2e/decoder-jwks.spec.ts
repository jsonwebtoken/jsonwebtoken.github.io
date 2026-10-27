import { expect, test, type Page } from "@playwright/test";
import {
  exportJWK,
  generateKeyPair,
  SignJWT,
  type JWK,
  type JSONWebKeySet,
} from "jose";
import { dataTestidDictionary } from "@/libs/testing/data-testid.dictionary";
import { E2E_BASE_URL } from "./e2e.utils";

type SigningKey = {
  kid: string;
  jwk: JWK;
  sign: (kid?: string) => Promise<string>;
};

const createSigningKey = async (kid: string): Promise<SigningKey> => {
  const { publicKey, privateKey } = await generateKeyPair("RS256", {
    extractable: true,
  });
  const jwk = {
    ...(await exportJWK(publicKey)),
    kid,
    alg: "RS256",
    use: "sig",
  };

  return {
    kid,
    jwk,
    sign: (headerKid) =>
      new SignJWT({ sub: "jwks-e2e" })
        .setProtectedHeader({ alg: "RS256", typ: "JWT", kid: headerKid })
        .sign(privateKey),
  };
};

const toJwks = (...keys: SigningKey[]): JSONWebKeySet => ({
  keys: keys.map(({ jwk }) => jwk),
});

const getDecoder = (page: Page) =>
  page.getByTestId(dataTestidDictionary.decoder.id);

const jwtInput = (page: Page) =>
  page
    .getByTestId(dataTestidDictionary.decoder.jwtEditor.id)
    .getByRole("textbox");

const keyEditor = (page: Page) =>
  page.getByTestId(dataTestidDictionary.decoder.secretKeyEditor.id);

const selectPublicKeyFormat = async (page: Page, format: string) => {
  await getDecoder(page)
    .getByRole("combobox", { name: "Debugger picker" })
    .first()
    .locator('xpath=ancestor::div[contains(@class, "control")]')
    .dispatchEvent("mousedown", { button: 0 });
  await page
    .getByRole("option", { name: format, exact: true })
    .dispatchEvent("click");
};

test.describe("decoder JWKS public key input", () => {
  let first: SigningKey;
  let second: SigningKey;

  test.beforeAll(async () => {
    [first, second] = await Promise.all([
      createSigningKey("e2e-key-1"),
      createSigningKey("e2e-key-2"),
    ]);
  });

  test.beforeEach(async ({ page }) => {
    await page.goto(`${E2E_BASE_URL}/#token=${await second.sign(second.kid)}`);
    await expect(getDecoder(page)).toContainText("Fix public key input errors");
  });

  test("verifies a token against the matching key of a pasted JWKS", async ({
    page,
  }) => {
    await selectPublicKeyFormat(page, "JWKS");
    await keyEditor(page)
      .getByRole("textbox")
      .fill(JSON.stringify(toJwks(first, second)));

    await expect(
      page.getByTestId(
        dataTestidDictionary.decoder.jwtEditor.statusBar.success.id,
      ),
    ).toBeVisible();
    await expect(getDecoder(page)).toContainText("Signature Verified");
  });

  test("detects a pasted JWKS and switches the format automatically", async ({
    page,
  }) => {
    await keyEditor(page)
      .getByRole("textbox")
      .fill(JSON.stringify(toJwks(second)));

    await expect(
      page.locator(".react-select__single-value").filter({ hasText: "JWKS" }),
    ).toBeVisible();
    await expect(getDecoder(page)).toContainText("Signature Verified");
  });

  test("re-verifies when another token signed by the set is pasted", async ({
    page,
  }) => {
    await selectPublicKeyFormat(page, "JWKS");
    await keyEditor(page)
      .getByRole("textbox")
      .fill(JSON.stringify(toJwks(first, second)));
    await expect(getDecoder(page)).toContainText("Signature Verified");

    await jwtInput(page).fill(await first.sign(first.kid));

    await expect(getDecoder(page)).toContainText("Signature Verified");
  });

  test("rejects a token whose kid is not in the JWKS", async ({ page }) => {
    await selectPublicKeyFormat(page, "JWKS");
    await keyEditor(page)
      .getByRole("textbox")
      .fill(JSON.stringify(toJwks(first)));

    await expect(getDecoder(page)).toContainText("Invalid Signature");
    await expect(keyEditor(page)).toContainText(`kid "${second.kid}"`);
  });

  test("explains malformed JWKS input", async ({ page }) => {
    await selectPublicKeyFormat(page, "JWKS");
    await keyEditor(page).getByRole("textbox").fill('{"keys": "nope"}');

    await expect(keyEditor(page)).toContainText("not a valid JWKS");
  });

  test("refuses an insecure remote JWKS URI", async ({ page }) => {
    await selectPublicKeyFormat(page, "JWKS");
    await keyEditor(page)
      .getByRole("textbox")
      .fill("http://example.com/jwks.json");

    await expect(keyEditor(page)).toContainText("must use https");
  });

  test("fetches a JWKS URI and verifies the token", async ({ page }) => {
    const jwksUrl = "https://issuer.e2e.test/.well-known/jwks.json";

    await page.route(jwksUrl, (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        headers: { "access-control-allow-origin": "*" },
        body: JSON.stringify(toJwks(first, second)),
      }),
    );

    await selectPublicKeyFormat(page, "JWKS");
    await keyEditor(page).getByRole("textbox").fill(jwksUrl);

    await expect(getDecoder(page)).toContainText("Signature Verified");
  });

  test("loads a JWKS from a fragment link", async ({ page }) => {
    const params = new URLSearchParams({
      token: await second.sign(second.kid),
      publicKey: JSON.stringify(toJwks(first, second)),
    });

    await page.goto(`${E2E_BASE_URL}/#${params.toString()}`);

    await expect(getDecoder(page)).toContainText("Signature Verified");
  });
});
