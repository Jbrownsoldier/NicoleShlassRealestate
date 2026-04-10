"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PropertyCard } from "@/components/ui/PropertyCard";
import type { Property } from "@/data/properties";

interface SoldPropertiesCarouselProps {
  properties: Property[];
}

export function SoldPropertiesCarousel({ properties }: SoldPropertiesCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const { clientWidth } = scrollRef.current;
    // Scroll by roughly one card width
    const scrollAmount = direction === "left" ? -400 : 400;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  // Only render sold properties
  const sold = properties.filter((p) => p.type === "sold");

  if (sold.length === 0) return null;

  return (
    <div className="relative w-full">
      {/* Scroll Controls */}
      <div className="flex justify-end gap-3 mb-8 hidden md:flex px-6 max-w-7xl mx-auto">
        <button
          onClick={() => scroll("left")}
          className="w-12 h-12 rounded-full border border-outline-variant/30 flex items-center justify-center text-on-surface hover:bg-surface-c hover:border-secondary/50 transition-all shadow-sm"
          aria-label="Scroll left"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => scroll("right")}
          className="w-12 h-12 rounded-full border border-outline-variant/30 flex items-center justify-center text-on-surface hover:bg-surface-c hover:border-secondary/50 transition-all shadow-sm"
          aria-label="Scroll right"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Carousel Track */}
      <div className="relative w-full overflow-hidden">
        <div
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 pt-4 px-6 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
          style={{
            // Add dynamic padding so the first card aligns with the max-w-7xl container,
            // but still allows bleeding off the screen edges.
            paddingLeft: "max(1.5rem, calc((100vw - 80rem) / 2 + 1.5rem))",
            paddingRight: "max(1.5rem, calc((100vw - 80rem) / 2 + 1.5rem))",
            scrollPaddingLeft: "max(1.5rem, calc((100vw - 80rem) / 2 + 1.5rem))"
          }}
        >
          {sold.map((property) => (
            <div
              key={property.id}
              className="snap-start shrink-0 w-[85vw] sm:w-[50vw] md:w-[400px] lg:w-[420px]"
            >
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
