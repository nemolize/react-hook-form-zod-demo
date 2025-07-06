import { expect, test } from "@playwright/test";

test("should load the number input demo page", async ({ page }) => {
  await page.goto("/");

  // Check page title
  await expect(page).toHaveTitle("Web App Template");

  // Check that the number input demo content is present
  await expect(
    page.getByRole("heading", { name: "Number Input Demo" }),
  ).toBeVisible();

  // Check form elements
  const numberInput = page.getByLabel(
    "Enter a number (0-100) - setValueAs approach",
  );
  const numberInputPreprocess = page.getByLabel(
    "Enter a number (0-100) - z.preprocess approach",
  );
  const submitButton = page.getByRole("button", { name: "Submit" });

  await expect(numberInput).toBeVisible();
  await expect(numberInputPreprocess).toBeVisible();
  await expect(submitButton).toBeVisible();

  // Test validation - invalid number (too high) on both inputs
  await numberInput.fill("150");
  await numberInputPreprocess.fill("150");
  await submitButton.click();
  await expect(
    page.getByText("Number must be less than or equal to 100").first(),
  ).toBeVisible();

  // Test validation - invalid number (negative) on both inputs
  await numberInput.clear();
  await numberInput.fill("-5");
  await numberInputPreprocess.clear();
  await numberInputPreprocess.fill("-5");
  await submitButton.click();
  await expect(
    page.getByText("Number must be greater than or equal to 0").first(),
  ).toBeVisible();

  // Test valid submission
  await numberInput.clear();
  await numberInput.fill("50");
  await numberInputPreprocess.clear();
  await numberInputPreprocess.fill("75");
  await submitButton.click();
  // Since the form just logs to console, we verify no error messages are shown
  await expect(
    page.getByText("Number must be less than or equal to 100"),
  ).not.toBeVisible();
  await expect(
    page.getByText("Number must be greater than or equal to 0"),
  ).not.toBeVisible();

  // Test empty submission
  await numberInput.clear();
  await numberInputPreprocess.clear();
  await submitButton.click();
  // Empty number inputs will be converted to null and pass validation
  await expect(
    page.getByText("Expected number, received nan"),
  ).not.toBeVisible();

  // Test watched value display with empty inputs (should show null)
  await expect(page.getByText("setValueAs input (watched):")).toBeVisible();
  await expect(page.getByText("z.preprocess input (watched):")).toBeVisible();
  await expect(page.getByText("null").first()).toBeVisible();

  // Test watched value display with numbers
  await numberInput.fill("25");
  await numberInputPreprocess.fill("35");
  await expect(page.getByText("25")).toBeVisible();
  await expect(page.getByText("35")).toBeVisible();

  // Test submitted value display
  await submitButton.click();
  await expect(page.getByText("Last submitted values:")).toBeVisible();
  await expect(page.getByText('"numberInput": 25')).toBeVisible();
  await expect(page.getByText('"numberInputPreprocess": 35')).toBeVisible();

  // Test submitting empty values (should show null)
  await numberInput.clear();
  await numberInputPreprocess.clear();
  await submitButton.click();
  await expect(page.getByText('"numberInput": null')).toBeVisible();
  await expect(page.getByText('"numberInputPreprocess": null')).toBeVisible();
});
