"use client";

import { BytePattern } from "./BytePattern";
import { LoopVideo } from "./LoopVideo";
import { Photo } from "./Photo";

export interface ProcessHeroArtProps {
  posterSrc?: string | null;
  videoMp4?: string | null;
  videoWebm?: string | null;
}

const fallbackPattern = (
  <BytePattern
    size={230}
    words={["discover", "prove", "build", "deploy"]}
  />
);

export function ProcessHeroArt({
  posterSrc,
  videoMp4,
  videoWebm,
}: ProcessHeroArtProps) {
  const hasVideo = Boolean(videoWebm || videoMp4);

  if (!posterSrc && !hasVideo) {
    return fallbackPattern;
  }

  return (
    <div className="process-hero-art" aria-hidden="true">
      {posterSrc ? (
        <Photo
          src={posterSrc}
          alt=""
          fill
          priority
          sizes="(max-width: 1100px) 100vw, 50vw"
          className="process-hero-poster"
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
          allowMobileAutoplay
          className="process-hero-video"
        />
      )}

      <div className="process-hero-overlay" />
    </div>
  );
}
