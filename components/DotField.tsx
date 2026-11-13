"use client";
import { useEffect, useRef } from "react";

export type Mode = "wave" | "text" | "grid" | "flow";
const INK = "#0c0e12", BLUE = "#4654ff", WHITE = "#f3f4f1";

/** Generative dot art on a canvas. Idle animation while on screen, reacts to the pointer. */
export function DotField({ mode, dark = false, gap = 20, className = "" }: { mode: Mode; dark?: boolean; gap?: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    let w = 0, h = 0, raf = 0, visible = false, speed = 1, t = 0, last = performance.now();
    const m = { x: -999, y: -999, sx: -999, sy: -999, on: false };
    const fg = dark ? WHITE : INK;

    const resize = () => {
      const r = c.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = r.width; h = r.height;
      c.width = Math.round(w * dpr); c.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };
    const hash = (n: number) => { const s = Math.sin(n * 127.1) * 43758.5453; return s - Math.floor(s); };

    function draw() {
      ctx.clearRect(0, 0, w, h);
      const cols = Math.max(4, Math.floor(w / gap)), rows = Math.max(4, Math.floor(h / gap));
      const ox = (w - (cols - 1) * gap) / 2, oy = (h - (rows - 1) * gap) / 2;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const px = ox + x * gap, py = oy + y * gap;
          let s = 0.14, blue = false;
          const dm = Math.hypot(px - m.sx, py - m.sy);
          const near = Math.max(0, 1 - dm / 130);
          if (mode === "grid") {
            const d = Math.hypot(x - cols / 2, y - rows / 2);
            s = 0.16 + 0.22 * (0.5 + 0.5 * Math.sin(d * 0.6 - t * 1.6));
            s += near * 0.75;
            blue = dm < gap * 0.7;
          } else if (mode === "wave") {
            const yc = rows / 2 + Math.sin(x * 0.42 + t * 2) * rows * (0.26 + near * 0.1) + Math.sin(x * 0.17 - t) * rows * 0.1;
            s = 0.13 + 0.87 * Math.exp(-Math.pow((y - yc) / 1.05, 2));
            blue = s > 0.9 && x === Math.floor(((t * 5) % (cols + 6)) - 3);
            s += near * 0.25;
          } else if (mode === "text") {
            const line = y % 2 === 0;
            const L = 0.35 + hash(y * 3.1) * 0.6;
            const hi = Math.floor(((t * 0.9) % 1) * rows * 0.5) * 2;
            const mouseRow = m.on ? Math.round((m.sy - oy) / gap / 2) * 2 : -1;
            if (line && x / cols < L) {
              s = 0.62 + near * 0.3;
              if (y === hi || y === mouseRow) { blue = true; s = 0.95; }
            } else s = 0.12 + near * 0.3;
          } else {
            const pulse = ((x - t * 7 + y * 3.7) % 16 + 16) % 16;
            const p = Math.max(0, 1 - pulse / 3.2);
            s = 0.13 + 0.87 * p + near * 0.3;
            blue = y < rows * 0.28 && p > 0.5;
          }
          const r = Math.min(gap * 0.46, gap * 0.46 * Math.min(1, s));
          ctx.beginPath();
          ctx.arc(px, py, Math.max(0.8, r), 0, 6.2832);
          ctx.fillStyle = blue ? BLUE : fg;
          ctx.globalAlpha = dark ? 0.35 + 0.65 * Math.min(1, s) : 0.28 + 0.72 * Math.min(1, s);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    }

    const loop = (now: number) => {
      const dt = (now - last) / 1000; last = now;
      t += dt * speed;
      speed += ((m.on ? 2.2 : 0.7) - speed) * 0.06;
      m.sx += (m.x - m.sx) * 0.14; m.sy += (m.y - m.sy) * 0.14;
      draw();
      if (visible) raf = requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) { last = performance.now(); raf = requestAnimationFrame(loop); } else cancelAnimationFrame(raf);
    });
    const ro = new ResizeObserver(resize);
    const move = (e: PointerEvent) => { const r = c.getBoundingClientRect(); m.x = e.clientX - r.left; m.y = e.clientY - r.top; m.on = true; };
    const leave = () => { m.on = false; m.x = m.y = -999; };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    ro.observe(c);
    if (!reduce) { io.observe(c); c.addEventListener("pointermove", move); c.addEventListener("pointerleave", leave); }
    resize();
    return () => { cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); c.removeEventListener("pointermove", move); c.removeEventListener("pointerleave", leave); };
  }, [mode, dark, gap]);
  return <canvas ref={ref} className={className} aria-hidden />;
}
