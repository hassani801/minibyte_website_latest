import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  CASES,
  CATEGORIES,
  visibleCases,
  casesByCategory,
  type CaseItem,
} from "@/lib/data";
import { PageHero } from "@/components/PageHero";
import { ArtCard } from "@/components/ArtCard";
import { DotField } from "@/components/DotField";
import { Reveal } from "@/components/Reveal";
import { TLink } from "@/components/Transition";
import { Arrow, Btn } from "@/components/Btn";
import { CTA } from "@/components/CTA";

function getFirstSentence(text: string): string {
  const match = text.match(/^.*?[.!?](?:\s|$)/);
  return match ? match[0].trim() : text;
}

function splitParagraphs(text: string): string[] {
  const sentences = text.match(/[^.!?]+[.!?]+(?:\s|$)/g);
  if (!sentences || sentences.length <= 2) return [text];
  if (sentences.length === 3) {
    return [sentences.slice(0, 2).join("").trim(), sentences[2].trim()];
  }
  const mid = Math.ceil(sentences.length / 2);
  return [
    sentences.slice(0, mid).join("").trim(),
    sentences.slice(mid).join("").trim(),
  ];
}

export function generateStaticParams() {
  // Build-time todo warning logging
  visibleCases.forEach((c) => {
    if (c.todo) {
      console.warn(`[TODO] /work/${c.slug}: ${c.todo}`);
    }
  });
  CASES.filter((c) => c.hidden && c.todo).forEach((c) => {
    console.warn(`[TODO hidden] ${c.slug}: ${c.todo}`);
  });

  return visibleCases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = visibleCases.find((item) => item.slug === slug);
  if (!c) return { title: "Case study · MiniByte" };

  return {
    title: `${c.title} · Case Study`,
    description: getFirstSentence(c.text),
    alternates: { canonical: `/work/${slug}` },
  };
}

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = visibleCases.find((item) => item.slug === slug);
  if (!c || c.hidden) notFound();

  const categoryInfo = CATEGORIES.find((cat) => cat.key === c.category)!;
  const firstSentence = getFirstSentence(c.text);
  const paragraphs = splitParagraphs(c.text);

  // Read optional hero artwork and screenshots server-side at build time
  const caseMediaDir = path.join(process.cwd(), "public", "work", c.slug);
  const heroImagePath = path.join(caseMediaDir, "hero.webp");
  const hasHeroImage = fs.existsSync(heroImagePath);

  let screenshots: string[] = [];
  if (fs.existsSync(caseMediaDir)) {
    try {
      const files = fs
        .readdirSync(caseMediaDir)
        .filter(
          (f) =>
            f.toLowerCase() !== "hero.webp" &&
            /\.(png|jpe?g|webp|svg)$/i.test(f)
        )
        .sort();
      screenshots = files.slice(0, 3).map((f) => `/work/${c.slug}/${f}`);
    } catch {
      screenshots = [];
    }
  }

  // Category navigation & related cases
  const categoryCases = casesByCategory(c.category);
  const catIndex = categoryCases.findIndex((item) => item.slug === c.slug);
  const prevCase = categoryCases[(catIndex - 1 + categoryCases.length) % categoryCases.length];
  const nextCase = categoryCases[(catIndex + 1) % categoryCases.length];
  const relatedCases = categoryCases.filter((item) => item.slug !== c.slug).slice(0, 3);

  return (
    <>
      <PageHero
        crumb={{ href: "/work", label: "All work" }}
        eyebrow={`${categoryInfo.label} · ${c.tag}`}
        title={c.title}
        lede={firstSentence}
        art={
          <ArtCard tone="stone" caption={[categoryInfo.label, c.tag]}>
            {hasHeroImage ? (
              <div className="case-hero-art-media">
                <Image
                  src={`/work/${c.slug}/hero.webp`}
                  alt={`Abstract ${categoryInfo.label} artwork for ${c.title}`}
                  fill
                  priority
                  sizes="(max-width: 1100px) 100vw, 50vw"
                  className="case-hero-art-img"
                />
              </div>
            ) : (
              <DotField mode={c.art} gap={20} />
            )}
          </ArtCard>
        }
      >
        <div className="case-hero-actions">
          <Btn href="/contact" arrow>
            Discuss a similar project
          </Btn>
          <Btn href="/work" variant="ghost">
            Back to all work
          </Btn>
        </div>
      </PageHero>

      <section className="section bg-white case-detail-section">
        <div className="container">
          {/* Metadata Row */}
          <Reveal className="case-meta-bar">
            <div className="case-meta-cell">
              <span className="meta-label label">Category</span>
              <span className="meta-val">{categoryInfo.label}</span>
            </div>
            <div className="case-meta-cell">
              <span className="meta-label label">Focus Domain</span>
              <span className="meta-val">{c.tag}</span>
            </div>
            <div className="case-meta-cell">
              <span className="meta-label label">Technology Stack</span>
              <span className="meta-val">
                {c.stack && c.stack.length > 0 ? c.stack.join(" · ") : "Proprietary AI Architecture"}
              </span>
            </div>
          </Reveal>

          {/* Section 01: What We Built */}
          <div className="case-content-block">
            <Reveal>
              <div className="case-sec-heading label eyebrow">01 · What we built</div>
            </Reveal>
            <div className="case-text-prose">
              {paragraphs.map((p, i) => (
                <Reveal as="p" key={i} delay={i * 80}>
                  {p}
                </Reveal>
              ))}
            </div>
          </div>

          {/* Section 02: Business Outcome */}
          {c.outcome && (
            <div className="case-content-block">
              <Reveal>
                <div className="case-sec-heading label eyebrow">02 · Business outcome</div>
              </Reveal>
              <Reveal delay={100}>
                <div className="case-outcome-callout">
                  <div className="outcome-rule" />
                  <p className="outcome-text">{c.outcome}</p>
                </div>
              </Reveal>
            </div>
          )}

          {/* Section 03: Technology Stack */}
          {c.stack && c.stack.length > 0 && (
            <div className="case-content-block">
              <Reveal>
                <div className="case-sec-heading label eyebrow">03 · Technology & Stack</div>
              </Reveal>
              <Reveal delay={100}>
                <div className="case-tech-chips">
                  {c.stack.map((tech) => (
                    <span key={tech} className="tech-chip mono">
                      {tech}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>
          )}

          {/* Optional Visuals: Device Laptop Frame */}
          {screenshots.length > 0 && (
            <div className="case-content-block case-visuals-block">
              <Reveal>
                <div className="case-sec-heading label eyebrow">System Screenshots</div>
              </Reveal>
              <div className="device-frames-grid">
                {screenshots.map((src, idx) => (
                  <Reveal key={src} delay={idx * 120}>
                    <div className="device-laptop">
                      <div className="device-laptop-top">
                        <div className="device-camera-dot" />
                        <div className="device-screen">
                          <Image
                            src={src}
                            alt={`${c.title} screenshot ${idx + 1}`}
                            width={1100}
                            height={680}
                            className="device-screenshot"
                            sizes="(max-width: 860px) 100vw, 800px"
                            unoptimized={/\.svg$/i.test(src)}
                          />
                        </div>
                      </div>
                      <div className="device-laptop-base">
                        <div className="device-laptop-notch" />
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          )}

          {/* Prev / Next Navigation within Category */}
          <div className="case-prev-next-nav">
            <Reveal>
              <TLink href={`/work/${prevCase.slug}`} className="prev-next-card prev">
                <span className="label">← Previous in {categoryInfo.label.split(" & ")[0]}</span>
                <h4>{prevCase.title}</h4>
              </TLink>
            </Reveal>
            <Reveal delay={100}>
              <TLink href={`/work/${nextCase.slug}`} className="prev-next-card next">
                <span className="label">Next in {categoryInfo.label.split(" & ")[0]} →</span>
                <h4>{nextCase.title}</h4>
              </TLink>
            </Reveal>
          </div>

          {/* More in this Category */}
          {relatedCases.length > 0 && (
            <div className="case-related-block">
              <Reveal>
                <div className="case-sec-heading label eyebrow">
                  More in {categoryInfo.label}
                </div>
              </Reveal>
              <div className="related-cases-grid">
                {relatedCases.map((rc, i) => (
                  <Reveal key={rc.slug} delay={i * 80}>
                    <TLink href={`/work/${rc.slug}`} className="related-case-card">
                      <div className="related-art">
                        <DotField mode={rc.art} gap={22} className="work-canvas" />
                      </div>
                      <div className="related-body">
                        <span className="label related-tag">{rc.tag}</span>
                        <h5>{rc.title}</h5>
                        <p>{getFirstSentence(rc.text)}</p>
                        <span className="related-link">
                          Case study <Arrow />
                        </span>
                      </div>
                    </TLink>
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <CTA title="Have a problem worth solving with AI?" />
    </>
  );
}
