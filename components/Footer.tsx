import { Logo } from "./Logo";
import { TLink } from "./Transition";
import { Marquee } from "./Marquee";
import { SERVICES, CATEGORIES, OFFICES } from "@/lib/data";
import { SITE } from "@/lib/site";

const bin = "01101101 01101001 01101110 01101001 01100010 01111001 01110100 01100101";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const topCategories = CATEGORIES.slice(0, 5);

  return (
    <footer>
      <div className="binband" aria-hidden>
        <Marquee duration={50} gap={40} reverse>
          {bin.split(" ").map((b, i) => (
            <span key={i} className={i === 0 ? "hl" : ""}>
              {b}
            </span>
          ))}
        </Marquee>
      </div>

      <div className="footer">
        <div className="container">
          <div className="cols">
            {/* About Column */}
            <div className="about">
              <Logo tone="white" />
              <p>An AI R&D firm building intelligent systems, from software to hardware.</p>
              <div className="mono" style={{ fontSize: "12.5px", lineHeight: "1.6", color: "rgba(255, 255, 255, 0.85)" }}>
                {OFFICES.map((o) => o.name).join(" · ")}
              </div>
            </div>

            {/* Services Column */}
            <div>
              <p className="footer-col-title">Services</p>
              <ul>
                {SERVICES.map((s) => (
                  <li key={s.slug}>
                    <TLink href={`/services#${s.slug}`}>{s.title}</TLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Work Column */}
            <div>
              <p className="footer-col-title">Work</p>
              <ul>
                {topCategories.map((c) => (
                  <li key={c.key}>
                    <TLink href={`/work?c=${c.key}`}>{c.label}</TLink>
                  </li>
                ))}
                <li>
                  <TLink href="/work">All case studies</TLink>
                </li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <p className="footer-col-title">Company</p>
              <ul>
                <li>
                  <TLink href="/company">About</TLink>
                </li>
                <li>
                  <TLink href="/company#people">Leadership</TLink>
                </li>
                <li>
                  <TLink href="/labs">Labs</TLink>
                </li>
                <li>
                  <TLink href="/careers">Careers</TLink>
                </li>
                <li>
                  <TLink href="/articles">Engineering notes</TLink>
                </li>
                <li>
                  <TLink href="/how-we-work">How we work</TLink>
                </li>
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <p className="footer-col-title">Contact</p>
              <ul>
                <li>
                  <TLink href="/contact">Talk to us</TLink>
                </li>
                {SITE.email ? (
                  <li>
                    <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                  </li>
                ) : null}
                {SITE.linkedin ? (
                  <li>
                    <a
                      href={SITE.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn
                    </a>
                  </li>
                ) : null}
              </ul>
            </div>
          </div>

          {/* Legal Row */}
          {/* TODO(client): add Imprint/Terms pages only if the company's legal advisers require them (a German or UK-registered entity may). */}
          <div className="legal">
            <span>
              © {currentYear} MiniByte{SITE.legalName ? ` · ${SITE.legalName}` : ""}
            </span>
            <span>
              <TLink href="/privacy">Privacy</TLink>
            </span>
            <span className="by">01101101</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
