import { headers } from "next/headers";
import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/types/supabase";

const ADMIN_AUTH_THROTTLE_WINDOW_MINUTES = 15;
const MAX_FAILED_ATTEMPTS_PER_EMAIL = 5;
const MAX_FAILED_ATTEMPTS_PER_IP = 10;
const THROTTLED_EVENT_TYPES = ["sign_in_failed", "sign_in_blocked"] as const;
let auditLogAvailability: "unknown" | "available" | "missing" = "unknown";

type ServiceRoleClient = SupabaseClient<Database>;
type AdminAuthEventType =
  | "sign_in_succeeded"
  | "sign_in_failed"
  | "sign_in_blocked"
  | "sign_out";

export interface AdminAuthRequestContext {
  email: string | null;
  ipAddress: string | null;
  userAgent: string | null;
}

export const adminSignInThrottleMessage =
  "Too many sign-in attempts. Try again in 15 minutes.";

function markAuditLogUnavailable() {
  if (auditLogAvailability !== "missing") {
    console.warn(
      "Admin auth audit logging is inactive because public.admin_auth_audit_log is not available yet. Apply the latest Supabase migration to enable throttling and audit history.",
    );
  }

  auditLogAvailability = "missing";
}

function isAuditLogMissing(error: { code?: string | null; message?: string | null }) {
  return error.code === "PGRST205";
}

function normalizeEmail(email?: string | null) {
  if (!email) {
    return null;
  }

  const normalized = email.trim().toLowerCase();
  return normalized.length > 0 ? normalized : null;
}

function getIpAddress(forwardedForHeader: string | null, realIpHeader: string | null) {
  const forwardedIp = forwardedForHeader
    ?.split(",")
    .map((value) => value.trim())
    .find(Boolean);

  if (forwardedIp) {
    return forwardedIp;
  }

  const realIp = realIpHeader?.trim();
  return realIp ? realIp : null;
}

async function countRecentFailedAttempts(
  client: ServiceRoleClient,
  column: "email" | "ip_address",
  value: string,
  windowStartIso: string,
) {
  if (auditLogAvailability === "missing") {
    return 0;
  }

  const { count, error } = await client
    .from("admin_auth_audit_log")
    .select("id", { count: "exact", head: true })
    .eq(column, value)
    .in("event_type", [...THROTTLED_EVENT_TYPES])
    .gte("created_at", windowStartIso);

  if (error) {
    if (isAuditLogMissing(error)) {
      markAuditLogUnavailable();
      return 0;
    }

    console.error(`Unable to count admin auth audit events for ${column}.`, error);
    return 0;
  }

  auditLogAvailability = "available";
  return count ?? 0;
}

export async function getAdminAuthRequestContext(
  email?: string | null,
): Promise<AdminAuthRequestContext> {
  const headerStore = await headers();

  return {
    email: normalizeEmail(email),
    ipAddress: getIpAddress(
      headerStore.get("x-forwarded-for"),
      headerStore.get("x-real-ip"),
    ),
    userAgent: headerStore.get("user-agent"),
  };
}

export async function isAdminSignInThrottled(
  client: ServiceRoleClient,
  context: AdminAuthRequestContext,
) {
  if (!context.email) {
    return false;
  }

  const windowStartIso = new Date(
    Date.now() - ADMIN_AUTH_THROTTLE_WINDOW_MINUTES * 60_000,
  ).toISOString();

  const [emailAttempts, ipAttempts] = await Promise.all([
    countRecentFailedAttempts(client, "email", context.email, windowStartIso),
    context.ipAddress
      ? countRecentFailedAttempts(client, "ip_address", context.ipAddress, windowStartIso)
      : Promise.resolve(0),
  ]);

  return (
    emailAttempts >= MAX_FAILED_ATTEMPTS_PER_EMAIL ||
    ipAttempts >= MAX_FAILED_ATTEMPTS_PER_IP
  );
}

export async function recordAdminAuthEvent(
  client: ServiceRoleClient,
  {
    context,
    eventType,
    reason,
    adminUserId,
  }: {
    context: AdminAuthRequestContext;
    eventType: AdminAuthEventType;
    reason?: string;
    adminUserId?: string;
  },
) {
  const email = context.email;

  if (!email) {
    return;
  }

  if (auditLogAvailability === "missing") {
    return;
  }

  const { error } = await client.from("admin_auth_audit_log").insert({
    email,
    ip_address: context.ipAddress,
    user_agent: context.userAgent,
    event_type: eventType,
    reason: reason ?? null,
    admin_user_id: adminUserId ?? null,
  });

  if (error) {
    if (isAuditLogMissing(error)) {
      markAuditLogUnavailable();
      return;
    }

    console.error("Unable to record admin auth audit event.", error);
    return;
  }

  auditLogAvailability = "available";
}
