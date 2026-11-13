"use client";
import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  CATEGORIES,
  visibleCases,
  casesByCategory,
  type CategoryKey,
  type CaseItem,
} from "@/lib/data";
import { DotField } from "./DotField";
import { Photo } from "./Photo";
import { Reveal } from "./Reveal";
import { TLink } from "./Transition";
import { Arrow } from "./Btn";

function getFirstSentence(text: string): string {
  const match = text.match(/^.*?[.!?](?:\s|$)/);
  return match ? match[0].trim() : text;
}

function FeaturedSection({
  cases,
  projectImages = {},
}: {
  cases: CaseItem[];
  projectImages?: Record<string, string>;
}) {
  if (cases.length === 0) return null;
  const [lead, second, third, ...rest] = cases;

  return (
    <section className="work-featured-section" aria-label="Featured projects">
      <div className="container">
        <div className="work-featured-eyebrow label eyebrow">Featured Projects</div>
        
        {/* Top grid: Lead card + 2 stacked cards */}
        <div className="featured-hero-grid">
          {lead && (
            <Reveal className="featured-lead-wrap">
              <TLink href={`/work/${lead.slug}`} className="featured-card featured-lead">
                <div className="featured-art-wrap">
                  {projectImages[lead.slug] ? (
                    <>
                      <Photo
                        src={projectImages[lead.slug]}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, 60vw"
                        className="featured-image"
                        fallback={
                          <DotField mode={lead.art} gap={20} className="featured-canvas" />
                        }
                      />
                      <div className="featured-art-overlay" aria-hidden="true" />
                    </>
                  ) : (
                    <DotField mode={lead.art} gap={20} className="featured-canvas" />
                  )}
                  <span className="featured-badge mono">{lead.category.toUpperCase()}</span>
                </div>
                <div className="featured-body">
                  <span className="label featured-tag">{lead.tag}</span>
                  <h3 className="featured-title">{lead.title}</h3>
                  <p className="featured-outcome">{lead.outcome ?? getFirstSentence(lead.text)}</p>
                  <span className="featured-link">
                    Explore case study <Arrow />
                  </span>
                </div>
              </TLink>
            </Reveal>
          )}

          <div className="featured-stacked-col">
            {[second, third].filter(Boolean).map((c, i) => (
              <Reveal key={c.slug} delay={100 + i * 100} className="featured-stacked-item">
                <TLink href={`/work/${c.slug}`} className="featured-card featured-stacked">
                  <div className="featured-stacked-art">
                    {projectImages[c.slug] ? (
                      <>
                        <Photo
                          src={projectImages[c.slug]}
                          alt=""
                          fill
                          sizes="(max-width: 768px) 100vw, 30vw"
                          className="featured-image"
                          fallback={
                            <DotField mode={c.art} gap={22} className="featured-canvas" />
                          }
                        />
                        <div className="featured-art-overlay" aria-hidden="true" />
                      </>
                    ) : (
                      <DotField mode={c.art} gap={22} className="featured-canvas" />
                    )}
                  </div>
                  <div className="featured-body">
                    <span className="label featured-tag">{c.tag}</span>
                    <h3 className="featured-title-sm">{c.title}</h3>
                    <p className="featured-outcome-sm">{c.outcome ?? getFirstSentence(c.text)}</p>
                    <span className="featured-link">
                      View project <Arrow />
                    </span>
                  </div>
                </TLink>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Remaining featured cases in a row / scroll-snap */}
        {rest.length > 0 && (
          <div className="featured-row-grid">
            {rest.map((c, i) => (
              <Reveal key={c.slug} delay={i * 90}>
                <TLink href={`/work/${c.slug}`} className="featured-card featured-sub">
                  <div className="featured-art-wrap" style={{ aspectRatio: "1.7" }}>
                    {projectImages[c.slug] ? (
                      <>
                        <Photo
                          src={projectImages[c.slug]}
                          alt=""
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="featured-image"
                          fallback={
                            <DotField mode={c.art} gap={20} className="featured-canvas" />
                          }
                        />
                        <div className="featured-art-overlay" aria-hidden="true" />
                      </>
                    ) : (
                      <DotField mode={c.art} gap={20} className="featured-canvas" />
                    )}
                    <span className="featured-badge mono">{c.category.toUpperCase()}</span>
                  </div>
                  <div className="featured-body">
                    <span className="label featured-tag">{c.tag}</span>
                    <h3 className="featured-title-sm">{c.title}</h3>
                    <p className="featured-outcome-sm">{c.outcome ?? getFirstSentence(c.text)}</p>
                    <span className="featured-link">
                      View project <Arrow />
                    </span>
                  </div>
                </TLink>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function WorkExplorerContent({
  projectImages = {},
}: {
  projectImages?: Record<string, string>;
}) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("c") as CategoryKey | null;
  const validInitial = CATEGORIES.some((c) => c.key === initialCategory) ? initialCategory! : "all";

  const [activeCat, setActiveCat] = useState<CategoryKey | "all">(validInitial);

  const featuredList = useMemo(() => visibleCases.filter((c) => c.featured), []);

  const displayedCases = useMemo(() => {
    if (activeCat === "all") return visibleCases;
    return casesByCategory(activeCat);
  }, [activeCat]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: visibleCases.length };
    CATEGORIES.forEach((cat) => {
      counts[cat.key] = visibleCases.filter((c) => c.category === cat.key).length;
    });
    return counts;
  }, []);

  const handleSelect = (key: CategoryKey | "all") => {
    setActiveCat(key);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (key === "all") {
        url.searchParams.delete("c");
      } else {
        url.searchParams.set("c", key);
      }
      window.history.replaceState({}, "", url.toString());
    }
  };

  const activeCategoryInfo = activeCat !== "all" ? CATEGORIES.find((c) => c.key === activeCat) : null;

  return (
    <>
      {/* Featured Section */}
      <FeaturedSection cases={featuredList} projectImages={projectImages} />

      {/* Sticky Filter Bar */}
      <div className="work-filter-bar-sticky">
        <div className="container">
          <div className="work-filter-scroll" role="toolbar" aria-label="Filter case studies by domain">
            <button
              type="button"
              className={`work-filter-pill ${activeCat === "all" ? "active" : ""}`}
              onClick={() => handleSelect("all")}
              aria-pressed={activeCat === "all"}
            >
              <span>All projects</span>
              <span className="filter-count">{categoryCounts.all}</span>
            </button>
            {CATEGORIES.map((cat) => {
              const count = categoryCounts[cat.key] || 0;
              const isSelected = activeCat === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  className={`work-filter-pill ${isSelected ? "active" : ""}`}
                  onClick={() => handleSelect(cat.key)}
                  aria-pressed={isSelected}
                >
                  <span>{cat.label}</span>
                  <span className="filter-count">{count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Portfolio Grid */}
      <section className="section bg-paper work-grid-section" id="all-work">
        <div className="container">
          <div className="work-grid-header">
            <div>
              <div className="label eyebrow">
                {activeCat === "all" ? "Complete Portfolio" : activeCategoryInfo?.label}
              </div>
              <h2 className="work-grid-count-title">
                {displayedCases.length} {displayedCases.length === 1 ? "System" : "Systems"}{" "}
                {activeCat === "all" ? "across 7 domains" : "deployed"}
              </h2>
            </div>
            {activeCategoryInfo && (
              <p className="work-category-blurb">{activeCategoryInfo.blurb}</p>
            )}
          </div>

          <div className="work-main-grid" key={activeCat}>
            {displayedCases.map((c, i) => (
              <Reveal key={c.slug} delay={(i % 3) * 70} className="work-grid-item">
                <TLink
                  href={`/work/${c.slug}`}
                  className="work-grid-card"
                  aria-label={`Read the case study: ${c.title}`}
                >
                  <div className="work-grid-art">
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
                    <span className="work-grid-cat-badge mono">{c.category}</span>
                  </div>
                  <div className="work-grid-body">
                    <span className="label work-grid-tag">{c.tag}</span>
                    <h3 className="work-grid-title">{c.title}</h3>
                    <p className="work-grid-desc">{getFirstSentence(c.text)}</p>
                    <span className="work-grid-link">
                      Read the case study <Arrow />
                    </span>
                  </div>
                </TLink>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function WorkExplorer({
  projectImages = {},
}: {
  projectImages?: Record<string, string>;
} = {}) {
  return (
    <Suspense
      fallback={
        <div className="work-loading container mono">
          Loading portfolio...
        </div>
      }
    >
      <WorkExplorerContent projectImages={projectImages} />
    </Suspense>
  );
}

