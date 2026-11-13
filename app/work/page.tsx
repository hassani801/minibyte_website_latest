import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ArtCard } from "@/components/ArtCard";
import { WorkHeroArt } from "@/components/WorkHeroArt";
import { CTA } from "@/components/CTA";
import { PartnersSection } from "@/components/sections";
import { WorkExplorer } from "@/components/WorkExplorer";
import { CATEGORIES, visibleCases } from "@/lib/data";

export const metadata: Metadata = {
  title: "Work · Case Studies & Deployments",
  description:
    "Explore MiniByte's real-world AI deployments: satellite imagery analysis, sub-surface LAS digitization, autonomous UGVs, space edge-compute, and conversational voice platforms.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  const statsLine = `${visibleCases.length} projects · ${CATEGORIES.length} categories`;

  const publicDir = path.join(process.cwd(), "public");
  const hasPoster = fs.existsSync(path.join(publicDir, "work", "work-hero-poster.webp"));
  const hasMp4 = fs.existsSync(path.join(publicDir, "work", "work-hero-loop.mp4"));
  const hasWebm = fs.existsSync(path.join(publicDir, "work", "work-hero-loop.webm"));

  return (
    <>
      <PageHero
        eyebrow="Selected work"
        title="Intelligent systems, built and deployed."
        lede="From satellite imagery and space hardware to voice agents and retail automation. Projects across vision, edge AI, robotics and enterprise software."
        art={
          <ArtCard
            tone="stone"
            caption={["Global deployments", statsLine]}
          >
            <WorkHeroArt
              posterSrc={hasPoster ? "/work/work-hero-poster.webp" : null}
              videoMp4={hasMp4 ? "/work/work-hero-loop.mp4" : null}
              videoWebm={hasWebm ? "/work/work-hero-loop.webm" : null}
            />
          </ArtCard>
        }
      >
        <div className="hero-work-stats mono">
          <span className="stats-dot" />
          <span>{statsLine}</span>
        </div>
      </PageHero>

      {/* Explorer with Featured + Sticky Filter Bar + Dynamic Grid */}
      <WorkExplorer />

      {/* Partners Marquee */}
      <PartnersSection />

      {/* CTA */}
      <CTA title="Have a problem worth solving with AI?" />
    </>
  );
}
