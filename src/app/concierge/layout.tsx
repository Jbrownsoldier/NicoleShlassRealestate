import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Private Concierge Consultation",
  description:
    "Request a private consultation with Nicole Shlass. Tailored buyer, seller, and leasing strategy — discreet, personal, and entirely focused on you.",
  alternates: { canonical: "https://nicoleshlass.ca/concierge" },
  openGraph: {
    title: "Private Concierge — Nicole Shlass Real Estate",
    description:
      "Every detail handled, from first showing to closing day. Request your private consultation with Nicole Shlass — discreet, tailored, and entirely yours.",
    url: "https://nicoleshlass.ca/concierge",
  },
  twitter: {
    title: "Private Concierge — Nicole Shlass Real Estate",
    description:
      "Every detail handled, from first showing to closing day. Request your private consultation with Nicole Shlass.",
  },
};

export default function ConciergeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
