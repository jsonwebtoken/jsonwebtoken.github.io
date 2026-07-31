import { expect, test } from "@playwright/test";
import { E2E_BASE_URL } from "./e2e.utils";

test("filters libraries by ML-DSA algorithm", async ({ page }) => {
  await page.goto(`${E2E_BASE_URL}/libraries`);

  const filterBy = page.getByRole("combobox", {
    name: "Debugger picker",
  });
  await expect(filterBy).toBeVisible();
  await page.getByText("All", { exact: true }).click();

  for (const algorithm of ["ML-DSA-44", "ML-DSA-65", "ML-DSA-87"]) {
    await expect(
      page.getByRole("option", { name: algorithm, exact: true }),
    ).toBeVisible();
  }

  await page.getByRole("option", { name: "ML-DSA-44", exact: true }).click();

  await expect(page).toHaveURL(`${E2E_BASE_URL}/libraries?algorithm=ml-dsa-44`);
  await expect(page.getByText("panva/jose", { exact: true })).toHaveCount(4);
});
