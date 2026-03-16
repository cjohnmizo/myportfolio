import { NextResponse } from "next/server";

import { env } from "@/lib/env";
import { createServiceRoleSupabaseClient } from "@/lib/supabase/service";

export const dynamic = "force-dynamic";

async function getDatabaseStatus() {
  if (!env.isSupabaseConfigured) {
    return { status: "demo" as const };
  }

  if (!env.isServiceRoleConfigured) {
    return { status: "public-read-only" as const };
  }

  const client = createServiceRoleSupabaseClient();

  if (!client) {
    return { status: "public-read-only" as const };
  }

  const { error } = await client.from("site_settings").select("id").limit(1);

  if (error) {
    return {
      status: "error" as const,
      message: error.message,
    };
  }

  return { status: "ok" as const };
}

function buildPayload(database: Awaited<ReturnType<typeof getDatabaseStatus>>) {
  return {
    status: database.status === "error" ? "degraded" : "ok",
    timestamp: new Date().toISOString(),
    environment: process.env.VERCEL_ENV ?? "local",
    region: process.env.VERCEL_REGION ?? null,
    revision: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? "development",
    checks: {
      app: "ok",
      publicSupabase: env.isSupabaseConfigured ? "configured" : "demo",
      adminWrites: env.isServiceRoleConfigured ? "configured" : "disabled",
      database: database.status,
    },
    message: database.status === "error" ? database.message : undefined,
  };
}

export async function GET() {
  const database = await getDatabaseStatus();
  const payload = buildPayload(database);

  return NextResponse.json(payload, {
    status: database.status === "error" ? 503 : 200,
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}

export async function HEAD() {
  const database = await getDatabaseStatus();

  return new NextResponse(null, {
    status: database.status === "error" ? 503 : 200,
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
