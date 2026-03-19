import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { JetBrains_Mono, Manrope, Space_Grotesk } from "next/font/google";
import { Toaster } from "sonner";

import { env } from "@/lib/env";
import { siteConfig } from "@/lib/site";
import "@/app/globals.css";

const sans = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const heading = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.shortName,
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  verification: env.GOOGLE_SITE_VERIFICATION
    ? {
        google: env.GOOGLE_SITE_VERIFICATION,
      }
    : undefined,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
    images: [`${siteConfig.url}/opengraph-image`],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}/twitter-image`],
  },
  alternates: {
    canonical: siteConfig.url,
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${sans.variable} ${heading.variable} ${mono.variable} min-h-screen bg-background font-sans text-foreground antialiased`}
      >
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.16),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(34,197,94,0.14),_transparent_28%),linear-gradient(180deg,#020617_0%,#0f172a_50%,#020617_100%)]" />
        {children}
        <Toaster richColors theme="dark" position="top-right" />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
