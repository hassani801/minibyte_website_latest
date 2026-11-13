import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { PageHero, SecHead } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "MiniByte · AI R&D. Software, hardware, deployed.",
  description:
    "MiniByte architects and deploys AI SaaS platforms, advanced robotics and embedded intelligence systems.",
  alternates: { canonical: "/" },
};
import { Btn } from "@/components/Btn";
import { WorldMap } from "@/components/WorldMap";
import { CTA } from "@/components/CTA";
import { HeroBackdrop } from "@/components/HeroBackdrop";
import { TLink } from "@/components/Transition";
import { ARTICLES } from "@/lib/data";
import {
  AboutSection,
  ArticleGrid,
  IndustriesSection,
  JobList,
  LabsTeaserSection,
  LeadershipSection,
  PartnersSection,
  SelectedWorkSection,
  Stats,
  WhatWeDoSection,
} from "@/components/sections";

export default function Home() {
  const publicDir = path.join(process.cwd(), "public");

  const hasMp4 = fs.existsSync(path.join(publicDir, "home", "home-hero-loop.mp4"));
  const hasWebm = fs.existsSync(path.join(publicDir, "home", "home-hero-loop.webm"));
  const hasPoster = fs.existsSync(path.join(publicDir, "home", "home-hero-poster.webp"));
  const hasHeroImg = fs.existsSync(path.join(publicDir, "home", "home-hero.webp"));

  const CONCEPT_MAP: Record<string, string> = {
    "well-log-digitization": "/home/well-log-concept.webp",
    "satellite-imagery": "/home/satellite-analytics-concept.webp",
    "smart-hail-guard": "/home/smart-hail-guard-concept.webp",
    "aethero-radiation-shield": "/home/aethero-concept.webp",
    "agricultural-ugv": "/home/agricultural-ugv-concept.webp",
    lafragancia: "/home/la-fragancia-concept.webp",
  };

  const projectImages: Record<string, string> = {};
  for (const [slug, relPath] of Object.entries(CONCEPT_MAP)) {
    if (fs.existsSync(path.join(publicDir, relPath.replace(/^\//, "")))) {
      projectImages[slug] = relPath;
    }
  }

  return (
    <>
      {/* 1. HERO */}
      <div className="hero-wrap">
        <div className="hero-backdrop" aria-hidden>
          <HeroBackdrop
            videoMp4={hasMp4 ? "/home/home-hero-loop.mp4" : null}
            videoWebm={hasWebm ? "/home/home-hero-loop.webm" : null}
            videoPoster={hasPoster ? "/home/home-hero-poster.webp" : null}
            heroImage={hasHeroImg ? "/home/home-hero.webp" : null}
          />
        </div>
        <PageHero
          dot
          eyebrow="AI R&D FIRM"
          title="We build intelligent systems that work in the real world."
          lede="MiniByte architects and deploys AI SaaS platforms, advanced robotics and embedded intelligence, from computer vision to multi-agent automation."
        >
          <Btn href="/work" arrow>
            See our work
          </Btn>
          <Btn href="/contact" variant="ghost">
            Talk to us
          </Btn>
        </PageHero>
      </div>

      {/* 2. STATS BAND */}
      <Stats />

      {/* 3. ABOUT */}
      <AboutSection />

      {/* 4. WHAT WE DO */}
      <WhatWeDoSection />

      {/* 5. SELECTED WORK */}
      <SelectedWorkSection projectImages={projectImages} />

      {/* 6. LABS TEASER */}
      <LabsTeaserSection />

      {/* 7. INDUSTRIES */}
      <IndustriesSection />

      {/* 8. PARTNERS */}
      <PartnersSection />

      {/* 9. INTERNATIONAL FOOTPRINT */}
      <section className="section bg-paper" id="footprint">
        <div className="container">
          <SecHead
            label="Footprint"
            title="A footprint across 7 countries."
            lede="Engineers, researchers and client operations deployed across Europe, North America, the Middle East and Asia."
          />
          <WorldMap />
        </div>
      </section>

      {/* 10. LEADERSHIP */}
      <LeadershipSection />

      {/* 11. ENGINEERING NOTES */}
      <section className="section bg-paper" id="articles">
        <div className="container">
          <div className="sec-head-row">
            <SecHead
              label="Notes"
              title="Engineering notes."
              lede="What we are learning from client systems and edge deployments."
            />
            <TLink href="/articles" className="view-all-link mono">
              All articles <span className="arr">→</span>
            </TLink>
          </div>
          <ArticleGrid items={ARTICLES.slice(0, 3)} />
        </div>
      </section>

      {/* 12. CAREERS */}
      <section className="section bg-white" id="careers">
        <div className="container">
          <div className="sec-head-row">
            <SecHead
              label="Careers"
              title="Work on hard problems."
              lede="We look for engineers, researchers and designers who want to see their work running in the field."
            />
            <Btn href="/careers" arrow>
              See where you could fit
            </Btn>
          </div>
          <JobList limit={5} />
        </div>
      </section>

      {/* 13. CTA */}
      <CTA title="Have a problem worth solving with AI?" />
    </>
  );
}
