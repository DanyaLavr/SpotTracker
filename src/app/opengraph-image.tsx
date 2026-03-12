// app/opengraph-image.tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        background: "#0f0f0f",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 24,
      }}
    >
      <img
        src="https://crypto-back-phi.vercel.app/favicon.ico"
        width={120}
        height={120}
      />
      <div style={{ color: "#fff", fontSize: 64, fontWeight: 700 }}>
        SpotTracker
      </div>
      <div style={{ color: "#888", fontSize: 28 }}>
        Crypto Portfolio Tracker
      </div>
    </div>,
    size,
  );
}
