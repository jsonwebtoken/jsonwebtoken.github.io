import { expect, test } from "@playwright/test";
import {
  getButtonsUiDictionary,
  getPickersUiDictionary,
} from "@/features/localization/services/ui-language-dictionary.service";
import {
  DefaultTokensValues,
  DefaultTokenWithKeysModel,
  DefaultTokenWithSecretModel,
} from "@/features/common/values/default-tokens.values";
import { dataTestidDictionary } from "@/libs/testing/data-testid.dictionary";
import {
  isDigitalSignatureAlg,
  isHmacAlg,
  isNoneAlg,
} from "@/features/common/services/jwt.service";
import {
  checkJwtEditorStatusBarMessage,
  checkJwtEditorNotificationBarMessage,
  checkSecretKeyDecoderEditorStatusBarMessage,
  E2E_BASE_URL,
  expectToBeNonNull,
  getDecoderJwtEditor,
  getDecoderJwtEditorInput,
  getLang,
} from "./e2e.utils";
import { MessageStatusValue, MessageTypeValue } from "./e2e.values";
import { JwtDictionaryModel, JwtSignedWithDigitalModel } from "./e2e.models";
import jwts from "./jwt.json" assert { type: "json" };

const TestJwts = (jwts as JwtDictionaryModel).byAlgorithm;

test.describe("Can interact with JWT Decoder JWT editor", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(E2E_BASE_URL);
  });

  test("Can read default value in JWT editor", async ({ page }) => {
    const jwtEditorInput = getDecoderJwtEditorInput(page);

    await expect(jwtEditorInput).toHaveValue(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30",
    );
  });

  test("can edit value in JWT editor", async ({ page }) => {
    const inputValue = (TestJwts.RS512 as JwtSignedWithDigitalModel).withPemKey
      .jwt;

    const jwtEditorInput = getDecoderJwtEditorInput(page);
    await jwtEditorInput.fill(inputValue);

    await expect(jwtEditorInput).toHaveValue(inputValue);
  });

  test("can copy value in JWT editor", async ({ page, context, browserName }) => {
    const permissions = browserName === 'firefox' ? [] : ["clipboard-read", "clipboard-write"]
    const inputValue = (TestJwts.RS512 as JwtSignedWithDigitalModel).withPemKey
      .jwt;
    await context.grantPermissions(permissions);

    const lang = await getLang(page);
    expectToBeNonNull(lang);

    const buttonsUiDictionary = getButtonsUiDictionary(lang);

    const jwtEditor = getDecoderJwtEditor(page);
    const jwtEditorInput = getDecoderJwtEditorInput(page);

    await jwtEditorInput.fill(inputValue);

    const copyButton = jwtEditor.getByRole("button", {
      name: buttonsUiDictionary.copyButton.idle.label,
    });

    await copyButton.click();

    const clipboardContent = await page.evaluate(() =>
      navigator.clipboard.readText(),
    );

    expect(clipboardContent).toBe(inputValue);
  });

  test("can clear value in JWT editor", async ({ page }) => {
    const lang = await getLang(page);
    expectToBeNonNull(lang);

    const buttonsUiDictionary = getButtonsUiDictionary(lang);

    const jwtEditor = getDecoderJwtEditor(page);
    const jwtEditorInput = getDecoderJwtEditorInput(page);

    const clearButton = jwtEditor.getByRole("button", {
      name: buttonsUiDictionary.clearButton.label,
    });
    await clearButton.click();

    await expect(jwtEditorInput).toHaveValue("");
  });
});

test.describe("Can generate JWT examples", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(E2E_BASE_URL);
  });

  test("Can open and close JWT Decoder example widget", async ({ page }) => {
    const lang = await getLang(page);
    expectToBeNonNull(lang);

    const pickersUiDictionary = getPickersUiDictionary(lang);

    const decoderWidget = page.getByTestId(dataTestidDictionary.decoder.id);

    const exampleButton = decoderWidget.getByRole("button", {
      name: pickersUiDictionary.exampleAlgPicker.label,
    });

    await exampleButton.click();

    await expect(exampleButton).not.toBeVisible();

    const closeButton = page.getByRole("button", {
      name: pickersUiDictionary.exampleAlgPicker.closeButton.label,
    });

    await closeButton.click();

    await expect(exampleButton).toBeVisible();
    await expect(closeButton).not.toBeVisible();
  });

  test.describe("Can generate a JWT decoder example", () => {
    test.beforeEach(async ({ page }) => {
      const lang = await getLang(page);
      expectToBeNonNull(lang);

      const pickersUiDictionary = getPickersUiDictionary(lang);

      const decoderWidget = page.getByTestId(dataTestidDictionary.decoder.id);

      const exampleButton = decoderWidget.getByRole("button", {
        name: pickersUiDictionary.exampleAlgPicker.label,
      });

      await exampleButton.click();

      await expect(exampleButton).not.toBeVisible();

      const pickerIndicator = decoderWidget.getByText(
        pickersUiDictionary.exampleAlgPicker.defaultValue,
      );

      await pickerIndicator.click();
    });

    const options = Object.keys(DefaultTokensValues);

    options.forEach((option) => {
      test(`can generate a JWT decoder example for ${option}`, async ({
        page,
      }) => {
        if (option === "Ed25519") {
          return;
        }

        const lang = await getLang(page);
        expectToBeNonNull(lang);

        const decoderWidget = page.getByTestId(dataTestidDictionary.decoder.id);
        await page.getByRole("option", { name: option }).click();

        const targetToken = DefaultTokensValues[option];

        const jwtEditor = decoderWidget.getByTestId(
          dataTestidDictionary.decoder.jwtEditor.id,
        );
        const jwtEditorInput = jwtEditor.getByRole("textbox");

        await expect(jwtEditorInput).toHaveValue(targetToken.token);

        await checkJwtEditorStatusBarMessage({
          page,
          type: MessageTypeValue.SUCCESS,
          status: MessageStatusValue.VISIBLE,
        });

        if (isNoneAlg(option)) {
          await checkJwtEditorNotificationBarMessage({
            page,
            type: MessageTypeValue.WARNING,
            status: MessageStatusValue.VISIBLE,
          });

          return;
        }

        await checkJwtEditorNotificationBarMessage({
          page,
          type: MessageTypeValue.SUCCESS,
          status: MessageStatusValue.VISIBLE,
        });

        const secretKeyEditor = decoderWidget.getByTestId(
          dataTestidDictionary.decoder.secretKeyEditor.id,
        );
        const secretKeyInput = secretKeyEditor.getByRole("textbox");

        if (isHmacAlg(option)) {
          const symmetricToken = targetToken as DefaultTokenWithSecretModel;
          await expect(secretKeyInput).toHaveValue(symmetricToken.secret);

          await checkSecretKeyDecoderEditorStatusBarMessage({
            page,
            type: MessageTypeValue.SUCCESS,
            status: MessageStatusValue.VISIBLE,
          });

          const encodingValue = await secretKeyEditor
            .locator(".react-select__single-value")
            .innerText();

          expect(encodingValue).toBe(symmetricToken.secretEncoding);

          return;
        }

        if (isDigitalSignatureAlg(option)) {
          const asymmetricToken = targetToken as DefaultTokenWithKeysModel;
          await expect(secretKeyInput).toHaveValue(asymmetricToken.publicKey);

          await checkSecretKeyDecoderEditorStatusBarMessage({
            page,
            type: MessageTypeValue.SUCCESS,
            status: MessageStatusValue.VISIBLE,
          });

          const formatValue = await secretKeyEditor
            .locator(".react-select__single-value")
            .innerText();

          expect(formatValue).toBe(asymmetricToken.publicKeyFormat);

          return;
        }

        throw new Error(`Unsupported alg: ${option}`);
      });
    });
  });
});

test.describe("decode JWTs", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(E2E_BASE_URL);
  });

  const options = Object.keys(DefaultTokensValues);

  options.forEach((option) => {
    test(`Can input a JWT signed with ${option}`, async ({ page }) => {
      if (option === "Ed25519") {
        return;
      }

      const lang = await getLang(page);
      expectToBeNonNull(lang);

      const decoderWidget = page.getByTestId(dataTestidDictionary.decoder.id);

      const jwtEditor = decoderWidget.getByTestId(
        dataTestidDictionary.decoder.jwtEditor.id,
      );
      const jwtEditorInput = jwtEditor.getByRole("textbox");

      const testJwt = TestJwts[option];

      if (isNoneAlg(option) && testJwt.type === "unsecured") {
        const jwt = testJwt.jwt;
        await jwtEditorInput.fill(jwt);

        await expect(jwtEditorInput).toHaveValue(jwt);

        await checkJwtEditorStatusBarMessage({
          page,
          type: MessageTypeValue.SUCCESS,
          status: MessageStatusValue.VISIBLE,
        });

        await checkJwtEditorNotificationBarMessage({
          page,
          type: MessageTypeValue.WARNING,
          status: MessageStatusValue.VISIBLE,
        });

        const decodedHeader = await decoderWidget
          .getByTestId(dataTestidDictionary.decoder.decodedHeader.json.id)
          .innerText();
        const decodedPayload = await decoderWidget
          .getByTestId(dataTestidDictionary.decoder.decodedPayload.json.id)
          .innerText();

        expect(decodedHeader).toBe(testJwt.header);
        expect(decodedPayload).toBe(testJwt.payload);

        return;
      }

      if (isHmacAlg(option) && testJwt.type === "hmac") {
        const entryWithUtf8Secret = testJwt.withUtf8Secret;
        const jwt = entryWithUtf8Secret.jwt;
        await jwtEditorInput.fill(jwt);

        await expect(jwtEditorInput).toHaveValue(jwt);

        await checkJwtEditorStatusBarMessage({
          page,
          type: MessageTypeValue.SUCCESS,
          status: MessageStatusValue.VISIBLE,
        });

        await checkJwtEditorNotificationBarMessage({
          page,
          type: MessageTypeValue.ERROR,
          status: MessageStatusValue.VISIBLE,
        });

        const secretKeyEditor = decoderWidget.getByTestId(
          dataTestidDictionary.decoder.secretKeyEditor.id,
        );
        const secretKeyEditorInput = secretKeyEditor.getByRole("textbox");

        await secretKeyEditorInput.fill(entryWithUtf8Secret.secret);

        await expect(secretKeyEditorInput).toHaveValue(
          entryWithUtf8Secret.secret,
        );

        await checkSecretKeyDecoderEditorStatusBarMessage({
          page,
          type: MessageTypeValue.SUCCESS,
          status: MessageStatusValue.VISIBLE,
        });

        const encodingValue = await secretKeyEditor
          .locator(".react-select__single-value")
          .innerText();

        expect(encodingValue).toBe(entryWithUtf8Secret.secretEncoding);

        await checkJwtEditorNotificationBarMessage({
          page,
          type: MessageTypeValue.SUCCESS,
          status: MessageStatusValue.VISIBLE,
        });

        const decodedHeader = await decoderWidget
          .getByTestId(dataTestidDictionary.decoder.decodedHeader.json.id)
          .innerText();
        const decodedPayload = await decoderWidget
          .getByTestId(dataTestidDictionary.decoder.decodedPayload.json.id)
          .innerText();

        expect(decodedHeader).toBe(entryWithUtf8Secret.header);
        expect(decodedPayload).toBe(entryWithUtf8Secret.payload);

        {
          const entryWithBase64urlSecret = testJwt.withBase64urlSecret;

          await jwtEditorInput.fill(entryWithBase64urlSecret.jwt);

          await checkJwtEditorStatusBarMessage({
            page,
            type: MessageTypeValue.SUCCESS,
            status: MessageStatusValue.VISIBLE,
          });

          await checkJwtEditorNotificationBarMessage({
            page,
            type: MessageTypeValue.ERROR,
            status: MessageStatusValue.VISIBLE,
          });

          await checkSecretKeyDecoderEditorStatusBarMessage({
            page,
            type: MessageTypeValue.ERROR,
            status: MessageStatusValue.VISIBLE,
          });

          const formatPicker = secretKeyEditor.locator(
            ".react-select__single-value",
          );

          await formatPicker.click();

          await page
            .getByRole("option", {
              name: entryWithBase64urlSecret.secretEncoding,
            })
            .click();

          await secretKeyEditorInput.fill(entryWithBase64urlSecret.secret);

          await checkJwtEditorStatusBarMessage({
            page,
            type: MessageTypeValue.SUCCESS,
            status: MessageStatusValue.VISIBLE,
          });

          await checkJwtEditorNotificationBarMessage({
            page,
            type: MessageTypeValue.SUCCESS,
            status: MessageStatusValue.VISIBLE,
          });

          await checkSecretKeyDecoderEditorStatusBarMessage({
            page,
            type: MessageTypeValue.SUCCESS,
            status: MessageStatusValue.VISIBLE,
          });

          const decodedHeader = await decoderWidget
            .getByTestId(dataTestidDictionary.decoder.decodedHeader.json.id)
            .innerText();
          const decodedPayload = await decoderWidget
            .getByTestId(dataTestidDictionary.decoder.decodedPayload.json.id)
            .innerText();

          expect(decodedHeader).toBe(entryWithBase64urlSecret.header);
          expect(decodedPayload).toBe(entryWithBase64urlSecret.payload);
        }
      }

      if (isDigitalSignatureAlg(option) && testJwt.type === "digital") {
        const entry = testJwt.withPemKey;
        await jwtEditorInput.fill(entry.jwt);

        await expect(jwtEditorInput).toHaveValue(entry.jwt);

        await checkJwtEditorStatusBarMessage({
          page,
          type: MessageTypeValue.SUCCESS,
          status: MessageStatusValue.VISIBLE,
        });

        await checkJwtEditorNotificationBarMessage({
          page,
          type: MessageTypeValue.WARNING,
          status: MessageStatusValue.VISIBLE,
        });

        const secretKeyEditor = decoderWidget.getByTestId(
          dataTestidDictionary.decoder.secretKeyEditor.id,
        );
        const secretKeyEditorInput = secretKeyEditor.getByRole("textbox");

        await secretKeyEditorInput.fill(entry.publicKey);

        await expect(secretKeyEditorInput).toHaveValue(entry.publicKey);

        await checkSecretKeyDecoderEditorStatusBarMessage({
          page,
          type: MessageTypeValue.SUCCESS,
          status: MessageStatusValue.VISIBLE,
        });

        const formatValue = await secretKeyEditor
          .locator(".react-select__single-value")
          .innerText();

        expect(formatValue).toBe(entry.publicKeyFormat);

        await checkJwtEditorNotificationBarMessage({
          page,
          type: MessageTypeValue.SUCCESS,
          status: MessageStatusValue.VISIBLE,
        });

        const decodedHeader = await decoderWidget
          .getByTestId(dataTestidDictionary.decoder.decodedHeader.json.id)
          .innerText();
        const decodedPayload = await decoderWidget
          .getByTestId(dataTestidDictionary.decoder.decodedPayload.json.id)
          .innerText();

        expect(decodedHeader).toBe(entry.header);
        expect(decodedPayload).toBe(entry.payload);

        {
          const entrywithJwkKey = testJwt.withJwkKey;

          await jwtEditorInput.fill(entrywithJwkKey.jwt);

          if (option.includes("RS")) {
            await checkJwtEditorStatusBarMessage({
              page,
              type: MessageTypeValue.SUCCESS,
              status: MessageStatusValue.VISIBLE,
            });

            await checkJwtEditorNotificationBarMessage({
              page,
              type: MessageTypeValue.SUCCESS,
              status: MessageStatusValue.VISIBLE,
            });

            await checkSecretKeyDecoderEditorStatusBarMessage({
              page,
              type: MessageTypeValue.SUCCESS,
              status: MessageStatusValue.VISIBLE,
            });

            const formatPicker = secretKeyEditor.locator(
              ".react-select__single-value",
            );

            await formatPicker.click();

            await page
              .getByRole("option", {
                name: entrywithJwkKey.publicKeyFormat,
              })
              .click();

            await checkSecretKeyDecoderEditorStatusBarMessage({
              page,
              type: MessageTypeValue.ERROR,
              status: MessageStatusValue.VISIBLE,
            });

            await secretKeyEditorInput.fill(
              JSON.stringify(entrywithJwkKey.publicKey, null, 2),
            );

            await checkJwtEditorStatusBarMessage({
              page,
              type: MessageTypeValue.SUCCESS,
              status: MessageStatusValue.VISIBLE,
            });

            await checkJwtEditorNotificationBarMessage({
              page,
              type: MessageTypeValue.SUCCESS,
              status: MessageStatusValue.VISIBLE,
            });

            await checkSecretKeyDecoderEditorStatusBarMessage({
              page,
              type: MessageTypeValue.SUCCESS,
              status: MessageStatusValue.VISIBLE,
            });

            const decodedHeader = await decoderWidget
              .getByTestId(dataTestidDictionary.decoder.decodedHeader.json.id)
              .innerText();
            const decodedPayload = await decoderWidget
              .getByTestId(dataTestidDictionary.decoder.decodedPayload.json.id)
              .innerText();

            expect(decodedHeader).toBe(entrywithJwkKey.header);
            expect(decodedPayload).toBe(entrywithJwkKey.payload);
          }

          if (option.includes("ES") || option.includes("PS")) {
            await checkJwtEditorStatusBarMessage({
              page,
              type: MessageTypeValue.SUCCESS,
              status: MessageStatusValue.VISIBLE,
            });

            await checkJwtEditorNotificationBarMessage({
              page,
              type: MessageTypeValue.WARNING,
              status: MessageStatusValue.VISIBLE,
            });

            await checkSecretKeyDecoderEditorStatusBarMessage({
              page,
              type: MessageTypeValue.ERROR,
              status: MessageStatusValue.VISIBLE,
            });

            const formatPicker = secretKeyEditor.locator(
              ".react-select__single-value",
            );

            await formatPicker.click();

            await page
              .getByRole("option", {
                name: entrywithJwkKey.publicKeyFormat,
              })
              .click();

            await secretKeyEditorInput.fill(
              JSON.stringify(entrywithJwkKey.publicKey, null, 2),
            );

            await checkJwtEditorStatusBarMessage({
              page,
              type: MessageTypeValue.SUCCESS,
              status: MessageStatusValue.VISIBLE,
            });

            await checkJwtEditorNotificationBarMessage({
              page,
              type: MessageTypeValue.SUCCESS,
              status: MessageStatusValue.VISIBLE,
            });

            await checkSecretKeyDecoderEditorStatusBarMessage({
              page,
              type: MessageTypeValue.SUCCESS,
              status: MessageStatusValue.VISIBLE,
            });

            const decodedHeader = await decoderWidget
              .getByTestId(dataTestidDictionary.decoder.decodedHeader.json.id)
              .innerText();
            const decodedPayload = await decoderWidget
              .getByTestId(dataTestidDictionary.decoder.decodedPayload.json.id)
              .innerText();

            expect(decodedHeader).toBe(entrywithJwkKey.header);
            expect(decodedPayload).toBe(entrywithJwkKey.payload);
          }
        }
      }
    });
  });
});

test("Can decode JWTs signed with a non-supported algorithm", async ({
  page,
}) => {
  const jwtSignedWithNotSupportedAlgorithm =
    "eyJhbGciOiJCUDI1NlIxIiwidHlwIjoiYXQrSldUIiwia2lkIjoic2lnIn0.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.kSA6uak_GNjbj_X7Va8OCSWe3h1lxU_xlonWFKkenAIYCG6ylCjGoRj9ZIQFAV-XAueyPvYkKU1EuDF5t9Y0Ag";
  const expectedDecodedHeader = {
    alg: "BP256R1",
    typ: "at+JWT",
    kid: "sig",
  };
  const expectedDecodedPayload = {
    "sub": "1234567890",
    "name": "John Doe",
    "admin": true,
    "iat": 1516239022
  };

  await page.goto(E2E_BASE_URL);

  const lang = await getLang(page);
  expectToBeNonNull(lang);

  const decoderWidget = page.getByTestId(dataTestidDictionary.decoder.id);

  const jwtEditor = decoderWidget.getByTestId(
    dataTestidDictionary.decoder.jwtEditor.id,
  );
  const jwtEditorInput = jwtEditor.getByRole("textbox");

  await jwtEditorInput.fill(jwtSignedWithNotSupportedAlgorithm);

  await expect(jwtEditorInput).toHaveValue(jwtSignedWithNotSupportedAlgorithm);

  await checkJwtEditorStatusBarMessage({
    page,
    type: MessageTypeValue.ERROR,
    status: MessageStatusValue.VISIBLE,
  });

  await checkJwtEditorNotificationBarMessage({
    page,
    type: MessageTypeValue.WARNING,
    status: MessageStatusValue.VISIBLE,
  });

  await expect(
    decoderWidget.getByTestId(
      dataTestidDictionary.decoder.decodedHeader.json.id,
    ),
  ).toHaveText(JSON.stringify(expectedDecodedHeader, null, 2), {
    useInnerText: true,
  });

  await expect(
    decoderWidget.getByTestId(
      dataTestidDictionary.decoder.decodedPayload.json.id,
    ),
  ).toHaveText(JSON.stringify(expectedDecodedPayload, null, 2), {
    useInnerText: true,
  });

  const secretKeyEditor = decoderWidget.getByTestId(
    dataTestidDictionary.decoder.secretKeyEditor.id,
  );

  await expect(secretKeyEditor).not.toBeVisible();
});

test.describe("Decode pieces of JWTs in Base64Url", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(E2E_BASE_URL);
  });

  const testCases = [
    {
      description:
        "it should decode a single segment or JWT piece that doesn't include the alg property when decoded",
      jwtPiece:
        "eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0",
      expectedDecodedOutput: {
        "sub": "1234567890",
        "name": "John Doe",
        "admin": true,
        "iat": 1516239022
      },
    },
    {
      description:
        "it should decode a single segment or JWT piece that includes the alg property when decoded",
      jwtPiece: "eyJhbGciOiJCUDI1NlIxIiwidHlwIjoiYXQrSldUIiwia2lkIjoic2lnIn0",
      expectedDecodedOutput: {
        alg: "BP256R1",
        typ: "at+JWT",
        kid: "sig",
      },
    },
  ];

  testCases.forEach(({ description, jwtPiece, expectedDecodedOutput }) => {
    test(description, async ({ page }) => {
      const lang = await getLang(page);
      expectToBeNonNull(lang);

      const decoderWidget = page.getByTestId(dataTestidDictionary.decoder.id);

      const jwtEditor = decoderWidget.getByTestId(
        dataTestidDictionary.decoder.jwtEditor.id,
      );
      const jwtEditorInput = jwtEditor.getByRole("textbox");

      await jwtEditorInput.fill(jwtPiece);

      await expect(jwtEditorInput).toHaveValue(jwtPiece);

      await checkJwtEditorStatusBarMessage({
        page,
        type: MessageTypeValue.ERROR,
        status: MessageStatusValue.VISIBLE,
      });

      await checkJwtEditorNotificationBarMessage({
        page,
        type: MessageTypeValue.WARNING,
        status: MessageStatusValue.VISIBLE,
      });

      await expect(
        decoderWidget.getByTestId(
          dataTestidDictionary.decoder.decodedHeader.json.id,
        ),
      ).toHaveText(JSON.stringify(expectedDecodedOutput, null, 2), {
        useInnerText: true,
      });

      await expect(
        decoderWidget.getByTestId(
          dataTestidDictionary.decoder.decodedPayload.json.id,
        ),
      ).toBeEmpty();

      const secretKeyEditor = decoderWidget.getByTestId(
        dataTestidDictionary.decoder.secretKeyEditor.id,
      );

      await expect(secretKeyEditor).not.toBeVisible();
    });
  });
});
