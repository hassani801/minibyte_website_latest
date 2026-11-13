"use client";

import { LoopVideo } from "./LoopVideo";
import { Photo } from "./Photo";

export interface FieldScanMediaProps {
  posterSrc?: string | null;
  videoMp4?: string | null;
  videoWebm?: string | null;
}

export function FieldScanMedia({
  posterSrc,
  videoMp4,
  videoWebm,
}: FieldScanMediaProps) {
  if (!posterSrc && !videoMp4 && !videoWebm) {
    return null;
  }

  return (
    <div className="field-scan-media">
      {posterSrc && (
        <Photo
          src={posterSrc}
          alt=""
          fill
          sizes="(max-width: 960px) 100vw, 50vw"
          className="field-scan-poster"
        />
      )}
      {(videoWebm || videoMp4) && (
        <LoopVideo
          webmSrc={videoWebm ?? undefined}
          mp4Src={videoMp4 ?? undefined}
          poster={posterSrc ?? undefined}
          allowMobileAutoplay
          className="field-scan-video"
        />
      )}
      <div className="field-scan-media-overlay" />
    </div>
  );
}
