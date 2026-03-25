import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PropertyCard } from "@/components/ui/PropertyCard";
import { properties } from "@/data/properties";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leasing in Toronto",
  description:
    "Lease representation for tenants and landlords across Toronto. Nicole Shlass helps you find or fill the right rental with care and expertise.",
  alternates: { canonical: "https://nicoleshlass.ca/leasing" },
  openGraph: {
    title: "Toronto Leasing — Tenant & Landlord Representation",
    description:
      "Lease representation for both tenants and landlords across Toronto's best neighbourhoods. Find the right rental or fill your unit — with Nicole Shlass.",
    url: "https://nicoleshlass.ca/leasing",
  },
  twitter: {
    title: "Toronto Leasing — Tenant & Landlord Representation",
    description:
      "Lease representation for both tenants and landlords across Toronto's best neighbourhoods.",
  },
};

const leaseProperties = properties.filter((p) => p.type === "lease");

export default function LeasingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-28 overflow-hidden min-h-[70vh] flex items-end">
        <Image
          src="https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=2000&q=80&auto=format"
          alt="Luxury leasing"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0" style={{ background: "rgba(12,10,15,0.70)" }} />
        <div className="absolute inset-0 gradient-overlay-bottom" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-2xl">
            <p className="text-label-lg text-secondary mb-4">LEASING IN TORONTO</p>
            <h1 className="font-serif text-display-md text-on-surface font-semibold mb-5">
              Live the Life.<br />On Your Terms.
            </h1>
            <p className="text-body-lg text-on-surface-variant leading-relaxed">
              From short-term furnished estates to long-term leases at the city&apos;s most prestigious
              addresses — Nicole finds and secures the perfect home for your needs.
            </p>
          </div>
        </div>
      </section>

      {/* Tenant vs Landlord */}
      <section className="py-28 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-16">
            <p className="text-label-lg text-secondary mb-3">WHO NICOLE SERVES</p>
            <h2 className="font-serif text-display-md text-on-surface font-semibold">
              Both Sides of the Table
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card rounded-2xl p-10 flex flex-col gap-5 shadow-card">
              <span className="text-4xl">🏠</span>
              <h3 className="font-serif text-headline-md text-on-surface font-semibold">For Tenants</h3>
              <p className="text-body-lg text-on-surface-variant leading-relaxed">
                Nicole identifies properties that match your lifestyle, negotiates favorable terms,
                and handles every document — so you can focus on what matters. Access to unlisted
                and off-market rentals exclusive to her network.
              </p>
              <ul className="space-y-2 text-body-md text-on-surface-variant">
                {["Access to off-market listings", "Term & rate negotiation", "Furnished & unfurnished options", "Executive relocations welcome"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-card rounded-2xl p-10 flex flex-col gap-5 shadow-card">
              <span className="text-4xl">🏛</span>
              <h3 className="font-serif text-headline-md text-on-surface font-semibold">For Landlords</h3>
              <p className="text-body-lg text-on-surface-variant leading-relaxed">
                Nicole markets your property to a curated pool of pre-qualified, high-caliber
                tenants. Thorough vetting, expert lease structuring, and full marketing support
                ensure your investment is protected.
              </p>
              <ul className="space-y-2 text-body-md text-on-surface-variant">
                {["Pre-qualified tenant sourcing", "Lease structuring & review", "Professional photography", "Strategic pricing analysis"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Listings */}
      {leaseProperties.length > 0 && (
        <section className="py-24 bg-surface-c-low">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-12">
              <p className="text-label-lg text-secondary mb-2">AVAILABLE NOW</p>
              <h2 className="font-serif text-headline-lg text-on-surface font-semibold">Lease Listings</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {leaseProperties.map((p) => <PropertyCard key={p.id} property={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 bg-surface text-center">
        <div className="max-w-xl mx-auto px-6">
          <p className="text-label-lg text-secondary mb-3">READY TO LEASE?</p>
          <h2 className="font-serif text-headline-lg text-on-surface font-semibold mb-5">
            Let&apos;s Find Your Residence
          </h2>
          <p className="text-body-lg text-on-surface-variant mb-8 leading-relaxed">
            Share your requirements and Nicole&apos;s team will curate a selection of properties
            matched to your lifestyle and timeline.
          </p>
          <Link
            href="/concierge"
            className="gradient-cta text-on-secondary font-semibold text-label-lg px-8 py-4 rounded-full inline-flex items-center gap-2 hover:opacity-90 transition-opacity shadow-ambient mx-auto"
          >
            Connect with Nicole <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
