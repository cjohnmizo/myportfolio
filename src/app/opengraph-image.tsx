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
        background: "#f6f7f8",
        color: "#111827",
        border: "1px solid #d8dee6",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          fontSize: 28,
          fontWeight: 700,
        }}
      >
        C. John Remthang
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 18,
          maxWidth: 880,
        }}
      >
        <div style={{ fontSize: 66, fontWeight: 700, lineHeight: 1.06 }}>
          Practical websites, dashboards, and mobile apps
        </div>
        <div style={{ fontSize: 30, color: "#4b5563", lineHeight: 1.35 }}>
          Developer and IT professional from Mizoram building useful software
          for businesses, institutions, and community projects.
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 26,
          color: "#4b5563",
        }}
      >
        <span>cjohnmizo.in</span>
        <span style={{ color: "#0f766e" }}>Next.js / Supabase / Flutter</span>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
