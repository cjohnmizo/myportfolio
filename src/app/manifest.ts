import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "C. John Remthang | CJohn Mizo Portfolio",
    short_name: "cjohnmizo",
    description:
      "Portfolio of C. John Remthang, also known online as C. John, CJohn Mizo, and cjohnmizo.",
    start_url: "/",
    display: "standalone",
    background_color: "#071015",
    theme_color: "#2dd4bf",
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
