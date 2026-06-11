import { getPortfolioSnapshot } from "@/lib/portfolio/repository";
import { MissionShell } from "@/components/portfolio/mission-shell";

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const snapshot = await getPortfolioSnapshot();

  return (
    <MissionShell footerNote={snapshot.settings.footerNote}>
      {children}
    </MissionShell>
  );
}
