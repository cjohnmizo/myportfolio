import { cache } from "react";

import { env } from "@/lib/env";

export interface GitHubRepoSummary {
  id: number;
  name: string;
  description: string;
  htmlUrl: string;
  homepage: string | null;
  language: string | null;
  stargazersCount: number;
  updatedAt: string;
}

export interface GitHubEventSummary {
  id: string;
  type: string;
  repoName: string;
  createdAt: string;
}

export interface GitHubActivitySnapshot {
  publicRepos: number;
  followers: number;
  following: number;
  repos: GitHubRepoSummary[];
  events: GitHubEventSummary[];
}

const fallbackActivity: GitHubActivitySnapshot = {
  publicRepos: 20,
  followers: 0,
  following: 0,
  repos: [],
  events: [],
};

async function safeFetch<T>(url: string): Promise<T | null> {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "cjohnmizo-portfolio",
      Accept: "application/vnd.github+json",
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as T;
}

export const getGitHubActivity = cache(async (): Promise<GitHubActivitySnapshot> => {
  const username = env.GITHUB_USERNAME;

  if (!username) {
    return fallbackActivity;
  }

  try {
    const [user, repos, events] = await Promise.all([
      safeFetch<{
        public_repos: number;
        followers: number;
        following: number;
      }>(`https://api.github.com/users/${username}`),
      safeFetch<
        Array<{
          id: number;
          name: string;
          description: string | null;
          html_url: string;
          homepage: string | null;
          language: string | null;
          stargazers_count: number;
          updated_at: string;
        }>
      >(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`),
      safeFetch<
        Array<{
          id: string;
          type: string;
          repo: { name: string };
          created_at: string;
        }>
      >(`https://api.github.com/users/${username}/events/public?per_page=8`),
    ]);

    return {
      publicRepos: user?.public_repos ?? fallbackActivity.publicRepos,
      followers: user?.followers ?? 0,
      following: user?.following ?? 0,
      repos:
        repos?.map((repo) => ({
          id: repo.id,
          name: repo.name,
          description: repo.description ?? "No repository description provided.",
          htmlUrl: repo.html_url,
          homepage: repo.homepage,
          language: repo.language,
          stargazersCount: repo.stargazers_count,
          updatedAt: repo.updated_at,
        })) ?? [],
      events:
        events?.map((event) => ({
          id: event.id,
          type: event.type.replace("Event", ""),
          repoName: event.repo.name,
          createdAt: event.created_at,
        })) ?? [],
    };
  } catch {
    return fallbackActivity;
  }
});
