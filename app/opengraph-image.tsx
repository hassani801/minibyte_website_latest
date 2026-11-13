import { ImageResponse } from "next/og";

export const alt = "MiniByte · AI R&D. Software, hardware, deployed.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#0d0e12",
          color: "#ffffff",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Accent glow */}
        <div
          style={{
            position: "absolute",
            top: "-150px",
            right: "-150px",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(47, 101, 246, 0.3) 0%, rgba(13, 14, 18, 0) 70%)",
          }}
        />

        {/* Top bar with mark & wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "#2f65f6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                background: "#ffffff",
              }}
            />
          </div>
          <span
            style={{
              fontSize: "36px",
              fontWeight: 700,
              fontFamily: "monospace",
              letterSpacing: "-0.04em",
              color: "#ffffff",
            }}
          >
            minibyte
          </span>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "960px" }}>
          <span
            style={{
              fontSize: "18px",
              fontFamily: "monospace",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#2f65f6",
            }}
          >
            AI RESEARCH & DEVELOPMENT
          </span>
          <div
            style={{
              fontSize: "62px",
              fontWeight: 600,
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              color: "#ffffff",
            }}
          >
            AI R&D. Software, hardware, deployed.
          </div>
          <div
            style={{
              fontSize: "24px",
              lineHeight: 1.4,
              color: "rgba(255, 255, 255, 0.65)",
            }}
          >
            AI SaaS platforms, advanced robotics and embedded intelligence systems.
          </div>
        </div>

        {/* Footer strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255, 255, 255, 0.12)",
            paddingTop: "24px",
            fontSize: "18px",
            fontFamily: "monospace",
            color: "rgba(255, 255, 255, 0.5)",
          }}
        >
          <span>minibyte.ai</span>
          <span>7 countries · Europe · North America · Middle East · Asia</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

