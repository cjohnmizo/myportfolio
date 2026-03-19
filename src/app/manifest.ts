import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "C. John Remthang | CJohn Mizo Portfolio",
    short_name: "cjohnmizo",
    description:
      "Portfolio of C. John Remthang, also known online as C. John, CJohn Mizo, and cjohnmizo.",
    start_url: "/",
    display: "standalone",
    background_color: "#0f172a",
    theme_color: "#6366f1",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
    ],
  };
}
