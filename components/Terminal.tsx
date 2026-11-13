"use client";
import { useEffect, useState } from "react";
import { useInView } from "./Reveal";

const DEFAULT_LINES: [string, string][] = [
  ["$", "./labs --list"],
  ["#", "ugv · callaxa · stackfuse · anna · fabsky"],
  ["$", "./labs --status ugv"],
  ["#", "seeking seed funding"],
];

export function Terminal({
  lines = DEFAULT_LINES,
  label,
  className = "",
}: {
  lines?: [string, string][];
  label?: string;
  className?: string;
}) {
  const { ref, shown } = useInView<HTMLDivElement>(0.3);
  const [chars, setChars] = useState(0);
  const total = lines.reduce((a, l) => a + l[1].length + 4, 0);

  useEffect(() => {
    if (!shown) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setChars(total);
      return;
    }
    let c = 0;
    const id = setInterval(() => {
      c += 1;
      setChars(c);
      if (c >= total) clearInterval(id);
    }, 28);
    return () => clearInterval(id);
  }, [shown, total]);

  let left = chars;
  const aria = label || lines.map((l) => `${l[0]} ${l[1]}`).join("; ");

  return (
    <div className={`term ${className}`} ref={ref} aria-label={aria}>
      {lines.map(([p, text], i) => {
        const take = Math.max(0, Math.min(text.length, left - 4));
        const started = left > 0;
        left -= text.length + 4;
        const active =
          (started && take < text.length) ||
          (started && i === lines.length - 1 && left <= 0 && take === text.length);
        return (
          <div key={i} className={p === "#" ? "c" : ""} style={{ minHeight: 28 }}>
            {started && (
              <>
                {p === "$" ? <span className="p">$ </span> : "# "}
                {text.slice(0, take)}
                {active && <span className="caret" />}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Terminal;
