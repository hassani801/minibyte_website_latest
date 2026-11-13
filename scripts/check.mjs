#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath, pathToFileURL } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const isTodos = process.argv.includes("--todos");

function collectFiles(
  dir,
  exts = [".ts", ".tsx", ".js", ".jsx", ".mjs", ".md", ".css"]
) {
  const result = [];
  if (!fs.existsSync(dir)) return result;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (
        entry.name !== "node_modules" &&
        entry.name !== ".next" &&
        entry.name !== ".git" &&
        entry.name !== "dist" &&
        entry.name !== "out"
      ) {
        result.push(...collectFiles(full, exts));
      }
    } else if (entry.isFile()) {
      if (exts.some((ext) => entry.name.endsWith(ext))) {
        result.push(full);
      }
    }
  }
  return result;
}

function normalizeTag(raw) {
  const t = raw.toLowerCase().trim();
  if (t.includes("client")) return "client";
  if (t.includes("confirm")) return "confirm";
  if (t.includes("verify")) return "verify";
  if (t.includes("add")) return "add";
  if (t.includes("team")) return "team";
  return t || "other";
}

async function runTodos() {
  console.log("Scanning repository for TODO comments...\n");

  const scanDirs = ["app", "components", "lib", "scripts"].map((d) =>
    path.join(rootDir, d)
  );
  const files = scanDirs.flatMap((d) => collectFiles(d));
  const readmePath = path.join(rootDir, "README.md");
  if (fs.existsSync(readmePath)) files.push(readmePath);

  const todoPattern = /TODO\(([^)]+)\):?\s*(.*)/i;
  const todos = [];

  for (const filePath of files) {
    // Skip scripts/check.mjs from self-referential TODO matches
    if (filePath.endsWith("scripts\\check.mjs") || filePath.endsWith("scripts/check.mjs")) {
      continue;
    }

    const relPath = path.relative(rootDir, filePath).replace(/\\/g, "/");
    const content = fs.readFileSync(filePath, "utf8");
    const lines = content.split("\n");

    lines.forEach((line, index) => {
      const match = line.match(todoPattern);
      if (match) {
        const rawTag = match[1].trim();
        const tag = normalizeTag(rawTag);
        let message = match[2].trim();
        // Clean trailing comment markers
        message = message.replace(/\*\/$/, "").replace(/-->$/, "").trim();

        todos.push({
          rawTag,
          tag,
          message: message || "Pending item",
          file: relPath,
          line: index + 1,
        });
      }
    });
  }

  // Also include c.todo from CASES in lib/data.ts if any
  try {
    const dataModule = await import(
      pathToFileURL(path.join(rootDir, "lib", "data.ts")).href
    );
    if (dataModule && dataModule.CASES) {
      dataModule.CASES.forEach((c) => {
        if (c.todo) {
          todos.push({
            rawTag: "verify",
            tag: "verify",
            message: `Case ${c.slug}: ${c.todo}`,
            file: "lib/data.ts",
            line: 0,
          });
        }
      });
    }
  } catch (err) {
    // If TypeScript runtime import fails, static scan above already caught code comments
  }

  const groups = {
    client: [],
    confirm: [],
    verify: [],
    add: [],
    team: [],
    other: [],
  };

  for (const item of todos) {
    if (groups[item.tag]) {
      groups[item.tag].push(item);
    } else {
      groups.other.push(item);
    }
  }

  console.log("=== TODO Summary by Tag ===");
  Object.keys(groups).forEach((tag) => {
    console.log(`- ${tag}: ${groups[tag].length}`);
  });
  console.log(`Total: ${todos.length}\n`);

  let md = "# MiniByte Site TODOs\n\n";
  md +=
    "> Generated automatically by `npm run todos`. Contains all pending confirmations, client inputs, and verification items before launch.\n\n";
  md += "## Summary\n\n";
  Object.keys(groups).forEach((tag) => {
    md += `- **${tag}**: ${groups[tag].length} items\n`;
  });
  md += `\n**Total**: ${todos.length} items\n\n---\n\n`;

  const tagDescriptions = {
    client: "Items requiring client input, legal entity details, credentials, or production URLs.",
    confirm: "Items where internal deck content needs team confirmation or approval.",
    verify: "Technical validations, asset blur checks, and deployment verification.",
    add: "Placeholders waiting for final marketing copy, case assets, or photography.",
    team: "Internal engineering and team coordination items.",
    other: "Miscellaneous items.",
  };

  Object.keys(groups).forEach((tag) => {
    const items = groups[tag];
    md += `## ${tag} (${items.length})\n\n`;
    if (tagDescriptions[tag]) {
      md += `> ${tagDescriptions[tag]}\n\n`;
    }
    if (items.length === 0) {
      md += "_No pending items in this category._\n\n";
    } else {
      items.forEach((it) => {
        const loc = it.line > 0 ? `${it.file}#L${it.line}` : it.file;
        md += `- [ ] \`${loc}\`: ${it.message}\n`;
      });
      md += "\n";
    }
  });

  const todoMdPath = path.join(rootDir, "TODO.md");
  fs.writeFileSync(todoMdPath, md, "utf8");
  console.log(`Wrote TODO.md to ${todoMdPath}`);
}

async function runCheck() {
  console.log("Starting MiniByte Content & Integrity QA Check...\n");
  let hasErrors = false;
  const errors = [];

  // =========================================================================
  // CHECK 1: Banned Strings
  // =========================================================================
  const bannedList = [
    { pattern: /\bEstonia\b/g, label: '"Estonia"' },
    { pattern: /\bNorthwind\b/g, label: '"Northwind"' },
    { pattern: /\[Name\]/g, label: '"[Name]"' },
    { pattern: /\[Role\]/g, label: '"[Role]"' },
    { pattern: /\[Placeholder\]/g, label: '"[Placeholder]"' },
    { pattern: /\[Licence\]/g, label: '"[Licence]"' },
    { pattern: /\[Legal/g, label: '"[Legal"' },
    { pattern: /\blorem\b/gi, label: '"lorem"' },
    { pattern: /\bipsum\b/gi, label: '"ipsum"' },
    { pattern: /github\.com/gi, label: '"github.com"' },
    { pattern: /info@minibyte\.ai/gi, label: '"info@minibyte.ai"' },
    { pattern: /open\s+source/gi, label: '"open source" (case-insensitive)' },
    { pattern: /within\s+two\s+working\s+days/gi, label: '"within two working days"' },
  ];

  const scanDirs = ["app", "components", "lib"].map((d) =>
    path.join(rootDir, d)
  );
  const scanFiles = scanDirs.flatMap((d) => collectFiles(d));
  const readmePath = path.join(rootDir, "README.md");
  if (fs.existsSync(readmePath)) scanFiles.push(readmePath);

  for (const filePath of scanFiles) {
    // Skip scripts/check.mjs itself and TODO.md
    if (
      filePath.endsWith("scripts\\check.mjs") ||
      filePath.endsWith("scripts/check.mjs") ||
      filePath.endsWith("TODO.md")
    ) {
      continue;
    }

    const relPath = path.relative(rootDir, filePath).replace(/\\/g, "/");
    const content = fs.readFileSync(filePath, "utf8");
    const lines = content.split("\n");

    lines.forEach((line, index) => {
      for (const b of bannedList) {
        if (b.pattern.test(line)) {
          errors.push(
            `[BANNED STRING] ${relPath}:${index + 1} contains ${b.label}:\n    ${line.trim()}`
          );
        }
      }
    });
  }

  // =========================================================================
  // CHECK 2: Data Integrity & Slug Consistency
  // =========================================================================
  let data;
  try {
    data = await import(
      pathToFileURL(path.join(rootDir, "lib", "data.ts")).href
    );
  } catch (err) {
    errors.push(`Failed to import lib/data.ts: ${err.message}`);
  }

  if (data) {
    const {
      CASES = [],
      ARTICLES = [],
      SERVICES = [],
      LABS = [],
      ROLE_AREAS = [],
      PARTNERS = [],
      MILESTONES = [],
      ENGAGEMENT = [],
      PROOF_STATS = [],
      visibleCases = [],
    } = data;

    // Duplicate slugs check
    function checkDuplicateSlugs(list, name) {
      const seen = new Set();
      for (const item of list) {
        if (seen.has(item.slug)) {
          errors.push(`[DUPLICATE SLUG] Duplicate slug in ${name}: "${item.slug}"`);
        }
        seen.add(item.slug);
      }
    }
    checkDuplicateSlugs(CASES, "CASES");
    checkDuplicateSlugs(ARTICLES, "ARTICLES");
    checkDuplicateSlugs(SERVICES, "SERVICES");

    // Required fields check on CASES
    for (const c of CASES) {
      if (!c.category) errors.push(`[MISSING FIELD] Case "${c.slug}" is missing "category"`);
      if (!c.title) errors.push(`[MISSING FIELD] Case "${c.slug}" is missing "title"`);
      if (!c.text) errors.push(`[MISSING FIELD] Case "${c.slug}" is missing "text"`);
    }

    // Reference checks
    const allSlugs = new Set(CASES.map((c) => c.slug));
    const visibleSlugs = new Set(visibleCases.map((c) => c.slug));

    function assertSlug(slug, context) {
      if (!allSlugs.has(slug)) {
        errors.push(`[DANGLING REFERENCE] ${context} references unknown case: "${slug}"`);
      } else if (!visibleSlugs.has(slug)) {
        errors.push(`[HIDDEN REFERENCE] ${context} references hidden case: "${slug}"`);
      }
    }

    for (const s of SERVICES) {
      if (Array.isArray(s.cases)) {
        s.cases.forEach((slug) => assertSlug(slug, `SERVICES[${s.slug}]`));
      }
    }

    for (const l of LABS) {
      if (l.case) assertSlug(l.case, `LABS[${l.slug}].case`);
      if (l.slug && allSlugs.has(l.slug) && !visibleSlugs.has(l.slug)) {
        errors.push(`[HIDDEN REFERENCE] LABS[${l.slug}] references hidden case`);
      }
    }

    for (const r of ROLE_AREAS) {
      if (Array.isArray(r.cases)) {
        r.cases.forEach((slug) => assertSlug(slug, `ROLE_AREAS[${r.slug}]`));
      }
    }

    for (const a of ARTICLES) {
      if (a.case) assertSlug(a.case, `ARTICLES[${a.slug}].case`);
    }

    for (const p of PARTNERS) {
      if (p.case) assertSlug(p.case, `PARTNERS[${p.name}].case`);
    }

    for (const m of MILESTONES) {
      if (m.case) assertSlug(m.case, `MILESTONES[${m.year}].case`);
    }

    for (const e of ENGAGEMENT) {
      if (Array.isArray(e.cases)) {
        e.cases.forEach((slug) => assertSlug(slug, `ENGAGEMENT[${e.title}]`));
      }
    }

    for (const st of PROOF_STATS) {
      if (st.slug) assertSlug(st.slug, `PROOF_STATS[${st.label}].slug`);
    }

    // =======================================================================
    // CHECK 3: Internal Href Resolution
    // =======================================================================
    const validPages = new Set([
      "/",
      "/services",
      "/work",
      "/how-we-work",
      "/labs",
      "/company",
      "/articles",
      "/careers",
      "/contact",
      "/privacy",
    ]);
    visibleCases.forEach((c) => validPages.add(`/work/${c.slug}`));
    ARTICLES.forEach((a) => validPages.add(`/articles/${a.slug}`));

    function checkHref(href, context) {
      if (!href || !href.startsWith("/")) return;
      const [pathOnly] = href.split("#");
      const [cleanRoute] = pathOnly.split("?");
      if (!validPages.has(cleanRoute)) {
        errors.push(`[UNRESOLVED ROUTE] ${context} has unresolved internal href: "${href}"`);
      }
    }

    const { NAV = [], MOBILE_NAV = [] } = data;
    NAV.forEach((item) => checkHref(item.href, `NAV[${item.label}]`));
    MOBILE_NAV.forEach((item) => checkHref(item.href, `MOBILE_NAV[${item.label}]`));

    const footerPath = path.join(rootDir, "components", "Footer.tsx");
    if (fs.existsSync(footerPath)) {
      const footerSrc = fs.readFileSync(footerPath, "utf8");
      const matches = footerSrc.matchAll(/href=["'](\/[^"']*)["']/g);
      for (const m of matches) {
        checkHref(m[1], `Footer.tsx`);
      }
    }
  }

  // =========================================================================
  // Report results
  // =========================================================================
  if (errors.length > 0) {
    console.error(`❌ Content QA Check FAILED with ${errors.length} issue(s):\n`);
    errors.forEach((err, i) => {
      console.error(`${i + 1}. ${err}\n`);
    });
    process.exit(1);
  } else {
    console.log("✓ All Content QA checks PASSED!");
    console.log("  - 0 banned strings found");
    console.log("  - Slug and case reference integrity verified");
    console.log("  - All NAV and Footer internal routes resolve cleanly\n");
    process.exit(0);
  }
}

if (isTodos) {
  runTodos().catch((err) => {
    console.error(err);
    process.exit(1);
  });
} else {
  runCheck().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

