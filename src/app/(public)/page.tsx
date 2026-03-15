import { PublicHome } from "@/components/portfolio/public-home";
import { getGitHubActivity } from "@/lib/portfolio/github";
import { getPortfolioSnapshot } from "@/lib/portfolio/repository";

export default async function HomePage() {
  const [snapshot, githubActivity] = await Promise.all([
    getPortfolioSnapshot(),
    getGitHubActivity(),
  ]);

  return <PublicHome snapshot={snapshot} githubActivity={githubActivity} />;
}
