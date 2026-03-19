import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectCaseStudy } from "@/components/portfolio/project-case-study";
import { StructuredData } from "@/components/portfolio/structured-data";
import { getPortfolioSnapshot, getProjectBySlug } from "@/lib/portfolio/repository";
import { siteConfig } from "@/lib/site";

export async function generateStaticParams() {
  const snapshot = await getPortfolioSnapshot();

  return snapshot.projects.map((project) => ({
    slug: project.slug,
  }));
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
    title: `${project.title} Case Study`,
    description: project.excerpt,
    alternates: {
      canonical: `${siteConfig.url}/projects/${project.slug}`,
    },
    openGraph: {
      title: project.title,
      description: project.excerpt,
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
          headline: `${project.title} Case Study`,
          name: project.title,
          description: project.excerpt,
          url: `${siteConfig.url}/projects/${project.slug}`,
          image: project.coverImage,
          creator: {
            "@type": "Person",
            name: snapshot.profile.fullName,
          },
          keywords: project.techStack,
        }}
      />
      <ProjectCaseStudy project={project} relatedProjects={relatedProjects} />
    </>
  );
}
