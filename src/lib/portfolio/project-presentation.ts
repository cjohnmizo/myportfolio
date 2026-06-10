import type { Project } from "@/types/portfolio";

const privateProjectStatus =
  "Private client project — details available on request.";

const projectPreviewAltText: Record<string, string> = {
  "liankhawpui-community-platform": "Liankhawpui village directory app preview",
  "tz-coaching-lms": "TZ Coaching LMS platform preview",
  "gaby-farm": "Gaby Farm website preview",
  "smart-modern-admin-dashboard": "Smart Modern Dashboard preview",
  "tualchher-cms": "Tualchher CMS project preview",
  "library-lms-tools": "Library and LMS tools preview",
};

export function getProjectStatusLabel(status: string) {
  if (status.trim().toLowerCase() === "private") {
    return privateProjectStatus;
  }

  return status;
}

export function getProjectMetricValues(project: Project, label: string) {
  return project.metrics
    .filter((metric) => metric.label.toLowerCase() === label.toLowerCase())
    .map((metric) => metric.value)
    .filter(Boolean);
}

export function getProjectRole(project: Project) {
  return getProjectMetricValues(project, "My role")[0] ?? "Developer";
}

export function getProjectFeatures(project: Project) {
  return getProjectMetricValues(project, "Key feature");
}

export function getSupportingProjectMetrics(project: Project) {
  return project.metrics.filter(
    (metric) =>
      !["my role", "key feature"].includes(metric.label.toLowerCase()),
  );
}

export function getProjectPreviewAlt(project: Project, label?: string) {
  const baseAlt =
    projectPreviewAltText[project.slug] ?? `${project.title} preview`;

  return label ? `${baseAlt} - ${label}` : baseAlt;
}
