import type { Metadata } from "next";
import { Noto_Serif, Manrope } from "next/font/google";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import "./globals.css";

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nicoleshlass.ca"),
  title: {
    default: "Nicole Shlass — Toronto Real Estate Agent",
    template: "%s | Nicole Shlass Real Estate",
  },
  description:
    "Nicole Shlass is a Toronto Sales Representative helping first-time buyers, upsizers, and families find homes that truly fit their life. Buying, selling, and leasing across Toronto and the GTA.",
  keywords: [
    "Nicole Shlass realtor",
    "Nicole Shlass real estate",
    "Toronto real estate agent",
    "Toronto realtor",
    "Toronto homes for sale",
    "first time home buyer Toronto",
    "GTA real estate agent",
    "Toronto condos for sale",
    "Toronto homes for lease",
    "Toronto buyer agent",
    "Toronto seller agent",
    "Property.ca realtor",
    "Liberty Village real estate",
    "Leslieville real estate",
    "Trinity Bellwoods real estate",
  ],
  authors: [{ name: "Nicole Shlass", url: "https://nicoleshlass.ca" }],
  creator: "Nicole Shlass",
  publisher: "Nicole Shlass Real Estate",
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://nicoleshlass.ca",
    siteName: "Nicole Shlass Real Estate",
    title: "Nicole Shlass — Toronto Real Estate Agent",
    description:
      "Nicole Shlass is a Toronto Sales Representative helping buyers, sellers, and renters navigate the city's most sought-after neighbourhoods with precision and care.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Nicole Shlass — Toronto Real Estate Agent",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nicole Shlass — Toronto Real Estate Agent",
    description:
      "Toronto Sales Representative helping first-time buyers, upsizers, and families find homes that fit their life.",
    images: ["/twitter-image"],
  },
  alternates: {
    canonical: "https://nicoleshlass.ca",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/site.webmanifest",
};

import { ClientUI } from "@/components/ui/ClientUI";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${notoSerif.variable} ${manrope.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-surface text-on-surface antialiased">
        <ClientUI />
        <Nav />
        <main className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
