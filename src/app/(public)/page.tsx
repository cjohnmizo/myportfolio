import { FoundationPreview } from "@/components/portfolio/foundation-preview";
import { getPortfolioSnapshot } from "@/lib/portfolio/repository";

export default async function HomePage() {
  const snapshot = await getPortfolioSnapshot();

  return <FoundationPreview snapshot={snapshot} />;
}
