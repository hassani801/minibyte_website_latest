"use client";
import { useRef, useState } from "react";
import { M_BITS, toBits } from "@/lib/bits";

type Tone = "ink" | "white" | "blue";

/** The mark: one byte, 01101101. 1 = large dot, 0 = small dot, last 1 = Bit Blue. */
export function Mark({ bits = M_BITS, height = 24, tone = "ink", className = "" }: { bits?: number[]; height?: number; tone?: Tone; className?: string }) {
  const fill = tone === "white" || tone === "blue" ? "#fff" : "#0c0e12";
  return (
    <svg className={`mark ${className}`} viewBox="0 0 80 40" height={height} width={height * 2} aria-hidden>
      {bits.map((b, i) => {
        const cx = 10 + (i % 4) * 20;
        const cy = 10 + Math.floor(i / 4) * 20;
        const last = i === 7;
        return <circle key={i} cx={cx} cy={cy} r={8.6} fill={last && tone !== "blue" ? "#4654ff" : fill} style={{ transform: `scale(${b ? 1 : 0.28})` }} />;
      })}
    </svg>
  );
}

export function Logo({ tone = "ink", size = 22 }: { tone?: Tone; size?: number }) {
  const [bits, setBits] = useState<number[]>(M_BITS);
  const busy = useRef(false);
  // hovering the logo counts the byte up to "m" again
  const count = () => {
    if (busy.current) return;
    busy.current = true;
    let n = 0;
    const id = setInterval(() => {
      n += 9;
      if (n >= 109) { setBits(M_BITS); clearInterval(id); busy.current = false; return; }
      setBits(toBits(n));
    }, 28);
  };
  return (
    <span className="logo" onPointerEnter={count} style={{ color: tone === "ink" ? "#0c0e12" : "#fff" }}>
      <Mark bits={bits} height={size * 0.9} tone={tone} />
      <span className="word" style={{ fontSize: size }}>minibyte</span>
    </span>
  );
}
