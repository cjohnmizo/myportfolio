import { createServiceRoleSupabaseClient } from "@/lib/supabase/service";

const RESUME_STORAGE_PREFIX = "storage:resumes/";
const RESUME_SIGNED_URL_TTL_SECONDS = 60 * 60 * 24;

export function createResumeStorageValue(path: string) {
  return `${RESUME_STORAGE_PREFIX}${path}`;
}

export function extractResumeStoragePath(value: string | null | undefined) {
  if (!value) {
    return null;
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return null;
  }

  if (trimmed.startsWith(RESUME_STORAGE_PREFIX)) {
    return trimmed.slice(RESUME_STORAGE_PREFIX.length);
  }

  if (trimmed.startsWith("resumes/")) {
    return trimmed.slice("resumes/".length);
  }

  try {
    const url = new URL(trimmed);
    const publicPrefix = "/storage/v1/object/public/resumes/";
    const signedPrefix = "/storage/v1/object/sign/resumes/";

    if (url.pathname.startsWith(publicPrefix)) {
      return decodeURIComponent(url.pathname.slice(publicPrefix.length));
    }

    if (url.pathname.startsWith(signedPrefix)) {
      return decodeURIComponent(url.pathname.slice(signedPrefix.length));
    }
  } catch {
    return null;
  }

  return null;
}

export function normalizeResumeValue(value: string | null | undefined) {
  if (!value) {
    return null;
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return null;
  }

  const storagePath = extractResumeStoragePath(trimmed);
  return storagePath ? createResumeStorageValue(storagePath) : trimmed;
}

export async function resolveResumeUrl(value: string | null | undefined) {
  const normalizedValue = normalizeResumeValue(value);

  if (!normalizedValue) {
    return null;
  }

  const storagePath = extractResumeStoragePath(normalizedValue);

  if (!storagePath) {
    return normalizedValue;
  }

  const serviceClient = createServiceRoleSupabaseClient();

  if (!serviceClient) {
    return null;
  }

  const signedUrlResult = await serviceClient.storage
    .from("resumes")
    .createSignedUrl(storagePath, RESUME_SIGNED_URL_TTL_SECONDS);

  if (signedUrlResult.error) {
    return null;
  }

  return signedUrlResult.data.signedUrl;
}
