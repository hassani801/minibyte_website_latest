"use client";
import { useState } from "react";
import type { CaseItem } from "@/lib/data";
import { TLink } from "./Transition";
import { Arrow } from "./Btn";

export function ArticleAside({ caseItem }: { caseItem?: CaseItem }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        throw new Error("Clipboard API unavailable");
      }
    } catch {
      // Safe fallback for older browsers or restricted contexts
      const textArea = document.createElement("textarea");
      textArea.value = window.location.href;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // Fallback failed quietly
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <aside className="article-aside">
      {caseItem && (
        <div className="article-case-card">
          <span className="case-card-eyebrow label">From the case study</span>
          <h4 className="case-card-title">{caseItem.title}</h4>
          <p className="case-card-tag mono">{caseItem.tag}</p>
          {caseItem.stack && caseItem.stack.length > 0 && (
            <div className="case-card-stack">
              {caseItem.stack.map((item) => (
                <span key={item} className="stack-pill mono">
                  {item}
                </span>
              ))}
            </div>
          )}
          <TLink
            href={`/work/${caseItem.slug}`}
            className="case-card-btn"
            aria-label={`Read the case study: ${caseItem.title}`}
          >
            Read the case study <Arrow size={14} />
          </TLink>
        </div>
      )}

      <button
        type="button"
        onClick={handleCopy}
        className="article-copy-btn mono"
        aria-label="Copy link to this article"
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
        <span>{copied ? "Copied!" : "Copy link"}</span>
      </button>
    </aside>
  );
}

