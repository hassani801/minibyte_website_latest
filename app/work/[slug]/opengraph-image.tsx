import { ImageResponse } from "next/og";
import { CASES, CATEGORIES } from "@/lib/data";

export const alt = "Case Study · MiniByte";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = CASES.find((item) => item.slug === slug);

  const title = c?.title ?? "Case Study";
  const categoryKey = c?.category ?? "ai-cloud";
  const categoryLabel =
    CATEGORIES.find((cat) => cat.key === categoryKey)?.label ?? categoryKey;
  const stack = c?.stack?.slice(0, 4) ?? [];

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
            background:
              "radial-gradient(circle, rgba(47, 101, 246, 0.35) 0%, rgba(13, 14, 18, 0) 70%)",
          }}
        />

        {/* Top bar with mark & wordmark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "10px",
                background: "#2f65f6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  background: "#ffffff",
                }}
              />
            </div>
            <span
              style={{
                fontSize: "30px",
                fontWeight: 700,
                fontFamily: "monospace",
                letterSpacing: "-0.04em",
                color: "#ffffff",
              }}
            >
              minibyte
            </span>
          </div>

          <div
            style={{
              padding: "8px 18px",
              borderRadius: "999px",
              background: "rgba(47, 101, 246, 0.15)",
              border: "1px solid rgba(47, 101, 246, 0.4)",
              color: "#5b8bf7",
              fontSize: "18px",
              fontFamily: "monospace",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            {categoryLabel}
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            maxWidth: "1000px",
          }}
        >
          <span
            style={{
              fontSize: "18px",
              fontFamily: "monospace",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(255, 255, 255, 0.5)",
            }}
          >
            CASE STUDY
          </span>
          <div
            style={{
              fontSize: "56px",
              fontWeight: 600,
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              color: "#ffffff",
            }}
          >
            {title}
          </div>

          {/* Stack chips */}
          {stack.length > 0 && (
            <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
              {stack.map((item) => (
                <div
                  key={item}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "6px",
                    background: "rgba(255, 255, 255, 0.08)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    fontSize: "18px",
                    fontFamily: "monospace",
                    color: "rgba(255, 255, 255, 0.8)",
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
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
          <span>minibyte.ai/work/{slug}</span>
          <span>AI Research & Development</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

