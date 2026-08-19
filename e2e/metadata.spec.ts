import { expect, test } from "@playwright/test";
import { E2E_BASE_URL } from "./e2e.utils";

const EXPECTED_WEB_CRYPTO_PQC_ORIGIN_TRIAL_TOKEN =
  "AnishhJF49gYd6FyezhA4gjpUPHOtlKPeoII1gtrsUrI6G1WVbIvL1AkNsBe9GQgen/8TIHHpWa8I8nFjbZObwMAAABneyJvcmlnaW4iOiJodHRwczovL3d3dy5qd3QuaW86NDQzIiwiZmVhdHVyZSI6IldlYkNyeXB0b0FkZGl0aW9uYWxBbGdvcml0aG1zMjAyNjA2IiwiZXhwaXJ5IjoxNzkyNDU0NDAwfQ==";

test("includes the WebCrypto PQC origin-trial token", async ({ page }) => {
  await page.goto(E2E_BASE_URL);

  const meta = page.locator('head meta[http-equiv="origin-trial"]');

  await expect(meta).toHaveCount(1);
  await expect(meta).toHaveAttribute(
    "content",
    EXPECTED_WEB_CRYPTO_PQC_ORIGIN_TRIAL_TOKEN,
  );
});
