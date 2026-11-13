import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TransitionProvider } from "@/components/Transition";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SITE } from "@/lib/site";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "MiniByte · AI research and development",
    template: "%s · MiniByte",
  },
  description: SITE.description,
  openGraph: {
    type: "website",
    siteName: "MiniByte",
    locale: "en",
    title: "MiniByte · AI research and development",
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "MiniByte · AI research and development",
    description: SITE.description,
  },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#f3f4f1",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MiniByte",
    url: SITE.url,
    description: SITE.description,
    logo: `${SITE.url}/icon.svg`,
    ...(SITE.linkedin ? { sameAs: [SITE.linkedin] } : {}),
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "MiniByte",
    url: SITE.url,
  };

  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
      </head>
      <body>
        <a href="#main" className="skip-to-content">
          Skip to content
        </a>
        <noscript>
          <style>{`.rv,.split .wi{opacity:1!important;transform:none!important}.tx{display:none}`}</style>
        </noscript>
        <TransitionProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </TransitionProvider>
      </body>
    </html>
  );
}
