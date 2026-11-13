"use client";

import { useEffect, useRef } from "react";

export interface LoopVideoProps {
  webmSrc?: string;
  mp4Src?: string;
  poster?: string;
  className?: string;
  ariaLabel?: string;
  allowMobileAutoplay?: boolean;
  autoPlay?: boolean;
}

export function LoopVideo({
  webmSrc,
  mp4Src,
  poster,
  className = "",
  ariaLabel,
  allowMobileAutoplay = false,
  autoPlay = false,
}: LoopVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia("(max-width: 768px)");
    let observer: IntersectionObserver | null = null;

    const stop = () => {
      observer?.disconnect();
      observer = null;
      videoRef.current?.pause();
    };

    const sync = () => {
      stop();

      if (motionQuery.matches) return;
      if (!allowMobileAutoplay && mobileQuery.matches) return;

      const video = videoRef.current;
      if (!video) return;

      observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (entry.isIntersecting) {
            video.play().catch(() => {
              // Autoplay was prevented or not supported
            });
          } else {
            video.pause();
          }
        },
        { threshold: 0.1 }
      );

      observer.observe(video);
    };

    sync();
    motionQuery.addEventListener("change", sync);
    mobileQuery.addEventListener("change", sync);

    return () => {
      motionQuery.removeEventListener("change", sync);
      mobileQuery.removeEventListener("change", sync);
      stop();
    };
  }, [allowMobileAutoplay]);

  return (
    <video
      ref={videoRef}
      muted
      autoPlay={autoPlay}
      loop
      playsInline
      preload="metadata"
      poster={poster}
      className={className}
      aria-label={ariaLabel}
      aria-hidden={!ariaLabel}
    >
      {webmSrc && <source src={webmSrc} type="video/webm" />}
      {mp4Src && <source src={mp4Src} type="video/mp4" />}
    </video>
  );
}

