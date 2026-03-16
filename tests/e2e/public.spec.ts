import { expect, test } from "@playwright/test";

test("homepage renders key recruiter-facing content", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("link", { name: /Explore case studies/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Archive/i })).toBeVisible();
  await expect(page.locator("main")).toContainText("About");
  await expect(page.locator("main")).toContainText("Contact");
});

test("project archive search shows empty-state feedback and recovers", async ({ page }) => {
  await page.goto("/projects");

  await expect(
    page.getByRole("heading", {
      name: /Searchable case studies with category filters and flexible sorting/i,
    }),
  ).toBeVisible();

  const searchInput = page.getByLabel("Search projects");
  await searchInput.fill("zzzz-no-project-should-match-this");
  await expect(page.getByText("No projects match that filter.")).toBeVisible();

  await searchInput.fill("");
  await expect(page.locator('a[href^="/projects/"]').first()).toBeVisible();
});
