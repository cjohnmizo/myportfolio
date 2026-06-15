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
          "radial-gradient(circle at 12% 8%, rgba(22,163,74,0.16), transparent 34%), radial-gradient(circle at 90% 18%, rgba(79,70,229,0.12), transparent 28%), linear-gradient(135deg, #f7f7f5 0%, #ffffff 54%, #f0f0ee 100%)",
        color: "#0a0a0a",
        border: "1px solid #e5e5e3",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 28,
          fontWeight: 700,
          color: "#16a34a",
        }}
      >
        <span>C. John Remthang</span>
        <span style={{ color: "#6b7280" }}>cjohnmizo.in</span>
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
        <div style={{ fontSize: 29, color: "#6b7280", lineHeight: 1.35 }}>
          Mizoram-based developer building clean websites, LMS platforms,
          dashboards, mobile apps, and maintainable systems.
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: 16,
          fontSize: 24,
          color: "#16a34a",
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
