"use client";
import { Btn, Arrow } from "./Btn";
import { Reveal, Split } from "./Reveal";
import { BytePattern } from "./BytePattern";
import { TLink } from "./Transition";
import { SITE, CONTACT_TOPICS } from "@/lib/site";

export function CTA({
  title = "Have a problem worth solving with AI?",
  href = "/contact",
  buttonText = "Talk to us",
}: {
  title?: string;
  href?: string;
  buttonText?: string;
  newsletter?: boolean;
}) {
  const topTopics = CONTACT_TOPICS.slice(0, 5);

  return (
    <section className="cta bg-blue">
      <div className="cta-dots" aria-hidden>
        <BytePattern
          size={360}
          words={["minibyte", "research", "enterprise"]}
          interval={3200}
        />
      </div>
      <div className="container">
        <div className="grid">
          <div>
            <Split as="h2" className="h2" text={title} />
            <Reveal as="p" className="lead" delay={150}>
              Tell us what you are trying to solve. We will come back with an honest view of what AI can do for it, and what it cannot.
            </Reveal>
            <Reveal className="acts" delay={250}>
              <Btn href={href} variant="light" arrow>
                {buttonText}
              </Btn>
              {SITE.email ? (
                <Btn href={`mailto:${SITE.email}`} variant="line">
                  {SITE.email}
                </Btn>
              ) : null}
            </Reveal>
          </div>

          <Reveal className="cta-topics-col" delay={300}>
            <span className="cta-topics-heading mono">Start with a topic</span>
            <div className="cta-topics-chips">
              {topTopics.map((topic) => (
                <TLink
                  key={topic.key}
                  href={`/contact?topic=${topic.key}`}
                  className="cta-topic-chip mono"
                >
                  <span>{topic.label}</span>
                  <Arrow size={12} />
                </TLink>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
