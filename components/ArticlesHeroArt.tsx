"use client";

import { BytePattern } from "./BytePattern";
import { LoopVideo } from "./LoopVideo";
import { Photo } from "./Photo";

export interface ArticlesHeroArtProps {
  posterSrc?: string | null;
  videoMp4?: string | null;
  videoWebm?: string | null;
}

const fallbackPattern = (
  <BytePattern size={230} words={["research", "learning", "minibyte"]} />
);

export function ArticlesHeroArt({
  posterSrc,
  videoMp4,
  videoWebm,
}: ArticlesHeroArtProps) {
  const hasVideo = Boolean(videoWebm || videoMp4);

  if (!posterSrc && !hasVideo) {
    return fallbackPattern;
  }

  return (
    <div className="articles-hero-art" aria-hidden="true">
      {posterSrc ? (
        <Photo
          src={posterSrc}
          alt=""
          fill
          priority
          sizes="(max-width: 1100px) 100vw, 50vw"
          className="articles-hero-poster"
          fallback={fallbackPattern}
        />
      ) : (
        fallbackPattern
      )}

      {hasVideo && (
        <LoopVideo
          webmSrc={videoWebm ?? undefined}
          mp4Src={videoMp4 ?? undefined}
          poster={posterSrc ?? undefined}
          autoPlay
          allowMobileAutoplay
          className="articles-hero-video"
        />
      )}

      <div className="articles-hero-overlay" />
    </div>
  );
}
