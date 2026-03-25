"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [0, 120],
  );
  const textY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [0, -30],
  );

  return (
    <section ref={ref} className="relative min-h-screen flex items-end overflow-hidden">
      {/* Parallax background image — scale-110 hides edges during scroll */}
      <motion.div className="absolute inset-0 scale-110 origin-top" style={{ y: imageY }}>
        <Image
          src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=2000&q=85&auto=format"
          alt="Toronto luxury home"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      <div className="absolute inset-0 gradient-overlay-full" />
      <div className="absolute inset-0 gradient-overlay-bottom" />

      {/* Vertical "EST. 2011" — right edge */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3 z-10">
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-on-surface-variant/30" />
        <p
          className="text-label-sm text-on-surface-variant/50 tracking-widest"
          style={{ writingMode: "vertical-rl", letterSpacing: "0.25em" }}
        >
          EST. 2011
        </p>
        <div className="w-px h-16 bg-gradient-to-t from-transparent to-on-surface-variant/30" />
      </div>

      {/* Hero content with subtle counter-parallax */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 pb-28 w-full"
        style={{ y: textY }}
      >
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-px bg-secondary/60" />
            <p className="text-label-lg text-secondary">TORONTO REAL ESTATE</p>
          </div>

          <h1 className="font-serif text-display-lg text-on-surface font-semibold mb-7">
            Your Home.<br />
            <span className="text-primary">Curated,</span>{" "}
            Negotiated,<br />
            Delivered.
          </h1>

          <p className="text-body-lg text-on-surface-variant max-w-xl mb-10 leading-relaxed">
            Nicole Shlass is a Toronto Sales Representative known for her responsiveness,
            honesty, and commitment to helping clients find homes that truly fit their life.
            Whether you&apos;re buying, selling, or leasing — she&apos;s with you every step.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/properties"
              className="gradient-cta text-on-secondary font-semibold text-label-lg px-8 py-4 rounded-full inline-flex items-center gap-2 hover:opacity-90 transition-opacity shadow-ambient"
            >
              View Listings <ArrowRight size={16} />
            </Link>
            <Link
              href="/concierge"
              className="inline-flex items-center gap-2 border border-on-surface/25 text-on-surface font-medium text-label-md px-8 py-4 rounded-xl hover:border-on-surface/50 hover:bg-white/5 transition-all duration-300"
            >
              Private Consultation
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <motion.div
          className="w-px bg-gradient-to-b from-on-surface-variant/50 to-transparent"
          initial={{ scaleY: 0, originY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
          style={{ height: 32 }}
        />
        <motion.svg
          width="14"
          height="8"
          viewBox="0 0 14 8"
          fill="none"
          className="text-on-surface-variant/50"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M1 1L7 7L13 1"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </div>
    </section>
  );
}
