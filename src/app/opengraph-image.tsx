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
          "radial-gradient(circle at 12% 8%, rgba(122,167,255,0.32), transparent 34%), radial-gradient(circle at 88% 20%, rgba(216,166,75,0.24), transparent 28%), linear-gradient(135deg, #070b12 0%, #101827 54%, #070b12 100%)",
        color: "#f5f7f2",
        border: "1px solid rgba(180,204,208,0.24)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 28,
          fontWeight: 700,
          color: "#7aa7ff",
        }}
      >
        <span>C. John Remthang</span>
        <span style={{ color: "#d8a64b" }}>cjohnmizo.in</span>
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
        <div style={{ fontSize: 29, color: "#cbd5d8", lineHeight: 1.35 }}>
          Mizoram-based developer building websites, LMS platforms, dashboards,
          mobile apps, and maintainable systems that stay useful after launch.
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: 16,
          fontSize: 24,
          color: "#a8b5b9",
        }}
      >
        <span>Next.js</span>
        <span>/</span>
        <span>Laravel</span>
        <span>/</span>
        <span>Flutter</span>
        <span>/</span>
        <span>Supabase</span>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
