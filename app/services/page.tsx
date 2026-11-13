import type { Metadata } from "next";
import { PageHero, SecHead } from "@/components/PageHero";
import { ArtCard } from "@/components/ArtCard";
import { BytePattern } from "@/components/BytePattern";
import { Btn, TextLink } from "@/components/Btn";
import { CTA } from "@/components/CTA";
import {
  BigMarquee,
  IndustriesSection,
  ServiceDetails,
  Steps,
  TechStackSection,
} from "@/components/sections";
import { ServiceNav } from "@/components/ServiceNav";
import {
  getServiceImages,
  getTechStackVideoSources,
} from "@/lib/services-media";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Computer vision, AI/ML platforms, automation, full-stack and design. MiniByte is an AI R&D firm building intelligent systems.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  const serviceImages = getServiceImages();
  const techVideo = getTechStackVideoSources();

  return (
    <>
      {/* 1. PageHero */}
      <PageHero
        eyebrow="Services"
        title="From a research question to a system in production."
        lede="MiniByte is an AI R&D firm. We build computer vision systems, AI/ML platforms, automation and full-stack products, with researchers and engineers on the same team."
        art={
          <ArtCard
            caption={["Five services", "0001 – 0101"]}
          >
            <BytePattern
              size={230}
              words={["vision", "model", "agent", "deploy", "minibyte"]}
            />
          </ArtCard>
        }
      >
        <Btn href="/contact" arrow>
          Talk to us
        </Btn>
        <Btn href="/work" variant="ghost">
          See our work
        </Btn>
      </PageHero>

      {/* 2. Service Anchor Nav (sticky under header on desktop, scrollable on mobile) */}
      <ServiceNav />

      {/* 3. Service Detail Blocks */}
      <section className="section bg-white svc-details-container-section">
        <div className="container">
          <ServiceDetails serviceImages={serviceImages} />
        </div>
      </section>

      {/* 4. Tech We Work With (dark background) */}
      <TechStackSection
        videoMp4={techVideo.mp4}
        videoWebm={techVideo.webm}
        videoPoster={techVideo.poster}
      />

      {/* 5. Industries We Serve (3x3 icon grid) */}
      <IndustriesSection title="Built for demanding industries." />

      {/* 6. BigMarquee (Detect · Track · Digitize · Reconstruct · Automate · Deploy) */}
      <BigMarquee />

      {/* 7. How We Work Teaser */}
      <section className="section bg-paper">
        <div className="container">
          <SecHead
            row
            label="How we work"
            title="One process, from first call to production."
            lede="Every engagement follows the same four steps, so you always know what comes next."
            right={<TextLink href="/how-we-work">Read how we work →</TextLink>}
          />
          <Steps />
        </div>
      </section>

      {/* 8. CTA */}
      <CTA title="Have a problem worth solving with AI?" />
    </>
  );
}
