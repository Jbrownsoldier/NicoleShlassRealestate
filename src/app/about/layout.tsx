import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Nicole Shlass",
  description:
    "Nicole Shlass is a Toronto Sales Representative known for her responsiveness, honesty, and genuine commitment to her clients. 15 years of experience across Toronto.",
  alternates: { canonical: "https://nicoleshlass.ca/about" },
  openGraph: {
    title: "About Nicole Shlass — Toronto Sales Representative",
    description:
      "15 years of Toronto real estate experience. Driven by curiosity, fuelled by connection — Nicole Shlass approaches every client relationship with intention and full commitment.",
    url: "https://nicoleshlass.ca/about",
  },
  twitter: {
    title: "About Nicole Shlass — Toronto Sales Representative",
    description:
      "15 years of Toronto real estate experience. Responsive, honest, and genuinely committed to outcomes that align with your lifestyle.",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
