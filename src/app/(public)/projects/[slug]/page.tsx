import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectMissionDetail } from "@/components/portfolio/mission-ui";
import { StructuredData } from "@/components/portfolio/structured-data";
import {
  getPortfolioSnapshot,
  getProjectBySlug,
} from "@/lib/portfolio/repository";
import {
  getProjectMissionHref,
  getProjectMissionSlug,
} from "@/lib/portfolio/project-routes";
import { siteConfig } from "@/lib/site";

export async function generateStaticParams() {
  const snapshot = await getPortfolioSnapshot();

  return snapshot.projects.flatMap((project) => [
    {
      slug: project.slug,
    },
    {
      slug: getProjectMissionSlug(project),
    },
  ]);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {};
  }

  return {
    title: `${project.title} Mission File`,
    description: project.excerpt,
    alternates: {
      canonical: `${siteConfig.url}${getProjectMissionHref(project)}`,
    },
    openGraph: {
      title: `${project.title} Mission File`,
      description: project.excerpt,
      url: `${siteConfig.url}${getProjectMissionHref(project)}`,
      images: [project.coverImage],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.excerpt,
      images: [project.coverImage],
    },
    keywords: [project.category, ...project.techStack],
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [project, snapshot] = await Promise.all([
    getProjectBySlug(slug),
    getPortfolioSnapshot(),
  ]);

  if (!project) {
    notFound();
  }

  const relatedProjects = snapshot.projects
    .filter((item) => item.id !== project.id)
    .slice(0, 2);

  return (
    <>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: `${project.title} Mission File`,
          name: project.title,
          description: project.excerpt,
          url: `${siteConfig.url}${getProjectMissionHref(project)}`,
          image: project.coverImage,
          creator: {
            "@type": "Person",
            name: snapshot.profile.fullName,
          },
          keywords: project.techStack,
        }}
      />
      <ProjectMissionDetail
        project={project}
        relatedProjects={relatedProjects}
      />
    </>
  );
}
