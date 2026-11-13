"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ARTICLES,
  CAPABILITIES,
  CASES,
  CATEGORIES,
  ENGAGEMENT,
  FAQ,
  INDUSTRIES,
  LABS,
  PARTNERS,
  PEOPLE,
  PRINCIPLES,
  PROOF_STATS,
  ROLE_AREAS,
  RUNS_ON,
  SERVICES,
  STATS,
  STEPS,
  visibleCases,
  type Person as PersonType,
  type Partner as PartnerType,
  type CaseItem,
  type LabItem,
  type ArticleItem,
  type RoleAreaItem,
  readingMinutes,
} from "@/lib/data";
import { Reveal, Split } from "./Reveal";
import { Marquee } from "./Marquee";
import { CountUp, Scramble } from "./Scramble";
import { TLink } from "./Transition";
import { Arrow, TextLink, Btn } from "./Btn";
import { DotField } from "./DotField";
import { Photo } from "./Photo";
import { LoopVideo } from "./LoopVideo";
import { BytePattern } from "./BytePattern";
import { Terminal } from "./Terminal";
import { SecHead } from "./PageHero";

/* =========================================================================
   1. HERO TERMINAL LINE
   ========================================================================= */
const TERMINAL_LINES = [
  "detect → track → decide",
  "segment → digitize → interpret",
  "capture → verify → grant",
];

export function HeroTerminal() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % TERMINAL_LINES.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero-term mono" aria-live="polite">
      <span className="term-prompt">$</span>
      <span className="term-cycle" key={index}>
        {TERMINAL_LINES[index]}
      </span>
      <span className="term-cursor" aria-hidden />
    </div>
  );
}

/* =========================================================================
   2. STATS BAND
   ========================================================================= */
export function Stats() {
  return (
    <section className="stats" aria-label="Key facts and numbers">
      <div className="container">
        {STATS.map((s, i) => {
          const num = parseInt(s.value.replace(/[^0-9]/g, ""), 10);
          const hasPlus = s.value.includes("+");
          return (
            <Reveal className="stat" key={s.label} delay={i * 90}>
              <div className={`v ${s.blue ? "blue" : ""}`}>
                {s.count && !isNaN(num) ? (
                  <>
                    <CountUp to={num} />
                    {hasPlus && "+"}
                  </>
                ) : (
                  <Scramble text={s.value} />
                )}
              </div>
              <div className="l">{s.label}</div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

/* =========================================================================
   3. ABOUT (SPLIT LAYOUT WITH ROBOTIC HEAD)
   ========================================================================= */
export function RoboticHead() {
  return (
    <div className="robot-panel" aria-hidden>
      <div className="robot-ambient-grid" />
      <svg
        viewBox="0 0 540 600"
        className="robot-svg"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="blue-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="ring-radial" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4654ff" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#4654ff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#4654ff" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="body-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#d9dcd6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#222733" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="neck-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0c0e12" />
            <stop offset="50%" stopColor="#1a1f2b" />
            <stop offset="100%" stopColor="#0c0e12" />
          </linearGradient>
        </defs>

        {/* Ambient background rings */}
        <circle cx="280" cy="230" r="140" fill="url(#ring-radial)" opacity="0.35" />
        <circle
          cx="280"
          cy="230"
          r="105"
          stroke="#4654ff"
          strokeWidth="1.5"
          strokeDasharray="6 8"
          opacity="0.4"
          className="spin-slow"
        />

        {/* Neck mechanics and spine conduits */}
        <path d="M 160 410 Q 180 500 200 580" stroke="#4654ff" strokeWidth="2" opacity="0.4" />
        <path d="M 180 390 Q 210 490 230 580" stroke="#33394a" strokeWidth="6" strokeLinecap="round" />
        <path d="M 205 385 Q 235 485 260 580" stroke="#1f2430" strokeWidth="10" strokeLinecap="round" />
        <path d="M 230 380 Q 260 480 290 580" stroke="#33394a" strokeWidth="8" strokeLinecap="round" />
        <path d="M 255 380 Q 285 480 320 580" stroke="#1a1e28" strokeWidth="14" strokeLinecap="round" />

        {/* Skull / Cranium profile outline */}
        <path
          d="M 140 370 C 110 320 100 230 140 150 C 180 70 270 50 360 70 C 420 85 450 130 455 180 C 458 210 435 240 435 260 C 435 280 460 295 465 315 C 470 335 440 350 420 355 C 390 360 370 375 350 395 C 330 415 320 440 320 470 L 160 470 Z"
          fill="url(#body-grad)"
          opacity="0.9"
        />

        {/* Face plate seam lines */}
        <path
          d="M 370 85 C 410 120 415 160 395 210 C 380 250 375 280 385 340"
          stroke="#0c0e12"
          strokeWidth="3.5"
          fill="none"
        />
        <path
          d="M 430 220 L 450 225 L 435 260"
          stroke="#4654ff"
          strokeWidth="2"
          fill="none"
          opacity="0.8"
        />

        {/* Eye sensor optic - glowing slit */}
        <path
          d="M 425 210 Q 448 212 458 220 Q 445 224 425 220 Z"
          fill="#4654ff"
          filter="url(#blue-glow)"
        />
        <circle cx="445" cy="216" r="3" fill="#ffffff" />

        {/* Jawline & chin panel */}
        <path
          d="M 385 340 L 420 355 C 410 370 380 385 350 395"
          stroke="#0c0e12"
          strokeWidth="2.5"
          fill="none"
        />

        {/* Temporal glowing blue core ring (the hero visual motif) */}
        <circle
          cx="280"
          cy="230"
          r="66"
          stroke="#4654ff"
          strokeWidth="8"
          filter="url(#blue-glow)"
          className="pulse-glow"
        />
        <circle cx="280" cy="230" r="54" stroke="#ffffff" strokeWidth="2.5" opacity="0.9" />
        <circle cx="280" cy="230" r="38" fill="#0c0e12" stroke="#4654ff" strokeWidth="3" />
        <circle cx="280" cy="230" r="16" fill="#4654ff" filter="url(#blue-glow)" />

        {/* Sensor coordinate HUD traces */}
        <line x1="280" y1="130" x2="280" y2="150" stroke="#4654ff" strokeWidth="2" opacity="0.8" />
        <line x1="280" y1="310" x2="280" y2="330" stroke="#4654ff" strokeWidth="2" opacity="0.8" />
        <line x1="180" y1="230" x2="200" y2="230" stroke="#4654ff" strokeWidth="2" opacity="0.8" />
        <line x1="360" y1="230" x2="380" y2="230" stroke="#4654ff" strokeWidth="2" opacity="0.8" />

        {/* Vertical beam */}
        <line x1="495" y1="20" x2="495" y2="580" stroke="#4654ff" strokeWidth="3" opacity="0.5" filter="url(#blue-glow)" />
      </svg>
      <div className="robot-badge mono">
        <span className="dot-pulse" />
        <span>R&D SPEC // CORE-01</span>
      </div>
    </div>
  );
}

export function AboutSection() {
  return (
    <section className="section bg-paper" id="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-copy">
            <Reveal as="div" className="label eyebrow">
              MINIBYTE
            </Reveal>
            <div className="about-blue-rule" />
            <Reveal as="h2" className="about-lead">
              MiniByte is a leading AI R&D firm, architecting and deploying cutting-edge AI SaaS
              platforms, advanced robotics and embedded intelligence solutions.
            </Reveal>
            <Reveal as="p" className="about-body" delay={120}>
              We turn complex challenges into intelligent, autonomous systems: business process
              automation, multi-agent orchestration, enterprise-grade data generation, and critical
              infrastructure monitoring through high-stakes sensor fusion. Scalable systems that
              define the future.
            </Reveal>
            <Reveal delay={200} style={{ marginTop: 32 }}>
              <Btn href="/company" arrow>
                About our team & mission
              </Btn>
            </Reveal>
          </div>
          <Reveal variant="scale" className="about-visual-wrap" delay={150}>
            <RoboticHead />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   4. WHAT WE DO
   ========================================================================= */
function CapabilityIcon({ icon }: { icon: string }) {
  switch (icon) {
    case "Complete AI engineering":
      return (
        <svg viewBox="0 0 24 24" className="cap-icon" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="5" y="5" width="14" height="14" rx="2" />
          <rect x="9" y="9" width="6" height="6" />
          <path d="M9 1v4M15 1v4M9 19v4M15 19v4M1 9h4M1 15h4M19 9h4M19 15h4" />
        </svg>
      );
    case "Web development":
      return (
        <svg viewBox="0 0 24 24" className="cap-icon" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="2" y="3" width="20" height="18" rx="3" />
          <path d="M2 9h20M7 6h.01M11 6h.01M8 13l-2 2 2 2M16 13l2 2-2 2M13 13l-2 4" />
        </svg>
      );
    case "UI/UX":
      return (
        <svg viewBox="0 0 24 24" className="cap-icon" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18M9 21V9" />
          <circle cx="15" cy="15" r="2" />
        </svg>
      );
    case "SEO":
      return (
        <svg viewBox="0 0 24 24" className="cap-icon" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35M11 7v4l3 2" />
        </svg>
      );
    case "Graphic design":
      return (
        <svg viewBox="0 0 24 24" className="cap-icon" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 19l7-7 3 3-7 7-3-3z" />
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
          <path d="M2 2l7.586 7.586" />
          <circle cx="11" cy="11" r="2" />
        </svg>
      );
    case "Marketing":
      return (
        <svg viewBox="0 0 24 24" className="cap-icon" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M3 11l15-6v14L3 13v-2zM18 8a5 5 0 010 8M3 13v6a2 2 0 002 2h1" />
        </svg>
      );
    case "AI research and development":
      return (
        <svg viewBox="0 0 24 24" className="cap-icon" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M9.5 2A4.5 4.5 0 005 6.5C5 7.8 5.6 9 6.5 9.8A4.5 4.5 0 005 14c0 1.9 1.2 3.6 3 4.2V20a2 2 0 002 2h4a2 2 0 002-2v-1.8c1.8-.6 3-2.3 3-4.2a4.5 4.5 0 00-1.5-4.2c.9-.8 1.5-2 1.5-3.3A4.5 4.5 0 0014.5 2h-5z" />
          <path d="M12 6v6M9 9h6" />
        </svg>
      );
    case "SaaS development":
      return (
        <svg viewBox="0 0 24 24" className="cap-icon" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z" />
          <path d="M12 12v6M9 15l3-3 3 3" />
        </svg>
      );
    case "Custom model development":
      return (
        <svg viewBox="0 0 24 24" className="cap-icon" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="6" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="12" r="3" />
          <path d="M8.5 7.5l7 3M8.5 16.5l7-3M6 9v6" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className="cap-icon" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8v8M8 12h8" />
        </svg>
      );
  }
}

export function WhatWeDoSection() {
  const g1 = CAPABILITIES[0];
  const g2 = CAPABILITIES[1];

  return (
    <section className="section bg-white" id="capabilities">
      <div className="container">
        <SecHead
          label="What we do"
          title="End-to-end engineering, from research to scale."
          lede="Our team is dedicated to delivering innovative digital solutions through a blend of creativity, technical expertise and collaboration."
          right={<TextLink href="/services">All services →</TextLink>}
        />

        <div className="what-we-do-grid">
          {/* Column 1: AI product development */}
          <div className="wwd-col">
            <Reveal as="h3" className="wwd-group-title">
              {g1.group}
            </Reveal>
            <ul className="wwd-list">
              {g1.items.map((item, i) => (
                <Reveal as="li" key={item} delay={i * 60} className="wwd-item">
                  <div className="wwd-icon-box">
                    <CapabilityIcon icon={item} />
                  </div>
                  <span>{item}</span>
                </Reveal>
              ))}
            </ul>
          </div>

          {/* Central vertical divider rule with center dot */}
          <div className="wwd-divider" aria-hidden>
            <div className="wwd-line" />
            <div className="wwd-dot" />
          </div>

          {/* Column 2: AI/ML and full-stack */}
          <div className="wwd-col">
            <Reveal as="h3" className="wwd-group-title">
              {g2.group}
            </Reveal>
            <ul className="wwd-list">
              {g2.items.map((item, i) => (
                <Reveal as="li" key={item} delay={100 + i * 80} className="wwd-item">
                  <div className="wwd-icon-box">
                    <CapabilityIcon icon={item} />
                  </div>
                  <span>{item}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   5. SELECTED WORK
   ========================================================================= */
export function SelectedWorkSection({
  projectImages = {},
}: {
  projectImages?: Record<string, string>;
} = {}) {
  const selectedCases = visibleCases.filter((c) => c.featured);

  return (
    <section className="section bg-paper" id="work">
      <div className="container">
        <SecHead
          row
          label="Selected work"
          title="Systems built for high-stakes environments."
          lede="From sub-surface geology to defense analytics and automotive spatial view synthesis."
          right={<TextLink href="/work">View all work →</TextLink>}
        />

        <div className="work-scroll-grid">
          {selectedCases.map((c, i) => (
            <Reveal key={c.slug} delay={i * 90}>
              <TLink href={`/work/${c.slug}`} className="work-card">
                <div className="work-art-wrap">
                  {projectImages[c.slug] ? (
                    <>
                      <Photo
                        src={projectImages[c.slug]}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="work-image"
                        fallback={
                          <DotField mode={c.art} gap={20} className="work-canvas" />
                        }
                      />
                      <div className="work-art-overlay" aria-hidden="true" />
                    </>
                  ) : (
                    <DotField mode={c.art} gap={20} className="work-canvas" />
                  )}
                  <div className="work-art-badge mono">
                    {CATEGORIES.find((cat) => cat.key === c.category)?.label.split(" & ")[0] ?? c.category.toUpperCase()}
                  </div>
                </div>
                <div className="work-body">
                  <span className="label work-tag">{c.tag}</span>
                  <h3 className="work-title">{c.title}</h3>
                  <p className="work-outcome">{c.outcome}</p>
                  <span className="work-link">
                    Explore case <Arrow />
                  </span>
                </div>
              </TLink>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   6. INDUSTRIES
   ========================================================================= */
function IndustryIcon({ slug }: { slug: string }) {
  switch (slug) {
    case "enterprise-saas":
      return (
        <svg viewBox="0 0 48 48" className="ind-svg" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M36 22a8 8 0 00-15.5-2.6A9 9 0 008 27a9 9 0 009 9h19a8 8 0 000-16z" />
          <circle cx="27" cy="27" r="3" />
          <path d="M27 20v4M27 30v4M20 27h4M30 27h4" />
          <path d="M14 42h20M24 36v6" />
        </svg>
      );
    case "defense-aerospace":
      return (
        <svg viewBox="0 0 48 48" className="ind-svg" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M24 4L10 10v14c0 11 6 20 14 22 8-2 14-11 14-22V10L24 4z" />
          <path d="M24 14l-6 12h5v8h2v-8h5l-6-12z" />
        </svg>
      );
    case "energy-mining":
      return (
        <svg viewBox="0 0 48 48" className="ind-svg" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="24" cy="14" r="6" />
          <path d="M24 8V4M30 14h4M18 14h-4M24 20v14" />
          <path d="M12 36l12-10 12 10M8 42l16-12 16 12" />
        </svg>
      );
    case "b2b-sales":
      return (
        <svg viewBox="0 0 48 48" className="ind-svg" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="16" cy="14" r="5" />
          <circle cx="32" cy="14" r="5" />
          <path d="M10 32v-4a6 6 0 0112 0v4M26 32v-4a6 6 0 0112 0v4" />
          <path d="M8 42h32M24 24v18M38 28v14M10 34v8" />
          <circle cx="24" cy="8" r="4" />
          <path d="M24 6v4M22.5 7.5h3" />
        </svg>
      );
    case "agriculture":
      return (
        <svg viewBox="0 0 48 48" className="ind-svg" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M24 38V22M24 22c-5-8-14-6-14 0 7 2 12 0 14 0zM24 26c5-8 14-6 14 0-7 2-12 0-14 0z" />
          <path d="M8 42h32M14 42v-4M34 42v-4" />
          <path d="M38 12l-8 4M38 12v6" />
        </svg>
      );
    case "media-entertainment":
      return (
        <svg viewBox="0 0 48 48" className="ind-svg" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="8" y="10" width="32" height="24" rx="3" />
          <path d="M21 17l10 5-10 5v-10z" />
          <circle cx="24" cy="6" r="2" />
          <path d="M18 40h12M24 34v6M8 22H4M44 22h-4" />
        </svg>
      );
    case "smart-cities":
      return (
        <svg viewBox="0 0 48 48" className="ind-svg" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 42V18l10-6v30M18 24l12-8v26M30 28l10-4v18" />
          <circle cx="36" cy="10" r="3" />
          <path d="M36 6v1M40 10h1M36 14v1M32 10h-1" />
        </svg>
      );
    case "healthtech":
      return (
        <svg viewBox="0 0 48 48" className="ind-svg" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="12" y="6" width="24" height="36" rx="4" />
          <path d="M24 16v12M18 22h12" />
          <circle cx="24" cy="36" r="1.5" />
          <path d="M6 18h6M6 30h6M36 18h6M36 30h6" />
        </svg>
      );
    case "insurance":
      return (
        <svg viewBox="0 0 48 48" className="ind-svg" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M24 6C13 6 8 18 8 20h32c0-2-5-14-16-14zM24 20v22M14 26l10 6 10-6" />
          <path d="M24 2v4" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 48 48" className="ind-svg" fill="none" stroke="currentColor" strokeWidth="2.2">
          <circle cx="24" cy="24" r="18" />
        </svg>
      );
  }
}

export function IndustriesSection({
  title = "Deep domain adaptation across 9 critical sectors.",
  lede = "Our custom model pipelines and edge architectures are deployed across high-stakes industries worldwide.",
  label = "Industries",
}: {
  title?: string;
  lede?: string;
  label?: string;
} = {}) {
  return (
    <section className="section bg-white" id="industries">
      <div className="container">
        <SecHead
          label={label}
          title={title}
          lede={lede}
        />

        <div className="industries-grid">
          {INDUSTRIES.map((ind, i) => (
            <Reveal key={ind.slug} delay={i * 55}>
              <div className="industry-card">
                <div className="ind-icon-box">
                  <IndustryIcon slug={ind.slug} />
                </div>
                <h3 className="ind-name">{ind.name}</h3>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   7. PARTNERS
   ========================================================================= */
function PartnerItem({ partner }: { partner: PartnerType }) {
  const [imgErr, setImgErr] = useState(false);

  return (
    <div className="partner-card" title={partner.name}>
      {partner.logo && !imgErr ? (
        <Image
          src={partner.logo}
          alt={partner.name}
          width={160}
          height={48}
          className="partner-logo"
          onError={() => setImgErr(true)}
          unoptimized
        />
      ) : (
        <span className="partner-wordmark">{partner.name}</span>
      )}
    </div>
  );
}

export function PartnersSection() {
  const half = Math.ceil(PARTNERS.length / 2);
  const row1 = PARTNERS.slice(0, half);
  const row2 = PARTNERS.slice(half);

  return (
    <section className="section partners-section bg-ink" id="partners">
      <div className="container">
        <SecHead
          label="Partners"
          title="Our partners."
          lede="Collaborating with forward-thinking enterprises, agencies and deep-tech startups."
        />
      </div>

      <div className="partners-marquee-wrap">
        <Marquee duration={35} gap={20}>
          {row1.map((p) => (
            <PartnerItem key={p.name} partner={p} />
          ))}
        </Marquee>

        <div style={{ height: 16 }} />

        <Marquee duration={40} gap={20} reverse>
          {row2.map((p) => (
            <PartnerItem key={p.name} partner={p} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}

/* =========================================================================
   9. LEADERSHIP
   ========================================================================= */
function LeaderCard({ person, i }: { person: PersonType; i: number }) {
  const [imgErr, setImgErr] = useState(false);
  const isCTO = person.role.toLowerCase().includes("technology");

  const initials = person.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <Reveal delay={i * 120}>
      <div className={`leader-card ${isCTO ? "leader-center" : ""}`}>
        <div className={`leader-photo-wrap ${isCTO ? "glow-ring" : ""}`}>
          {person.photo && !imgErr ? (
            <Image
              src={person.photo}
              alt={`Portrait of ${person.name}, ${person.role}`}
              width={240}
              height={240}
              className="leader-img"
              onError={() => setImgErr(true)}
              unoptimized
            />
          ) : (
            <div className="leader-initials" aria-label={person.name}>
              {initials}
            </div>
          )}
        </div>
        <div className="leader-meta">
          <div className="leader-name-row">
            <h3 className="leader-name">{person.name.toUpperCase()}</h3>
            {person.cofounder && (
              <span className="cofounder-tag mono">Cofounder</span>
            )}
          </div>
          <p className="leader-role">{person.role.toUpperCase()}</p>
          {person.linkedin && (
            <a
              href={person.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="leader-li"
              aria-label={`${person.name} LinkedIn`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </Reveal>
  );
}

export function LeadershipSection({ id = "team" }: { id?: string } = {}) {
  return (
    <section className="section bg-white" id={id}>
      <div className="container">
        <SecHead
          label="Leadership"
          title="Meet our team."
          lede="Researchers, technologists and operators with direct executive accountability on every engineering engagement."
        />

        <div className="leadership-wrap">
          <svg className="leader-arcs" viewBox="0 0 1000 120" preserveAspectRatio="none" aria-hidden="true">
            <path
              d="M 500 60 Q 340 10 180 60"
              fill="none"
              stroke="#4654ff"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              opacity="0.45"
            />
            <path
              d="M 500 60 Q 660 10 820 60"
              fill="none"
              stroke="#4654ff"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              opacity="0.45"
            />
          </svg>

          <div className="leadership-grid">
            {PEOPLE.map((p, i) => (
              <LeaderCard key={p.name} person={p} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   LEGACY / MULTI-PAGE EXPORTS (PRESERVED SO OTHER ROUTES BUILD CLEANLY)
   ========================================================================= */
export function Clients() {
  return <PartnersSection />;
}

const WORDS = ["Detect", "Track", "Digitize", "Reconstruct", "Automate", "Deploy"];
export function BigMarquee({ words = WORDS }: { words?: string[] }) {
  const list = words ?? WORDS;
  return (
    <div className="bigmarquee" aria-hidden>
      <Marquee duration={55} gap={48}>
        {list.map((w, i) => (
          <span className="it" key={w}>
            <span className={i % 2 ? "o" : ""}>{w}</span>
            <span className={`dot ${i % 3 === 2 ? "b" : ""}`} />
          </span>
        ))}
      </Marquee>
      <div style={{ height: 8 }} />
      <Marquee duration={65} gap={48} reverse>
        {[...list].reverse().map((w, i) => (
          <span className="it" key={w}>
            <span className={i % 2 ? "" : "o"}>{w}</span>
            <span className={`dot ${i % 3 === 0 ? "b" : ""}`} />
          </span>
        ))}
      </Marquee>
    </div>
  );
}

export function ServicesGrid() {
  return (
    <div className="svc-grid">
      {SERVICES.map((s) => (
        <Reveal key={s.id}>
          <TLink href={`/services#${s.slug}`} className="svc">
            <Scramble className="idx" text={s.id} />
            <h3>
              {s.title}
              <span className="ar">
                <Arrow size={20} />
              </span>
            </h3>
            <p>{s.text}</p>
          </TLink>
        </Reveal>
      ))}
    </div>
  );
}

/* =========================================================================
   SERVICE VISUAL PANELS
   ========================================================================= */
function ProductVisual() {
  return (
    <div className="svc-visual-card">
      <div className="svc-visual-hud mono">
        <span>DEV // HW-EMBEDDED</span>
        <span className="svc-hud-live"><span className="dot-pulse" /> ONLINE</span>
      </div>
      <svg viewBox="0 0 460 300" className="svc-visual-svg" fill="none">
        <defs>
          <radialGradient id="soc-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4654ff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#4654ff" stopOpacity="0" />
          </radialGradient>
        </defs>

        <pattern id="pcb-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="0.8" fill="rgba(255,255,255,0.12)" />
        </pattern>
        <rect width="460" height="300" fill="url(#pcb-grid)" />

        <circle cx="230" cy="150" r="90" fill="url(#soc-glow)" />

        <rect x="40" y="30" width="380" height="240" rx="14" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
        <rect x="48" y="38" width="364" height="224" rx="10" stroke="rgba(70,84,255,0.2)" strokeWidth="1" strokeDasharray="4 4" />

        <circle cx="60" cy="50" r="5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
        <circle cx="400" cy="50" r="5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
        <circle cx="60" cy="250" r="5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
        <circle cx="400" cy="250" r="5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />

        <rect x="175" y="95" width="110" height="110" rx="8" fill="#141824" stroke="#4654ff" strokeWidth="2" />
        <rect x="190" y="110" width="80" height="80" rx="4" fill="#0c0e14" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <text x="230" y="145" textAnchor="middle" fill="#ffffff" fontFamily="var(--mono)" fontSize="11" fontWeight="600" letterSpacing="0.08em">MINIBYTE</text>
        <text x="230" y="162" textAnchor="middle" fill="#4654ff" fontFamily="var(--mono)" fontSize="9" letterSpacing="0.1em">NEURAL SoC</text>

        <path d="M 175 115 L 120 115 L 90 90 L 50 90" stroke="#4654ff" strokeWidth="1.5" opacity="0.8" />
        <circle cx="50" cy="90" r="2.5" fill="#4654ff" />
        <path d="M 175 135 L 110 135 L 75 135 L 50 135" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
        <circle cx="50" cy="135" r="2.5" fill="#ffffff" />
        <path d="M 175 155 L 110 155 L 80 180 L 50 180" stroke="#4654ff" strokeWidth="1.5" opacity="0.8" />
        <circle cx="50" cy="180" r="2.5" fill="#4654ff" />
        <path d="M 175 175 L 120 175 L 100 210 L 50 210" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
        <circle cx="50" cy="210" r="2.5" fill="#ffffff" />

        <path d="M 285 115 L 340 115 L 370 90 L 410 90" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
        <circle cx="410" cy="90" r="2.5" fill="#ffffff" />
        <path d="M 285 135 L 350 135 L 380 135 L 410 135" stroke="#4654ff" strokeWidth="1.5" opacity="0.8" />
        <circle cx="410" cy="135" r="2.5" fill="#4654ff" />
        <path d="M 285 155 L 340 155 L 370 180 L 410 180" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
        <circle cx="410" cy="180" r="2.5" fill="#ffffff" />
        <path d="M 285 175 L 330 175 L 360 210 L 410 210" stroke="#4654ff" strokeWidth="1.5" opacity="0.8" />
        <circle cx="410" cy="210" r="2.5" fill="#4654ff" />

        <path d="M 205 95 L 205 60" stroke="#4654ff" strokeWidth="1.5" />
        <path d="M 230 95 L 230 50" stroke="#ffffff" strokeWidth="1.5" opacity="0.6" />
        <path d="M 255 95 L 255 60" stroke="#4654ff" strokeWidth="1.5" />
        <path d="M 205 205 L 205 240" stroke="#ffffff" strokeWidth="1.5" opacity="0.6" />
        <path d="M 230 205 L 230 250" stroke="#4654ff" strokeWidth="1.5" />
        <path d="M 255 205 L 255 240" stroke="#ffffff" strokeWidth="1.5" opacity="0.6" />

        <g transform="translate(320, 240)">
          <circle cx="0" cy="0" r="3" fill="#4654ff" />
          <circle cx="14" cy="0" r="3" fill="#27c93f" />
          <circle cx="28" cy="0" r="3" fill="#ffbd2e" />
          <text x="38" y="3" fill="rgba(255,255,255,0.4)" fontFamily="var(--mono)" fontSize="8">BUS OK</text>
        </g>
      </svg>
    </div>
  );
}

function VisionVisual() {
  return (
    <div className="svc-visual-card">
      <div className="svc-visual-hud mono">
        <span>CAM // SENSOR FUSION</span>
        <span className="svc-hud-live">60 FPS · 4K UHD</span>
      </div>
      <svg viewBox="0 0 460 300" className="svc-visual-svg" fill="none">
        <pattern id="cam-grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        </pattern>
        <rect width="460" height="300" fill="url(#cam-grid)" />

        <circle cx="230" cy="150" r="70" stroke="rgba(70,84,255,0.25)" strokeWidth="1.5" strokeDasharray="3 6" />
        <circle cx="230" cy="150" r="4" fill="#4654ff" />
        <line x1="230" y1="60" x2="230" y2="90" stroke="#4654ff" strokeWidth="1.5" />
        <line x1="230" y1="210" x2="230" y2="240" stroke="#4654ff" strokeWidth="1.5" />
        <line x1="140" y1="150" x2="170" y2="150" stroke="#4654ff" strokeWidth="1.5" />
        <line x1="290" y1="150" x2="320" y2="150" stroke="#4654ff" strokeWidth="1.5" />

        <g transform="translate(60, 70)">
          <rect x="0" y="0" width="140" height="95" rx="3" stroke="#4654ff" strokeWidth="1.5" fill="rgba(70,84,255,0.06)" />
          <path d="M -2 14 L -2 -2 L 14 -2" stroke="#4654ff" strokeWidth="2.5" />
          <path d="M 126 -2 L 142 -2 L 142 14" stroke="#4654ff" strokeWidth="2.5" />
          <path d="M -2 81 L -2 97 L 14 97" stroke="#4654ff" strokeWidth="2.5" />
          <path d="M 126 97 L 142 97 L 142 81" stroke="#4654ff" strokeWidth="2.5" />
          <rect x="0" y="-18" width="105" height="18" fill="#4654ff" rx="2" />
          <text x="6" y="-5" fill="#ffffff" fontFamily="var(--mono)" fontSize="9" fontWeight="600">TARGET 01 · 99.4%</text>
          <line x1="70" y1="47" x2="110" y2="25" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="3 3" />
          <polygon points="110,25 102,28 106,35" fill="#ffffff" />
        </g>

        <g transform="translate(240, 130)">
          <rect x="0" y="0" width="160" height="110" rx="3" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeDasharray="4 4" fill="rgba(255,255,255,0.03)" />
          <path d="M -2 14 L -2 -2 L 14 -2" stroke="#ffffff" strokeWidth="2.5" />
          <path d="M 146 -2 L 162 -2 L 162 14" stroke="#ffffff" strokeWidth="2.5" />
          <path d="M -2 96 L -2 112 L 14 112" stroke="#ffffff" strokeWidth="2.5" />
          <path d="M 146 112 L 162 112 L 162 96" stroke="#ffffff" strokeWidth="2.5" />
          <rect x="0" y="-18" width="95" height="18" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.4)" rx="2" />
          <text x="6" y="-5" fill="#ffffff" fontFamily="var(--mono)" fontSize="9">3D MESH · 98.7%</text>
        </g>

        <text x="40" y="270" fill="rgba(255,255,255,0.45)" fontFamily="var(--mono)" fontSize="9">
          Δ(x,y): [+0.42, -0.18] · OPTICAL FLOW: 0.04ms · STEREO DEPTH: 14.8m
        </text>
      </svg>
    </div>
  );
}

function PlatformsVisual() {
  return (
    <div className="svc-visual-card">
      <div className="svc-visual-hud mono">
        <span>INFRA // TENSOR PIPELINE</span>
        <span className="svc-hud-live">LATENCY: 4.2ms</span>
      </div>
      <svg viewBox="0 0 460 300" className="svc-visual-svg" fill="none">
        <g transform="translate(60, 50)">
          <text x="0" y="-12" fill="rgba(255,255,255,0.4)" fontFamily="var(--mono)" fontSize="9">INPUT EMBED</text>
          {[0, 50, 100, 150].map((y, idx) => (
            <g key={idx} transform={`translate(0, ${y})`}>
              <circle cx="16" cy="16" r="14" fill="#141824" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
              <text x="16" y="20" textAnchor="middle" fill="#ffffff" fontFamily="var(--mono)" fontSize="10">{`x${idx + 1}`}</text>
            </g>
          ))}
        </g>

        <g transform="translate(195, 30)">
          <text x="15" y="8" fill="#4654ff" fontFamily="var(--mono)" fontSize="9">LATENT MANIFOLD</text>
          {[0, 48, 96, 144, 192].map((y, idx) => (
            <g key={idx} transform={`translate(20, ${y + 20})`}>
              <circle cx="16" cy="16" r="15" fill="#0d111a" stroke="#4654ff" strokeWidth="2" />
              <circle cx="16" cy="16" r="4" fill="#ffffff" />
            </g>
          ))}
        </g>

        <g transform="translate(350, 90)">
          <text x="-5" y="-12" fill="rgba(255,255,255,0.4)" fontFamily="var(--mono)" fontSize="9">INFERENCE API</text>
          <rect x="0" y="0" width="70" height="70" rx="8" fill="#141824" stroke="#4654ff" strokeWidth="2" />
          <path d="M 20 35 L 32 47 L 52 23" stroke="#4654ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <text x="35" y="58" textAnchor="middle" fill="#ffffff" fontFamily="var(--mono)" fontSize="9">SERVED</text>
        </g>

        <path d="M 92 66 C 140 66, 170 66, 215 66" stroke="#4654ff" strokeWidth="1.5" opacity="0.6" />
        <path d="M 92 66 C 140 66, 170 114, 215 114" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
        <path d="M 92 116 C 140 116, 170 66, 215 66" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
        <path d="M 92 116 C 140 116, 170 162, 215 162" stroke="#4654ff" strokeWidth="1.5" opacity="0.8" />
        <path d="M 92 166 C 140 166, 170 162, 215 162" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
        <path d="M 92 216 C 140 216, 170 210, 215 210" stroke="#4654ff" strokeWidth="1.5" opacity="0.7" />

        <path d="M 251 66 C 300 66, 310 125, 350 125" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        <path d="M 251 114 C 300 114, 310 125, 350 125" stroke="#4654ff" strokeWidth="2" />
        <path d="M 251 162 C 300 162, 310 125, 350 125" stroke="#4654ff" strokeWidth="1.5" />
        <path d="M 251 210 C 300 210, 310 125, 350 125" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />

        <text x="40" y="275" fill="rgba(255,255,255,0.4)" fontFamily="var(--mono)" fontSize="9">
          LOSS: 0.0018 · PARALLEL WORKERS: 128 · SYNTHETIC RUNTIME: ACTIVE
        </text>
      </svg>
    </div>
  );
}

function AutomationVisual() {
  return (
    <div className="svc-visual-card">
      <div className="svc-visual-hud mono">
        <span>WORKFLOW // MULTI-AGENT</span>
        <span className="svc-hud-live">DURABLE EXECUTION</span>
      </div>
      <svg viewBox="0 0 460 300" className="svc-visual-svg" fill="none">
        <g transform="translate(30, 95)">
          <rect x="0" y="0" width="85" height="56" rx="6" fill="#141824" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
          <text x="10" y="24" fill="#ffffff" fontFamily="var(--mono)" fontSize="9" fontWeight="600">01 INGEST</text>
          <text x="10" y="40" fill="rgba(255,255,255,0.4)" fontFamily="var(--mono)" fontSize="8">PDF / EVENT</text>
        </g>

        <line x1="115" y1="123" x2="145" y2="123" stroke="#4654ff" strokeWidth="1.5" />
        <polygon points="145,123 138,119 138,127" fill="#4654ff" />

        <g transform="translate(150, 95)">
          <rect x="0" y="0" width="95" height="56" rx="6" fill="#141824" stroke="#4654ff" strokeWidth="1.5" />
          <text x="10" y="24" fill="#ffffff" fontFamily="var(--mono)" fontSize="9" fontWeight="600">02 PARSE</text>
          <text x="10" y="40" fill="#4654ff" fontFamily="var(--mono)" fontSize="8">U-NET + OCR</text>
        </g>

        <line x1="245" y1="123" x2="275" y2="123" stroke="#4654ff" strokeWidth="1.5" />
        <polygon points="275,123 268,119 268,127" fill="#4654ff" />

        <g transform="translate(280, 100)">
          <polygon points="24,0 48,24 24,48 0,24" fill="#1b2133" stroke="#4654ff" strokeWidth="1.5" />
          <text x="24" y="27" textAnchor="middle" fill="#ffffff" fontFamily="var(--mono)" fontSize="9">GATE</text>
        </g>

        <path d="M 328 124 L 355 124 L 355 75 L 375 75" stroke="#27c93f" strokeWidth="1.5" />
        <polygon points="375,75 368,71 368,79" fill="#27c93f" />
        <g transform="translate(380, 50)">
          <rect x="0" y="0" width="70" height="48" rx="6" fill="#141824" stroke="#27c93f" strokeWidth="1.5" />
          <text x="8" y="20" fill="#ffffff" fontFamily="var(--mono)" fontSize="8.5" fontWeight="600">AUTO-SYNC</text>
          <text x="8" y="34" fill="#27c93f" fontFamily="var(--mono)" fontSize="8">ERP / DB</text>
        </g>

        <path d="M 328 124 L 355 124 L 355 175 L 375 175" stroke="#ffbd2e" strokeWidth="1.5" />
        <polygon points="375,175 368,171 368,179" fill="#ffbd2e" />
        <g transform="translate(380, 150)">
          <rect x="0" y="0" width="70" height="48" rx="6" fill="#141824" stroke="#ffbd2e" strokeWidth="1.5" />
          <text x="8" y="20" fill="#ffffff" fontFamily="var(--mono)" fontSize="8.5" fontWeight="600">ESCALATE</text>
          <text x="8" y="34" fill="#ffbd2e" fontFamily="var(--mono)" fontSize="8">WHATSAPP</text>
        </g>

        <g transform="translate(30, 225)">
          <rect x="0" y="0" width="400" height="34" rx="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" />
          <circle cx="16" cy="17" r="4" fill="#27c93f" />
          <text x="28" y="21" fill="rgba(255,255,255,0.6)" fontFamily="var(--mono)" fontSize="8.5">
            EXECUTION #84920 · 153,860 SKUS SYNCED · ZERO ANOMALIES
          </text>
        </g>
      </svg>
    </div>
  );
}

function WebVisual() {
  return (
    <div className="svc-visual-card">
      <div className="svc-visual-hud mono">
        <span>UI/UX // FULL-STACK APP</span>
        <span className="svc-hud-live">RESPONSIVE</span>
      </div>
      <svg viewBox="0 0 460 300" className="svc-visual-svg" fill="none">
        <rect x="30" y="30" width="400" height="240" rx="8" fill="#10131a" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
        <rect x="30" y="30" width="400" height="30" rx="8" fill="#171b26" />
        <circle cx="48" cy="45" r="3.5" fill="#ff5f56" />
        <circle cx="58" cy="45" r="3.5" fill="#ffbd2e" />
        <circle cx="68" cy="45" r="3.5" fill="#27c93f" />

        <rect x="90" y="37" width="220" height="16" rx="4" fill="#0d0f15" stroke="rgba(255,255,255,0.1)" />
        <text x="100" y="49" fill="rgba(255,255,255,0.5)" fontFamily="var(--mono)" fontSize="8">https://app.minibyte.ai/dashboard</text>

        <rect x="30" y="60" width="70" height="210" fill="#131620" />
        <rect x="42" y="75" width="46" height="6" rx="2" fill="#4654ff" />
        <rect x="42" y="92" width="38" height="4" rx="2" fill="rgba(255,255,255,0.2)" />
        <rect x="42" y="106" width="42" height="4" rx="2" fill="rgba(255,255,255,0.2)" />
        <rect x="42" y="120" width="34" height="4" rx="2" fill="rgba(255,255,255,0.2)" />

        <g transform="translate(115, 75)">
          <rect x="0" y="0" width="90" height="45" rx="4" fill="#181d2a" stroke="rgba(255,255,255,0.08)" />
          <text x="8" y="16" fill="rgba(255,255,255,0.4)" fontFamily="var(--mono)" fontSize="7">THROUGHPUT</text>
          <text x="8" y="34" fill="#ffffff" fontFamily="var(--mono)" fontSize="13" fontWeight="600">99.98%</text>

          <rect x="100" y="0" width="90" height="45" rx="4" fill="#181d2a" stroke="rgba(255,255,255,0.08)" />
          <text x="108" y="16" fill="rgba(255,255,255,0.4)" fontFamily="var(--mono)" fontSize="7">LATENCY</text>
          <text x="108" y="34" fill="#4654ff" fontFamily="var(--mono)" fontSize="13" fontWeight="600">&lt; 18ms</text>

          <rect x="200" y="0" width="100" height="45" rx="4" fill="#181d2a" stroke="rgba(255,255,255,0.08)" />
          <text x="208" y="16" fill="rgba(255,255,255,0.4)" fontFamily="var(--mono)" fontSize="7">STATUS</text>
          <text x="208" y="34" fill="#27c93f" fontFamily="var(--mono)" fontSize="13" fontWeight="600">HEALTHY</text>

          <rect x="0" y="58" width="300" height="120" rx="4" fill="#151924" stroke="rgba(255,255,255,0.08)" />
          <path d="M 10 150 Q 60 110 110 130 T 210 90 T 290 80" fill="none" stroke="#4654ff" strokeWidth="2" />
          <circle cx="290" cy="80" r="3.5" fill="#4654ff" />
        </g>
      </svg>
    </div>
  );
}

interface ServiceVisualConfig {
  hudLabel: string;
  hudLive: React.ReactNode;
  alt: string;
}

const SERVICE_CONFIG: Record<string, ServiceVisualConfig> = {
  "ai-product-development": {
    hudLabel: "DEV // HW-EMBEDDED",
    hudLive: (
      <>
        <span className="dot-pulse" /> ONLINE
      </>
    ),
    alt: "Embedded neural hardware architecture and custom PCB design",
  },
  "computer-vision": {
    hudLabel: "CAM // SENSOR FUSION",
    hudLive: "60 FPS · 4K UHD",
    alt: "Industrial computer vision camera scanning mechanical components with precision laser telemetry",
  },
  "ai-ml-platforms": {
    hudLabel: "INFRA // TENSOR PIPELINE",
    hudLive: "LATENCY: 4.2ms",
    alt: "Modular high-performance AI and machine learning computing cluster",
  },
  "process-automation": {
    hudLabel: "WORKFLOW // MULTI-AGENT",
    hudLive: "DURABLE EXECUTION",
    alt: "Automated multi-axis robotic assembly and linear conveyor system",
  },
  "web-design-growth": {
    hudLabel: "UI/UX // FULL-STACK APP",
    hudLive: "RESPONSIVE",
    alt: "Modern enterprise web application dashboard with high-throughput telemetry",
  },
};

function ServiceVisual({
  slug,
  serviceImages = {},
}: {
  slug: string;
  serviceImages?: Record<string, string>;
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const imgSrc = serviceImages[slug];
  const cfg = SERVICE_CONFIG[slug];

  const renderFallback = () => {
    switch (slug) {
      case "ai-product-development":
        return <ProductVisual />;
      case "computer-vision":
        return <VisionVisual />;
      case "ai-ml-platforms":
        return <PlatformsVisual />;
      case "process-automation":
        return <AutomationVisual />;
      case "web-design-growth":
        return <WebVisual />;
      default:
        return <ProductVisual />;
    }
  };

  if (!imgSrc || imgFailed || !cfg) {
    return renderFallback();
  }

  return (
    <div className="svc-visual-card">
      <div className="svc-visual-hud mono">
        <span>{cfg.hudLabel}</span>
        <span className="svc-hud-live">{cfg.hudLive}</span>
      </div>
      <div className="svc-visual-media">
        <Photo
          src={imgSrc}
          alt={cfg.alt}
          fill
          priority={false}
          sizes="(max-width: 768px) 100vw, 500px"
          className="svc-visual-img"
          onError={() => setImgFailed(true)}
        />
        <div className="svc-visual-overlay" aria-hidden="true" />
      </div>
    </div>
  );
}

export function ServiceDetails({
  serviceImages = {},
}: {
  serviceImages?: Record<string, string>;
} = {}) {
  return (
    <div className="svc-details-stack">
      {SERVICES.map((s, idx) => {
        const isReversed = idx % 2 === 1;
        const proofCases = s.cases
          .map((slug) => visibleCases.find((c) => c.slug === slug))
          .filter(Boolean) as CaseItem[];

        return (
          <section
            className={`svc-detail-block ${isReversed ? "reverse" : ""}`}
            id={s.slug}
            key={s.slug}
          >
            <div className="svc-block-content">
              <Reveal>
                <div className="svc-block-header">
                  <Scramble className="svc-block-idx mono" text={s.id} />
                  <span className="svc-block-sep">/</span>
                  <span className="svc-block-tag mono">{s.slug}</span>
                </div>
                <h2 className="svc-block-title">{s.title}</h2>
              </Reveal>

              <Reveal as="p" className="svc-block-long" delay={90}>
                {s.long}
              </Reveal>

              <Reveal delay={140}>
                <ul className="svc-points-grid">
                  {s.points.map((pt) => (
                    <li key={pt} className="svc-point-item">
                      <span className="svc-point-dot" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              {proofCases.length > 0 && (
                <Reveal delay={180}>
                  <div className="svc-proof-block">
                    <span className="svc-proof-label mono">Proof</span>
                    <div className="svc-proof-grid">
                      {proofCases.slice(0, 3).map((c) => (
                        <TLink
                          key={c.slug}
                          href={`/work/${c.slug}`}
                          className="svc-proof-card"
                        >
                          <span className="label svc-proof-tag">{c.tag}</span>
                          <h4 className="svc-proof-title">{c.title}</h4>
                          <span className="svc-proof-link">
                            View case <Arrow />
                          </span>
                        </TLink>
                      ))}
                    </div>
                  </div>
                </Reveal>
              )}
            </div>

            <div className="svc-block-visual">
              <Reveal delay={120}>
                <ServiceVisual slug={s.slug} serviceImages={serviceImages} />
              </Reveal>
            </div>
          </section>
        );
      })}
    </div>
  );
}

/* =========================================================================
   TECH WE WORK WITH
   ========================================================================= */
const TECH_GROUPS = [
  {
    category: "Vision",
    items: [
      "TensorFlow",
      "Keras",
      "OpenCV",
      "YOLO",
      "U-Net",
      "NVIDIA optical flow",
      "OCR",
    ],
  },
  {
    category: "Generative & speech",
    items: ["PyTorch", "Coqui TTS", "Demucs", "LLM interfaces"],
  },
  {
    category: "3D & simulation",
    items: ["Unreal Engine", "Houdini", "Blender", "LiDAR point clouds"],
  },
  {
    category: "Delivery",
    items: ["Python", "SaaS platforms", "embedded / on-device"],
  },
];

export function TechStackSection({
  videoMp4,
  videoWebm,
  videoPoster,
}: {
  videoMp4?: string | null;
  videoWebm?: string | null;
  videoPoster?: string | null;
} = {}) {
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mqlMobile = window.matchMedia("(max-width: 768px)");
    const mqlMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    setIsMobile(mqlMobile.matches);
    setReducedMotion(mqlMotion.matches);

    const handleMobile = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    const handleMotion = (e: MediaQueryListEvent) => setReducedMotion(e.matches);

    mqlMobile.addEventListener("change", handleMobile);
    mqlMotion.addEventListener("change", handleMotion);

    return () => {
      mqlMobile.removeEventListener("change", handleMobile);
      mqlMotion.removeEventListener("change", handleMotion);
    };
  }, []);

  const hasVideo = Boolean(videoWebm || videoMp4);
  const hasMedia = Boolean(hasVideo || videoPoster);
  const showVideo = mounted && !isMobile && !reducedMotion && hasVideo;

  return (
    <section className="section bg-ink text-white tech-stack-section" id="technologies">
      {hasMedia && (
        <div className="tech-stack-media" aria-hidden="true">
          {videoPoster && (
            <Photo
              src={videoPoster}
              alt=""
              fill
              priority={false}
              sizes="100vw"
              className="tech-stack-poster-img"
            />
          )}
          {hasVideo && (
            <div className={`tech-stack-video-wrap ${showVideo ? "active" : ""}`}>
              <LoopVideo
                webmSrc={videoWebm ?? undefined}
                mp4Src={videoMp4 ?? undefined}
                poster={videoPoster ?? undefined}
                className="tech-stack-video"
              />
            </div>
          )}
          <div className="tech-stack-overlay" />
        </div>
      )}

      <div className="container tech-stack-container">
        <SecHead
          label="Toolchain"
          title="Technologies we build with."
          lede="Battle-tested libraries, neural architectures, and hardware toolchains deployed across client systems."
        />

        <div className="tech-groups-grid">
          {TECH_GROUPS.map((grp, gIdx) => (
            <div key={grp.category} className="tech-group-col">
              <Reveal delay={gIdx * 80}>
                <h3 className="tech-group-title mono">{grp.category}</h3>
                <div className="tech-chips-cloud">
                  {grp.items.map((tech, tIdx) => (
                    <Reveal
                      key={tech}
                      delay={gIdx * 80 + tIdx * 45}
                      className="tech-chip-item"
                    >
                      <span className="tech-chip-dark">{tech}</span>
                    </Reveal>
                  ))}
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Art({ mode }: { mode: "text" | "flow" | "grid" | "wave" }) {
  return (
    <div className="case-art">
      <DotField mode={mode} gap={mode === "text" ? 18 : 22} />
    </div>
  );
}

export function CaseFeature() {
  const c = visibleCases.find((item) => item.featured) ?? visibleCases[0];
  if (!c) return null;
  return (
    <Reveal>
      <TLink
        href={`/work/${c.slug}`}
        className="case-feature"
        aria-label={`Read the case study: ${c.title}`}
      >
        <Art mode={c.art} />
        <div className="body">
          <span className="label">{c.tag}</span>
          <h3>{c.title}</h3>
          <p>{c.text}</p>
          <span className="tlink blue" style={{ marginTop: "auto" }}>
            Read the case study{" "}
            <span className="arr">
              <Arrow />
            </span>
          </span>
        </div>
      </TLink>
    </Reveal>
  );
}

export function CaseGrid({ from = 0, items }: { from?: number; items?: CaseItem[] }) {
  const list = items ?? visibleCases.slice(from);
  return (
    <div className="case-grid">
      {list.map((c, i) => (
        <Reveal key={c.slug} delay={i * 110}>
          <TLink
            href={`/work/${c.slug}`}
            className="case"
            aria-label={`Read the case study: ${c.title}`}
          >
            <Art mode={c.art} />
            <div className="body">
              <span className="label">{c.tag}</span>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
              <span className="more">
                Read the case study <Arrow />
              </span>
            </div>
          </TLink>
        </Reveal>
      ))}
    </div>
  );
}

export function Steps() {
  return (
    <div className="steps">
      {STEPS.map((s, i) => (
        <Reveal key={s.n} className={`step ${i === 3 ? "dark" : ""}`} delay={i * 110}>
          <span className="n">{s.n}</span>
          <h3>{s.title}</h3>
          <p>{s.text}</p>
          {s.proof && (
            <TLink href={`/work/${s.proof.slug}`} className="step-proof-link">
              <span className="step-proof-label mono">Proof:</span> {s.proof.label} <Arrow />
            </TLink>
          )}
        </Reveal>
      ))}
    </div>
  );
}

export function Principles() {
  return (
    <div className="principles">
      {PRINCIPLES.map((p, i) => (
        <Reveal className="principle" key={p.title} delay={i * 80}>
          <h4>{p.title}</h4>
          <p>{p.text}</p>
          {p.proof && (
            <TLink href={`/work/${p.proof.slug}`} className="principle-proof-link">
              <span className="mono">Proof:</span> {p.proof.label} <Arrow />
            </TLink>
          )}
        </Reveal>
      ))}
    </div>
  );
}

export function Timeline() {
  return (
    <div className="timeline">
      {STEPS.map((s) => (
        <div className="tl" key={s.n}>
          <Reveal>
            <span className="n">{s.n}</span>
          </Reveal>
          <Reveal delay={80}>
            <h3>{s.title}</h3>
          </Reveal>
          <Reveal delay={160}>
            <p>{s.text}</p>
            {s.proof && (
              <TLink href={`/work/${s.proof.slug}`} className="tl-proof-link">
                <span className="mono">Proof:</span> {s.proof.label} <Arrow />
              </TLink>
            )}
          </Reveal>
        </div>
      ))}
    </div>
  );
}

/* =========================================================================
   HOW WE WORK: PROOF STATS BAND
   ========================================================================= */
export function ProofStatsBand() {
  return (
    <section className="section bg-paper proof-stats-section" aria-label="Measured results">
      <div className="container">
        <SecHead
          label="Track Record"
          title="Measured in production."
          lede="Real metrics from deployed systems across insurance, computer vision, voice triage, and subsurface exploration."
        />
        <div className="proof-stats-grid">
          {PROOF_STATS.map((st, i) => (
            <Reveal key={st.slug} delay={i * 90}>
              <TLink
                href={`/work/${st.slug}`}
                className="proof-stat-card"
                aria-label={`View case study: ${st.label} (${st.value})`}
              >
                <div className="proof-stat-val mono">{st.value}</div>
                <div className="proof-stat-label">{st.label}</div>
                <span className="proof-stat-link">
                  View case study <Arrow />
                </span>
              </TLink>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   HOW WE WORK: ENGAGEMENT MODELS
   ========================================================================= */
export function EngagementSection() {
  return (
    <section className="section bg-white" id="engagement">
      <div className="container">
        <SecHead
          label="Partnership models"
          title="Four ways we work with clients and partners."
          lede="From turnkey product development to white-label platforms and co-founded studio ventures."
        />
        <div className="engagement-grid">
          {ENGAGEMENT.map((eng, i) => (
            <Reveal key={eng.id} delay={i * 90} className="engagement-item">
              <div className="engagement-card">
                <div className="engagement-header">
                  <span className="engagement-id mono">{eng.id}</span>
                  {eng.eyebrow && (
                    <span className="engagement-eyebrow label">{eng.eyebrow}</span>
                  )}
                </div>
                <h3 className="engagement-title">{eng.title}</h3>
                <p className="engagement-text">{eng.text}</p>
                <div className="engagement-example">
                  <span className="eng-ex-label mono">Reference:</span>
                  <TLink href={`/work/${eng.example.slug}`} className="eng-ex-link">
                    <span>{eng.example.label}</span> <Arrow />
                  </TLink>
                  <p className="eng-ex-note">{eng.example.note}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   HOW WE WORK: RUNS ON
   ========================================================================= */
export function RunsOnSection() {
  return (
    <section className="section bg-paper" id="deployment-targets">
      <div className="container">
        <SecHead
          label="Deployment"
          title="Runs where it has to."
          lede="We build for severe real-world constraints: no cloud connectivity, harsh physical environments, or high-concurrency cloud backends."
        />
        <div className="runs-on-grid">
          {RUNS_ON.map((target, i) => (
            <Reveal key={target.title} delay={i * 100}>
              <div className="runs-on-card">
                <h3 className="runs-on-title">{target.title}</h3>
                <p className="runs-on-text">{target.text}</p>
                <div className="runs-on-cases">
                  <span className="mono runs-on-cases-label">Deployments:</span>
                  <div className="runs-on-chips">
                    {target.cases.map((slug) => {
                      const c = visibleCases.find((item) => item.slug === slug);
                      if (!c) return null;
                      return (
                        <TLink key={slug} href={`/work/${c.slug}`} className="runs-on-chip">
                          <span>{c.title}</span> <Arrow />
                        </TLink>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   HOW WE WORK: FAQ
   ========================================================================= */
export function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="section bg-white" id="faq">
      <div className="container">
        <SecHead
          label="Frequently asked questions"
          title="Grounded answers on how we operate."
          lede="Clear facts on our engineering capabilities, deployment models, and collaboration structure."
        />
        <div className="faq-list">
          {FAQ.map((item, i) => {
            const isOpen = openIdx === i;
            return (
              <Reveal key={item.q} delay={i * 70}>
                <div className={`faq-item ${isOpen ? "open" : ""}`}>
                  <button
                    type="button"
                    className="faq-question-btn"
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                  >
                    <span className="faq-q-text">{item.q}</span>
                    <span className="faq-icon-cross" aria-hidden="true" />
                  </button>
                  <div className="faq-answer-wrap">
                    <p className="faq-answer-text">{item.a}</p>
                    {item.cases && item.cases.length > 0 && (
                      <div className="faq-cases-row">
                        <span className="mono faq-cases-label">Related projects:</span>
                        <div className="faq-cases-chips">
                          {item.cases.map((slug) => {
                            const c = visibleCases.find((item) => item.slug === slug);
                            if (!c) return null;
                            return (
                              <TLink key={slug} href={`/work/${c.slug}`} className="faq-case-chip">
                                <span>{c.title}</span> <Arrow />
                              </TLink>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Spot({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      className={className}
      onPointerMove={(e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        ref.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
        ref.current.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
    >
      {children}
    </div>
  );
}

export function LabCard({ item }: { item: LabItem }) {
  const c = CASES.find((x) => x.slug === item.slug);
  if (!c) return null;

  // First sentence of case text
  const firstSentence = c.text.split(/(?<=[.!?])\s+/)[0] || c.text;

  return (
    <Spot className="lab-card-spot">
      <TLink href={`/work/${c.slug}`} className="lab-card">
        <div className="lab-card-top">
          <span className="lab-label-chip mono">{item.label}</span>
          {item.status && (
            <span className="lab-status-chip mono">
              <span className="pulse-dot" aria-hidden="true" />
              {item.status}
            </span>
          )}
        </div>
        <h3 className="lab-card-title">{c.title}</h3>
        {item.headline && (
          <p className="lab-card-headline mono">{item.headline}</p>
        )}
        <p className="lab-card-text">{firstSentence}</p>
        <div className="lab-card-foot">
          <span className="lab-card-arrow mono">
            See project <span className="arr">→</span>
          </span>
        </div>
      </TLink>
    </Spot>
  );
}

export function LabsTeaserSection() {
  const teaserSlugs = ["agricultural-ugv", "callaxa", "stackfuse"];
  const teaserItems = LABS.filter((l) => teaserSlugs.includes(l.slug));

  return (
    <section className="section bg-paper" id="labs">
      <div className="container">
        <SecHead
          label="Labs"
          title="Where we build our own."
          lede="Alongside client work, MiniByte develops its own products and research."
        />
        <div className="labs-grid">
          {teaserItems.map((item, i) => (
            <Reveal key={item.slug} delay={i * 110}>
              <LabCard item={item} />
            </Reveal>
          ))}
        </div>
        <Reveal delay={360}>
          <div className="labs-teaser-foot">
            <TLink href="/labs" className="explore-labs-link mono">
              Explore Labs <span className="arr">→</span>
            </TLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function People() {
  return <LeadershipSection />;
}

export function ArticleGrid({ items = ARTICLES }: { items?: ArticleItem[] }) {
  const modes: ("grid" | "flow" | "wave")[] = ["grid", "flow", "wave"];
  return (
    <div className="art-grid">
      {items.map((a, i) => (
        <Reveal key={a.slug} delay={Math.min(i * 80, 240)}>
          <TLink href={`/articles/${a.slug}`} className="art">
            <div className="vis">
              <DotField mode={modes[i % modes.length]} gap={20} />
            </div>
            <div className="art-meta-row">
              <span className="tag">{a.tag}</span>
              <span className="art-read-time mono">{readingMinutes(a)} min read</span>
            </div>
            <h3>{a.title}</h3>
            <p>{a.text}</p>
            {a.keyFact && (
              <div className="art-keyfact mono">
                <span className="art-keyfact-val">{a.keyFact.value}</span>
                <span className="art-keyfact-lbl">{a.keyFact.label}</span>
              </div>
            )}
            <span className="art-cta mono">
              Read note <Arrow size={14} />
            </span>
          </TLink>
        </Reveal>
      ))}
    </div>
  );
}

export function JobList({ limit }: { limit?: number }) {
  const items = typeof limit === "number" ? ROLE_AREAS.slice(0, limit) : ROLE_AREAS;
  const [openSlug, setOpenSlug] = useState<string | null>(items[0]?.slug ?? null);

  const toggle = (slug: string) => {
    setOpenSlug((prev) => (prev === slug ? null : slug));
  };

  return (
    <div className="jobs-wrap">
      <div className="role-areas-list">
        {items.map((role, i) => {
          const isOpen = openSlug === role.slug;
          return (
            <Reveal key={role.slug} delay={Math.min(i * 50, 250)}>
              <div className={`role-area-item ${isOpen ? "open" : ""}`}>
                <button
                  type="button"
                  className="role-area-header"
                  onClick={() => toggle(role.slug)}
                  aria-expanded={isOpen}
                  aria-controls={`area-panel-${role.slug}`}
                >
                  <span className="role-area-title">{role.title}</span>
                  <span className="role-area-chevron" aria-hidden>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </button>

                <div
                  id={`area-panel-${role.slug}`}
                  className="role-area-body"
                  hidden={!isOpen}
                >
                  <p className="role-area-text">{role.text}</p>

                  <div className="role-area-tech">
                    <span className="role-area-label mono">Tech & methods:</span>
                    <div className="tech-chips-wrap">
                      {role.tech.map((t) => (
                        <span key={t} className="tech-chip mono">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {role.cases.length > 0 && (
                    <div className="role-area-cases">
                      <span className="role-area-label mono">Projects in this area:</span>
                      <div className="area-cases-wrap">
                        {role.cases.map((cSlug) => {
                          const c = CASES.find((item) => item.slug === cSlug);
                          return (
                            <TLink
                              key={cSlug}
                              href={`/work/${cSlug}`}
                              className="area-case-chip"
                            >
                              <span>{c?.title ?? cSlug}</span>
                              <Arrow size={11} />
                            </TLink>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className="role-area-actions">
                    <Btn
                      href={`/contact?topic=careers&area=${role.slug}`}
                      variant="dark"
                      small
                      arrow
                    >
                      Tell us you&apos;re interested
                    </Btn>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}

export { SecHead, Split, TextLink };
