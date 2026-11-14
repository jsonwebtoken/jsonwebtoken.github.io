import { expect, test } from "@playwright/test";
import { dataTestidDictionary } from "@/libs/testing/data-testid.dictionary";
import { getPickersUiDictionary } from "@/features/localization/services/ui-language-dictionary.service";
import {
  checkHeaderEditorStatusBarMessage,
  checkJwtEditorNotificationBarMessage,
  checkJwtEditorStatusBarMessage,
  checkPayloadEditorStatusBarMessage,
  E2E_BASE_URL,
  expectToBeNonNull,
  getLang,
  hasMlDsaSupport,
  switchToEncoderTab,
} from "./e2e.utils";
import { MessageStatusValue, MessageTypeValue } from "./e2e.values";
import { mlDsaAlgorithms } from "@/features/common/values/jws-alg-header-parameter-values.dictionary";

test("Can load decoded header and decoded payload from the JWT Decoder as inputs into the JWT Encoder", async ({
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

  await switchToEncoderTab(page);

  const encoderWidget = page.getByTestId(dataTestidDictionary.encoder.id);

  const headerEditor = encoderWidget
    .getByTestId(dataTestidDictionary.encoder.headerEditor.id)
    .first();
  const payloadEditor = encoderWidget.getByTestId(
    dataTestidDictionary.encoder.payloadEditor.id,
  );

  await expect(headerEditor.getByRole("textbox")).toHaveValue(
    JSON.stringify(expectedDecodedHeader, null, 2),
  );

  await expect(payloadEditor.getByRole("textbox")).toHaveValue(
    JSON.stringify(expectedDecodedPayload, null, 2),
  );

  await checkHeaderEditorStatusBarMessage({
    page,
    type: MessageTypeValue.ERROR,
    status: MessageStatusValue.VISIBLE,
  });

  await checkPayloadEditorStatusBarMessage({
    page,
    type: MessageTypeValue.SUCCESS,
    status: MessageStatusValue.VISIBLE,
  });
});

test("Can decode a single jwt piece and load it as input into the jwt encoded header", async ({
  page,
}) => {
  const jwtWithHeaderSegmentOnly = "eyJhbGciOiJCUDI1NlIxIiwidHlwIjoiYXQrSldUIiwia2lkIjoic2lnIn0"
  const expectedDecodedHeader = {
    alg: "BP256R1",
    typ: "at+JWT",
    kid: "sig",
  };

  await page.goto(E2E_BASE_URL);

  const lang = await getLang(page);
  expectToBeNonNull(lang);

  const decoderWidget = page.getByTestId(dataTestidDictionary.decoder.id);

  const jwtEditor = decoderWidget.getByTestId(
    dataTestidDictionary.decoder.jwtEditor.id,
  );
  const jwtEditorInput = jwtEditor.getByRole("textbox");

  await jwtEditorInput.fill(jwtWithHeaderSegmentOnly);

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
  ).toBeEmpty();

  const secretKeyEditor = decoderWidget.getByTestId(
    dataTestidDictionary.decoder.secretKeyEditor.id,
  );

  await expect(secretKeyEditor).not.toBeVisible();

  await switchToEncoderTab(page);

  const encoderWidget = page.getByTestId(dataTestidDictionary.encoder.id);

  const headerEditor = encoderWidget
    .getByTestId(dataTestidDictionary.encoder.headerEditor.id)
    .first();
  const payloadEditor = encoderWidget.getByTestId(
    dataTestidDictionary.encoder.payloadEditor.id,
  );

  await expect(headerEditor.getByRole("textbox")).toHaveValue(
    JSON.stringify(expectedDecodedHeader, null, 2),
  );

  await expect(payloadEditor.getByRole("textbox")).toBeEmpty();

  await checkHeaderEditorStatusBarMessage({
    page,
    type: MessageTypeValue.ERROR,
    status: MessageStatusValue.VISIBLE,
  });

  await checkPayloadEditorStatusBarMessage({
    page,
    type: MessageTypeValue.ERROR,
    status: MessageStatusValue.VISIBLE,
  });

  const encoderSecretKeyEditor = decoderWidget.getByTestId(
    dataTestidDictionary.encoder.secretKeyEditor.id,
  );

  await expect(encoderSecretKeyEditor).not.toBeVisible();
});

test("ML-DSA examples are enabled only when the browser supports them", async ({
  browserName,
  page,
}) => {
  await page.goto(E2E_BASE_URL);

  const algorithmPicker = page.getByRole("combobox", {
    name: "Debugger picker",
  });
  const algorithmPickerRegion = page
    .getByRole("region")
    .filter({ has: algorithmPicker });
  const lang = await getLang(page);
  expectToBeNonNull(lang);
  const pickersUiDictionary = getPickersUiDictionary(lang);
  await expect(algorithmPickerRegion).toHaveAttribute("aria-busy", "false");
  await page
    .getByText(pickersUiDictionary.exampleAlgPicker.defaultValue)
    .click();

  for (const algorithm of mlDsaAlgorithms) {
    const isSupported = await hasMlDsaSupport(page, algorithm);

    expect(isSupported).toBe(browserName === "chromium");
    await expect(
      page.getByRole("option", { name: algorithm, exact: true }),
    ).toHaveAttribute("aria-disabled", String(!isSupported));
  }
});
