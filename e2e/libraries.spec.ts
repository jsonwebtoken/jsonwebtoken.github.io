import { expect, test } from "@playwright/test";
import { E2E_BASE_URL } from "./e2e.utils";

test("filters libraries by ML-DSA algorithm", async ({ page }) => {
  await page.goto(`${E2E_BASE_URL}/libraries`);

  const filterByControl = page
    .locator(".react-select__single-value")
    .filter({ hasText: "All" })
    .locator('xpath=ancestor::div[contains(@class, "react-select__control")]');
  await filterByControl.click();

  const listbox = page.getByRole("listbox");

  for (const algorithm of ["ML-DSA-44", "ML-DSA-65", "ML-DSA-87"]) {
    await expect(
      listbox.getByRole("option", { name: algorithm, exact: true }),
    ).toBeVisible();
  }

  await listbox
    .getByRole("option", { name: "ML-DSA-44", exact: true })
    .click();

  await expect(page).toHaveURL(
    `${E2E_BASE_URL}/libraries?algorithm=ml-dsa-44`,
    { timeout: 15_000 },
  );
  await expect(page.getByText("panva/jose", { exact: true })).toHaveCount(4);
});
