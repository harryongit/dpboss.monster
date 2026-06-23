import type { Metadata } from "next";
import Script from "next/script";
import Providers from "./providers";
import "../index.css"; // Import the existing custom stylesheet

export const metadata: Metadata = {
  title: "DP BOSS | Fastest Satta Matka Result | Kalyan Matka | DPBoss",
  description: "DP BOSS offers the fastest Satta Matka results, Kalyan Matka, Milan Day, Rajdhani Night, live Matka charts, panel records, and daily updates.",
  keywords: "satta matka, dp boss, dpboss, matka result, kalyan matka, milan day, rajdhani night, time bazar, fastest satta matka result, kalyan chart, matka guessing, live matka result, matka boss, satta boss, kalyan panel chart, jodi record",
  authors: [{ name: "DP BOSS", url: "https://dpboss.monster/" }],
  creator: "DP BOSS",
  category: "Entertainment",
  metadataBase: new URL('https://dpboss.monster/'),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
  alternates: {
    canonical: "https://dpboss.monster/",
  },
  openGraph: {
    type: "website",
    title: "DP BOSS – Fast Satta Matka Results",
    description: "Live Satta Matka results, charts and records for Kalyan, Milan, Rajdhani & Time Bazar.",
    url: "https://dpboss.monster/",
    images: [
      {
        url: "https://dpboss.monster/logo512x512.png",
        width: 512,
        height: 512,
        alt: "DP BOSS Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DP BOSS – Fast Satta Matka Results",
    description: "Fast Matka results & charts from DP BOSS.",
    images: ["https://dpboss.monster/logo512x512.png"],
  },
  icons: {
    icon: [
      { url: "https://dpboss.monster/favicon.ico" },
      { url: "https://dpboss.monster/faviconlogo32x32.png", sizes: "32x32", type: "image/png" },
      { url: "https://dpboss.monster/faviconlogo48x48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [
      { url: "https://dpboss.monster/logo512x512.png" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN">
      <head>
        {/* Domain Protection CSP Meta */}
        <meta
          httpEquiv="Content-Security-Policy"
          content="
            default-src 'self' https:;
            img-src 'self' https: data:;
            script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com;
            style-src 'self' 'unsafe-inline' https:;
            connect-src 'self' https: http:;
            font-src 'self' https: data:;
          "
        />

        {/* Structured Schema Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "DP BOSS",
              "url": "https://dpboss.monster/",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://dpboss.monster/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              },
              "inLanguage": "en-IN",
              "publisher": {
                "@type": "Organization",
                "name": "DP BOSS",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://dpboss.monster/logo512x512.png",
                  "width": 512,
                  "height": 512
                }
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "DP BOSS",
              "url": "https://dpboss.monster/",
              "logo": {
                "@type": "ImageObject",
                "url": "https://dpboss.monster/logo512x512.png",
                "width": 512,
                "height": 512
              }
            })
          }}
        />

        {/* Government / Policy Safety */}
        <meta name="rating" content="general" />
        <meta name="distribution" content="global" />
      </head>
      <body>
        {/* Google Analytics Script (using Next.js Script) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-9LT2BCK46R"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9LT2BCK46R', { anonymize_ip: true });
          `}
        </Script>

        {/* SEO Fallback Sections */}
        <Providers>
          {children}
        </Providers>

        <noscript>
          <h2>JavaScript Required</h2>
          <p>Please enable JavaScript to view live results.</p>
        </noscript>
      </body>
    </html>
  );
}
