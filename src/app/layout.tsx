import type { Metadata } from "next";
import Script from "next/script";
import Providers from "./providers";
import "../index.css"; // Import the existing custom stylesheet

export const metadata: Metadata = {
  title: "DP BOSS | Satta Matka Fast Result | Kalyan Milan Rajdhani",
  description: "Get fast and accurate Satta Matka results for Kalyan, Milan, Rajdhani & Time Bazar. DP BOSS offers daily updates, charts, panel records & live Matka results.",
  keywords: "satta matka, dp boss, dpboss, matka result, kalyan matka, milan day, rajdhani night, time bazar",
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
        <section className="seo-hidden">
          <h1>DP BOSS – Live Satta Matka Results</h1>
          <p>
            DP BOSS is an informational website providing fast Satta Matka results
            for Kalyan, Milan Day, Rajdhani Night and Time Bazar along with charts
            and panel records.
          </p>
          <p>
            This website is for informational and entertainment purposes only.
            We do not promote gambling. Matka is illegal in many regions.
            Please follow your local laws.
          </p>
        </section>

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
