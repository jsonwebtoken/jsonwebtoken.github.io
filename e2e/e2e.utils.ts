import { expect, Page } from "@playwright/test";
import { dataTestidDictionary } from "@/libs/testing/data-testid.dictionary";
import { MessageStatusValue, MessageTypeValue } from "./e2e.values";

export const E2E_BASE_URL = "http://localhost:1234";

export const getLang = async (page: Page) =>
  await page.locator("html").getAttribute("lang");

export function expectToBeDefined<T>(value: T | undefined): asserts value is T {
  expect(value).toBeDefined();
}

export function expectToBeNonNull<T>(value: T | null): asserts value is T {
  expect(value).not.toBeNull();
}

export const getDecoderJwtEditor = (page: Page) =>
  page.getByTestId(dataTestidDictionary.decoder.jwtEditor.id);

export const getDecoderJwtEditorInput = (page: Page) =>
  page
    .getByTestId(dataTestidDictionary.decoder.jwtEditor.id)
    .getByRole("textbox");

interface CheckMessageParams {
  page: Page;
  type: MessageTypeValue;
  status: MessageStatusValue;
}

export const checkJwtEditorStatusBarMessage = async ({
  page,
  type,
  status,
}: CheckMessageParams) => {
  const jwtEditor = page.getByTestId(dataTestidDictionary.decoder.jwtEditor.id);

  if (type === MessageTypeValue.SUCCESS) {
    const successMessage = jwtEditor.getByTestId(
      dataTestidDictionary.decoder.jwtEditor.statusBar.success.id,
    );

    status === MessageStatusValue.VISIBLE
      ? await expect(successMessage).toBeVisible()
      : await expect(successMessage).not.toBeVisible();
  }

  if (type === MessageTypeValue.WARNING) {
    const warningMessage = jwtEditor.getByTestId(
      dataTestidDictionary.decoder.jwtEditor.statusBar.warning.id,
    );

    status === MessageStatusValue.VISIBLE
      ? await expect(warningMessage).toBeVisible()
      : await expect(warningMessage).not.toBeVisible();
  }

  if (type === MessageTypeValue.ERROR) {
    const errorMessage = jwtEditor.getByTestId(
      dataTestidDictionary.decoder.jwtEditor.statusBar.error.id,
    );

    status === MessageStatusValue.VISIBLE
      ? await expect(errorMessage).toBeVisible()
      : await expect(errorMessage).not.toBeVisible();
  }
};

export const checkJwtEditorNotificationBarMessage = async ({
  page,
  type,
  status,
}: CheckMessageParams) => {
  const jwtEditor = page.getByTestId(dataTestidDictionary.decoder.jwtEditor.id);

  if (type === MessageTypeValue.SUCCESS) {
    const successMessage = jwtEditor.getByTestId(
      dataTestidDictionary.decoder.jwtEditor.notificationBar.success.id,
    );

    status === MessageStatusValue.VISIBLE
      ? await expect(successMessage).toBeVisible()
      : await expect(successMessage).not.toBeVisible();
  }

  if (type === MessageTypeValue.WARNING) {
    const warningMessage = jwtEditor.getByTestId(
      dataTestidDictionary.decoder.jwtEditor.notificationBar.warning.id,
    );

    status === MessageStatusValue.VISIBLE
      ? await expect(warningMessage).toBeVisible()
      : await expect(warningMessage).not.toBeVisible();
  }

  if (type === MessageTypeValue.ERROR) {
    const errorMessage = jwtEditor.getByTestId(
      dataTestidDictionary.decoder.jwtEditor.notificationBar.error.id,
    );

    status === MessageStatusValue.VISIBLE
      ? await expect(errorMessage).toBeVisible()
      : await expect(errorMessage).not.toBeVisible();
  }
};

export const checkSecretKeyDecoderEditorStatusBarMessage = async ({
  page,
  type,
  status,
}: CheckMessageParams) => {
  const secretKeyEditor = page.getByTestId(
    dataTestidDictionary.decoder.secretKeyEditor.id,
  );

  if (type === MessageTypeValue.SUCCESS) {
    const successMessage = secretKeyEditor.getByTestId(
      dataTestidDictionary.decoder.secretKeyEditor.statusBar.success.id,
    );

    status === MessageStatusValue.VISIBLE
      ? await expect(successMessage).toBeVisible()
      : await expect(successMessage).not.toBeVisible();
  }

  if (type === MessageTypeValue.WARNING) {
    const warningMessage = secretKeyEditor.getByTestId(
      dataTestidDictionary.decoder.secretKeyEditor.statusBar.warning.id,
    );

    status === MessageStatusValue.VISIBLE
      ? await expect(warningMessage).toBeVisible()
      : await expect(warningMessage).not.toBeVisible();
  }

  if (type === MessageTypeValue.ERROR) {
    const errorMessage = secretKeyEditor.getByTestId(
      dataTestidDictionary.decoder.secretKeyEditor.statusBar.error.id,
    );

    status === MessageStatusValue.VISIBLE
      ? await expect(errorMessage).toBeVisible()
      : await expect(errorMessage).not.toBeVisible();
  }
};

interface CheckMessageParams {
  page: Page;
  type: MessageTypeValue;
  status: MessageStatusValue;
}

export const checkHeaderEditorStatusBarMessage = async ({
  page,
  type,
  status,
}: CheckMessageParams) => {
  const headerEditor = page
    .getByTestId(dataTestidDictionary.encoder.headerEditor.id)
    .first();

  if (type === MessageTypeValue.SUCCESS) {
    const successMessage = headerEditor
      .getByTestId(
        dataTestidDictionary.encoder.headerEditor.statusBar.success.id,
      )
      .first();

    status === MessageStatusValue.VISIBLE
      ? await expect(successMessage).toBeVisible()
      : await expect(successMessage).not.toBeVisible();
  }

  if (type === MessageTypeValue.WARNING) {
    const warningMessage = headerEditor.getByTestId(
      dataTestidDictionary.encoder.headerEditor.statusBar.warning.id,
    );

    status === MessageStatusValue.VISIBLE
      ? await expect(warningMessage).toBeVisible()
      : await expect(warningMessage).not.toBeVisible();
  }

  if (type === MessageTypeValue.ERROR) {
    const errorMessage = headerEditor.getByTestId(
      dataTestidDictionary.encoder.headerEditor.statusBar.error.id,
    );

    status === MessageStatusValue.VISIBLE
      ? await expect(errorMessage).toBeVisible()
      : await expect(errorMessage).not.toBeVisible();
  }
};

export const checkPayloadEditorStatusBarMessage = async ({
  page,
  type,
  status,
}: CheckMessageParams) => {
  const payloadEditor = page.getByTestId(
    dataTestidDictionary.encoder.payloadEditor.id,
  );

  if (type === MessageTypeValue.SUCCESS) {
    const successMessage = payloadEditor.getByTestId(
      dataTestidDictionary.encoder.payloadEditor.statusBar.success.id,
    );

    status === MessageStatusValue.VISIBLE
      ? await expect(successMessage).toBeVisible()
      : await expect(successMessage).not.toBeVisible();
  }

  if (type === MessageTypeValue.WARNING) {
    const warningMessage = payloadEditor.getByTestId(
      dataTestidDictionary.encoder.payloadEditor.statusBar.warning.id,
    );

    status === MessageStatusValue.VISIBLE
      ? await expect(warningMessage).toBeVisible()
      : await expect(warningMessage).not.toBeVisible();
  }

  if (type === MessageTypeValue.ERROR) {
    const errorMessage = payloadEditor.getByTestId(
      dataTestidDictionary.encoder.payloadEditor.statusBar.error.id,
    );

    status === MessageStatusValue.VISIBLE
      ? await expect(errorMessage).toBeVisible()
      : await expect(errorMessage).not.toBeVisible();
  }
};

export const checkSecretKeyEncoderEditorStatusBarMessage = async ({
  page,
  type,
  status,
}: CheckMessageParams) => {
  const secretKeyEditor = page.getByTestId(
    dataTestidDictionary.encoder.secretKeyEditor.id,
  );

  if (type === MessageTypeValue.SUCCESS) {
    const successMessage = secretKeyEditor.getByTestId(
      dataTestidDictionary.encoder.secretKeyEditor.statusBar.success.id,
    );

    status === MessageStatusValue.VISIBLE
      ? await expect(successMessage).toBeVisible()
      : await expect(successMessage).not.toBeVisible();
  }

  if (type === MessageTypeValue.WARNING) {
    const warningMessage = secretKeyEditor.getByTestId(
      dataTestidDictionary.encoder.secretKeyEditor.statusBar.warning.id,
    );

    status === MessageStatusValue.VISIBLE
      ? await expect(warningMessage).toBeVisible()
      : await expect(warningMessage).not.toBeVisible();
  }

  if (type === MessageTypeValue.ERROR) {
    const errorMessage = secretKeyEditor.getByTestId(
      dataTestidDictionary.encoder.secretKeyEditor.statusBar.error.id,
    );

    status === MessageStatusValue.VISIBLE
      ? await expect(errorMessage).toBeVisible()
      : await expect(errorMessage).not.toBeVisible();
  }
};

export const checkJwtStatusBarMessage = async ({
  page,
  type,
  status,
}: CheckMessageParams) => {
  const jwt = page.getByTestId(dataTestidDictionary.encoder.jwt.id);

  if (type === MessageTypeValue.SUCCESS) {
    const successMessage = jwt.getByTestId(
      dataTestidDictionary.encoder.jwt.statusBar.success.id,
    );

    status === MessageStatusValue.VISIBLE
      ? await expect(successMessage).toBeVisible()
      : await expect(successMessage).not.toBeVisible();
  }

  if (type === MessageTypeValue.WARNING) {
    const warningMessage = jwt.getByTestId(
      dataTestidDictionary.encoder.jwt.statusBar.warning.id,
    );

    status === MessageStatusValue.VISIBLE
      ? await expect(warningMessage).toBeVisible()
      : await expect(warningMessage).not.toBeVisible();
  }

  if (type === MessageTypeValue.ERROR) {
    const errorMessage = jwt.getByTestId(
      dataTestidDictionary.encoder.jwt.statusBar.error.id,
    );

    status === MessageStatusValue.VISIBLE
      ? await expect(errorMessage).toBeVisible()
      : await expect(errorMessage).not.toBeVisible();
  }
};

export const switchToEncoderTab = async (page: Page) => {
  const debuggerWidget = page.getByTestId(dataTestidDictionary.debugger.id);

  await debuggerWidget
    .getByTestId(dataTestidDictionary.debugger.encoderTab.id)
    .click();
};
