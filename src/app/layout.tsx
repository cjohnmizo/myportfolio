import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter, JetBrains_Mono, Manrope } from "next/font/google";
import { Toaster } from "sonner";

import { env } from "@/lib/env";
import { siteConfig } from "@/lib/site";
import "@/app/globals.css";

const sans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const heading = Manrope({
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
  icons: {
    icon: [
      {
        url: "/brand/cjohnmizo-favicon.png",
        sizes: "512x512",
        type: "image/png",
      },
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
    ],
    shortcut: ["/brand/cjohnmizo-favicon.png"],
    apple: [{ url: "/brand/cjohnmizo-favicon.png", sizes: "512x512" }],
  },
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${sans.variable} ${heading.variable} ${mono.variable} bg-background text-foreground min-h-screen font-sans antialiased`}
      >
        {children}
        <Toaster richColors theme="dark" position="top-right" />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
