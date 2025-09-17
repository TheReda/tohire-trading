import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "linear-gradient(135deg, #0b1f16 0%, #30803F 100%)",
          color: "white",
          padding: 64,
          alignItems: "center",
          justifyContent: "space-between",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 760 }}>
          <div style={{ fontSize: 56, fontWeight: 800, lineHeight: 1.1 }}>
            Tohire Trading
          </div>
          <div style={{ fontSize: 28, opacity: 0.95 }}>
            Connecting reliable suppliers and buyers of recyclables worldwide.
          </div>
          <div style={{ marginTop: 8, fontSize: 20, opacity: 0.8 }}>
            tohiretrading.com
          </div>
        </div>
        <div
          style={{
            width: 200,
            height: 200,
            borderRadius: 24,
            background: "rgba(255,255,255,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 64,
            fontWeight: 900,
          }}
        >
          TT
        </div>
      </div>
    ),
    { ...size }
  );
}
