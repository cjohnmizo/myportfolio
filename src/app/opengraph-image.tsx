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
          "radial-gradient(circle at 16% 10%, rgba(125,211,199,0.28), transparent 34%), radial-gradient(circle at 88% 20%, rgba(232,184,109,0.18), transparent 30%), linear-gradient(135deg, #07111f 0%, #0a1931 54%, #07111f 100%)",
        color: "#f6fafd",
        border: "1px solid rgba(179,207,229,0.18)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 28,
          fontWeight: 700,
          color: "#7dd3c7",
        }}
      >
        <span>C. John Remthang</span>
        <span style={{ color: "#b3cfe5" }}>cjohnmizo.in</span>
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
          Practical digital systems for schools, NGOs, businesses, and communities
        </div>
        <div style={{ fontSize: 29, color: "#b3cfe5", lineHeight: 1.35 }}>
          Mizoram-based developer building clean websites, LMS platforms,
          dashboards, mobile apps, and maintainable systems.
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: 16,
          fontSize: 24,
          color: "#7dd3c7",
        }}
      >
        <span>Web</span>
        <span>/</span>
        <span>LMS</span>
        <span>/</span>
        <span>Dashboards</span>
        <span>/</span>
        <span>Mobile</span>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
