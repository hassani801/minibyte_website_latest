"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Btn } from "./Btn";
import { Mark } from "./Logo";
import { TLink } from "./Transition";
import { CONTACT_TOPICS, SITE } from "@/lib/site";
import { ROLE_AREAS } from "@/lib/data";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function ContactFormInner() {
  const searchParams = useSearchParams();
  const mountTimeRef = useRef<number>(Date.now());

  // Form inputs state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [topics, setTopics] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [areaSlug, setAreaSlug] = useState<string>("");

  // Submission & status state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Initialize from search parameters on mount / param changes
  useEffect(() => {
    mountTimeRef.current = Date.now();
    const topicParam = searchParams?.get("topic");
    const areaParam = searchParams?.get("area");

    const validKeys = new Set(CONTACT_TOPICS.map((t) => t.key));
    const nextTopics = new Set<string>();

    if (topicParam) {
      const parts = topicParam.split(",").map((p) => p.trim());
      for (const p of parts) {
        if (validKeys.has(p)) {
          nextTopics.add(p);
        }
      }
    }

    if (areaParam) {
      const matchedArea = ROLE_AREAS.find((r) => r.slug === areaParam);
      if (matchedArea) {
        setAreaSlug(matchedArea.slug);
        nextTopics.add("careers");
        setMessage((prev) => {
          if (!prev.trim()) {
            return `I'm interested in: ${matchedArea.title}.\n\n`;
          }
          return prev;
        });
      }
    }

    if (nextTopics.size > 0) {
      setTopics(Array.from(nextTopics));
    }

    // On route change with ?topic=..., smoothly scroll the form into view
    if (topicParam || areaParam) {
      const formEl = document.querySelector(".form");
      if (formEl) {
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        formEl.scrollIntoView({
          behavior: prefersReduced ? "auto" : "smooth",
          block: "start",
        });
      }
    }
  }, [searchParams]);

  const toggleTopic = (key: string) => {
    setTopics((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const validate = (): boolean => {
    const errors: Record<string, string> = {};

    if (!name.trim()) {
      errors.name = "Please enter your name.";
    } else if (name.trim().length > 120) {
      errors.name = "Name must be 120 characters or fewer.";
    }

    if (!email.trim()) {
      errors.email = "Please enter your email.";
    } else if (email.length > 254 || !EMAIL_REGEX.test(email.trim())) {
      errors.email = "Please enter a valid email address.";
    }

    if (company && company.length > 160) {
      errors.company = "Company must be 160 characters or fewer.";
    }

    if (!message.trim()) {
      errors.message = "Please enter a message.";
    } else if (message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters.";
    } else if (message.trim().length > 5000) {
      errors.message = "Message must be 5,000 characters or fewer.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    const durationMs = Date.now() - mountTimeRef.current;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          company: company.trim() || undefined,
          topics,
          message: message.trim(),
          area: areaSlug || undefined,
          website, // honeypot
          t: durationMs,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.ok) {
        setIsSuccess(true);
      } else if (res.status === 429) {
        setErrorMessage("Too many attempts. Please try again in a few minutes.");
      } else if (res.status === 400 && data.field) {
        setFieldErrors({ [data.field]: data.error || "Please check this field." });
        setErrorMessage(data.error || "Please check the form for errors.");
      } else {
        // 503 / 502 / server error: keep all typed text
        setErrorMessage("not_delivered");
      }
    } catch {
      // Network or unexpected error: keep all typed text
      setErrorMessage("not_delivered");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="sent" role="status">
        <Mark height={36} tone="white" />
        <h2 className="h2">Thank you. We&apos;ll be in touch.</h2>
        <p className="lede" style={{ color: "rgba(255,255,255,.7)" }}>
          Your message has been received.
        </p>
        <Btn href="/" variant="light" arrow magnetic={false}>
          Back to the homepage
        </Btn>
      </div>
    );
  }

  // Build mailto fallback link for 502/503/network error
  const mailtoSubject = topics.length > 0
    ? `[MiniByte Contact] ${topics.map((k) => CONTACT_TOPICS.find((t) => t.key === k)?.label || k).join(", ")}`
    : `Enquiry from ${name || "website"}`;

  const mailtoBody = `${message}\n\nName: ${name}\nEmail: ${email}${company ? `\nCompany: ${company}` : ""}`;
  const mailtoUrl = `mailto:${SITE.email}?subject=${encodeURIComponent(mailtoSubject)}&body=${encodeURIComponent(mailtoBody)}`;

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      {/* Error summary alert */}
      {errorMessage && (
        <div className="form-error-summary" role="alert">
          {errorMessage === "not_delivered" ? (
            <div>
              <p>We couldn&apos;t send your message right now.</p>
              {SITE.email ? (
                <p style={{ marginTop: 6 }}>
                  <a href={mailtoUrl} className="form-mailto-link">
                    Email us instead ({SITE.email}) →
                  </a>
                </p>
              ) : (
                <p style={{ marginTop: 6, opacity: 0.8 }}>Please try again later.</p>
              )}
            </div>
          ) : (
            <p>{errorMessage}</p>
          )}
        </div>
      )}

      {/* Honeypot field (hidden from real users) */}
      <div style={{ display: "none" }} aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input
          id="website"
          type="text"
          name="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Name and Email */}
      <div className="two">
        <div className={`field ${fieldErrors.name ? "has-error" : ""}`}>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder=" "
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (fieldErrors.name) {
                setFieldErrors((prev) => ({ ...prev, name: "" }));
              }
            }}
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={fieldErrors.name ? "name-error" : undefined}
          />
          <label htmlFor="name">Your name</label>
          <span className="bar" />
          {fieldErrors.name && (
            <span id="name-error" className="field-error-msg mono">
              {fieldErrors.name}
            </span>
          )}
        </div>

        <div className={`field ${fieldErrors.email ? "has-error" : ""}`}>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder=" "
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (fieldErrors.email) {
                setFieldErrors((prev) => ({ ...prev, email: "" }));
              }
            }}
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
          />
          <label htmlFor="email">Email</label>
          <span className="bar" />
          {fieldErrors.email && (
            <span id="email-error" className="field-error-msg mono">
              {fieldErrors.email}
            </span>
          )}
        </div>
      </div>

      {/* Company */}
      <div className={`field ${fieldErrors.company ? "has-error" : ""}`}>
        <input
          id="company"
          name="company"
          type="text"
          autoComplete="organization"
          placeholder=" "
          value={company}
          onChange={(e) => {
            setCompany(e.target.value);
            if (fieldErrors.company) {
              setFieldErrors((prev) => ({ ...prev, company: "" }));
            }
          }}
          aria-invalid={Boolean(fieldErrors.company)}
          aria-describedby={fieldErrors.company ? "company-error" : undefined}
        />
        <label htmlFor="company">Company</label>
        <span className="bar" />
        {fieldErrors.company && (
          <span id="company-error" className="field-error-msg mono">
            {fieldErrors.company}
          </span>
        )}
      </div>

      {/* Topic chips */}
      <div>
        <p className="label muted" style={{ marginBottom: 12 }}>
          What is it about?
        </p>
        <div className="chips">
          {CONTACT_TOPICS.map((t) => {
            const isSelected = topics.includes(t.key);
            return (
              <button
                type="button"
                key={t.key}
                aria-pressed={isSelected}
                onClick={() => toggleTopic(t.key)}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Message textarea & helper line */}
      <div className={`field ${fieldErrors.message ? "has-error" : ""}`}>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder=" "
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            if (fieldErrors.message) {
              setFieldErrors((prev) => ({ ...prev, message: "" }));
            }
          }}
          aria-invalid={Boolean(fieldErrors.message)}
          aria-describedby={fieldErrors.message ? "message-error" : "message-help"}
        />
        <label htmlFor="message">What are you trying to solve?</label>
        <span className="bar" />
        {fieldErrors.message && (
          <span id="message-error" className="field-error-msg mono">
            {fieldErrors.message}
          </span>
        )}
        <p id="message-help" className="contact-helper-text">
          Helpful to include: the problem, the data, sensors or devices involved, and any constraints.
        </p>
      </div>

      {/* Consent line & submit button */}
      <div>
        <p className="contact-consent-text">
          By sending this you agree that we may contact you about your enquiry. Read our{" "}
          <TLink href="/privacy" className="form-privacy-link">
            Privacy notice
          </TLink>
          .
        </p>
        <div style={{ marginTop: 16 }}>
          <Btn type="submit" arrow disabled={isSubmitting}>
            {isSubmitting ? "Sending…" : "Send message"}
          </Btn>
        </div>
      </div>
    </form>
  );
}

export function ContactForm() {
  return (
    <Suspense
      fallback={
        <div className="form" style={{ minHeight: 400, opacity: 0.5 }}>
          <p className="mono">Loading contact form…</p>
        </div>
      }
    >
      <ContactFormInner />
    </Suspense>
  );
}
