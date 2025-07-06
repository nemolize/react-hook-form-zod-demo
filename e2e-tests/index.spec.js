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
  const numberInput = page.getByLabel("Enter a number (0-100)");
  const submitButton = page.getByRole("button", { name: "Submit" });

  await expect(numberInput).toBeVisible();
  await expect(submitButton).toBeVisible();

  // Test validation - invalid number (too high)
  await numberInput.fill("150");
  await submitButton.click();
  await expect(
    page.getByText("Number must be less than or equal to 100"),
  ).toBeVisible();

  // Test validation - invalid number (negative)
  await numberInput.clear();
  await numberInput.fill("-5");
  await submitButton.click();
  await expect(
    page.getByText("Number must be greater than or equal to 0"),
  ).toBeVisible();

  // Test valid submission
  await numberInput.clear();
  await numberInput.fill("50");
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
  await submitButton.click();
  // Empty number input will show default Zod error
  await expect(page.getByText("Expected number, received nan")).toBeVisible();

  // Test watched value display
  await numberInput.clear();
  await numberInput.fill("25");
  await expect(page.getByText("Current value (watched):")).toBeVisible();
  await expect(page.getByText("25")).toBeVisible();

  // Test submitted value display
  await submitButton.click();
  await expect(page.getByText("Last submitted value:")).toBeVisible();
  await expect(page.getByText("25").nth(1)).toBeVisible();
});
