import { expect, test } from "@playwright/test";
import {
  getButtonsUiDictionary,
  getPickersUiDictionary,
} from "@/features/localization/services/ui-language-dictionary.service";
import { DefaultTokensValues } from "@/features/common/values/default-tokens.values";
import { dataTestidDictionary } from "@/libs/testing/data-testid.dictionary";
import {
  checkHeaderEditorStatusBarMessage,
  checkJwtStatusBarMessage,
  checkPayloadEditorStatusBarMessage,
  checkSecretKeyEncoderEditorStatusBarMessage,
  E2E_BASE_URL,
  expectToBeNonNull,
  getLang,
  switchToEncoderTab,
} from "./e2e.utils";
import jwts from "./jwt.json" with { type: "json" };
import {
  JwtDictionaryModel,
  JwtSignedWithDigitalModel,
  JwtSignedWithHmacModel,
} from "./e2e.models";
import {
  isDigitalSignatureAlg,
  isHmacAlg,
  isNoneAlg,
} from "@/features/common/services/jwt.service";
import { MessageStatusValue, MessageTypeValue } from "./e2e.values";

const TestJwts = (jwts as JwtDictionaryModel).byAlgorithm;

test.describe("Can interact with header editor in JWT Encoder", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(E2E_BASE_URL);

    await switchToEncoderTab(page);
  });

  test("Can read default value in header editor", async ({ page }) => {
    const encoderWidget = page.getByTestId(dataTestidDictionary.encoder.id);

    const headerEditor = encoderWidget.getByTestId(
      dataTestidDictionary.encoder.headerEditor.id,
    );
    const headerEditorInput = headerEditor.getByRole("textbox");

    const header = {
      alg: `HS256`,
      typ: "JWT",
    };

    const headerAsString = JSON.stringify(header, null, 2);

    await expect(headerEditorInput).toHaveValue(headerAsString);
  });

  test("Can edit value in header editor", async ({ page }) => {
    const inputValue = (TestJwts.RS512 as JwtSignedWithDigitalModel).withPemKey
      .header;

    const lang = await getLang(page);
    expectToBeNonNull(lang);

    const encoderWidget = page.getByTestId(dataTestidDictionary.encoder.id);

    const headerEditor = encoderWidget.getByTestId(
      dataTestidDictionary.encoder.headerEditor.id,
    );
    const headerEditorInput = headerEditor.getByRole("textbox");

    await headerEditorInput.fill(inputValue);

    await expect(headerEditorInput).toHaveValue(inputValue);
  });

  test("Can clear value in header editor", async ({ page }) => {
    const lang = await getLang(page);
    expectToBeNonNull(lang);

    const buttonsUiDictionary = getButtonsUiDictionary(lang);

    const encoder = page.getByTestId(dataTestidDictionary.encoder.id);

    const headerEditor = encoder.getByTestId(
      dataTestidDictionary.encoder.headerEditor.id,
    );
    const headerEditorInput = headerEditor.getByRole("textbox");

    const clearButton = headerEditor.getByRole("button", {
      name: buttonsUiDictionary.clearButton.label,
    });
    await clearButton.click();

    await expect(headerEditorInput).toHaveValue("");
  });
});

test.describe("can interact with payload editor in JWT encoder", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(E2E_BASE_URL);

    await switchToEncoderTab(page);
  });

  test("can read default value in payload editor", async ({ page }) => {
    const encoderWidget = page.getByTestId(dataTestidDictionary.encoder.id);

    const payloadEditor = encoderWidget.getByTestId(
      dataTestidDictionary.encoder.payloadEditor.id,
    );
    const payloadEditorInput = payloadEditor.getByRole("textbox");

    const payload = {
      sub: "1234567890",
      name: "John Doe",
      admin: true,
      iat: 1516239022,
    };
    const payloadAsString = JSON.stringify(payload, null, 2);

    await expect(payloadEditorInput).toHaveValue(payloadAsString);
  });

  test("can edit value in payload editor", async ({ page }) => {
    const inputValue = "abc";

    const lang = await getLang(page);
    expectToBeNonNull(lang);

    const encoderWidget = page.getByTestId(dataTestidDictionary.encoder.id);

    const payloadEditor = encoderWidget.getByTestId(
      dataTestidDictionary.encoder.payloadEditor.id,
    );
    const payloadEditorInput = payloadEditor.getByRole("textbox");

    await payloadEditorInput.fill(inputValue);

    await expect(payloadEditorInput).toHaveValue(inputValue);
  });

  test("can clear value in payload editor", async ({ page }) => {
    const lang = await getLang(page);
    expectToBeNonNull(lang);

    const buttonsUiDictionary = getButtonsUiDictionary(lang);

    const encoder = page.getByTestId(dataTestidDictionary.encoder.id);

    const payloadEditor = encoder.getByTestId(
      dataTestidDictionary.encoder.payloadEditor.id,
    );
    const payloadEditorInput = payloadEditor.getByRole("textbox");

    const clearButton = payloadEditor.getByRole("button", {
      name: buttonsUiDictionary.clearButton.label,
    });
    await clearButton.click();

    await expect(payloadEditorInput).toHaveValue("");
  });
});

test.describe("can interact with secret editor in JWT encoder", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(E2E_BASE_URL);

    await switchToEncoderTab(page);
  });

  test("can read default value in secret editor", async ({ page }) => {
    const encoderWidget = page.getByTestId(dataTestidDictionary.encoder.id);

    const secretKeyEditor = encoderWidget.getByTestId(
      dataTestidDictionary.encoder.secretKeyEditor.id,
    );
    const secretKeyEditorInput = secretKeyEditor.getByRole("textbox");

    const secret = "a-string-secret-at-least-256-bits-long";

    await expect(secretKeyEditorInput).toHaveValue(secret);
  });

  test("can edit value in secret editor", async ({ page }) => {
    const inputValue = "abc";

    const lang = await getLang(page);
    expectToBeNonNull(lang);

    const encoderWidget = page.getByTestId(dataTestidDictionary.encoder.id);

    const secretKeyEditor = encoderWidget.getByTestId(
      dataTestidDictionary.encoder.secretKeyEditor.id,
    );
    const secretKeyEditorInput = secretKeyEditor.getByRole("textbox");

    await secretKeyEditorInput.fill(inputValue);

    await expect(secretKeyEditorInput).toHaveValue(inputValue);
  });

  test("can clear value in secret editor", async ({ page }) => {
    const lang = await getLang(page);
    expectToBeNonNull(lang);

    const buttonsUiDictionary = getButtonsUiDictionary(lang);

    const encoder = page.getByTestId(dataTestidDictionary.encoder.id);

    const secretKeyEditor = encoder.getByTestId(
      dataTestidDictionary.encoder.secretKeyEditor.id,
    );
    const secretKeyEditorInput = secretKeyEditor.getByRole("textbox");

    const clearButton = secretKeyEditor.getByRole("button", {
      name: buttonsUiDictionary.clearButton.label,
    });
    await clearButton.click();

    await expect(secretKeyEditorInput).toHaveValue("");
  });
});

test.describe("Generate JWT encoding examples", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(E2E_BASE_URL);

    await switchToEncoderTab(page);
  });

  test("Can open and close encoder example widget", async ({ page }) => {
    const lang = await getLang(page);
    expectToBeNonNull(lang);

    const pickersUiDictionary = getPickersUiDictionary(lang);

    const encoder = page.getByTestId(dataTestidDictionary.encoder.id);

    const exampleButton = encoder.getByRole("button", {
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

  test.describe("Can generate a JWT example", () => {
    test.beforeEach(async ({ page }) => {
      const lang = await getLang(page);
      expectToBeNonNull(lang);

      const pickersUiDictionary = getPickersUiDictionary(lang);

      const encoder = page.getByTestId(dataTestidDictionary.encoder.id);

      const exampleButton = encoder.getByRole("button", {
        name: pickersUiDictionary.exampleAlgPicker.label,
      });

      await exampleButton.click();

      await expect(exampleButton).not.toBeVisible();

      const pickerIndicator = encoder.getByText(
        pickersUiDictionary.exampleAlgPicker.defaultValue,
      );

      await pickerIndicator.click();
    });

    const options = Object.keys(DefaultTokensValues);

    options.forEach((option) => {
      test(`can generate a JWT encoding example for ${option}`, async ({
        page,
      }) => {
        if (option === "Ed25519") {
          return;
        }

        const encoder = page.getByTestId(dataTestidDictionary.encoder.id);
        await page.getByRole("option", { name: option }).click();

        const jwtOutput = encoder
          .getByTestId(dataTestidDictionary.encoder.jwt.id)
          .getByRole("textbox");

        if (isNoneAlg(option)) {
          await checkHeaderEditorStatusBarMessage({
            page,
            type: MessageTypeValue.SUCCESS,
            status: MessageStatusValue.VISIBLE,
          });

          await checkJwtStatusBarMessage({
            page,
            type: MessageTypeValue.WARNING,
            status: MessageStatusValue.VISIBLE,
          });
        }

        await expect(jwtOutput).toHaveValue(
          /^[A-Za-z0-9_-]*\.[A-Za-z0-9_-]*\.[A-Za-z0-9_-]*$/,
        );
      });
    });
  });
});

test.describe("encode JWTs", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(E2E_BASE_URL);

    await switchToEncoderTab(page);
  });

  const options = Object.keys(DefaultTokensValues);

  options.forEach((option) => {
    test(`Can encode and sign a JWT with ${option}`, async ({ page }) => {
      if (option === "Ed25519") {
        return;
      }

      const encoderWidget = page.getByTestId(dataTestidDictionary.encoder.id);

      const headerEditor = encoderWidget.getByTestId(
        dataTestidDictionary.encoder.headerEditor.id,
      );
      const payloadEditor = encoderWidget.getByTestId(
        dataTestidDictionary.encoder.payloadEditor.id,
      );
      const secretKeyEditor = encoderWidget.getByTestId(
        dataTestidDictionary.encoder.secretKeyEditor.id,
      );
      const jwtOutput = encoderWidget
        .getByTestId(dataTestidDictionary.encoder.jwt.id)
        .getByRole("textbox");

      const headerEditorInput = headerEditor.getByRole("textbox");
      const payloadEditorInput = payloadEditor.getByRole("textbox");

      const testJwt = TestJwts[option];

      if (isNoneAlg(option) && testJwt.type === "unsecured") {
        await headerEditorInput.fill(testJwt.header);

        await checkHeaderEditorStatusBarMessage({
          page,
          type: MessageTypeValue.SUCCESS,
          status: MessageStatusValue.VISIBLE,
        });

        await payloadEditorInput.fill(testJwt.payload);

        await checkPayloadEditorStatusBarMessage({
          page,
          type: MessageTypeValue.SUCCESS,
          status: MessageStatusValue.VISIBLE,
        });

        await expect(jwtOutput).toHaveValue(testJwt.jwt);

        await checkJwtStatusBarMessage({
          page,
          type: MessageTypeValue.WARNING,
          status: MessageStatusValue.VISIBLE,
        });

        return;
      }

      const secretKeyEditorInput = secretKeyEditor.getByRole("textbox");

      if (isHmacAlg(option) && testJwt.type === "hmac") {
        const tokenWithUtf8Secret = (testJwt as JwtSignedWithHmacModel)
          .withUtf8Secret;
        const tokenWithBase64urlSecret = (testJwt as JwtSignedWithHmacModel)
          .withBase64urlSecret;

        await headerEditorInput.fill(tokenWithUtf8Secret.header);

        await checkHeaderEditorStatusBarMessage({
          page,
          type: MessageTypeValue.SUCCESS,
          status: MessageStatusValue.VISIBLE,
        });

        await payloadEditorInput.fill(tokenWithUtf8Secret.payload);

        await checkPayloadEditorStatusBarMessage({
          page,
          type: MessageTypeValue.SUCCESS,
          status: MessageStatusValue.VISIBLE,
        });

        await secretKeyEditorInput.fill(tokenWithUtf8Secret.secret);

        await checkSecretKeyEncoderEditorStatusBarMessage({
          page,
          type: MessageTypeValue.SUCCESS,
          status: MessageStatusValue.VISIBLE,
        });

        await expect(jwtOutput).toHaveValue(tokenWithUtf8Secret.jwt);

        const formatPicker = secretKeyEditor.locator(
          ".react-select__single-value",
        );
        await formatPicker.click();

        await page
          .getByRole("option", {
            name: tokenWithBase64urlSecret.secretEncoding,
          })
          .click();

        await checkSecretKeyEncoderEditorStatusBarMessage({
          page,
          type: MessageTypeValue.ERROR,
          status: MessageStatusValue.VISIBLE,
        });

        await secretKeyEditorInput.fill(tokenWithBase64urlSecret.secret);

        await checkSecretKeyEncoderEditorStatusBarMessage({
          page,
          type: MessageTypeValue.SUCCESS,
          status: MessageStatusValue.VISIBLE,
        });

        await expect(jwtOutput).toHaveValue(tokenWithBase64urlSecret.jwt);

        return;
      }

      if (isDigitalSignatureAlg(option) && testJwt.type === "digital") {
        const tokenWithPemKey = (testJwt as JwtSignedWithDigitalModel)
          .withPemKey;
        const tokenWithJwkKey = (testJwt as JwtSignedWithDigitalModel)
          .withJwkKey;

        await headerEditorInput.fill(tokenWithPemKey.header);

        await checkHeaderEditorStatusBarMessage({
          page,
          type: MessageTypeValue.SUCCESS,
          status: MessageStatusValue.VISIBLE,
        });

        await payloadEditorInput.fill(tokenWithPemKey.payload);

        await checkPayloadEditorStatusBarMessage({
          page,
          type: MessageTypeValue.SUCCESS,
          status: MessageStatusValue.VISIBLE,
        });

        await secretKeyEditorInput.fill(tokenWithPemKey.privateKey);

        await checkSecretKeyEncoderEditorStatusBarMessage({
          page,
          type: MessageTypeValue.SUCCESS,
          status: MessageStatusValue.VISIBLE,
        });

        if (option.includes("RS")) {
          await expect(jwtOutput).toHaveValue(tokenWithPemKey.jwt);
        } else {
          await expect(jwtOutput).toHaveValue(
            /^[A-Za-z0-9_-]*\.[A-Za-z0-9_-]*\.[A-Za-z0-9_-]*$/,
          );
        }

        const formatPicker = secretKeyEditor.locator(
          ".react-select__single-value",
        );
        await formatPicker.click();

        await page
          .getByRole("option", {
            name: tokenWithJwkKey.privateKeyFormat,
          })
          .click();

        await checkSecretKeyEncoderEditorStatusBarMessage({
          page,
          type: MessageTypeValue.ERROR,
          status: MessageStatusValue.VISIBLE,
        });

        await secretKeyEditorInput.fill(
          JSON.stringify(tokenWithJwkKey.privateKey, null, 2),
        );

        await checkSecretKeyEncoderEditorStatusBarMessage({
          page,
          type: MessageTypeValue.SUCCESS,
          status: MessageStatusValue.VISIBLE,
        });

        if (option.includes("RS")) {
          await expect(jwtOutput).toHaveValue(tokenWithJwkKey.jwt);
        } else {
          await expect(jwtOutput).toHaveValue(
            /^[A-Za-z0-9_-]*\.[A-Za-z0-9_-]*\.[A-Za-z0-9_-]*$/,
          );
        }

        return;
      }
    });
  });
});
