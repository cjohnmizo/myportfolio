const MB = 1024 * 1024;

interface UploadBucketPolicy {
  acceptedExtensions: string[];
  acceptedMimeTypes: string[];
  cacheControlSeconds: number;
  label: string;
  maxBytes: number;
}

export const uploadBucketConfig: Record<string, UploadBucketPolicy> = {
  avatars: {
    acceptedExtensions: [".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"],
    acceptedMimeTypes: [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/avif",
      "image/gif",
    ],
    cacheControlSeconds: 60 * 60 * 24 * 30,
    label: "JPG, PNG, WEBP, AVIF, or GIF images",
    maxBytes: 5 * MB,
  },
  projects: {
    acceptedExtensions: [".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"],
    acceptedMimeTypes: [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/avif",
      "image/gif",
    ],
    cacheControlSeconds: 60 * 60 * 24 * 30,
    label: "JPG, PNG, WEBP, AVIF, or GIF images",
    maxBytes: 10 * MB,
  },
  media: {
    acceptedExtensions: [
      ".jpg",
      ".jpeg",
      ".png",
      ".webp",
      ".avif",
      ".gif",
      ".pdf",
      ".mp4",
      ".webm",
    ],
    acceptedMimeTypes: [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/avif",
      "image/gif",
      "application/pdf",
      "video/mp4",
      "video/webm",
    ],
    cacheControlSeconds: 60 * 60 * 24 * 30,
    label: "images, PDF documents, or MP4/WEBM videos",
    maxBytes: 10 * MB,
  },
  resumes: {
    acceptedExtensions: [".pdf"],
    acceptedMimeTypes: ["application/pdf"],
    cacheControlSeconds: 60 * 60,
    label: "PDF documents",
    maxBytes: 5 * MB,
  },
};

export type UploadBucket = keyof typeof uploadBucketConfig;

export function isUploadBucket(value: string): value is UploadBucket {
  return value in uploadBucketConfig;
}

export function sanitizeFileName(fileName: string) {
  const cleaned = fileName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9.-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return cleaned.length > 0 ? cleaned : "upload";
}

function getFileExtension(fileName: string) {
  const dotIndex = fileName.lastIndexOf(".");
  return dotIndex >= 0 ? fileName.slice(dotIndex) : "";
}

function mimeMatches(fileType: string, acceptedMimeTypes: readonly string[]) {
  return acceptedMimeTypes.includes(fileType);
}

export function validateUpload(bucket: UploadBucket, file: File) {
  const config = uploadBucketConfig[bucket];
  const sanitizedFileName = sanitizeFileName(file.name);
  const extension = getFileExtension(sanitizedFileName);

  if (!config.acceptedExtensions.includes(extension)) {
    return {
      message: `Allowed ${bucket} uploads: ${config.label}.`,
      ok: false as const,
    };
  }

  if (file.size > config.maxBytes) {
    return {
      message: `${bucket} files must be under ${Math.floor(config.maxBytes / MB)}MB.`,
      ok: false as const,
    };
  }

  if (file.type && !mimeMatches(file.type, config.acceptedMimeTypes)) {
    return {
      message: `Allowed ${bucket} uploads: ${config.label}.`,
      ok: false as const,
    };
  }

  return {
    cacheControlSeconds: config.cacheControlSeconds,
    ok: true as const,
    sanitizedFileName,
  };
}
