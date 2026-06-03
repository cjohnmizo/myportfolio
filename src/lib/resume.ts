export function normalizeResumeValue(value: string | null | undefined) {
  if (!value) {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export async function resolveResumeUrl(value: string | null | undefined) {
  return normalizeResumeValue(value);
}
