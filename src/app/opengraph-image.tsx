import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/seo";

export const alt = "TheOddOnes - learning community for people who think differently";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#0a0a0a",
          color: "#f8f5ef",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
          padding: "72px",
          width: "100%",
        }}
      >
        <div
          style={{
            color: "#c4622d",
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: 3,
            marginBottom: 28,
            textTransform: "uppercase",
          }}
        >
          Build. Share. Learn. Repeat.
        </div>
        <div
          style={{
            fontSize: 92,
            fontWeight: 800,
            letterSpacing: -2,
            lineHeight: 0.95,
            textAlign: "center",
          }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{
            color: "#d7d0c3",
            fontSize: 34,
            lineHeight: 1.25,
            marginTop: 30,
            maxWidth: 900,
            textAlign: "center",
          }}
        >
          {siteConfig.tagline}
        </div>
      </div>
    ),
    size,
  );
}
