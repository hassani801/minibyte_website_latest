# MiniByte Website

A production Next.js 15 App Router website for **MiniByte**, an AI research and development firm specializing in AI SaaS platforms, advanced robotics, and embedded intelligence systems.

Built with pure Next.js and React: zero unnecessary dependencies, native fonts via `next/font/google`, OpenGraph generation via `next/og`, full responsive layout down to 375px mobile, and full respect for `prefers-reduced-motion`.

---

## Getting Started

### Run Development Server
```bash
npm install
npm run dev
# Open http://localhost:3000
```

### Production Build & Run
```bash
npm run build
npm run start
```

### QA & Content Validation
Requires Node ≥ 22.6 (`--experimental-strip-types`):
```bash
# Run content and integrity QA check
npm run check

# Scan and update TODO.md with pending confirmations
npm run todos
```

---

## Environment Variables

Configure these in `.env.local` for local development or in your production deployment settings (Vercel, Netlify, Railway, etc.):

| Variable | Description | Default / Fallback |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Canonical base URL for SEO, sitemaps, robots, and OpenGraph | `http://localhost:3000` |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Public contact email address for mailto links | Hidden when empty |
| `NEXT_PUBLIC_LINKEDIN_URL` | Official MiniByte LinkedIn company page URL | Hidden when empty |
| `NEXT_PUBLIC_LEGAL_NAME` | Registered corporate legal entity name | Hidden when empty |
| `CONTACT_WEBHOOK_URL` | Webhook endpoint (Slack, Zapier, Make, Formspree) for incoming inquiries | Optional |
| `RESEND_API_KEY` | API key from [Resend](https://resend.com) for direct transactional email delivery | Optional |
| `CONTACT_TO_EMAIL` | Target email address where inquiries should be delivered | Required if Resend is used |
| `CONTACT_FROM_EMAIL` | Verified sender address in Resend (e.g. `team@yourdomain.com`) | Required if Resend is used |

*Note: If neither webhook nor Resend credentials are set, the contact form gracefully informs the user and provides a direct fallback when `NEXT_PUBLIC_CONTACT_EMAIL` is configured.*

---

## Pages List

- `/` — Homepage: hero, proof stats, core services teaser, selected work, labs teaser, partner marquee, and global footprint map
- `/services` — Detailed breakdown of engineering capabilities: Computer Vision, AI SaaS, Multi-Agent Automation, Robotics & Edge AI, and Full-Stack Engineering
- `/work` — Interactive work explorer filtered across 7 practice domains
- `/work/[slug]` — Deep-dive case studies with problem descriptions, architectures, tech stacks, and outcomes
- `/how-we-work` — Engineering delivery lifecycle, engagement models (Dedicated R&D, Fixed-scope, Architecture advisory), and technical FAQs
- `/labs` — Applied in-house research, studio companies, and flagship ventures (including autonomous agricultural robotics, AI voice infrastructure, and automated commerce)
- `/company` — Company story, leadership profiles, core values, global partner network, and interactive 7-country office map
- `/articles` — Engineering notes from production client engagements and research experiments
- `/articles/[slug]` — Individual engineering note with related projects and reading progress indicator
- `/careers` — Practice areas, shipping engineering work, team culture, and speculative application portal
- `/contact` — High-conversion inquiry form with client-selected domains and direct webhook/email delivery
- `/privacy` — Clear, plain-language privacy notice compliant with EU/UK GDPR standards

---

## Asset Checklist

Ensure the following image assets are in place before deployment:

### 1. Leadership Photography
- `/public/team/danish-ashraf.jpg`
- `/public/team/owais-kaifi.jpg`
- `/public/team/sarmad-sultan.jpg`

### 2. Partner Logos
Logos located in `/public/partners/<slug>.png`:
- `voxr.png`
- `ringly-io.png`
- `innovista.png`
- `riddermark.png`
- `aiobc.png`
- `chatley-ai.png`
- `quantum-edge.png`
- `qubed.png`
- `spec-legacy.png`
- `aether.png`
- `automateq.png`
- `hoki.png`
- `automizer-ai.png`
- `stackfuse.png`
- `la-fragancia.png`

### 3. Case Study Screenshots
Screenshots in `/public/work/<case-slug>/1.jpg` … `3.jpg`:
> [!IMPORTANT]
> **Privacy & Anonymization Warning**: Before uploading or publishing screenshots of client applications or internal tooling, all emails, phone numbers, customer names, addresses, invoice figures, and proprietary client identifiers **must be blurred or redacted**.

---

## Managing Case Studies

All case studies are defined in `lib/data.ts`.

### Unhiding a Case Study
To publish a hidden case study:
1. Open `lib/data.ts`.
2. Locate the project entry in the `CASES` array.
3. Remove `hidden: true` (or set `hidden: false`).
4. Run `npm run check` to verify slug references and integrity.
5. The case will automatically appear in `/work`, sitemap, category filters, and search indexes.

---

## Content Confirmation Before Launch

Before launching to production, review [`TODO.md`](./TODO.md).
It contains all pending client confirmations, legal inputs, metric verifications, and placeholder assets grouped by tag:
- **`client`**: Legal entity names, production contact email, LinkedIn URL.
- **`confirm`**: Deck descriptions to be approved by leadership.
- **`verify`**: Technical metrics and claims verified against contract deliverables.
- **`add`**: High-resolution photography and approved client screenshots.
- **`team`**: Engineering coordination tasks.

Run `npm run todos` whenever you make updates to refresh `TODO.md`.

---

## Cookies, Analytics & Privacy Notice

- **No Cookies**: The site sets zero tracking or marketing cookies.
- **No Third-Party Analytics**: No Google Analytics, Meta Pixel, or tracker scripts are loaded.
- **Local State**: The site stores a single session flag (`mb-intro`) in browser `sessionStorage` solely to prevent repeating the intro animation within the same visit. This value is never transmitted to any server.
- **Notice**: If telemetry, analytics, or third-party monitoring is introduced in the future, the `/privacy` page must be updated before deployment.
# minibyte_website_latest
