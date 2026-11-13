"use client";

import { useEffect, useState } from "react";
import { LoopVideo } from "./LoopVideo";
import { Photo } from "./Photo";
import { DotField } from "./DotField";

export interface WorkHeroArtProps {
  posterSrc?: string | null;
  videoMp4?: string | null;
  videoWebm?: string | null;
}

export function WorkHeroArt({
  posterSrc,
  videoMp4,
  videoWebm,
}: WorkHeroArtProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mqlMobile = window.matchMedia("(max-width: 768px)");
    const mqlMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    setIsMobile(mqlMobile.matches);
    setReducedMotion(mqlMotion.matches);

    const handleMobile = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    const handleMotion = (e: MediaQueryListEvent) => setReducedMotion(e.matches);

    mqlMobile.addEventListener("change", handleMobile);
    mqlMotion.addEventListener("change", handleMotion);

    return () => {
      mqlMobile.removeEventListener("change", handleMobile);
      mqlMotion.removeEventListener("change", handleMotion);
    };
  }, []);

  const hasVideo = Boolean(videoWebm || videoMp4);
  const hasPoster = Boolean(posterSrc);

  // If neither poster nor video is available, fallback to the original DotField
  if (!hasPoster && !hasVideo) {
    return <DotField mode="wave" gap={20} />;
  }

  // Desktop active video condition
  const showVideo = mounted && !isMobile && !reducedMotion && hasVideo;

  return (
    <div className="work-hero-art-media" aria-hidden="true">
      {/* 1. Poster image (initial visual & fallback) */}
      {posterSrc ? (
        <Photo
          src={posterSrc}
          alt=""
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="work-hero-poster-img"
          fallback={<DotField mode="wave" gap={20} />}
        />
      ) : (
        <DotField mode="wave" gap={20} />
      )}

      {/* 2. Video loop when supported and active */}
      {hasVideo && (
        <div className={`work-hero-video-pane ${showVideo ? "active" : ""}`}>
          <LoopVideo
            webmSrc={videoWebm ?? undefined}
            mp4Src={videoMp4 ?? undefined}
            poster={posterSrc ?? undefined}
            className="work-hero-video-el"
          />
        </div>
      )}

      {/* 3. Subtle overlay for contrast */}
      <div className="work-hero-art-overlay" />
    </div>
  );
}

