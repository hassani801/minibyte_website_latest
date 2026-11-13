"use client";

import { BytePattern } from "./BytePattern";
import { LoopVideo } from "./LoopVideo";
import { Photo } from "./Photo";

export interface CompanyHeroArtProps {
  posterSrc?: string | null;
  videoMp4?: string | null;
  videoWebm?: string | null;
}

const fallbackPattern = (
  <BytePattern size={230} words={["minibyte"]} />
);

export function CompanyHeroArt({
  posterSrc,
  videoMp4,
  videoWebm,
}: CompanyHeroArtProps) {
  const hasVideo = Boolean(videoWebm || videoMp4);

  if (!posterSrc && !hasVideo) {
    return fallbackPattern;
  }

  return (
    <div className="company-hero-art" aria-hidden="true">
      {posterSrc ? (
        <Photo
          src={posterSrc}
          alt=""
          fill
          priority
          sizes="(max-width: 1100px) 100vw, 50vw"
          className="company-hero-poster"
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
          className="company-hero-video"
        />
      )}

      <div className="company-hero-overlay" />
    </div>
  );
}
