"use client";
import { createElement, useEffect, useRef, useState } from "react";
import { useTx } from "./Transition";

/** true once the element has scrolled into view (and the page cover has lifted) */
export function useInView<T extends HTMLElement>(threshold = 0.12) {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);
  const { ready } = useTx();
  useEffect(() => {
    if (!ready || shown || !ref.current) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } },
      { threshold, rootMargin: "0px 0px -4% 0px" }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [ready, shown, threshold]);
  return { ref, shown };
}

type Variant = "up" | "scale" | "left" | "line";
export function Reveal({ as = "div", delay = 0, variant = "up", className = "", children, style, ...rest }: {
  as?: string; delay?: number; variant?: Variant; className?: string; children?: React.ReactNode; style?: React.CSSProperties;
} & Record<string, unknown>) {
  const { ref, shown } = useInView<HTMLElement>();
  const v = variant === "up" ? "rv" : variant === "line" ? "rv-line" : `rv rv-${variant}`;
  return createElement(as, { ref, className: `${v} ${shown ? "in" : ""} ${className}`, style: { ...style, ["--d" as string]: `${delay}ms` }, ...rest }, children);
}

/** Headline that rises word by word out of a mask */
export function Split({ text, as = "h2", className = "", delay = 0 }: { text: string; as?: string; className?: string; delay?: number }) {
  const { ref, shown } = useInView<HTMLElement>(0.2);
  const words = text.split(" ");
  return createElement(
    as,
    { ref, className: `split ${className} ${shown ? "in" : ""}`, "aria-label": text, style: { ["--d" as string]: `${delay}ms` } },
    words.map((w, i) => [
      <span className="w" aria-hidden key={i}><span className="wi" style={{ ["--i" as string]: i }}>{w}</span></span>,
      i < words.length - 1 ? " " : null,
    ])
  );
}
