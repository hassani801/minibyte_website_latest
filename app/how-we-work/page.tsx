import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { PageHero, SecHead } from "@/components/PageHero";
import { ArtCard } from "@/components/ArtCard";
import { ProcessHeroArt } from "@/components/ProcessHeroArt";
import { CTA } from "@/components/CTA";
import { Btn } from "@/components/Btn";
import {
  EngagementSection,
  FAQSection,
  Principles,
  ProofStatsBand,
  RunsOnSection,
  Timeline,
} from "@/components/sections";

export const metadata: Metadata = {
  title: "How We Work · Engineering & Engagement Models",
  description:
    "How MiniByte takes systems from research to production: Discover, Prove, Build, and Deploy across cloud, edge devices, and orbital hardware.",
  alternates: { canonical: "/how-we-work" },
};

export default function HowWeWorkPage() {
  const mediaDir = path.join(process.cwd(), "public", "how-we-work");

  const posterSrc = fs.existsSync(path.join(mediaDir, "process-poster.webp"))
    ? "/how-we-work/process-poster.webp"
    : null;
  const videoMp4 = fs.existsSync(path.join(mediaDir, "process-loop.mp4"))
    ? "/how-we-work/process-loop.mp4"
    : null;
  const videoWebm = fs.existsSync(path.join(mediaDir, "process-loop.webm"))
    ? "/how-we-work/process-loop.webm"
    : null;

  return (
    <>
      {/* 1. PageHero */}
      <PageHero
        eyebrow="How we work"
        title="From first hypothesis to deployed intelligence."
        lede="MiniByte covers the entire path from problem exploration and custom hardware design to production deployment, with researchers and engineers on a single team."
        art={
          <ArtCard
            tone="blue"
            caption={["Discover · Prove · Build · Deploy", "4 phases"]}
          >
            <ProcessHeroArt
              posterSrc={posterSrc}
              videoMp4={videoMp4}
              videoWebm={videoWebm}
            />
          </ArtCard>
        }
      >
        <Btn href="/contact" arrow>
          Start a conversation
        </Btn>
        <Btn href="/work" variant="ghost">
          See our work
        </Btn>
      </PageHero>

      {/* 2. Measured Proof Metrics Band */}
      <ProofStatsBand />

      {/* 3. The 4-Phase Process Timeline */}
      <section className="section bg-white" style={{ paddingTop: 40 }} id="process">
        <div className="container">
          <SecHead
            label="The Process"
            title="Four phases, one accountable team."
            lede="Every engagement follows four clear stages, each verified against real client data and benchmarked constraints."
          />
          <Timeline />
        </div>
      </section>

      {/* 4. Engineering Principles */}
      <section className="section bg-paper" id="principles">
        <div className="container">
          <SecHead
            label="Principles"
            title="What guides our engineering."
            lede="Practices forged across 38 deployments in computer vision, robotics, voice triage, and edge intelligence."
          />
          <Principles />
        </div>
      </section>

      {/* 5. Deployment Environments */}
      <RunsOnSection />

      {/* 6. Engagement & Partnership Models */}
      <EngagementSection />

      {/* 7. Grounded FAQ */}
      <FAQSection />

      {/* 8. Call to Action */}
      <CTA title="Have a problem worth solving with AI?" />
    </>
  );
}
