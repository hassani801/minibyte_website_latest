"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "./Reveal";

/** Text that decodes out of random bits. Runs on reveal and again on hover. */
export function Scramble({ text, className = "", hover = true }: { text: string; className?: string; hover?: boolean }) {
  const { ref, shown } = useInView<HTMLSpanElement>(0.4);
  const [out, setOut] = useState(text);
  const raf = useRef(0);
  const run = useCallback(() => {
    cancelAnimationFrame(raf.current);
    const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setOut(text);
      return;
    }
    const t0 = performance.now();
    const dur = 650 + text.length * 40;
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      const fixed = Math.floor(p * text.length);
      setOut(text.split("").map((c, i) => (i < fixed || c === " " ? c : Math.random() > 0.5 ? "1" : "0")).join(""));
      if (p < 1) raf.current = requestAnimationFrame(step); else setOut(text);
    };
    raf.current = requestAnimationFrame(step);
  }, [text]);
  useEffect(() => { if (shown) run(); return () => cancelAnimationFrame(raf.current); }, [shown, run]);
  return (
    <span ref={ref} className={className} onPointerEnter={hover ? run : undefined}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{out}</span>
    </span>
  );
}

export function CountUp({ to, className = "" }: { to: number; className?: string }) {
  const { ref, shown } = useInView<HTMLSpanElement>(0.4);
  const [v, setV] = useState(to);
  useEffect(() => {
    if (!shown) return;
    const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setV(to);
      return;
    }
    const t0 = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / 1500);
      setV(Math.round((1 - Math.pow(1 - p, 4)) * to));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [shown, to]);
  return <span ref={ref} className={className}>{v}</span>;
}
