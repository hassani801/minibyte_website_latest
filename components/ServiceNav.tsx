"use client";
import { useEffect, useState } from "react";
import { SERVICES } from "@/lib/data";

export function ServiceNav() {
  const [activeSlug, setActiveSlug] = useState<string>(SERVICES[0]?.slug ?? "");

  useEffect(() => {
    const handleScroll = () => {
      // Find the service section closest to the top of viewport (accounting for header)
      const headerOffset = 140;
      let currentSlug = SERVICES[0]?.slug ?? "";

      for (const service of SERVICES) {
        const el = document.getElementById(service.slug);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= headerOffset) {
            currentSlug = service.slug;
          }
        }
      }
      setActiveSlug(currentSlug);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
    e.preventDefault();
    const target = document.getElementById(slug);
    if (target) {
      const topOffset = 130;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveSlug(slug);
      window.history.replaceState(null, "", `#${slug}`);
    }
  };

  return (
    <div className="svc-anchor-nav-sticky" role="navigation" aria-label="Services navigation">
      <div className="container">
        <nav className="svc-anchor-scroll">
          {SERVICES.map((s) => {
            const isActive = activeSlug === s.slug;
            return (
              <a
                key={s.slug}
                href={`#${s.slug}`}
                onClick={(e) => handleClick(e, s.slug)}
                className={`svc-anchor-pill ${isActive ? "active" : ""}`}
                aria-current={isActive ? "true" : undefined}
              >
                <span className="svc-pill-id mono">{s.id}</span>
                <span className="svc-pill-title">{s.title}</span>
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

