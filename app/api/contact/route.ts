import { CONTACT_TOPICS } from "@/lib/site";

export const runtime = "nodejs";

// In-memory rate limiting: 5 requests per IP per 10 minutes
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const ipRequestCounts = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipRequestCounts.get(ip);

  // Periodic cleanup of stale entries
  if (ipRequestCounts.size > 10000) {
    for (const [key, value] of ipRequestCounts.entries()) {
      if (now > value.resetAt) ipRequestCounts.delete(key);
    }
  }

  if (!entry || now > entry.resetAt) {
    ipRequestCounts.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  entry.count += 1;
  return false;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_TOPIC_KEYS = new Set(CONTACT_TOPICS.map((t) => t.key));

export async function POST(req: Request) {
  try {
    // 1. Cap request body at ~20 KB
    const rawText = await req.text();
    if (rawText.length > 20480) {
      return Response.json(
        { ok: false, error: "payload_too_large" },
        { status: 400 }
      );
    }

    let body: Record<string, unknown>;
    try {
      body = JSON.parse(rawText);
    } catch {
      return Response.json(
        { ok: false, error: "invalid_json" },
        { status: 400 }
      );
    }

    const {
      name,
      email,
      company,
      topics,
      message,
      area,
      website,
      t,
    } = body;

    // 2. Anti-spam: Silent drop if honeypot filled or completed too fast (< 3000 ms)
    if (typeof website === "string" && website.trim() !== "") {
      return Response.json({ ok: true });
    }
    if (typeof t !== "number" || t < 3000) {
      return Response.json({ ok: true });
    }

    // 3. Rate limiting (5 requests per IP per 10 mins)
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(clientIp)) {
      return Response.json(
        { ok: false, error: "rate_limited" },
        { status: 429 }
      );
    }

    // 4. Manual validation
    if (typeof name !== "string" || name.trim().length < 1 || name.trim().length > 120) {
      return Response.json(
        { ok: false, field: "name", error: "Please enter your name (1–120 characters)." },
        { status: 400 }
      );
    }

    if (
      typeof email !== "string" ||
      email.length > 254 ||
      !EMAIL_REGEX.test(email.trim())
    ) {
      return Response.json(
        { ok: false, field: "email", error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (
      company !== undefined &&
      company !== null &&
      company !== "" &&
      (typeof company !== "string" || company.length > 160)
    ) {
      return Response.json(
        { ok: false, field: "company", error: "Company name must be 160 characters or fewer." },
        { status: 400 }
      );
    }

    if (
      typeof message !== "string" ||
      message.trim().length < 10 ||
      message.trim().length > 5000
    ) {
      return Response.json(
        { ok: false, field: "message", error: "Message must be between 10 and 5,000 characters." },
        { status: 400 }
      );
    }

    if (
      !Array.isArray(topics) ||
      topics.length > 6 ||
      !topics.every((top) => typeof top === "string" && VALID_TOPIC_KEYS.has(top))
    ) {
      return Response.json(
        { ok: false, field: "topics", error: "Invalid topics selected." },
        { status: 400 }
      );
    }

    if (
      area !== undefined &&
      area !== null &&
      area !== "" &&
      (typeof area !== "string" || area.length > 80)
    ) {
      return Response.json(
        { ok: false, field: "area", error: "Area must be 80 characters or fewer." },
        { status: 400 }
      );
    }

    const cleanData = {
      name: name.trim(),
      email: email.trim(),
      company: typeof company === "string" ? company.trim() : "",
      topics,
      message: message.trim(),
      area: typeof area === "string" ? area.trim() : "",
    };

    // 5. Delivery in specified priority order:
    // Option 1: Webhook URL (Slack, Zapier, Make, Formspree)
    const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
    if (webhookUrl && webhookUrl.trim() !== "") {
      try {
        const webhookRes = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...cleanData,
            source: "minibyte.ai contact form",
            timestamp: new Date().toISOString(),
          }),
        });

        if (!webhookRes.ok) {
          console.error(`[Contact API] Webhook delivery failed with status ${webhookRes.status}`);
          return Response.json({ ok: false, error: "delivery_failed" }, { status: 502 });
        }
        return Response.json({ ok: true });
      } catch {
        console.error("[Contact API] Webhook request network error");
        return Response.json({ ok: false, error: "delivery_failed" }, { status: 502 });
      }
    }

    // Option 2: Resend API
    const resendApiKey = process.env.RESEND_API_KEY;
    const contactToEmail = process.env.CONTACT_TO_EMAIL;
    const contactFromEmail = process.env.CONTACT_FROM_EMAIL;

    if (
      resendApiKey &&
      resendApiKey.trim() !== "" &&
      contactToEmail &&
      contactToEmail.trim() !== "" &&
      contactFromEmail &&
      contactFromEmail.trim() !== ""
    ) {
      try {
        // Build subject from topic labels only (avoid header injection)
        const topicLabels = cleanData.topics.map(
          (key) => CONTACT_TOPICS.find((t) => t.key === key)?.label || key
        );
        const subject =
          topicLabels.length > 0
            ? `[MiniByte Contact] ${topicLabels.join(", ")}`
            : "[MiniByte Contact] New enquiry";

        // Plain text body only (no HTML interpolation)
        const textLines = [
          `Name: ${cleanData.name}`,
          `Email: ${cleanData.email}`,
          cleanData.company ? `Company: ${cleanData.company}` : null,
          cleanData.area ? `Area: ${cleanData.area}` : null,
          topicLabels.length > 0 ? `Topics: ${topicLabels.join(", ")}` : null,
          "",
          "Message:",
          cleanData.message,
        ]
          .filter((line) => line !== null)
          .join("\n");

        const resendRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: contactFromEmail,
            to: [contactToEmail],
            reply_to: cleanData.email,
            subject,
            text: textLines,
          }),
        });

        if (!resendRes.ok) {
          console.error(`[Contact API] Resend delivery failed with status ${resendRes.status}`);
          return Response.json({ ok: false, error: "delivery_failed" }, { status: 502 });
        }
        return Response.json({ ok: true });
      } catch {
        console.error("[Contact API] Resend request network error");
        return Response.json({ ok: false, error: "delivery_failed" }, { status: 502 });
      }
    }

    // Option 3: Not configured
    return Response.json(
      { ok: false, error: "not_configured" },
      { status: 503 }
    );
  } catch {
    console.error("[Contact API] Unhandled server error");
    return Response.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}

