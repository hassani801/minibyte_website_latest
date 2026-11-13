"use client";

import { useEffect, useState } from "react";
import { LoopVideo } from "./LoopVideo";
import { Photo } from "./Photo";
import { DotField } from "./DotField";

export interface HeroBackdropProps {
  videoWebm?: string | null;
  videoMp4?: string | null;
  videoPoster?: string | null;
  heroImage?: string | null;
}

export function HeroBackdrop({
  videoWebm,
  videoMp4,
  videoPoster,
  heroImage,
}: HeroBackdropProps) {
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

  const hasVideo = Boolean(videoWebm && videoMp4);
  const hasImage = Boolean(heroImage);

  // Fallback: If neither video nor hero image is available, restore the original DotField
  if (!hasVideo && !hasImage) {
    return <DotField mode="wave" gap={22} className="hero-backdrop-canvas" />;
  }

  // Desktop active video condition
  const showDesktopVideo = mounted && !isMobile && !reducedMotion && hasVideo;

  return (
    <div className="hero-media-container" aria-hidden="true">
      {/* 1. Desktop background video */}
      {hasVideo && (
        <div className={`hero-video-pane ${showDesktopVideo ? "active" : ""}`}>
          <LoopVideo
            webmSrc={videoWebm ?? undefined}
            mp4Src={videoMp4 ?? undefined}
            poster={videoPoster ?? undefined}
            className="hero-media-video"
          />
          <div className="hero-media-overlay" />
        </div>
      )}

      {/* 2. Mobile or Reduced-Motion static background image */}
      {heroImage ? (
        <div className={`hero-image-pane ${!showDesktopVideo ? "active" : ""}`}>
          <Photo
            src={heroImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="hero-media-image"
          />
          <div className="hero-media-overlay" />
        </div>
      ) : (
        /* If static image is missing on mobile/reduced-motion, preserve the original DotField */
        !showDesktopVideo && (
          <DotField mode="wave" gap={22} className="hero-backdrop-canvas" />
        )
      )}
    </div>
  );
}
