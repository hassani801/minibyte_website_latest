import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { visibleCases, ARTICLES } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE.url.replace(/\/+$/, "");

  const staticRoutes = [
    "",
    "/services",
    "/work",
    "/how-we-work",
    "/labs",
    "/company",
    "/articles",
    "/careers",
    "/contact",
    "/privacy",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === "" ? "weekly" : "monthly") as
      | "weekly"
      | "monthly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  const caseRoutes = visibleCases.map((c) => ({
    url: `${baseUrl}/work/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const articleRoutes = ARTICLES.map((a) => ({
    url: `${baseUrl}/articles/${a.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...caseRoutes, ...articleRoutes];
}

