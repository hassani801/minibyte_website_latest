"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global application error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: "60px 24px",
          background: "#0d0e12",
          color: "#ffffff",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif",
          display: "flex",
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            maxWidth: 540,
            width: "100%",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
          }}
        >
          <div
            style={{
              padding: "6px 14px",
              borderRadius: 999,
              background: "rgba(47, 101, 246, 0.15)",
              color: "#5b8bf7",
              fontFamily: "monospace",
              fontSize: 13,
              letterSpacing: "0.08em",
            }}
          >
            CRITICAL ERROR · 500
          </div>
          <h1
            style={{
              margin: 0,
              fontSize: 32,
              fontWeight: 600,
              letterSpacing: "-0.03em",
            }}
          >
            System encountered an unexpected fault.
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: 16,
              color: "rgba(255, 255, 255, 0.65)",
              lineHeight: 1.5,
            }}
          >
            A core rendering error prevented the page from loading.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
            <button
              type="button"
              onClick={() => reset()}
              style={{
                padding: "12px 24px",
                borderRadius: 999,
                background: "#2f65f6",
                color: "#ffffff",
                border: "none",
                cursor: "pointer",
                fontFamily: "monospace",
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              Try again
            </button>
            <a
              href="/"
              style={{
                padding: "12px 24px",
                borderRadius: 999,
                background: "transparent",
                color: "#ffffff",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                textDecoration: "none",
                fontFamily: "monospace",
                fontSize: 13,
              }}
            >
              Back to home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}

