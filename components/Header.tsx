"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { NAV, MOBILE_NAV } from "@/lib/data";
import { SITE } from "@/lib/site";
import { Logo } from "./Logo";
import { TLink } from "./Transition";
import { Arrow, Btn } from "./Btn";

export function Header() {
  const pathname = usePathname();
  const [hide, setHide] = useState(false);
  const [open, setOpen] = useState(false);
  const [p, setP] = useState(0);

  const burgerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Scroll progress and hide-on-scroll
  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        setHide(y > last && y > 200);
        last = y;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setP(max > 0 ? y / max : 0);
      });
    };
    window.addEventListener("scroll", on, { passive: true });
    return () => {
      window.removeEventListener("scroll", on);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll and handle keyboard accessibility (Escape & focus trap)
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        burgerRef.current?.focus();
        return;
      }

      if (e.key === "Tab" && menuRef.current) {
        const focusableElements = menuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement || document.activeElement === burgerRef.current) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const active = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <div className="progress" style={{ ["--p" as string]: p }} aria-hidden />

      {/* Announcement bar: rendered only if SITE.announcement is set */}
      {SITE.announcement && (
        <div className="announce">
          <div className="container">
            <span className="label">{SITE.announcement.label}</span>
            <TLink href={SITE.announcement.href}>
              {SITE.announcement.text}{" "}
              <span className="arr">
                <Arrow size={14} />
              </span>
            </TLink>
          </div>
        </div>
      )}

      <header className={`header ${hide && !open ? "hide" : ""}`}>
        <div className="container">
          <TLink href="/" aria-label="minibyte, home">
            <Logo />
          </TLink>

          {/* Desktop Navigation (6 items) */}
          <nav className="nav" aria-label="Main navigation">
            {NAV.map((n) => (
              <TLink
                key={n.href}
                href={n.href}
                aria-current={active(n.href) ? "page" : undefined}
              >
                {n.label}
              </TLink>
            ))}
          </nav>

          <div className="header-cta">
            <Btn href="/contact" small>
              Talk to us
            </Btn>
            <button
              ref={burgerRef}
              className="burger"
              aria-controls="mobile-menu"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <i />
              <i />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu (7 items including Articles) */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`menu ${open ? "open" : ""}`}
        aria-hidden={!open}
      >
        <nav aria-label="Mobile navigation">
          {MOBILE_NAV.map((n, i) => (
            <TLink
              key={n.href}
              href={n.href}
              className="m"
              style={{ ["--i" as string]: i }}
              onClick={() => setOpen(false)}
              aria-current={active(n.href) ? "page" : undefined}
            >
              <small>0{i + 1}</small>
              {n.label}
            </TLink>
          ))}
        </nav>
        <div className="menu-foot">
          <Btn href="/contact" variant="light" arrow magnetic={false}>
            Talk to us
          </Btn>
        </div>
      </div>
    </>
  );
}
