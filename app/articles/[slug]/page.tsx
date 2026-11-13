import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ARTICLES, CASES, readingMinutes } from "@/lib/data";
import { PageHero, SecHead } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Scramble } from "@/components/Scramble";
import { TLink } from "@/components/Transition";
import { Arrow } from "@/components/Btn";
import { CTA } from "@/components/CTA";
import { DotField } from "@/components/DotField";
import { ArticleAside } from "@/components/ArticleAside";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = ARTICLES.find((item) => item.slug === slug);
  if (!a) return { title: "Engineering note" };
  return {
    title: a.title,
    description: a.text,
    alternates: { canonical: `/articles/${slug}` },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const i = ARTICLES.findIndex((item) => item.slug === slug);
  if (i < 0) notFound();
  const a = ARTICLES[i];

  // Associated case study
  const caseItem = CASES.find((c) => c.slug === a.case);

  // Related notes: 2 articles with the same tag, otherwise any two
  const others = ARTICLES.filter((item) => item.slug !== a.slug);
  let related = others.filter((item) => item.tag === a.tag);
  if (related.length < 2) {
    const rest = others.filter((item) => item.tag !== a.tag);
    related = [...related, ...rest].slice(0, 2);
  } else {
    related = related.slice(0, 2);
  }

  const nextArticle = ARTICLES[(i + 1) % ARTICLES.length];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.text,
    author: {
      "@type": "Organization",
      name: "MiniByte",
    },
    publisher: {
      "@type": "Organization",
      name: "MiniByte",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        crumb={{ href: "/articles", label: "All articles" }}
        eyebrow={a.tag}
        title={a.title}
        lede={a.text}
      />

      {/* Byline row under hero */}
      <section className="article-byline-bar">
        <div className="container">
          <div className="article-byline mono">
            <span>MiniByte team</span>
            <span className="sep">·</span>
            <span>{readingMinutes(a)} min read</span>
          </div>
        </div>
      </section>

      {/* Main article content section */}
      <section className="section bg-white article-content-section">
        <div className="container">
          <div className="article-layout">
            {/* Narrow reading column (~680px) */}
            <article className="article-reading-col">
              {a.body[0] && (
                <Reveal as="p" className="prose-standfirst" delay={40}>
                  {a.body[0]}
                </Reveal>
              )}

              {/* Key fact pull-stat after first paragraph */}
              {a.keyFact && (
                <Reveal className="article-pull-stat" delay={100}>
                  <div className="pull-stat-val mono">
                    <Scramble text={a.keyFact.value} />
                  </div>
                  <div className="pull-stat-lbl">{a.keyFact.label}</div>
                </Reveal>
              )}

              <div className="prose article-prose">
                {a.body.slice(1).map((p, idx) => (
                  <Reveal
                    as="p"
                    key={idx}
                    delay={Math.min((idx + 2) * 50, 250)}
                  >
                    {p}
                  </Reveal>
                ))}
              </div>
            </article>

            {/* Sticky aside on desktop, stacked on mobile */}
            <div className="article-aside-col">
              <ArticleAside caseItem={caseItem} />
            </div>
          </div>

          {/* Related notes */}
          {related.length > 0 && (
            <div className="article-related-wrap">
              <div className="sec-head-row" style={{ marginBottom: 32 }}>
                <SecHead
                  label="Related notes"
                  title="Further reading."
                  lede="More engineering notes from client deployments and edge systems."
                />
              </div>
              <div className="art-grid article-related-grid">
                {related.map((item, idx) => (
                  <Reveal key={item.slug} delay={Math.min(idx * 70, 200)}>
                    <TLink href={`/articles/${item.slug}`} className="art">
                      <div className="vis">
                        <DotField mode={idx % 2 === 0 ? "flow" : "grid"} gap={20} />
                      </div>
                      <div className="art-meta-row">
                        <span className="tag">{item.tag}</span>
                        <span className="art-read-time mono">
                          {readingMinutes(item)} min read
                        </span>
                      </div>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                      {item.keyFact && (
                        <div className="art-keyfact mono">
                          <span className="art-keyfact-val">{item.keyFact.value}</span>
                          <span className="art-keyfact-lbl">{item.keyFact.label}</span>
                        </div>
                      )}
                      <span className="art-cta mono">
                        Read note <Arrow size={14} />
                      </span>
                    </TLink>
                  </Reveal>
                ))}
              </div>
            </div>
          )}

          {/* Next note link */}
          <Reveal style={{ marginTop: 56 }}>
            <TLink href={`/articles/${nextArticle.slug}`} className="nextcase">
              <span className="label">Next note</span>
              <h3>{nextArticle.title}</h3>
              <span className="arrow-big">
                <Arrow size={36} />
              </span>
            </TLink>
          </Reveal>
        </div>
      </section>

      <CTA
        title="Have a problem worth solving with AI?"
        newsletter={false}
      />
    </>
  );
}
