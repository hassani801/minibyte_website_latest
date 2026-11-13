import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Image from "next/image";
import { PageHero, SecHead } from "@/components/PageHero";
import { ArtCard } from "@/components/ArtCard";
import { Terminal } from "@/components/Terminal";
import { Btn } from "@/components/Btn";
import { CTA } from "@/components/CTA";
import { TLink } from "@/components/Transition";
import { Reveal } from "@/components/Reveal";
import { DotField } from "@/components/DotField";
import { FieldScanMedia } from "@/components/FieldScanMedia";
import { LabCard } from "@/components/sections";
import { LABS, CASES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Labs",
  description:
    "MiniByte Labs: in-house products, studio companies and applied R&D, from an autonomous agricultural robot to voice and sales AI platforms.",
  alternates: { canonical: "/labs" },
};

export default function Labs() {
  const labsMediaDir = path.join(process.cwd(), "public", "labs");

  const ugvPoster = fs.existsSync(path.join(labsMediaDir, "ugv-poster.webp"))
    ? "/labs/ugv-poster.webp"
    : null;
  const ugvMp4 = fs.existsSync(path.join(labsMediaDir, "ugv-loop.mp4"))
    ? "/labs/ugv-loop.mp4"
    : null;
  const ugvWebm = fs.existsSync(path.join(labsMediaDir, "ugv-loop.webm"))
    ? "/labs/ugv-loop.webm"
    : null;
  const hasFabricationImage = fs.existsSync(
    path.join(labsMediaDir, "fabrication-workshop.webp")
  );

  // Derive terminal listing dynamically from LABS
  const inHouseItems = LABS.filter(
    (l) =>
      l.kind === "flagship" ||
      l.kind === "studio" ||
      l.kind === "product" ||
      l.kind === "capability"
  );
  const projectListStr = inHouseItems
    .map((l) => (l.slug === "agricultural-ugv" ? "ugv" : l.slug))
    .join(" · ");

  const terminalLines: [string, string][] = [
    ["$", "./labs --list"],
    ["#", projectListStr],
    ["$", "./labs --status ugv"],
    ["#", "seeking seed funding"],
  ];
  const terminalCaption: [string, string] = [
    "$ ./labs --list",
    `${inHouseItems.length} in-house`,
  ];

  // Flagship data from CASES
  const ugvCase = CASES.find((c) => c.slug === "agricultural-ugv");
  const ugvText =
    ugvCase?.text ||
    "A fully autonomous unmanned ground vehicle for precision seeding, weeding, irrigation and fertilization on large farms. GPS/vision/IMU sensor fusion enables real-time obstacle avoidance in dynamic field conditions, a custom 6-DOF robotic arm with dual end-effectors handles diverse tasks, and a proprietary lightweight AI model runs on-device to tell weeds from plants for targeted chemical application.";

  const flagshipChips = [
    "GPS / vision / IMU sensor fusion",
    "Custom 6-DOF arm, dual end-effectors",
    "On-device weed vs plant detection",
    "24/7 autonomous operation",
  ];

  // Studio companies and products
  const studioAndProducts = LABS.filter(
    (l) => l.kind === "studio" || l.kind === "product"
  );

  // Applied R&D
  const rndItems = LABS.filter((l) => l.kind === "rnd");

  return (
    <>
      {/* 1. PageHero */}
      <PageHero
        eyebrow="Labs"
        title="Where we build our own."
        lede="Alongside client work, MiniByte develops its own products and research: autonomous machines, voice platforms and new AI tools."
        art={
          <ArtCard caption={terminalCaption}>
            <Terminal lines={terminalLines} label="MiniByte Labs CLI" />
          </ArtCard>
        }
      >
        <Btn href="/contact" arrow>
          Partner with us
        </Btn>
        <Btn href="/work" variant="ghost">
          See client work
        </Btn>
      </PageHero>

      {/* 2. FLAGSHIP (dark, full width) */}
      <section className="section bg-ink flagship-section" id="flagship">
        <div className="container">
          <div className="flagship-grid">
            <div className="flagship-copy">
              <Reveal>
                <div className="flagship-top">
                  <span className="sec-label mono text-blue">Flagship product</span>
                  <div className="flagship-status mono">
                    <span className="pulse-dot" aria-hidden="true" />
                    Actively seeking seed funding
                  </div>
                </div>
                <h2 className="flagship-title">Autonomous Agricultural UGV</h2>
                <p className="flagship-body">{ugvText}</p>

                <div className="flagship-chips">
                  {flagshipChips.map((chip) => (
                    <span key={chip} className="flagship-chip mono">
                      {chip}
                    </span>
                  ))}
                </div>

                <div className="flagship-acts">
                  <Btn
                    href="/work/agricultural-ugv"
                    variant="light"
                    arrow
                    aria-label="Read the case study: Autonomous agricultural UGV"
                  >
                    Read the case study
                  </Btn>
                  <Btn href="/contact" variant="line">
                    Talk to us about funding
                  </Btn>
                </div>
              </Reveal>
            </div>

            <div className="flagship-visual">
              <Reveal delay={150}>
                <div className="field-scan-box" aria-hidden="true">
                  <FieldScanMedia
                    posterSrc={ugvPoster}
                    videoMp4={ugvMp4}
                    videoWebm={ugvWebm}
                  />
                  <div className="field-grid-bg">
                    <DotField mode="grid" gap={18} />
                  </div>
                  {/* Agricultural Field Scanning Simulation */}
                  <svg
                    className="field-scan-svg"
                    viewBox="0 0 500 360"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient
                        id="scanConeGrad"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#4654ff" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#4654ff" stopOpacity="0.0" />
                      </linearGradient>
                      <linearGradient
                        id="rowGrad"
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#4654ff" stopOpacity="0.1" />
                        <stop offset="100%" stopColor="#4654ff" stopOpacity="0.5" />
                      </linearGradient>
                    </defs>

                    {/* Perspective Field Crop Rows */}
                    <g className="field-rows" stroke="url(#rowGrad)" strokeWidth="1.2">
                      <line x1="250" y1="30" x2="30" y2="340" />
                      <line x1="250" y1="30" x2="100" y2="340" />
                      <line x1="250" y1="30" x2="175" y2="340" />
                      <line x1="250" y1="30" x2="250" y2="340" strokeDasharray="4 4" />
                      <line x1="250" y1="30" x2="325" y2="340" />
                      <line x1="250" y1="30" x2="400" y2="340" />
                      <line x1="250" y1="30" x2="470" y2="340" />
                    </g>

                    {/* Sensor Horizon Line */}
                    <line
                      x1="40"
                      y1="120"
                      x2="460"
                      y2="120"
                      stroke="rgba(70, 84, 255, 0.2)"
                      strokeWidth="1"
                      strokeDasharray="2 4"
                    />

                    {/* Sweeping Scanning Cone */}
                    <polygon
                      points="250,50 140,290 360,290"
                      fill="url(#scanConeGrad)"
                      className="radar-scan-cone"
                    />

                    {/* Sensor Pivot Beacon */}
                    <circle cx="250" cy="50" r="5" fill="#4654ff" />
                    <circle
                      cx="250"
                      cy="50"
                      r="12"
                      fill="none"
                      stroke="#4654ff"
                      strokeWidth="1"
                      className="beacon-pulse"
                    />

                    {/* Dynamic Target Detection Nodes */}
                    <g className="detection-nodes">
                      <circle cx="210" cy="180" r="3.5" fill="#4654ff" />
                      <circle cx="280" cy="220" r="3.5" fill="#4654ff" />
                      <circle cx="170" cy="260" r="3" fill="#ffffff" opacity="0.7" />
                      <circle cx="330" cy="250" r="3" fill="#ffffff" opacity="0.7" />
                    </g>
                  </svg>

                  {/* Telemetry Overlays */}
                  <div className="field-telemetry mono">
                    <div className="telem-row">
                      <span className="telem-k">VISION</span>
                      <span className="telem-v">30 FPS · ON-DEVICE</span>
                    </div>
                    <div className="telem-row">
                      <span className="telem-k">FUSION</span>
                      <span className="telem-v">RTK-GPS · IMU · SLAM</span>
                    </div>
                    <div className="telem-row">
                      <span className="telem-k">PAYLOAD</span>
                      <span className="telem-v">6-DOF ARM · ACTIVE</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 3. STUDIO COMPANIES & IN-HOUSE PRODUCTS */}
      <section className="section bg-white" id="studio">
        <div className="container">
          <SecHead
            label="Studio"
            title="Products we build and run ourselves."
            lede="In-house ventures and developer platforms built on MiniByte proprietary architectures."
          />
          <div className="labs-grid">
            {studioAndProducts.map((item, i) => (
              <Reveal key={item.slug} delay={i * 100}>
                <LabCard item={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. APPLIED R&D */}
      <section className="section bg-paper" id="rnd">
        <div className="container">
          <SecHead
            label="Applied R&D"
            title="Research that becomes product."
            lede="Projects where we explore what's possible before it's commercial."
          />
          <div className="labs-grid">
            {rndItems.map((item, i) => (
              <Reveal key={item.slug} delay={i * 100}>
                <LabCard item={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FABRICATION STRIP */}
      <section className="section bg-white" id="fabrication">
        <div className="container">
          <div className="sec-label mono">In-house fabrication</div>
          <div className="fab-head-row">
            <h2 className="h2 fab-title">From CAD to carbon fiber.</h2>
            <TLink href="/work/fabsky" className="fabsky-direct-link mono">
              See FabSky <span className="arr">→</span>
            </TLink>
          </div>

          {hasFabricationImage && (
            <Reveal>
              <figure className="fab-editorial-media">
                <Image
                  src="/labs/fabrication-workshop.webp"
                  alt="MiniByte in-house fabrication workshop with CNC machines, 3D printers and assembly benches"
                  width={1662}
                  height={935}
                  sizes="(max-width: 1100px) 100vw, 1200px"
                  className="fab-editorial-img"
                />
              </figure>
            </Reveal>
          )}

          <div className="fab-strip-grid">
            <Reveal delay={0}>
              <div className="fab-col">
                <span className="mono fab-col-num">01</span>
                <h3 className="fab-col-title">Processes</h3>
                <ul className="fab-col-list">
                  <li>CNC machining</li>
                  <li>3D printing (FDM and SLA)</li>
                  <li>Laser cutting</li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="fab-col">
                <span className="mono fab-col-num">02</span>
                <h3 className="fab-col-title">Materials</h3>
                <ul className="fab-col-list">
                  <li>Carbon fiber</li>
                  <li>Aluminum</li>
                  <li>Specialized polymers</li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={240}>
              <div className="fab-col">
                <span className="mono fab-col-num">03</span>
                <h3 className="fab-col-title">Output</h3>
                <ul className="fab-col-list">
                  <li>High-tolerance components</li>
                  <li>Mission-specific drone structures</li>
                  <li>Aerodynamic precision frames</li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 6. PARTNER ON R&D */}
      {/* TODO(confirm with team) */}
      <section className="section bg-paper rnd-partner-band">
        <div className="container">
          <div className="rnd-partner-wrap">
            <div className="rnd-partner-text">
              <h2 className="rnd-partner-title">Have a hard, open problem?</h2>
              <p className="rnd-partner-body">
                We partner on applied research and turn it into prototypes and products.
              </p>
            </div>
            <div className="rnd-partner-acts">
              <Btn href="/contact" arrow>
                Start a conversation
              </Btn>
              <Btn href="/how-we-work#engagement" variant="ghost">
                How we work <span className="arr">→</span>
              </Btn>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CTA */}
      <CTA title="Build something new with us." />
    </>
  );
}

