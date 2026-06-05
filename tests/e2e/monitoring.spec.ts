import { expect, test } from "@playwright/test";

test("health endpoint reports deployment status", async ({ request }) => {
  const response = await request.get("/api/health");

  expect(response.ok()).toBeTruthy();

  const payload = await response.json();
  expect(payload.status).toBe("ok");
  expect(payload.checks.app).toBe("ok");
  expect(payload.checks.content).toBe("static");
  expect(payload.checks.backend).toBe("removed");
});

test("security.txt is available for responsible disclosure", async ({
  request,
}) => {
  const response = await request.get("/.well-known/security.txt");

  expect(response.ok()).toBeTruthy();

  const body = await response.text();
  expect(body).toContain("Contact:");
  expect(body).toContain("Canonical:");
});

test("contact endpoint rejects invalid payloads", async ({ request }) => {
  const response = await request.post("/api/contact", {
    data: {
      name: "",
      email: "not-an-email",
      subject: "",
      message: "",
    },
  });

  expect(response.status()).toBe(400);
});
