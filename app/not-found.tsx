import { PageHero } from "@/components/PageHero";
import { Btn, Arrow } from "@/components/Btn";
import { TLink } from "@/components/Transition";

export default function NotFound() {
  const helpfulLinks = [
    { href: "/work", label: "Work · Case studies & deployments" },
    { href: "/services", label: "Services · What we build" },
    { href: "/labs", label: "Labs · In-house products & R&D" },
    { href: "/contact", label: "Contact · Talk to our team" },
  ];

  return (
    <div style={{ paddingBottom: 96 }}>
      <PageHero
        single
        eyebrow="404 · 00110100 00110000 00110100"
        title="This page is not here."
        lede="The byte you asked for does not exist."
      >
        <div style={{ marginTop: 28, maxWidth: 560 }}>
          <p
            className="label"
            style={{ marginBottom: 12, color: "var(--graphite)" }}
          >
            Helpful starting points
          </p>
          <div className="contact-quick-links" style={{ marginBottom: 28 }}>
            {helpfulLinks.map((link) => (
              <TLink
                key={link.href}
                href={link.href}
                className="quick-link-row"
              >
                <span>{link.label}</span>
                <Arrow />
              </TLink>
            ))}
          </div>
          <Btn href="/" arrow>
            Back home
          </Btn>
        </div>
      </PageHero>
    </div>
  );
}
