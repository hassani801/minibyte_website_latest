"use client";
import { useRef } from "react";

/** Wrapper that pulls its child gently toward the pointer */
export function Magnetic({ children, strength = 0.3 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const move = (e: React.PointerEvent) => {
    if (e.pointerType === "touch" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength * 1.3;
    ref.current.style.transition = "transform 0.15s linear";
    ref.current.style.transform = `translate(${x}px, ${y}px)`;
  };
  const leave = () => {
    if (!ref.current) return;
    ref.current.style.transition = "transform 0.7s cubic-bezier(.22,1,.36,1)";
    ref.current.style.transform = "translate(0,0)";
  };
  return <span ref={ref} onPointerMove={move} onPointerLeave={leave} style={{ display: "inline-block" }}>{children}</span>;
}
