import { expect, test } from "@playwright/test";

test("homepage renders key recruiter-facing content", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(
    page.getByRole("button", { name: /Enter Portfolio/i }),
  ).toBeVisible();
  await expect(page.locator("main")).toContainText(
    "Building practical digital systems",
  );

  await page.goto("/home");

  await expect(
    page.getByRole("link", { name: /View Mission Archive/i }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Start a Project", exact: true }),
  ).toBeVisible();
  await expect(page.locator("main")).toContainText("Command Center");
  await expect(page.locator("main")).toContainText("Mission Archive");
});

test("project mission archive exposes case-file routes", async ({ page }) => {
  await page.goto("/projects");

  await expect(
    page.getByRole("heading", {
      name: /Project case files with real context/i,
    }),
  ).toBeVisible();

  await expect(
    page.getByRole("link", { name: /Open Mission File/i }).first(),
  ).toBeVisible();
  await expect(
    page.locator('a[href="/projects/liankhawpui"]').first(),
  ).toBeVisible();
});
