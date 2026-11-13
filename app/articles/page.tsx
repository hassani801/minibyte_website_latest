import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ArtCard } from "@/components/ArtCard";
import { ArticlesHeroArt } from "@/components/ArticlesHeroArt";
import { CTA } from "@/components/CTA";
import { ArticleExplorer } from "@/components/ArticleExplorer";
import { ARTICLES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Engineering notes",
  description:
    "Notes from client projects and engineering practice: what we built, why we chose it and what it did.",
  alternates: { canonical: "/articles" },
};

export default function ArticlesPage() {
  const mediaDir = path.join(process.cwd(), "public", "articles");

  const posterSrc = fs.existsSync(path.join(mediaDir, "articles-hero-poster.webp"))
    ? "/articles/articles-hero-poster.webp"
    : null;
  const videoMp4 = fs.existsSync(path.join(mediaDir, "articles-hero-loop.mp4"))
    ? "/articles/articles-hero-loop.mp4"
    : null;
  const videoWebm = fs.existsSync(path.join(mediaDir, "articles-hero-loop.webm"))
    ? "/articles/articles-hero-loop.webm"
    : null;

  const featuredCover = ARTICLES[0] &&
    fs.existsSync(path.join(mediaDir, ARTICLES[0].slug, "cover.webp"))
    ? `/articles/${ARTICLES[0].slug}/cover.webp`
    : null;

  return (
    <>
      <PageHero
        eyebrow="Engineering notes"
        title="What we are learning."
        lede="Notes from client projects and engineering practice: what we built, why we chose it and what it did."
        art={
          <ArtCard caption={["Engineering notes", `${ARTICLES.length} articles`]}>
            <ArticlesHeroArt
              posterSrc={posterSrc}
              videoMp4={videoMp4}
              videoWebm={videoWebm}
            />
          </ArtCard>
        }
      />

      <ArticleExplorer articles={ARTICLES} featuredCover={featuredCover} />

      <CTA
        title="Have a problem worth solving with AI?"
        newsletter={false}
      />
    </>
  );
}
