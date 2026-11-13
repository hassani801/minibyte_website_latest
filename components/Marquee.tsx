import React from "react";

/** Seamless infinite marquee. Pauses on hover. */
export function Marquee({ children, duration = 40, reverse = false, gap = 12, className = "" }: { children: React.ReactNode; duration?: number; reverse?: boolean; gap?: number; className?: string }) {
  const style = { ["--dur" as string]: `${duration}s`, ["--dir" as string]: reverse ? "reverse" : "normal", ["--gap" as string]: `${gap}px` } as React.CSSProperties;
  return (
    <div className={`marquee ${className}`} style={style}>
      <div className="marquee-track">{children}{children}</div>
      <div className="marquee-track" aria-hidden>{children}{children}</div>
    </div>
  );
}
