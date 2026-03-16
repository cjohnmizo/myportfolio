import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export async function GET() {
  const expires = new Date();
  expires.setMonth(expires.getMonth() + 12);

  const body = [
    `Contact: mailto:${siteConfig.adminEmail ?? "security@cjohnmizo.in"}`,
    `Canonical: ${siteConfig.url}/.well-known/security.txt`,
    `Policy: ${siteConfig.url}`,
    `Expires: ${expires.toISOString()}`,
    "Preferred-Languages: en",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Cache-Control": "public, max-age=3600",
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
