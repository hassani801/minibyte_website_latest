"use client";
import { useEffect, useRef, useState } from "react";
import { M_BITS, toBits } from "@/lib/bits";
import { Mark } from "./Logo";

const WORD = "minibyte".split("");
const SIG = [0, 1, 1, 0, 1, 1, 0, 1];

/** 10 s loop: Count (0 to 109) · Decode (01101101 = m) · Compress (the byte becomes the logo) */
export function LogoLoop() {
  const [t, setT] = useState(9000);
  const card = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setT(9000); return; }
    const t0 = performance.now();
    const id = setInterval(() => setT((performance.now() - t0) % 10000), 50);
    return () => clearInterval(id);
  }, []);

  const stage = t < 3200 ? "count" : t < 6200 ? "decode" : t < 8400 ? "compress" : "hold";
  const n = stage === "count" ? Math.round((1 - Math.pow(1 - t / 3200, 3)) * 109) : 109;
  const bits = toBits(n).join("");
  const typed = stage === "decode" ? Math.min(8, Math.floor((t - 3200) / 230) + 1) : 8;
  const showWord = stage === "compress" || stage === "hold";
  const letters = stage === "hold" ? 8 : Math.max(0, Math.floor((t - 6200) / 240));

  const tilt = (e: React.PointerEvent) => {
    if (e.pointerType === "touch" || !card.current) return;
    const r = card.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    card.current.style.transform = `perspective(900px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg)`;
  };
  const untilt = () => { if (card.current) card.current.style.transform = ""; };

  return (
    <div className="hero-art">
      <div className="logo-card" ref={card} onPointerMove={tilt} onPointerLeave={untilt}>
        <div className="grid-bg" />
        <div className="stage">
          <div className="row">
            <Mark bits={stage === "count" ? toBits(n) : M_BITS} height={Math.min(64, 56)} tone="white" />
            {showWord && (
              <div className="wm" aria-label="minibyte">
                {WORD.map((ch, i) => <span key={i} className={i < letters ? "" : ""} style={{ ["--i" as string]: i, opacity: i < letters ? 1 : 0, transform: i < letters ? "none" : "translateY(14px)" }}>{ch}</span>)}
              </div>
            )}
          </div>
          {!showWord && (
            <div className={`bitstr`} aria-hidden>
              {stage === "count" ? bits.slice(0, 7) : bits.slice(0, Math.min(7, typed))}
              {stage === "count" ? <em>{bits[7]}</em> : typed >= 8 ? <em>{bits[7]}</em> : ""}
              {stage === "decode" && typed >= 8 && <span style={{ opacity: 0.6 }}> = m</span>}
            </div>
          )}
          {showWord && (
            <div className="sig" style={{ width: "min(420px, 80%)" }} aria-hidden>
              {SIG.map((b, i) => <i key={i} className={`${b && i < letters ? "on" : ""} ${i === 7 ? "last" : ""}`} />)}
            </div>
          )}
        </div>
        <div className="tag">
          <span className={stage === "count" ? "" : ""}><b>{stage === "count" ? "Count" : stage === "decode" ? "Decode" : "Compress"}</b></span>
          <span>0x{n.toString(16).toUpperCase().padStart(2, "0")}</span>
        </div>
      </div>
      <div className="cap"><span>Our logo is one byte: 01101101 = m</span><span>10 s loop</span></div>
    </div>
  );
}
