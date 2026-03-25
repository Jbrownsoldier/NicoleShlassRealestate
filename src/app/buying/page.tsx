import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Search, FileCheck, Key, Handshake } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buying a Home in Toronto",
  description:
    "Work with Nicole Shlass for expert buyer representation, strategic negotiation, and honest guidance throughout your home purchase across Toronto and the GTA.",
  alternates: { canonical: "https://nicoleshlass.ca/buying" },
  openGraph: {
    title: "Buying a Home in Toronto — Nicole Shlass",
    description:
      "Access off-market inventory, strategic negotiation, and honest guidance from one of Toronto's most trusted buyer agents.",
    url: "https://nicoleshlass.ca/buying",
  },
  twitter: {
    title: "Buying a Home in Toronto — Nicole Shlass",
    description:
      "Access off-market inventory, strategic negotiation, and honest guidance from one of Toronto's most trusted buyer agents.",
  },
};

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Discovery & Strategy",
    desc: "A private consultation to understand your vision, lifestyle requirements, and financial objectives — setting the foundation for a focused, efficient search.",
  },
  {
    icon: FileCheck,
    step: "02",
    title: "Curated Property Access",
    desc: "Beyond the MLS, Nicole's network unlocks off-market estates and pre-listing opportunities before they reach the public market.",
  },
  {
    icon: Handshake,
    step: "03",
    title: "Precision Negotiation",
    desc: "Every offer is strategically crafted. Nicole's deep market knowledge and relationship capital consistently deliver winning results.",
  },
  {
    icon: Key,
    step: "04",
    title: "Seamless Close",
    desc: "From due diligence to deed — every detail coordinated with precision. You focus on your future home; Nicole handles the rest.",
  },
];

export default function BuyingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-28 overflow-hidden min-h-[70vh] flex items-end">
        <Image
          src="https://images.unsplash.com/photo-1613977257363-707ba9348227?w=2000&q=80&auto=format"
          alt="Buying a home in Toronto"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0" style={{ background: "rgba(12,10,15,0.72)" }} />
        <div className="absolute inset-0 gradient-overlay-bottom" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-2xl">
            <p className="text-label-lg text-secondary mb-4">BUYER REPRESENTATION</p>
            <h1 className="font-serif text-display-md text-on-surface font-semibold mb-5">
              Find the Home<br />You Deserve
            </h1>
            <p className="text-body-lg text-on-surface-variant leading-relaxed">
              Nicole's buyer-first approach combines access, insight, and advocacy to secure
              your ideal property — at the right price.
            </p>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-28 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-label-lg text-secondary mb-3">THE PROCESS</p>
            <h2 className="font-serif text-display-md text-on-surface font-semibold">
              How It Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map(({ icon: Icon, step, title, desc }) => (
              <div key={step} className="glass-card rounded-2xl p-8 flex gap-6 shadow-card">
                <div className="flex flex-col items-center gap-3 shrink-0">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                    <Icon size={20} className="text-secondary" />
                  </div>
                  <span className="text-label-sm text-outline">{step}</span>
                </div>
                <div>
                  <h3 className="font-serif text-title-lg text-on-surface font-semibold mb-2">{title}</h3>
                  <p className="text-body-md text-on-surface-variant leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Nicole */}
      <section className="py-28 bg-primary-container">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-label-lg text-secondary mb-4">WHY NICOLE</p>
              <h2 className="font-serif text-display-md text-on-surface font-semibold mb-6">
                Your Advocate.<br />Your Advantage.
              </h2>
              <div className="space-y-5 text-body-lg text-on-surface-variant leading-relaxed">
                <p>
                  In a market where the best homes rarely linger, having the right agent is the
                  difference between winning and watching. Nicole&apos;s relationships with
                  developers, estates, and fellow top agents give her clients first access to
                  properties the public never sees.
                </p>
                <p>
                  Her negotiation style is strategic and calm — anchored in data, guided by
                  instinct. Clients consistently close at or below list price, with terms that
                  protect their investment.
                </p>
              </div>
              <Link
                href="/concierge"
                className="mt-8 gradient-cta text-on-secondary font-semibold text-label-lg px-8 py-4 rounded-full inline-flex items-center gap-2 hover:opacity-90 transition-opacity shadow-ambient"
              >
                Start Your Search <ArrowRight size={16} />
              </Link>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-ambient">
              <Image
                src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=900&q=80&auto=format"
                alt="Home interior"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
