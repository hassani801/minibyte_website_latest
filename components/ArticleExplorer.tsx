"use client";
import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { type ArticleItem, readingMinutes } from "@/lib/data";
import { BytePattern } from "./BytePattern";
import { DotField } from "./DotField";
import { Photo } from "./Photo";
import { Reveal } from "./Reveal";
import { TLink } from "./Transition";
import { Arrow } from "./Btn";

function ArticleExplorerInner({
  articles,
  featuredCover,
}: {
  articles: ArticleItem[];
  featuredCover?: string | null;
}) {
  const searchParams = useSearchParams();
  const initialTag = searchParams?.get("tag") || "all";
  const [activeTag, setActiveTag] = useState<string>(initialTag);

  // Distinct tags
  const distinctTags = useMemo(() => {
    const set = new Set<string>();
    articles.forEach((a) => set.add(a.tag));
    return Array.from(set);
  }, [articles]);

  // Counts
  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = { all: articles.length };
    distinctTags.forEach((tag) => {
      counts[tag] = articles.filter((a) => a.tag.toLowerCase() === tag.toLowerCase()).length;
    });
    return counts;
  }, [articles, distinctTags]);

  const handleTagChange = (tagKey: string) => {
    setActiveTag(tagKey);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (tagKey === "all") {
        url.searchParams.delete("tag");
      } else {
        url.searchParams.set("tag", tagKey);
      }
      window.history.replaceState({}, "", url.toString());
    }
  };

  const featured = articles[0];

  // Grid items: if on "all", grid displays the rest of the articles (articles 1..n).
  // If filtered by tag, grid displays the articles matching that tag.
  const gridArticles = useMemo(() => {
    if (activeTag === "all") {
      return articles.slice(1);
    }
    return articles.filter(
      (a) => a.tag.toLowerCase() === activeTag.toLowerCase()
    );
  }, [articles, activeTag]);

  const dotModes: ("grid" | "flow" | "wave")[] = ["grid", "flow", "wave"];

  return (
    <div className="article-explorer">
      {/* 1. FEATURED ARTICLE (First article as large dark card) */}
      {featured && (
        <section className="article-featured-section" aria-label="Featured note">
          <div className="container">
            <Reveal>
              <TLink href={`/articles/${featured.slug}`} className="article-featured-card">
                <div className="article-featured-grid">
                  <div className="article-featured-content">
                    <div className="article-featured-meta">
                      <span className="label eyebrow dot">{featured.tag}</span>
                      <span className="featured-time mono">{readingMinutes(featured)} min read</span>
                    </div>
                    <h2 className="article-featured-title">{featured.title}</h2>
                    <p className="article-featured-excerpt">{featured.text}</p>
                    <span className="article-featured-cta mono">
                      Read engineering note <Arrow size={16} />
                    </span>
                  </div>

                  <div
                    className={`article-featured-visual${featuredCover ? " has-cover" : ""}`}
                  >
                    {featuredCover && (
                      <div className="article-featured-cover" aria-hidden>
                        <Photo
                          src={featuredCover}
                          alt=""
                          fill
                          sizes="(max-width: 960px) 100vw, 40vw"
                          className="article-featured-cover-img"
                        />
                        <span className="article-featured-cover-overlay" />
                      </div>
                    )}
                    <div className="article-featured-pattern" aria-hidden>
                      <BytePattern words={featured.words} size={240} />
                    </div>
                    {featured.keyFact && (
                      <div className="article-featured-fact">
                        <span className="featured-fact-val mono">{featured.keyFact.value}</span>
                        <span className="featured-fact-lbl">{featured.keyFact.label}</span>
                      </div>
                    )}
                  </div>
                </div>
              </TLink>
            </Reveal>
          </div>
        </section>
      )}

      {/* 2. FILTER BAR (Chips for All + distinct tags) */}
      <section className="article-filter-section" aria-label="Filter notes by tag">
        <div className="container">
          <div className="article-filter-bar" role="toolbar" aria-label="Filter engineering notes by category">
            <button
              type="button"
              className={`article-filter-chip mono ${activeTag === "all" ? "active" : ""}`}
              onClick={() => handleTagChange("all")}
              aria-pressed={activeTag === "all"}
            >
              <span>All notes</span>
              <span className="filter-count">{tagCounts.all}</span>
            </button>
            {distinctTags.map((tag) => {
              const isSelected = activeTag.toLowerCase() === tag.toLowerCase();
              return (
                <button
                  key={tag}
                  type="button"
                  className={`article-filter-chip mono ${isSelected ? "active" : ""}`}
                  onClick={() => handleTagChange(tag)}
                  aria-pressed={isSelected}
                >
                  <span>{tag}</span>
                  <span className="filter-count">{tagCounts[tag] || 0}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. GRID OF THE REST (3 / 2 / 1 columns) */}
      <section className="section bg-paper article-grid-section">
        <div className="container">
          <div className="art-grid">
            {gridArticles.map((a, i) => (
              <Reveal key={a.slug} delay={Math.min(i * 70, 280)}>
                <TLink href={`/articles/${a.slug}`} className="art">
                  <div className="vis">
                    <DotField mode={dotModes[i % dotModes.length]} gap={20} />
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
        </div>
      </section>
    </div>
  );
}

export function ArticleExplorer({
  articles,
  featuredCover,
}: {
  articles: ArticleItem[];
  featuredCover?: string | null;
}) {
  return (
    <Suspense
      fallback={
        <div className="article-explorer">
          <section className="section bg-paper">
            <div className="container">
              <p className="mono" style={{ color: "var(--graphite)" }}>
                Loading notes...
              </p>
            </div>
          </section>
        </div>
      }
    >
      <ArticleExplorerInner articles={articles} featuredCover={featuredCover} />
    </Suspense>
  );
}

