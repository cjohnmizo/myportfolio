import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "C. John Remthang | CJohn Mizo Portfolio",
    short_name: "cjohnmizo",
    description:
      "Portfolio of C. John Remthang, a Mizoram-based developer building practical websites, LMS platforms, dashboards, mobile apps, and digital systems.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f7f5",
    theme_color: "#16a34a",
    icons: [
      {
        src: "/brand/cjohnmizo-favicon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
    ],
  };
}
