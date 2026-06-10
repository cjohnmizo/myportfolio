import { getPortfolioSnapshot } from "@/lib/portfolio/repository";
import { SiteFooter } from "@/components/portfolio/site-footer";
import { SiteHeader } from "@/components/portfolio/site-header";

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const snapshot = await getPortfolioSnapshot();

  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter footerNote={snapshot.settings.footerNote} />
    </>
  );
}
