import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Camera, BarChart3, Globe, CheckCircle } from "lucide-react";
import { SoldPropertiesCarousel } from "@/components/ui/SoldPropertiesCarousel";
import { properties } from "@/data/properties";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Selling Your Home in Toronto",
  description:
    "Nicole Shlass delivers strategic marketing, precise pricing, and an extensive buyer network to help you sell your Toronto home with confidence.",
  alternates: { canonical: "https://nicoleshlass.ca/selling" },
  openGraph: {
    title: "Selling Your Home in Toronto — Nicole Shlass",
    description:
      "Commanding marketing, precise pricing, and an elite buyer network — designed to close your Toronto home above asking.",
    url: "https://nicoleshlass.ca/selling",
  },
  twitter: {
    title: "Selling Your Home in Toronto — Nicole Shlass",
    description:
      "Commanding marketing, precise pricing, and an elite buyer network — designed to close your Toronto home above asking.",
  },
};

const pillars = [
  {
    icon: Camera,
    title: "Editorial Photography",
    desc: "Architectural photography and cinematic video production that position your home as the aspirational lifestyle it represents.",
  },
  {
    icon: BarChart3,
    title: "Precision Pricing",
    desc: "Data-driven valuations anchored in hyper-local market intelligence — priced to attract serious buyers and drive competition.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    desc: "Syndication across premium international portals and a curated private network of qualified buyers worldwide.",
  },
  {
    icon: CheckCircle,
    title: "White-Glove Execution",
    desc: "Concierge-level preparation, staging consultation, and vendor coordination — every detail handled before a single showing.",
  },
];

export default function SellingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-28 overflow-hidden min-h-[70vh] flex items-end">
        <Image
          src="https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=2000&q=80&auto=format"
          alt="Home for sale in Toronto"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0" style={{ background: "rgba(12,10,15,0.70)" }} />
        <div className="absolute inset-0 gradient-overlay-bottom" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-2xl">
            <p className="text-label-lg text-secondary mb-4">SELLER REPRESENTATION</p>
            <h1 className="font-serif text-display-md text-on-surface font-semibold mb-5">
              Sell with Confidence.<br />Close Above Asking.
            </h1>
            <p className="text-body-lg text-on-surface-variant leading-relaxed">
              Nicole&apos;s proven strategy consistently delivers premium results — commanding
              attention, generating competition, and closing on your terms.
            </p>
          </div>
        </div>
      </section>

      {/* Track record */}
      <section className="bg-primary-container border-b border-outline-variant/20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: "98%",   label: "List-to-Sale Ratio" },
              { value: "21",    label: "Avg. Days on Market" },
              { value: "14+",   label: "Years in Toronto" },
              { value: "100%",  label: "Client Satisfaction" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="font-serif text-display-md text-secondary font-semibold">{value}</p>
                <p className="text-label-md text-outline mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marketing pillars */}
      <section className="py-28 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-label-lg text-secondary mb-3">THE MARKETING EDGE</p>
            <h2 className="font-serif text-display-md text-on-surface font-semibold">
              Positioned to Win
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pillars.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="glass-card rounded-2xl p-8 flex gap-6 shadow-card">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                  <Icon size={20} className="text-secondary" />
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

      {/* Recent Successes */}
      <section className="pt-28 pb-10 bg-surface overflow-hidden border-t border-outline-variant/10">
        <div className="max-w-7xl mx-auto px-6 mb-12 text-center md:text-left">
          <p className="text-label-lg text-secondary mb-3">PROVEN TRACK RECORD</p>
          <h2 className="font-serif text-headline-lg text-on-surface font-semibold">
            Recent Sales Portfolio
          </h2>
        </div>
        <SoldPropertiesCarousel properties={properties} />
      </section>

      {/* CTA */}
      <section className="py-28 bg-surface-c-low">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-label-lg text-secondary mb-4">READY TO LIST?</p>
          <h2 className="font-serif text-display-md text-on-surface font-semibold mb-6">
            Let&apos;s Talk About Your Property
          </h2>
          <p className="text-body-lg text-on-surface-variant leading-relaxed mb-10">
            A private, no-obligation consultation to discuss your home&apos;s value,
            the current market, and a customized selling strategy.
          </p>
          <Link
            href="/concierge"
            className="gradient-cta text-on-secondary font-semibold text-label-lg px-9 py-4 rounded-full inline-flex items-center gap-2 hover:opacity-90 transition-opacity shadow-ambient mx-auto"
          >
            Request a Valuation <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
