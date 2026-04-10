import Image from "next/image";
import Link from "next/link";
import { PropertyCard } from "@/components/ui/PropertyCard";
import { properties } from "@/data/properties";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Toronto Property Listings",
  description:
    "Browse Nicole Shlass's current and past property listings — condos, lofts, townhouses, and family homes for sale and lease comprehensively across Toronto.",
  alternates: { canonical: "https://nicoleshlass.ca/properties" },
  openGraph: {
    title: "Toronto Property Listings — Nicole Shlass Real Estate",
    description:
      "Condos, lofts, townhouses, and family homes for sale and lease across Toronto's most sought-after neighbourhoods.",
    url: "https://nicoleshlass.ca/properties",
  },
  twitter: {
    title: "Toronto Property Listings — Nicole Shlass Real Estate",
    description:
      "Condos, lofts, townhouses, and family homes for sale and lease across Toronto's most sought-after neighbourhoods.",
  },
};

export default function PropertiesPage() {
  const forSale  = properties.filter((p) => p.type === "sale");
  const forLease = properties.filter((p) => p.type === "lease");
  const sold     = properties.filter((p) => p.type === "sold");

  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-20 overflow-hidden">
        <Image
          src="/nicole-properties.jpg"
          alt="Nicole Shlass Properties"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
        <div className="absolute inset-0" style={{ background: "rgba(12,10,15,0.40)" }} />
        <div className="absolute inset-0 gradient-overlay-bottom" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <p className="text-label-lg text-secondary mb-4">CURRENT PORTFOLIO</p>
          <h1 className="font-serif text-display-md text-on-surface font-semibold">
            Exclusive Listings
          </h1>
          <p className="text-body-lg text-on-surface-variant max-w-xl mx-auto mt-4">
            Active listings and a track record of results across Toronto.
          </p>
        </div>
      </section>

      {/* For Sale */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <p className="text-label-lg text-secondary mb-2">AVAILABLE NOW</p>
            <h2 className="font-serif text-headline-lg text-on-surface font-semibold">For Sale</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {forSale.map((p) => <PropertyCard key={p.id} property={p} />)}
          </div>
        </div>
      </section>

      {/* For Lease */}
      {forLease.length > 0 && (
        <section className="py-24 bg-surface-c-low">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-12">
              <p className="text-label-lg text-secondary mb-2">LEASING</p>
              <h2 className="font-serif text-headline-lg text-on-surface font-semibold">For Lease</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {forLease.map((p) => <PropertyCard key={p.id} property={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* Sold */}
      {sold.length > 0 && (
        <section className="py-24 bg-surface">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-12">
              <p className="text-label-lg text-tertiary mb-2">RECENTLY CLOSED</p>
              <h2 className="font-serif text-headline-lg text-on-surface font-semibold">Sold</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sold.map((p) => <PropertyCard key={p.id} property={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* CTA Footer */}
      <section className="py-24 bg-surface-c-low overflow-hidden">
        <div className="max-w-5xl mx-auto px-6">
          <div className="glass rounded-3xl p-8 md:p-12 border border-secondary/15 flex flex-col md:flex-row items-center gap-10 shadow-card">
            <div className="w-full md:w-1/3 aspect-[4/5] relative rounded-2xl overflow-hidden shadow-ambient shrink-0">
              <Image 
                src="/nicole-properties.jpg"
                alt="Work with Nicole"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-top"
              />
            </div>
            <div className="w-full md:w-2/3 text-center md:text-left">
              <p className="text-label-lg text-secondary mb-3">WORK WITH NICOLE</p>
              <h2 className="font-serif text-display-sm text-on-surface font-semibold mb-4">
                Looking for something unlisted?
              </h2>
              <p className="text-body-lg text-on-surface-variant mb-6 max-w-xl mx-auto md:mx-0 leading-relaxed">
                Gain access to exclusive off-market properties and private listings across Toronto before they hit the open market.
              </p>
              <Link
                href="/concierge"
                className="gradient-cta text-on-secondary font-semibold text-label-md px-8 py-4 rounded-full inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
              >
                Request Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
