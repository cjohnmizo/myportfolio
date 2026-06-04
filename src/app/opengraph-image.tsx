import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 64,
        background:
          "radial-gradient(circle at 12% 8%, rgba(255,255,255,0.96), transparent 36%), radial-gradient(circle at 88% 20%, rgba(74,127,167,0.3), transparent 30%), linear-gradient(135deg, #f6fafd 0%, #b3cfe5 54%, #f6fafd 100%)",
        color: "#0a1931",
        border: "1px solid rgba(74,127,167,0.28)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 28,
          fontWeight: 700,
          color: "#1a3d63",
        }}
      >
        <span>C. John Remthang</span>
        <span style={{ color: "#4a7fa7" }}>cjohnmizo.in</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 18,
          maxWidth: 900,
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.05 }}>
          Practical digital systems for schools, NGOs, businesses, and
          communities
        </div>
        <div style={{ fontSize: 29, color: "#1a3d63", lineHeight: 1.35 }}>
          Mizoram-based developer building websites, LMS platforms, dashboards,
          mobile apps, and maintainable systems that stay useful after launch.
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: 16,
          fontSize: 24,
          color: "#1a3d63",
        }}
      >
        <span>Next.js</span>
        <span>/</span>
        <span>Laravel</span>
        <span>/</span>
        <span>Flutter</span>
        <span>/</span>
        <span>Static content</span>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
