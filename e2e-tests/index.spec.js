import { expect, test } from "@playwright/test";

test("should load the number input demo page", async ({ page }) => {
  await page.goto("/");

  // Check page title
  await expect(page).toHaveTitle("Web App Template");

  // Check that the main heading is present
  await expect(
    page.getByRole("heading", {
      name: "React Hook Form + Zod: Value Transformation Approaches",
    }),
  ).toBeVisible();

  // Check section heading
  await expect(
    page.getByRole("heading", { name: "Compare Approaches:" }),
  ).toBeVisible();

  // Check form elements using role attributes
  const numberInput = page.getByRole("spinbutton", {
    name: "setValueAs approach",
  });
  const numberInputPreprocess = page.getByRole("spinbutton", {
    name: "z.preprocess approach",
  });
  const submitButton = page.getByRole("button", { name: "Submit" });
  await expect(numberInput).toBeVisible();
  await expect(numberInputPreprocess).toBeVisible();
  await expect(submitButton).toBeVisible();

  // Test input validation for setValueAs approach
  await numberInput.fill("101"); // Over the limit
  await expect(
    page.getByText("Number must be less than or equal to 100"),
  ).toBeVisible();

  await numberInput.fill("-1"); // Under the limit
  await expect(
    page.getByText("Number must be greater than or equal to 0"),
  ).toBeVisible();

  await numberInput.fill("50"); // Valid number
  await expect(
    page.getByText("Number must be greater than or equal to 0"),
  ).not.toBeVisible();

  // Test input validation for z.preprocess approach
  await numberInputPreprocess.fill("101"); // Over the limit
  await expect(
    page.getByText("Number must be less than or equal to 100"),
  ).toBeVisible();

  await numberInputPreprocess.fill("-1"); // Under the limit
  await expect(
    page.getByText("Number must be greater than or equal to 0"),
  ).toBeVisible();

  await numberInputPreprocess.fill("50"); // Valid number
  await expect(
    page.getByText("Number must be greater than or equal to 0"),
  ).not.toBeVisible();

  // Clear inputs to test empty state
  await numberInput.clear();
  await numberInputPreprocess.clear();

  // Test watched value display section
  await expect(page.getByText("Watched values:")).toBeVisible();

  // Test watched value display with numbers
  await numberInput.fill("25");
  await numberInputPreprocess.fill("35");

  // Test form submission
  await submitButton.click();
  await expect(page.getByText("Last submitted values:")).toBeVisible();

  // Test submitting empty values
  await numberInput.clear();
  await numberInputPreprocess.clear();
  await submitButton.click();
});
