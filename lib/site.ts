// TODO(client): set real contact email and LinkedIn URL
import { SERVICES } from "./data";

export const SITE = {
  name: "MiniByte",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "", // empty = hide every mailto
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "", // empty = hidden
  legalName: process.env.NEXT_PUBLIC_LEGAL_NAME ?? "", // empty = hidden
  announcement: null as null | { label: string; text: string; href: string },
  description:
    "MiniByte is an AI R&D firm building AI SaaS platforms, advanced robotics and embedded intelligence systems.",
};

export interface ContactTopic {
  key: string;
  label: string;
}

export const CONTACT_TOPICS: ContactTopic[] = [
  ...SERVICES.map((s) => ({ key: s.slug, label: s.title })),
  { key: "careers", label: "Careers" },
  { key: "partnership", label: "R&D partnership" },
  { key: "funding", label: "Investment and funding" },
  { key: "other", label: "Something else" },
];
