import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Image from "next/image";
import { PageHero, SecHead } from "@/components/PageHero";
import { ArtCard } from "@/components/ArtCard";
import { CompanyHeroArt } from "@/components/CompanyHeroArt";
import { WorldMap } from "@/components/WorldMap";
import { CTA } from "@/components/CTA";
import { Btn } from "@/components/Btn";
import { TLink } from "@/components/Transition";
import { Reveal } from "@/components/Reveal";
import { Marquee } from "@/components/Marquee";
import {
  Stats,
  IndustriesSection,
  LeadershipSection,
} from "@/components/sections";
import { VALUES, PARTNERS, MILESTONES, Partner } from "@/lib/data";

export const metadata: Metadata = {
  title: "Company",
  description:
    "MiniByte is an AI R&D firm with offices in Pakistan, the USA, South Korea, the UAE, the United Kingdom, Germany and Sweden.",
  alternates: { canonical: "/company" },
};

function PartnerTile({ partner }: { partner: Partner }) {
  const content = (
    <>
      <div className="partner-logo-box">
        {partner.logo ? (
          <Image
            src={partner.logo}
            alt={partner.name}
            width={160}
            height={48}
            className="partner-logo-img"
            unoptimized
          />
        ) : (
          <span className="partner-text-mark mono">{partner.name}</span>
        )}
      </div>
      {partner.case && (
        <span className="case-tag mono">Case study</span>
      )}
    </>
  );

  if (partner.case) {
    return (
      <TLink
        href={`/work/${partner.case}`}
        className="partner-wall-tile has-case"
        title={`View ${partner.name} case study`}
      >
        {content}
      </TLink>
    );
  }

  return <div className="partner-wall-tile">{content}</div>;
}

export default function Company() {
  const mediaDir = path.join(process.cwd(), "public", "company");

  const posterSrc = fs.existsSync(path.join(mediaDir, "company-hero-poster.webp"))
    ? "/company/company-hero-poster.webp"
    : null;
  const videoMp4 = fs.existsSync(path.join(mediaDir, "company-hero-loop.mp4"))
    ? "/company/company-hero-loop.mp4"
    : null;
  const videoWebm = fs.existsSync(path.join(mediaDir, "company-hero-loop.webm"))
    ? "/company/company-hero-loop.webm"
    : null;

  const half = Math.ceil(PARTNERS.length / 2);
  const partnerRow1 = PARTNERS.slice(0, half);
  const partnerRow2 = PARTNERS.slice(half);

  return (
    <>
      {/* 1. PageHero */}
      <PageHero
        eyebrow="Company"
        title="An AI R&D firm with a global footprint."
        lede="MiniByte architects and deploys AI SaaS platforms, advanced robotics and embedded intelligence, with offices in seven countries."
        art={
          <ArtCard caption={["Our logo is one byte", "01101101 = m"]}>
            <CompanyHeroArt
              posterSrc={posterSrc}
              videoMp4={videoMp4}
              videoWebm={videoWebm}
            />
          </ArtCard>
        }
      >
        <Btn href="/work" arrow>
          See our work
        </Btn>
        <Btn href="/careers" variant="ghost">
          Join the team
        </Btn>
      </PageHero>

      {/* 2. STATS BAND */}
      <Stats />

      {/* 3. ABOUT (split layout) */}
      <section className="section bg-white" id="about">
        <div className="container">
          <div className="sec-label mono">About MiniByte</div>
          <div className="company-about-split">
            <div className="company-about-left">
              <Reveal>
                <h2 className="company-about-statement">
                  We turn complex challenges into intelligent, autonomous, scalable systems.
                </h2>
              </Reveal>
            </div>
            <div className="company-about-right">
              <Reveal delay={120}>
                <p className="company-about-body">
                  MiniByte is a leading AI R&D firm, architecting and deploying cutting-edge AI SaaS
                  platforms, advanced robotics and embedded intelligence solutions. We specialize in
                  streamlining operations through business process automation, multi-agent orchestration
                  and enterprise-grade data generation, and in securing critical infrastructure
                  through high-stakes sensor fusion.
                </p>
                <div className="company-about-links">
                  <TLink href="/services" className="about-ghost-link">
                    What we do <span className="arr">→</span>
                  </TLink>
                  <TLink href="/how-we-work" className="about-ghost-link">
                    How we work <span className="arr">→</span>
                  </TLink>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 4. VALUES (01/02/03) */}
      <section className="section bg-paper" id="values">
        <div className="container">
          <SecHead
            label="Values"
            title="How we think, build and partner."
            lede="Our team is dedicated to delivering innovative digital solutions, passionate problem-solvers committed to driving results, fostering growth and embracing cutting-edge technologies."
          />
          <div className="values-grid">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 120}>
                <div className="value-card">
                  <div className="mono value-num">0{i + 1}</div>
                  <h3 className="value-title">{v.title}</h3>
                  <p className="value-text">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. LEADERSHIP (id="people") */}
      <LeadershipSection id="people" />

      {/* 6. FOOTPRINT (id="map") */}
      <section className="section bg-paper" id="map">
        <div className="container">
          <SecHead label="Where we work" title="Seven countries, one team." />
          <WorldMap />
        </div>
      </section>

      {/* 7. INDUSTRIES */}
      <IndustriesSection
        label="Industries"
        title="Industries we work in."
        lede="Deep domain adaptation across 9 critical sectors worldwide."
      />

      {/* 8. MILESTONES */}
      <section className="section bg-paper" id="milestones">
        <div className="container">
          <SecHead
            label="Track record"
            title="Key milestones."
            lede="From laboratory prototypes to SpaceX Falcon-9 orbital deployment."
          />
          <div className="milestones-wrap">
            <div className="milestones-grid">
              {MILESTONES.map((m, i) => (
                <Reveal key={m.title} delay={i * 90}>
                  <div className="milestone-card">
                    <div className="milestone-head">
                      <span className="mono milestone-num">0{i + 1}</span>
                      {m.year && <span className="mono milestone-year">{m.year}</span>}
                    </div>
                    <h3 className="milestone-title">{m.title}</h3>
                    <p className="milestone-text">{m.text}</p>
                    <TLink href={`/work/${m.slug}`} className="milestone-link">
                      See the project <span className="arr">→</span>
                    </TLink>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 9. PARTNERS */}
      <section className="section bg-white" id="partners">
        <div className="container">
          <SecHead
            label="Partners"
            title="Our partners."
            lede="Collaborating with forward-thinking enterprises, agencies and deep-tech startups."
          />

          {/* Desktop staggered wall */}
          <div className="partners-desktop-grid">
            {PARTNERS.map((p, i) => (
              <Reveal key={p.name} delay={i * 45}>
                <PartnerTile partner={p} />
              </Reveal>
            ))}
          </div>
        </div>

        {/* Mobile two-row marquee */}
        <div className="partners-mobile-marquee">
          <Marquee duration={35} gap={16}>
            {partnerRow1.map((p) => (
              <PartnerTile key={p.name} partner={p} />
            ))}
          </Marquee>
          <div style={{ height: 12 }} />
          <Marquee duration={40} gap={16} reverse>
            {partnerRow2.map((p) => (
              <PartnerTile key={p.name} partner={p} />
            ))}
          </Marquee>
        </div>
      </section>

      {/* 10. CTA */}
      <CTA title="Have a problem worth solving with AI?" />
    </>
  );
}
