import Image from "next/image";
import { PropertyCard } from "@/components/ui/PropertyCard";
import { properties } from "@/data/properties";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Toronto Property Listings",
  description:
    "Browse Nicole Shlass's current and past property listings — condos, lofts, townhouses, and family homes for sale and lease across Toronto and the GTA.",
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
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=2000&q=80&auto=format"
          alt="Properties"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0" style={{ background: "rgba(12,10,15,0.78)" }} />
        <div className="absolute inset-0 gradient-overlay-bottom" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <p className="text-label-lg text-secondary mb-4">CURRENT PORTFOLIO</p>
          <h1 className="font-serif text-display-md text-on-surface font-semibold">
            Exclusive Listings
          </h1>
          <p className="text-body-lg text-on-surface-variant max-w-xl mx-auto mt-4">
            Active listings and a track record of results across Toronto and the GTA.
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
    </>
  );
}
