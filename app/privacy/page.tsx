import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { TLink } from "@/components/Transition";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How MiniByte handles information when you visit minibyte.ai or contact our team.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        single
        eyebrow="Legal"
        title="Privacy notice."
        lede="How we handle your information when you visit minibyte.ai or contact our engineering team."
      />

      <section className="section bg-white" style={{ paddingTop: 56 }}>
        <div className="container">
          <div className="prose">
            {/* TODO(client): this is a draft template, not legal advice. Have counsel review it and fill in the bracketed items before launch. */}
            <div
              style={{
                background: "var(--paper)",
                border: "1px solid var(--line)",
                borderRadius: 12,
                padding: "16px 20px",
                marginBottom: 40,
                fontSize: "13.5px",
                lineHeight: "1.5",
                color: "var(--graphite)",
              }}
            >
              <strong>Notice for team:</strong> This is a draft template reflecting actual site
              behavior. Have legal counsel review and fill in bracketed items before public launch.
            </div>

            <Reveal as="div">
              <h2>1. Who we are</h2>
              <p>
                MiniByte is an AI research and development firm building intelligent systems across
                software, robotics and embedded hardware.
                {SITE.legalName ? ` Operating as ${SITE.legalName}.` : " (registered entity and address: TODO)."}
              </p>
              <p>
                If you have questions about this privacy notice or how your information is handled,
                you can contact us through our <TLink href="/contact">contact page</TLink>
                {SITE.email ? ` or by email at ${SITE.email}` : ""}.
              </p>
            </Reveal>

            <Reveal as="div" delay={60}>
              <h2>2. What we collect</h2>
              <p>We believe in minimal data collection. We only collect:</p>
              <ul>
                <li>
                  <strong>Information you provide directly:</strong> When you submit our contact form,
                  we collect your name, email address, company name (if provided), topics of interest,
                  and the content of your message.
                </li>
                <li>
                  <strong>Technical connection logs:</strong> Standard server logs maintained by our
                  hosting infrastructure [hosting provider: TODO] required for security, network routing
                  and DDoS prevention (such as IP address, browser type and request timestamp).
                </li>
              </ul>
            </Reveal>

            <Reveal as="div" delay={120}>
              <h2>3. What we do not do</h2>
              <p>
                We do not sell, rent or monetize your data. We do not use advertising networks,
                tracking pixels, cross-site analytics or third-party profiling cookies.
              </p>
              <p>
                The site stores a single local flag in your browser&apos;s session storage solely to
                prevent replaying the introductory animation during a single visit. This flag is
                cleared automatically when you close your browser tab and is never transmitted to our
                servers or any third party.
              </p>
            </Reveal>

            <Reveal as="div" delay={180}>
              <h2>4. How we use your information</h2>
              <p>
                Information submitted through our contact form is used strictly to evaluate your
                inquiry, respond to you, and manage our business relationship or technical
                collaboration.
              </p>
            </Reveal>

            <Reveal as="div" delay={240}>
              <h2>5. Who receives your information</h2>
              <p>
                Messages submitted through the contact form are delivered securely to our team via our
                designated messaging or email infrastructure provider [provider name: TODO]. We do
                not disclose your information to any third parties except as necessary to deliver your
                message or where required by law.
              </p>
            </Reveal>

            <Reveal as="div" delay={300}>
              <h2>6. How long we keep it</h2>
              <p>
                We retain contact inquiries only for as long as necessary to address your request and
                maintain business records [retention period: TODO]. Technical server access logs are
                regularly rotated and purged by our hosting provider.
              </p>
            </Reveal>

            <Reveal as="div" delay={360}>
              <h2>7. Your rights</h2>
              <p>
                Depending on your location, including under UK GDPR and EU GDPR (MiniByte maintains
                operating offices in the United Kingdom, Germany and Sweden), you have statutory
                rights regarding your personal data. These include the right to access, rectify,
                erase, restrict processing of, object to processing of, and receive a portable copy of
                your personal information.
              </p>
              <p>
                You also have the right to lodge a complaint with your local data protection
                supervisory authority. To exercise any of your data rights, please reach out via our{" "}
                <TLink href="/contact">contact page</TLink>
                {SITE.email ? ` or write directly to ${SITE.email}` : " [TODO if empty]"}.
              </p>
            </Reveal>

            <Reveal as="div" delay={420}>
              <h2>8. Changes to this notice</h2>
              <p>
                We may periodically update this notice to reflect changes in our engineering practice
                or legal requirements.
              </p>
              <p className="mono" style={{ fontSize: "14px", color: "var(--graphite)" }}>
                Last updated: [date: TODO]
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
