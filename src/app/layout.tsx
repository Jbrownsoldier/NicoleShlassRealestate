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
  title: {
    default: "Nicole Shlass — Real Estate Toronto",
    template: "%s | Nicole Shlass Real Estate",
  },
  description:
    "Residential real estate for first-time buyers, upsizers, and families across Toronto and the GTA. Sales Representative at The Boulevard powered by Property.ca.",
  keywords: [
    "Toronto real estate",
    "Toronto realtor",
    "first time home buyer Toronto",
    "Toronto homes for sale",
    "Nicole Shlass realtor",
    "Toronto real estate agent",
    "GTA homes for sale",
  ],
  authors: [{ name: "Nicole Shlass" }],
  creator: "Nicole Shlass",
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: "Nicole Shlass Real Estate",
    title: "Nicole Shlass — Real Estate Toronto",
    description:
      "Residential real estate for first-time buyers, upsizers, and families across Toronto and the GTA.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nicole Shlass — Real Estate Toronto",
    description: "Residential real estate for first-time buyers and families across Toronto and the GTA.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

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
      <body className="min-h-full flex flex-col bg-surface text-on-surface">
        <Nav />
        <main className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
