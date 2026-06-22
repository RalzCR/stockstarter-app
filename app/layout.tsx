import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://getstockstarter.vercel.app";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "StockStarter | Learn Stocks, Crypto and Market Research",
    template: "%s | StockStarter",
  },
  description:
    "StockStarter helps beginners learn markets, practise with a virtual portfolio, follow live stock and crypto data, and organise investment research.",
  applicationName: "StockStarter",
  keywords: [
    "StockStarter",
    "stocks",
    "crypto",
    "stock market simulator",
    "practice portfolio",
    "market dashboard",
    "investment research",
    "beginner investing",
    "portfolio tracker",
    "stock research tools",
  ],
  authors: [{ name: "StockStarter" }],
  creator: "StockStarter",
  publisher: "StockStarter",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "StockStarter | Learn Markets Before You Invest",
    description:
      "Practise with virtual money, follow live market data, organise research and build better investing habits with StockStarter.",
    url: siteUrl,
    siteName: "StockStarter",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "StockStarter | Learn Markets Before You Invest",
    description:
      "A beginner-friendly stock and crypto dashboard with a virtual portfolio simulator and research tools.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "StockStarter",
  alternateName: ["StockStarter App", "Stock Starter"],
  url: siteUrl,
};

const organisationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "StockStarter",
  url: siteUrl,
  logo: `${siteUrl}/favicon.ico`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteStructuredData),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organisationStructuredData),
          }}
        />

        {children}
        <Analytics />
      </body>
    </html>
  );
}