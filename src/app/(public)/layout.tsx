import { getPortfolioSnapshot } from "@/lib/portfolio/repository";
import { SpatialShell } from "@/components/portfolio/spatial-shell";

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const snapshot = await getPortfolioSnapshot();

  return <SpatialShell snapshot={snapshot}>{children}</SpatialShell>;
}
