import { Reveal, Split } from "./Reveal";
import { TLink } from "./Transition";

export function PageHero({ eyebrow, title, lede, children, art, crumb, dot = false, single = false }: {
  eyebrow: string; title: string; lede?: string; children?: React.ReactNode; art?: React.ReactNode; crumb?: { href: string; label: string }; dot?: boolean; single?: boolean;
}) {
  return (
    <section className={`hero ${single || !art ? "single" : ""}`}>
      <div className="container">
        {crumb && <div className="hero-crumb"><TLink href={crumb.href}>← {crumb.label}</TLink></div>}
        <div className="hero-grid">
          <div>
            <Reveal as="div" className={`label eyebrow ${dot ? "dot" : ""}`}>{eyebrow}</Reveal>
            <Split as="h1" className="display" text={title} delay={80} />
            {lede && <Reveal as="p" className="lede" delay={260}>{lede}</Reveal>}
            {children && <Reveal className="hero-actions" delay={360}>{children}</Reveal>}
          </div>
          {art && <Reveal variant="scale" delay={200}>{art}</Reveal>}
        </div>
      </div>
    </section>
  );
}

export function SecHead({ label, title, lede, right, row = false }: { label: string; title: string; lede?: string; right?: React.ReactNode; row?: boolean }) {
  return (
    <div className={`sec-head ${row ? "row" : ""}`}>
      <Reveal as="div" className="label eyebrow">{label}</Reveal>
      <Split as="h2" className="h2" text={title} />
      {lede && <Reveal as="p" className="lede" delay={150}>{lede}</Reveal>}
      {right && <Reveal className="right" delay={150}>{right}</Reveal>}
    </div>
  );
}
