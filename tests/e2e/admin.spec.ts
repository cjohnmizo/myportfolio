import { expect, test } from "@playwright/test";

const adminEmail = process.env.PLAYWRIGHT_ADMIN_EMAIL ?? process.env.ADMIN_EMAIL;
const adminPassword = process.env.PLAYWRIGHT_ADMIN_PASSWORD;

test("admin login page renders without public navigation exposure", async ({ page }) => {
  await page.goto("/admin/login");

  await expect(page.getByRole("heading", { name: /Sign in to the CMS/i })).toBeVisible();
  await expect(page.getByRole("link", { name: "Archive" })).toHaveCount(0);
});

test("admin can sign in to the dashboard and sign out", async ({ page }) => {
  test.skip(
    !adminEmail || !adminPassword,
    "Set PLAYWRIGHT_ADMIN_EMAIL and PLAYWRIGHT_ADMIN_PASSWORD to run the authenticated admin flow.",
  );

  await page.goto("/admin/login");
  await page.getByLabel("Email").fill(adminEmail!);
  await page.getByLabel("Password").fill(adminPassword!);
  await page.getByRole("button", { name: /Sign in/i }).click();

  await page.waitForURL("**/admin/dashboard");
  await expect(page.getByRole("heading", { name: /Content command center/i })).toBeVisible();

  await page.getByRole("button", { name: /Sign out/i }).click();
  await page.waitForURL("**/admin/login");
  await expect(page.getByRole("heading", { name: /Sign in to the CMS/i })).toBeVisible();
});
