import fs from "node:fs";
import path from "node:path";

export const SERVICE_IMAGE_SLUGS = [
  "ai-product-development",
  "computer-vision",
  "ai-ml-platforms",
  "process-automation",
  "web-design-growth",
] as const;

function assetExists(...segments: string[]) {
  return fs.existsSync(path.join(process.cwd(), "public", ...segments));
}

export function getServiceImages(): Record<string, string> {
  const available: Record<string, string> = {};

  for (const slug of SERVICE_IMAGE_SLUGS) {
    if (assetExists("services", `${slug}.webp`)) {
      available[slug] = `/services/${slug}.webp`;
    }
  }

  return available;
}

export interface TechStackVideoSources {
  mp4: string | null;
  webm: string | null;
  poster: string | null;
}

export function getTechStackVideoSources(): TechStackVideoSources {
  return {
    mp4: assetExists("services", "tech-stack-loop.mp4")
      ? "/services/tech-stack-loop.mp4"
      : null,
    webm: assetExists("services", "tech-stack-loop.webm")
      ? "/services/tech-stack-loop.webm"
      : null,
    poster: assetExists("services", "tech-stack-poster.webp")
      ? "/services/tech-stack-poster.webp"
      : null,
  };
}
