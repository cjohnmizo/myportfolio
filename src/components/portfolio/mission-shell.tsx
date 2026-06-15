"use client";

import { usePathname } from "next/navigation";

import { CursorDot } from "@/components/animations/MagneticButton";
import { MissionNav } from "@/components/portfolio/mission-nav";
import { SiteFooter } from "@/components/portfolio/site-footer";

export function MissionShell({
  children,
  footerNote,
}: {
  children: React.ReactNode;
  footerNote: string;
}) {
  const pathname = usePathname();
  const isSplash = pathname === "/";

  if (isSplash) {
    return (
      <>
        <CursorDot />
        {children}
      </>
    );
  }

  return (
    <>
      <CursorDot />
      <MissionNav />
      <div className="min-h-screen pt-24 sm:pt-28">{children}</div>
      <SiteFooter footerNote={footerNote} />
    </>
  );
}
