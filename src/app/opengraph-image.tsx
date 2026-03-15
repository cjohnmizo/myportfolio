import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background:
            "radial-gradient(circle at top left, rgba(99,102,241,0.35), transparent 35%), radial-gradient(circle at bottom right, rgba(34,197,94,0.3), transparent 30%), linear-gradient(180deg, #020617 0%, #0f172a 100%)",
          color: "#e2e8f0",
        }}
      >
        <div
          style={{
            fontSize: 24,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "#94a3b8",
          }}
        >
          CJOHNMIZO
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 840 }}>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.05 }}>
            Premium developer portfolio and admin CMS
          </div>
          <div style={{ fontSize: 30, color: "#cbd5e1", lineHeight: 1.35 }}>
            Full-stack engineer, product builder, and system architect creating polished software
            with maintainable foundations.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 26,
            color: "#cbd5e1",
          }}
        >
          <span>cjohnmizo.in</span>
          <span style={{ color: "#86efac" }}>Next.js • Supabase • Vercel</span>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
