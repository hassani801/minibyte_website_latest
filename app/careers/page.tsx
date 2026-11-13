import type { Metadata } from "next";
import { PageHero, SecHead } from "@/components/PageHero";
import { ArtCard } from "@/components/ArtCard";
import { DotField } from "@/components/DotField";
import { Btn, Arrow } from "@/components/Btn";
import { CTA } from "@/components/CTA";
import { Reveal } from "@/components/Reveal";
import { TLink } from "@/components/Transition";
import { JobList } from "@/components/sections";
import { ROLE_AREAS, CULTURE, VALUES, OFFICES, CASES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Work on computer vision, edge AI, robotics, voice AI and full-stack systems at MiniByte, an AI R&D firm with offices in seven countries.",
  alternates: { canonical: "/careers" },
};

// Five flagship projects representing work that ships in the real world
const WORK_THAT_SHIPS = [
  {
    slug: "aethero-radiation-shield",
    stat: "In orbit",
    label: "Reached orbit on Falcon-9",
  },
  {
    slug: "smart-hail-guard",
    stat: "5,000 devices",
    label: "Deployed across the US",
  },
  {
    slug: "well-log-digitization",
    stat: "Days → under 1 hr",
    label: "Automated subsurface LAS digitization",
  },
  {
    slug: "agricultural-ugv",
    stat: "Autonomous 24/7",
    label: "Autonomous field robotics",
  },
  {
    slug: "lafragancia",
    stat: "11+ stores",
    label: "Automated retail in live production",
  },
];

export default function CareersPage() {
  const areaCountWord = ROLE_AREAS.length === 8 ? "Eight" : String(ROLE_AREAS.length);

  return (
    <>
      {/* 1. PAGE HERO */}
      <PageHero
        eyebrow="Careers"
        title="Work on hard problems."
        lede="MiniByte is an AI R&D firm. We look for engineers, researchers and designers who like real-world problems and want to see their work running in the field."
        art={
          <ArtCard
            tone="stone"
            caption={["Move the pointer", `${ROLE_AREAS.length} areas`]}
          >
            <DotField mode="grid" gap={20} />
          </ArtCard>
        }
      >
        <Btn href="#roles" arrow>
          See where you could fit
        </Btn>
        <Btn href="/contact?topic=careers" variant="ghost">
          Send us your CV
        </Btn>
      </PageHero>

      {/* 2. WORK THAT SHIPS (Dark Band) */}
      <section className="section bg-ink text-white work-ships-section" aria-label="Work that ships">
        <div className="container">
          <div className="sec-head" style={{ marginBottom: 40 }}>
            <Reveal as="div" className="label eyebrow" style={{ color: "#fff", opacity: 0.7 }}>
              What you&apos;d work on
            </Reveal>
            <h2 className="h2" style={{ color: "#fff" }}>
              Work that ships to real hardware, real clients and real orbit.
            </h2>
          </div>

          <div className="work-ships-scroll-wrap">
            <div className="work-ships-grid">
              {WORK_THAT_SHIPS.map((item, idx) => {
                const caseItem = CASES.find((c) => c.slug === item.slug);
                return (
                  <Reveal key={item.slug} delay={Math.min(idx * 70, 280)}>
                    <TLink href={`/work/${item.slug}`} className="work-ship-card">
                      <div className="work-ship-stat mono">{item.stat}</div>
                      <div className="work-ship-title">{caseItem?.title ?? item.slug}</div>
                      <div className="work-ship-label">{item.label}</div>
                      <div className="work-ship-tag mono">{caseItem?.tag}</div>
                      <span className="work-ship-arrow" aria-hidden>
                        <Arrow size={14} />
                      </span>
                    </TLink>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 3. AREAS (Accordion-style role areas) */}
      <section className="section bg-white" id="roles">
        <div className="container">
          <SecHead
            label="Where you could fit"
            title={`${areaCountWord} areas, one team.`}
            lede="We don't list roles we don't have. Tell us which area is yours and we'll talk."
          />
          <JobList />
        </div>
      </section>

      {/* 4. WHAT TO EXPECT (Culture + Values) */}
      <section className="section bg-paper" id="culture">
        <div className="container">
          <SecHead
            label="What to expect"
            title="How we work together."
          />
          {/* TODO(confirm with team): intro quote from the company profile */}
          <Reveal as="p" className="lede" delay={120} style={{ marginBottom: 44, maxWidth: "42em" }}>
            We are problem-solvers, committed to driving results, fostering growth and embracing cutting-edge technologies.
          </Reveal>

          {/* CULTURE CARDS */}
          <div className="culture-cards-grid">
            {CULTURE.map((item, idx) => (
              <Reveal key={item.title} delay={Math.min(idx * 80, 240)}>
                <TLink
                  href={item.link}
                  className="culture-card"
                  aria-label={`${item.title} — Learn more`}
                >
                  <div className="culture-card-num mono">0{idx + 1}</div>
                  <h3 className="culture-card-title">{item.title}</h3>
                  <p className="culture-card-text">{item.text}</p>
                  <span className="culture-card-link mono">
                    Learn more <Arrow size={13} />
                  </span>
                </TLink>
              </Reveal>
            ))}
          </div>

          {/* VALUES ROW */}
          <div className="values-row-wrap">
            <div className="values-row-grid">
              {VALUES.map((val, idx) => (
                <Reveal key={val.title} delay={Math.min(idx * 70, 210)}>
                  <div className="value-item-col">
                    <span className="value-item-label label">Value 0{idx + 1}</span>
                    <h4 className="value-item-title">{val.title}</h4>
                    <p className="value-item-text">{val.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. GLOBAL TEAM STRIP */}
      <section className="global-strip-section bg-stone">
        <div className="container">
          <div className="global-strip-inner">
            <div className="global-strip-left">
              <span className="label eyebrow" style={{ margin: 0 }}>International footprint</span>
              <div className="global-strip-countries mono">
                {OFFICES.map((o, idx) => (
                  <span key={o.name}>
                    {o.name}
                    {idx < OFFICES.length - 1 && <span className="strip-sep">·</span>}
                  </span>
                ))}
              </div>
            </div>
            <div className="global-strip-right">
              <TLink href="/company#map" className="mono global-strip-link">
                See where we work <Arrow size={14} />
              </TLink>
            </div>
          </div>
        </div>
      </section>

      {/* 6. HOW TO REACH US */}
      <section className="section bg-white how-to-reach-section">
        <div className="container">
          <div className="how-to-reach-card">
            <div className="reach-content">
              {/* TODO(confirm with team): hiring process */}
              <span className="label eyebrow dot">How to reach us</span>
              <h3 className="reach-title">What to send</h3>
              <p className="reach-text">
                A short intro, your CV or portfolio, links to work you&apos;re proud of, and the area you care about.
              </p>
            </div>
            <div className="reach-action">
              <Btn href="/contact?topic=careers" arrow>
                Write to us
              </Btn>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CLOSING CTA */}
      <CTA
        title="Don't see your area? Write to us."
        href="/contact?topic=careers"
        buttonText="Write to us"
        newsletter={false}
      />
    </>
  );
}
