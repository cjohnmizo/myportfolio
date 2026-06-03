import { NextResponse } from "next/server";

export const dynamic = "force-static";

function buildPayload() {
  return {
    status: "ok",
    timestamp: new Date().toISOString(),
    environment: process.env.VERCEL_ENV ?? "local",
    region: process.env.VERCEL_REGION ?? null,
    revision: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? "development",
    checks: {
      app: "ok",
      content: "static",
      backend: "removed",
    },
  };
}

export async function GET() {
  return NextResponse.json(buildPayload(), {
    headers: {
      "Cache-Control": "public, max-age=300",
    },
  });
}

export async function HEAD() {
  return new NextResponse(null, {
    headers: {
      "Cache-Control": "public, max-age=300",
    },
  });
}
