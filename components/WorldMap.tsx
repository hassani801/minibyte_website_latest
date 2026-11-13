"use client";
import { useEffect, useRef, useState, useMemo } from "react";
import { MAP, landMask, project } from "@/lib/land";
import { OFFICES, Office } from "@/lib/data";
import { useInView } from "./Reveal";

/** Regional extents for projection toggle */
const VIEWS = {
  world: {
    name: "World",
    cols: 90,
    rows: 36,
    lon0: -170,
    lon1: 180,
    lat0: 80,
    lat1: -58,
  },
  regional: {
    name: "Europe & Asia",
    cols: 80,
    rows: 36,
    lon0: -20,
    lon1: 140,
    lat0: 70,
    lat1: 12,
  },
};

type ViewKey = keyof typeof VIEWS;

// Pixel offsets for pins that are very close to each other in world projection
const PIN_OFFSETS: Record<number, { dx: number; dy: number }> = {
  5: { dx: -14, dy: -8 }, // UK: offset top-left
  6: { dx: 12, dy: 14 },  // Germany: offset bottom-right
  7: { dx: 8, dy: -12 },  // Sweden: offset top-right
};

export function WorldMap() {
  const cv = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState(1);
  const [view, setView] = useState<ViewKey>("world");
  const activeRef = useRef(1);
  const viewRef = useRef<ViewKey>("world");
  const { ref, shown } = useInView<HTMLDivElement>(0.2);
  const shownRef = useRef(false);

  useEffect(() => { activeRef.current = active; }, [active]);
  useEffect(() => { shownRef.current = shown; }, [shown]);
  useEffect(() => { viewRef.current = view; }, [view]);

  // Project according to current view
  const currentExt = VIEWS[view];
  const projectPoint = (lon: number, lat: number) => {
    return {
      x: (lon - currentExt.lon0) / (currentExt.lon1 - currentExt.lon0),
      y: (currentExt.lat0 - lat) / (currentExt.lat0 - currentExt.lat1),
    };
  };

  useEffect(() => {
    const c = cv.current!;
    const ctx = c.getContext("2d")!;
    let w = 0, h = 0, raf = 0, vis = false, t0 = 0;
    const m = { x: -999, y: -999, sx: -999, sy: -999 };

    const resize = () => {
      const r = c.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = r.width;
      h = r.height;
      c.width = Math.round(w * dpr);
      c.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(performance.now());
    };

    function draw(now: number) {
      ctx.clearRect(0, 0, w, h);
      const ext = VIEWS[viewRef.current];
      const mask = landMask();
      const cw = w / ext.cols, ch = h / ext.rows;
      const p = shownRef.current ? Math.min(1, (now - t0) / 2000) : 0;
      const a = OFFICES.find((o) => o.n === activeRef.current) ?? OFFICES[0];

      // Projected active office
      const ax = (a.lon - ext.lon0) / (ext.lon1 - ext.lon0);
      const ay = (ext.lat0 - a.lat) / (ext.lat0 - ext.lat1);

      for (let r = 0; r < ext.rows; r++) {
        for (let col = 0; col < ext.cols; col++) {
          const idx = r * MAP.cols + col;
          if (!mask[idx]) continue;
          const x = (col + 0.5) * cw, y = (r + 0.5) * ch;
          const grow = Math.max(0, Math.min(1, (p * 1.5 - col / ext.cols) * 4));
          const dm = Math.hypot(x - m.sx, y - m.sy);
          const near = Math.max(0, 1 - dm / 110);
          const da = Math.hypot(x - ax * w, y - ay * h);
          const ring = Math.max(0, 1 - Math.abs(da - ((now / 16) % 110)) / 16) * (da < 110 ? 1 : 0);
          const rad = Math.max(0.8, cw * (0.26 + near * 0.28 + ring * 0.1)) * grow;
          if (rad < 0.3) continue;

          ctx.beginPath();
          ctx.arc(x, y, rad, 0, Math.PI * 2);
          ctx.fillStyle = near > 0.6 ? "#4654ff" : ring > 0.15 || near > 0 ? "#7d828c" : "#b9bdb6";
          ctx.fill();
        }
      }
    }

    const loop = (now: number) => {
      m.sx += (m.x - m.sx) * 0.15;
      m.sy += (m.y - m.sy) * 0.15;
      draw(now);
      if (vis) raf = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(([e]) => {
      vis = e.isIntersecting;
      if (vis) {
        if (!t0) t0 = performance.now();
        raf = requestAnimationFrame(loop);
      } else {
        cancelAnimationFrame(raf);
      }
    }, { threshold: 0.1 });

    const ro = new ResizeObserver(resize);
    const move = (e: PointerEvent) => {
      const r = c.getBoundingClientRect();
      m.x = e.clientX - r.left;
      m.y = e.clientY - r.top;
    };
    const leave = () => { m.x = m.y = -999; };

    const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    ro.observe(c);
    if (!reduce) {
      io.observe(c);
      c.addEventListener("pointermove", move);
      c.addEventListener("pointerleave", leave);
    }
    resize();
    if (reduce) {
      t0 = performance.now() - 5000;
      draw(performance.now());
    }

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      c.removeEventListener("pointermove", move);
      c.removeEventListener("pointerleave", leave);
    };
  }, [view]);

  // Group offices by region for structured browsing
  const sortedOffices = useMemo(() => {
    return [...OFFICES].sort((a, b) => a.n - b.n);
  }, []);

  return (
    <div ref={ref} className="world-map-component">
      <div className="map-controls">
        <span className="mono map-note">
          {view === "world" ? "All 7 locations" : "Regional focus · USA off-canvas"}
        </span>
        <div className="map-toggle" role="tablist" aria-label="Map projection">
          {(["world", "regional"] as ViewKey[]).map((key) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={view === key}
              className={`map-tab ${view === key ? "active" : ""}`}
              onClick={() => setView(key)}
            >
              {VIEWS[key].name}
            </button>
          ))}
        </div>
      </div>

      <div className="map-wrap rv-wrap">
        <canvas
          ref={cv}
          role="img"
          aria-label="Dot map of the world showing MiniByte offices in Pakistan, the USA, South Korea, the UAE, the United Kingdom, Germany and Sweden"
        />

        {/* SVG leader lines for offset European pins */}
        <svg className="map-leaders" aria-hidden="true">
          {OFFICES.map((o) => {
            const { x, y } = projectPoint(o.lon, o.lat);
            if (x < 0 || x > 1 || y < 0 || y > 1) return null;
            const offset = view === "world" ? PIN_OFFSETS[o.n] : null;
            if (!offset) return null;
            return (
              <g key={`leader-${o.n}`} className={active === o.n ? "active-leader" : ""}>
                <circle
                  cx={`${x * 100}%`}
                  cy={`${y * 100}%`}
                  r="2.5"
                  className="leader-dot"
                />
                <line
                  x1={`${x * 100}%`}
                  y1={`${y * 100}%`}
                  x2={`calc(${x * 100}% + ${offset.dx}px)`}
                  y2={`calc(${y * 100}% + ${offset.dy}px)`}
                  className="leader-line"
                />
              </g>
            );
          })}
        </svg>

        {OFFICES.map((o) => {
          const { x, y } = projectPoint(o.lon, o.lat);
          const isOffCanvas = x < 0 || x > 1 || y < 0 || y > 1;
          if (isOffCanvas) return null;

          const offset = view === "world" ? PIN_OFFSETS[o.n] : null;
          const leftStyle = offset
            ? `calc(${x * 100}% + ${offset.dx}px)`
            : `${x * 100}%`;
          const topStyle = offset
            ? `calc(${y * 100}% + ${offset.dy}px)`
            : `${y * 100}%`;

          return (
            <button
              key={o.n}
              type="button"
              className={`pin ${active === o.n ? "on" : ""}`}
              style={{
                left: leftStyle,
                top: topStyle,
                opacity: shown ? 1 : 0,
                transition: `opacity .6s ${0.3 + o.n * 0.1}s, transform .4s cubic-bezier(.22,1,.36,1), background .3s`,
              }}
              onPointerEnter={() => setActive(o.n)}
              onFocus={() => setActive(o.n)}
              aria-label={`${o.name}, ${o.role} (${o.region})`}
            >
              {o.n}
              <span className="tip">
                {o.name} <span className="tip-region">({o.region})</span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="offices">
        {sortedOffices.map((o) => (
          <div
            key={o.n}
            className={`office ${active === o.n ? "on" : ""}`}
            onPointerEnter={() => setActive(o.n)}
            onClick={() => setActive(o.n)}
            tabIndex={0}
            role="button"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setActive(o.n);
              }
            }}
          >
            <div className="office-reg mono">{o.region}</div>
            <div className="t">
              <small>{String(o.n).padStart(2, "0")}</small>
              {o.name}
            </div>
            <p>{o.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
