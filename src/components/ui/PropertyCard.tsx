import Image from "next/image";
import Link from "next/link";
import { BedDouble, Bath, Maximize2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Property } from "@/data/properties";

interface PropertyCardProps {
  property: Property;
  className?: string;
}

const tagVariant: Record<string, string> = {
  Featured:    "bg-secondary/15 text-secondary border-secondary/30 shadow-[0_0_12px_-2px_rgba(240,185,179,0.25)]",
  "New Listing":"bg-primary/12 text-primary border-primary/25 shadow-[0_0_12px_-2px_rgba(193,197,229,0.20)]",
  Exclusive:   "bg-gold/12 text-gold border-gold/25 shadow-[0_0_12px_-2px_rgba(201,169,110,0.22)]",
};

export function PropertyCard({ property, className }: PropertyCardProps) {
  const {
    id, title, address, city, priceLabel, beds, bedsLabel, baths, sqft, type, tag, image,
  } = property;

  return (
    <Link
      href={`/properties/${id}`}
      className={cn(
        "group relative flex flex-col rounded-2xl overflow-hidden",
        "ghost-border card-accent-border transition-all duration-500",
        "hover:shadow-[0_20px_60px_-10px_rgba(8,6,10,0.7),0_8px_24px_-4px_rgba(8,6,10,0.5)] hover:-translate-y-2",
        className,
      )}
    >
      {/* Image — 3:2 cinematic ratio */}
      <div className="relative aspect-[3/2] overflow-hidden bg-surface-c">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-107"
        />

        {/* Always-visible bottom gradient */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Tag / Status badges */}
        {tag && (
          <span
            className={cn(
              "absolute top-4 left-4 px-3 py-1 rounded-full border text-label-sm font-semibold backdrop-blur-sm",
              tagVariant[tag] ?? "bg-surface-c/80 text-on-surface border-outline-variant/30",
            )}
          >
            {tag}
          </span>
        )}
        {type === "sold" && (
          <span className="absolute top-4 right-4 px-3 py-1 rounded-full border bg-tertiary/15 text-tertiary border-tertiary/30 text-label-sm font-semibold backdrop-blur-sm shadow-[0_0_12px_-2px_rgba(242,185,171,0.2)]">
            Sold
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-5 bg-surface-c-high flex-1">
        <div>
          <p className="text-label-md text-outline mb-1">{city}</p>
          <h3 className="font-serif text-title-lg text-on-surface font-semibold leading-snug group-hover:text-primary transition-colors duration-200">
            {title}
          </h3>
          <p className="text-body-md text-on-surface-variant mt-0.5">{address}</p>
        </div>

        {/* Specs — small caps */}
        <div
          className="flex items-center gap-4 text-on-surface-variant"
          style={{ fontVariant: "small-caps", fontSize: "0.8rem", letterSpacing: "0.04em" }}
        >
          <span className="flex items-center gap-1.5">
            <BedDouble size={13} className="text-outline" />
            {bedsLabel ?? beds} Beds
          </span>
          <span className="flex items-center gap-1.5">
            <Bath size={13} className="text-outline" />
            {baths} Baths
          </span>
          <span className="flex items-center gap-1.5">
            <Maximize2 size={13} className="text-outline" />
            {sqft > 0 ? `${sqft.toLocaleString()} ft²` : "—"}
          </span>
        </div>

        {/* Price row + View Property reveal */}
        <div className="pt-3 border-t border-outline-variant/15 overflow-hidden">
          <div className="flex items-end justify-between">
            <div>
              <span className="font-serif text-headline-sm font-semibold text-secondary block leading-none">
                {priceLabel}
              </span>
              <span className="text-label-sm text-on-surface-variant capitalize mt-1 block">
                {type === "lease" ? "For Lease" : type === "sold" ? "Sold" : "For Sale"}
              </span>
            </div>
            {/* "View Property →" slides up on hover */}
            <span className="text-label-md text-secondary flex items-center gap-1 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              View Property <ArrowRight size={12} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
