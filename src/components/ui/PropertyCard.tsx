"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { BedDouble, Bath, Maximize2, ArrowRight } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
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
    id, title, address, city, priceLabel, beds, bedsLabel, baths, sqft, type, tag, image, video,
  } = property;

  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // 3D Tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (video && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
    if (video && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      whileHover="hover"
      initial="initial"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      data-cursor="view"
      className={cn("h-full perspective-1000", className)}
    >
      <Link
        href={`/properties/${id}`}
        className={cn(
          "group relative flex flex-col h-full rounded-2xl overflow-hidden",
          "card-accent-border transition-all duration-500 shadow-card",
          "border border-outline-variant",
          "hover:shadow-[0_20px_48px_-10px_rgba(22,27,51,0.18),0_8px_24px_-6px_rgba(22,27,51,0.12)]",
        )}
      >
        <motion.div
          variants={{ hover: { y: -4 }, initial: { y: 0 } }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="flex flex-col h-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Media area — 3:2 cinematic ratio */}
          <div className="relative aspect-[3/2] overflow-hidden bg-surface-c">

            {/* Still image — always rendered, fades out when video is playing */}
            <motion.div
              variants={{ hover: { scale: 1.1 }, initial: { scale: 1 } }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
              style={{
                opacity: video && isHovered && videoReady ? 0 : 1,
                transition: "opacity 0.6s ease",
              }}
            >
              <Image
                src={image}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </motion.div>

            {/* Video — crossfades in on hover */}
            {video && (
              <video
                ref={videoRef}
                src={video}
                muted
                loop
                playsInline
                preload="none"
                onCanPlay={() => setVideoReady(true)}
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  opacity: isHovered && videoReady ? 1 : 0,
                  transition: "opacity 0.6s ease",
                }}
              />
            )}

            {/* Bottom gradient */}
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            {/* Tag / Status badges */}
            {tag && (
              <motion.span
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
                className={cn(
                  "absolute top-4 left-4 px-3 py-1 rounded-full border text-label-sm font-semibold backdrop-blur-md z-10",
                  tagVariant[tag] ?? "bg-surface-c/80 text-on-surface border-outline-variant/30",
                )}
                style={{ transform: "translateZ(60px)" }}
              >
                {tag}
              </motion.span>
            )}
            {type === "sold" && (
              <span
                className="absolute top-4 right-4 px-3 py-1 rounded-full border bg-tertiary/20 text-tertiary border-tertiary/40 text-label-sm font-semibold backdrop-blur-md z-10"
                style={{ transform: "translateZ(60px)" }}
              >
                Sold
              </span>
            )}
          </div>

          {/* Content */}
          <div
            className="flex flex-col gap-3 p-6 bg-white flex-1"
            style={{ transform: "translateZ(30px)" }}
          >
            <div>
              <p className="text-label-md text-outline mb-1.5 tracking-wider">{city}</p>
              <h3 className="font-serif text-title-lg text-on-surface font-semibold leading-snug group-hover:text-secondary transition-colors duration-300">
                {title}
              </h3>
              <p className="text-body-md text-on-surface-variant/80 mt-1">{address}</p>
            </div>

            {/* Specs */}
            <div
              className="flex items-center gap-4 text-on-surface-variant/60"
              style={{ fontVariant: "small-caps", fontSize: "0.75rem", letterSpacing: "0.06em" }}
            >
              <span className="flex items-center gap-1.5">
                <BedDouble size={13} />
                {bedsLabel ?? beds} Beds
              </span>
              <span className="flex items-center gap-1.5">
                <Bath size={13} />
                {baths} Baths
              </span>
              <span className="flex items-center gap-1.5">
                <Maximize2 size={13} />
                {sqft > 0 ? `${sqft.toLocaleString()} ft²` : "—"}
              </span>
            </div>

            {/* Price row */}
            <div className="pt-4 mt-auto border-t border-outline-variant/10 overflow-hidden">
              <div className="flex items-end justify-between">
                <div>
                  <span className="font-serif text-headline-sm font-semibold text-secondary block leading-none">
                    {priceLabel}
                  </span>
                  <span className="text-label-sm text-on-surface-variant/50 capitalize mt-2 block tracking-wide">
                    {type === "lease" ? "For Lease" : type === "sold" ? "Sold" : "For Sale"}
                  </span>
                </div>
                <motion.div
                  variants={{ hover: { y: 0, opacity: 1 }, initial: { y: 20, opacity: 0 } }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-1.5 text-secondary"
                >
                  <span className="text-label-sm font-bold tracking-[0.2em]">DETAILS</span>
                  <ArrowRight size={12} />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
