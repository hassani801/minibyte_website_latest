"use client";

import { useEffect } from "react";
import { PageHero } from "@/components/PageHero";
import { Btn } from "@/components/Btn";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log client error in development
    console.error("Application error:", error);
  }, [error]);

  return (
    <div style={{ paddingBottom: 96 }}>
      <PageHero
        single
        eyebrow="500 · System error"
        title="Something went wrong."
        lede="An unexpected error occurred while loading this page. Our team has been alerted if telemetry is configured."
      >
        <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
          <button
            type="button"
            onClick={() => reset()}
            className="btn btn-primary"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 24px",
              background: "var(--ink)",
              color: "#fff",
              borderRadius: 999,
              fontFamily: "var(--mono)",
              fontSize: 13,
              fontWeight: 500,
            }}
          >
            Try again
          </button>
          <Btn href="/" variant="ghost">
            Back home
          </Btn>
        </div>
      </PageHero>
    </div>
  );
}

