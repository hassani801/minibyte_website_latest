"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { Mark } from "./Logo";
import { toBits } from "@/lib/bits";
import { PAGE_NAMES } from "@/lib/data";

type Phase = "boot" | "idle" | "in" | "out";
const Ctx = createContext<{ ready: boolean; go: (href: string) => void }>({ ready: true, go: () => {} });
export const useTx = () => useContext(Ctx);

const BIN = (n: number) => n.toString(2).padStart(8, "0");

/**
 * Start transition: the byte counts up to 01101101 ("m"), then eight bars lift away.
 * Page transitions: the same eight bars drop in, the route changes underneath, they lift away.
 */
export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("boot");
  const [boot, setBoot] = useState(true);
  const [label, setLabel] = useState("");
  const [n, setN] = useState(0);
  const target = useRef<string | null>(null);
  const phaseRef = useRef<Phase>("boot");
  const set = (p: Phase) => { phaseRef.current = p; setPhase(p); };

  // ---- start transition ----
  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem("mb-intro") === "1"; sessionStorage.setItem("mb-intro", "1"); } catch {}
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dur = reduce ? 0 : seen ? 700 : 2000;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / Math.max(dur, 1));
      const e = 1 - Math.pow(1 - p, 3);
      setN(Math.round(e * 109));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => { set("out"); setTimeout(() => { set("idle"); setBoot(false); }, 1100); }, reduce ? 0 : 350);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // ---- route changed underneath the cover ----
  useEffect(() => {
    if (phaseRef.current !== "in" || !target.current) return;
    const hash = target.current.split("#")[1];
    target.current = null;
    setTimeout(() => {
      const el = hash ? document.getElementById(hash) : null;
      if (el) el.scrollIntoView({ behavior: "instant" as ScrollBehavior, block: "start" });
      else window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      setTimeout(() => { set("out"); setTimeout(() => set("idle"), 1100); }, 250);
    }, 120);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("locked", phase === "boot" || phase === "in");
  }, [phase]);

  const go = useCallback((href: string) => {
    if (phaseRef.current !== "idle") return;
    const [path] = href.split("#");
    const hash = href.split("#")[1];
    if (path === pathname || (path === "" && hash)) {
      const el = hash ? document.getElementById(hash) : null;
      (el ?? document.body).scrollIntoView({ behavior: "smooth" });
      return;
    }
    setLabel(PAGE_NAMES[path] ?? path.split("/").filter(Boolean)[0]?.replace(/-/g, " ") ?? "");
    target.current = href;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      router.push(href);
      return;
    }
    set("in");
    setTimeout(() => router.push(href), 850);
    // safety net if the route never changes
    setTimeout(() => { if (phaseRef.current === "in") { set("out"); setTimeout(() => set("idle"), 1100); } }, 5000);
  }, [pathname, router]);

  const ready = phase === "out" || phase === "idle";
  const bits = BIN(n);

  return (
    <Ctx.Provider value={{ ready, go }}>
      {children}
      <div className="tx" data-phase={phase} aria-hidden>
        {Array.from({ length: 8 }, (_, i) => <div className="bar" key={i} style={{ ["--i" as string]: i }} />)}
        <div className="tx-center">
          {boot ? (
            <div className="tx-stack">
              <Mark bits={toBits(n)} height={36} tone="white" />
              <div className="boot-bits">{bits.slice(0, 7)}<b>{bits[7]}</b></div>
              <div className="boot-meta"><span>0x{n.toString(16).toUpperCase().padStart(2, "0")}</span><span>=</span><span>{n === 109 ? "m" : "…"}</span></div>
            </div>
          ) : (
            <div className="tx-stack">
              <Mark height={30} tone="white" />
              <div className="tx-name">{label}</div>
            </div>
          )}
        </div>
      </div>
    </Ctx.Provider>
  );
}

export function TLink({ href, children, className, onClick, ...rest }: React.ComponentProps<"a"> & { href: string }) {
  const { go } = useTx();
  const external = /^(https?:|mailto:|tel:)/.test(href);
  if (external) return <a href={href} className={className} {...rest} {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}>{children}</a>;
  return (
    <Link
      href={href}
      className={className}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        go(href);
      }}
    >
      {children}
    </Link>
  );
}
