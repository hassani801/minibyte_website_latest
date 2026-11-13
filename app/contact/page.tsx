import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { TLink } from "@/components/Transition";
import { Arrow } from "@/components/Btn";
import { SITE } from "@/lib/site";
import { OFFICES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to MiniByte about computer vision, edge AI, robotics, voice AI and AI platforms.",
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  return (
    <>
      <PageHero
        single
        eyebrow="Talk to us"
        title="Have a problem worth solving with AI?"
        lede="Tell us what you are trying to solve. We will come back with an honest view of what AI can do for it, and what it cannot."
      />

      <section className="section bg-white" style={{ paddingTop: 56 }}>
        <div className="container">
          <div className="contact-grid">
            <Reveal>
              <ContactForm />
            </Reveal>

            <aside className="contact-aside">
              {/* 1. Write to us (only if SITE.email is set) */}
              {SITE.email ? (
                <Reveal className="info-card" delay={120}>
                  <h3>Write to us</h3>
                  <a className="big" href={`mailto:${SITE.email}`}>
                    {SITE.email}
                  </a>
                </Reveal>
              ) : null}

              {/* 2. Where we are: 7 OFFICES compact 2-column list */}
              <Reveal className="info-card" delay={180}>
                <h3>Where we are</h3>
                <p className="muted" style={{ marginBottom: 16 }}>
                  Offices in {OFFICES.length} countries. Researchers and engineers across Europe, North America, the Middle East and Asia.
                </p>
                <div className="offices-2col mono">
                  {OFFICES.map((o) => (
                    <span key={o.name} className="office-name-pill">
                      {o.name}
                    </span>
                  ))}
                </div>
                <div style={{ marginTop: 20 }}>
                  <TLink href="/company#map" className="mono link-arr">
                    See the map <Arrow size={14} />
                  </TLink>
                </div>
              </Reveal>

              {/* 3. Looking for something else? */}
              <Reveal className="info-card" delay={240}>
                <h3>Looking for something else?</h3>
                <div className="contact-quick-links">
                  <TLink href="/careers" className="quick-link-row">
                    <span>Careers</span>
                    <Arrow size={14} />
                  </TLink>
                  <TLink href="/labs" className="quick-link-row">
                    <span>R&D partnerships</span>
                    <Arrow size={14} />
                  </TLink>
                  <TLink href="/contact?topic=funding" className="quick-link-row">
                    <span>Investment and funding</span>
                    <Arrow size={14} />
                  </TLink>
                </div>
              </Reveal>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
