"use client";
import { useEffect, useState } from "react";
import { charBits } from "@/lib/bits";

/** Eight letters, eight bytes. Each row is one letter of the word in binary. Morphs between words. */
export function BytePattern({ words = ["minibyte"], size = 220, tone = "white", interval = 2600, className = "" }: { words?: string[]; size?: number; tone?: "white" | "ink"; interval?: number; className?: string }) {
  const [i, setI] = useState(0);
  const [hot, setHot] = useState<number | null>(null);
  useEffect(() => {
    if (words.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((v) => (v + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words, interval]);
  const word = words[i].padEnd(8, " ").slice(0, 8);
  const fg = tone === "white" ? "#f3f4f1" : "#0c0e12";
  const cell = size / 8;
  return (
    <svg className={className} width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`The word ${words[i]} written in binary`} onPointerLeave={() => setHot(null)}>
      {Array.from(word).flatMap((ch, r) =>
        charBits(ch).map((b, c) => {
          const idx = r * 8 + c;
          const blue = r === 0 && c === 7 && b === 1;
          const d = hot === null ? 0 : Math.hypot((hot % 8) - c, Math.floor(hot / 8) - r);
          const lift = hot === null ? 1 : 1 + Math.max(0, 1 - d / 2.4) * 0.55;
          return (
            <circle
              key={idx}
              cx={cell * c + cell / 2}
              cy={cell * r + cell / 2}
              r={cell * 0.4}
              fill={blue ? "#4654ff" : fg}
              onPointerEnter={() => setHot(idx)}
              style={{
                transformBox: "fill-box", transformOrigin: "center",
                transform: `scale(${(b ? 1 : 0.2) * (b ? 1 : lift)})`,
                transition: `transform 0.7s cubic-bezier(.22,1,.36,1) ${(r * 40 + c * 25) % 260}ms`,
              }}
            />
          );
        })
      )}
    </svg>
  );
}
