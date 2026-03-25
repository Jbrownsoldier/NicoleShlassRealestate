import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BedDouble, Bath, Maximize2, Car, Package, ArrowLeft, CheckCircle2 } from "lucide-react";
import { properties } from "@/data/properties";
import { PropertyGallery } from "@/components/ui/PropertyGallery";
import { PropertyHero } from "@/components/ui/PropertyHero";
import type { Metadata } from "next";

export function generateStaticParams() {
  return properties.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const property = properties.find((p) => p.id === id);
  if (!property) return {};
  const desc = property.description.slice(0, 155) + "…";
  const title = `${property.title} — ${property.address}`;
  return {
    title,
    description: desc,
    alternates: { canonical: `https://nicoleshlass.ca/properties/${property.id}` },
    openGraph: {
      title,
      description: desc,
      url: `https://nicoleshlass.ca/properties/${property.id}`,
      type: "website",
    },
    twitter: {
      title,
      description: desc,
    },
  };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = properties.find((p) => p.id === id);
  if (!property) notFound();

  const {
    title,
    address,
    city,
    neighborhood,
    priceLabel,
    beds,
    bedsLabel,
    baths,
    sqft,
    type,
    tag,
    parking,
    locker,
    description,
    features,
    buildingAmenities,
    images,
    video,
  } = property;

  const isFloorPlan = (src: string) =>
    src.includes("floor") || src.includes("dim-scaled");

  const heroImage = images[0];
  const floorPlans = images.filter(isFloorPlan);
  const galleryImages = images.filter((s) => !isFloorPlan(s));

  const btnPrimary =
    "inline-flex items-center justify-center gap-2 w-full px-9 py-4 rounded-full text-label-lg font-semibold gradient-cta text-on-secondary hover:opacity-90 active:opacity-80 shadow-ambient transition-all duration-200 cursor-pointer";
  const btnOutline =
    "inline-flex items-center justify-center gap-2 w-full px-7 py-3.5 rounded-full text-label-md font-medium border border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/60 transition-all duration-200 cursor-pointer";

  return (
    <>
      {/* Preload property video so it's buffered before the hero component mounts */}
      {video && <link rel="preload" as="video" href={video} type="video/mp4" />}

      {/* Back link */}
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-4">
        <Link
          href="/properties"
          className="inline-flex items-center gap-2 text-label-md text-outline hover:text-primary transition-colors duration-200"
        >
          <ArrowLeft size={14} />
          All Properties
        </Link>
      </div>

      {/* Hero Image / Video */}
      <div className="max-w-7xl mx-auto px-6 pb-8">
        <PropertyHero
          image={heroImage}
          video={video}
          title={title}
          tag={tag}
          type={type}
        />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Left — Gallery + details */}
          <div className="lg:col-span-7 flex flex-col gap-10">

            {/* Title block */}
            <div>
              <p className="text-label-md text-secondary mb-1">{neighborhood} · {city}</p>
              <h1 className="font-serif text-headline-lg text-on-surface font-semibold leading-tight mb-2">
                {title}
              </h1>
              <p className="text-body-lg text-on-surface-variant">{address}</p>

              <div className="flex flex-wrap items-center gap-5 mt-5 text-on-surface-variant text-body-md">
                <span className="flex items-center gap-2">
                  <BedDouble size={16} className="text-outline" />
                  {bedsLabel ?? beds} Beds
                </span>
                <span className="flex items-center gap-2">
                  <Bath size={16} className="text-outline" />
                  {baths} Baths
                </span>
                {sqft > 0 && (
                  <span className="flex items-center gap-2">
                    <Maximize2 size={16} className="text-outline" />
                    {sqft.toLocaleString()} ft&#178;
                  </span>
                )}
                {parking && (
                  <span className="flex items-center gap-2">
                    <Car size={16} className="text-outline" />
                    {parking}
                  </span>
                )}
                {locker && (
                  <span className="flex items-center gap-2">
                    <Package size={16} className="text-outline" />
                    Locker included
                  </span>
                )}
              </div>
            </div>

            {/* Gallery grid */}
            {galleryImages.length > 1 && (
              <div>
                <h2 className="font-serif text-title-lg text-on-surface font-semibold mb-4">
                  All Photos
                </h2>
                <PropertyGallery images={galleryImages} title={title} skipFirst={true} />
              </div>
            )}

            {/* Description */}
            <div>
              <h2 className="font-serif text-title-lg text-on-surface font-semibold mb-3">
                About This Property
              </h2>
              <p className="text-body-lg text-on-surface-variant leading-relaxed">
                {description}
              </p>
            </div>

            {/* Features */}
            {features.length > 0 && (
              <div>
                <h2 className="font-serif text-title-lg text-on-surface font-semibold mb-4">
                  Features
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-body-md text-on-surface-variant">
                      <CheckCircle2 size={15} className="text-primary mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Building amenities */}
            {buildingAmenities && buildingAmenities.length > 0 && (
              <div>
                <h2 className="font-serif text-title-lg text-on-surface font-semibold mb-4">
                  Building Amenities
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                  {buildingAmenities.map((a) => (
                    <li key={a} className="flex items-start gap-2.5 text-body-md text-on-surface-variant">
                      <CheckCircle2 size={15} className="text-secondary mt-0.5 shrink-0" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right — Sticky info card */}
          <div className="lg:col-span-5">
            <div className="sticky top-28">
              <div className="glass-card ghost-border rounded-2xl p-6 flex flex-col gap-5">
                <div>
                  <p className="text-label-md text-outline mb-1">
                    {type === "sold" ? "Sold Price" : type === "lease" ? "Monthly Rent" : "Asking Price"}
                  </p>
                  <p className="font-serif text-headline-md text-secondary font-semibold">
                    {priceLabel}
                  </p>
                  <p className="text-label-sm text-on-surface-variant mt-1">
                    {type === "lease" ? "For Lease" : type === "sold" ? "Sold" : "For Sale"}
                  </p>
                </div>

                <div className="border-t border-outline-variant/15" />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-label-sm text-outline mb-0.5">Bedrooms</p>
                    <p className="text-body-md font-medium text-on-surface">{bedsLabel ?? beds}</p>
                  </div>
                  <div>
                    <p className="text-label-sm text-outline mb-0.5">Bathrooms</p>
                    <p className="text-body-md font-medium text-on-surface">{baths}</p>
                  </div>
                  {sqft > 0 && (
                    <div>
                      <p className="text-label-sm text-outline mb-0.5">Size</p>
                      <p className="text-body-md font-medium text-on-surface">{sqft.toLocaleString()} ft&#178;</p>
                    </div>
                  )}
                  {parking && (
                    <div>
                      <p className="text-label-sm text-outline mb-0.5">Parking</p>
                      <p className="text-body-md font-medium text-on-surface">{parking}</p>
                    </div>
                  )}
                  {locker && (
                    <div>
                      <p className="text-label-sm text-outline mb-0.5">Locker</p>
                      <p className="text-body-md font-medium text-on-surface">Included</p>
                    </div>
                  )}
                  <div>
                    <p className="text-label-sm text-outline mb-0.5">Neighbourhood</p>
                    <p className="text-body-md font-medium text-on-surface">{neighborhood}</p>
                  </div>
                </div>

                <div className="border-t border-outline-variant/15" />

                {type !== "sold" ? (
                  <div className="flex flex-col gap-3">
                    <Link href="/concierge" className={btnPrimary}>
                      Book a Showing
                    </Link>
                    <Link href="/concierge" className={btnOutline}>
                      Ask a Question
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <p className="text-body-md text-on-surface-variant text-center">
                      Interested in similar properties?
                    </p>
                    <Link href="/concierge" className={btnPrimary}>
                      Get in Touch
                    </Link>
                  </div>
                )}

                <p className="text-label-sm text-outline text-center leading-relaxed">
                  Nicole Shlass · Sales Representative
                  <br />
                  The Boulevard powered by Property.ca
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Floor Plans */}
        {floorPlans.length > 0 && (
          <div className="mt-16 pt-16 border-t border-outline-variant/15">
            <h2 className="font-serif text-headline-md text-on-surface font-semibold mb-8">
              Floor Plans
            </h2>
            <div className="flex flex-col gap-6">
              {floorPlans.map((src, i) => (
                <div
                  key={src}
                  className="relative w-full rounded-2xl overflow-hidden bg-surface-c ghost-border"
                  style={{ aspectRatio: "16/9" }}
                >
                  <Image
                    src={src}
                    alt={`${title} — floor plan ${i + 1}`}
                    fill
                    sizes="(max-width: 1280px) 100vw, 1280px"
                    className="object-contain p-4"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
