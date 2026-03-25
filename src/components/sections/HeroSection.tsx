"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MousePointer2 } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

function WordReveal({
  children,
  delay = 0,
  prefersReducedMotion,
}: {
  children: string;
  delay?: number;
  prefersReducedMotion: boolean | null;
}) {
  return (
    <span className="inline-block overflow-hidden" style={{ verticalAlign: "bottom" }}>
      <motion.span
        className="inline-block"
        initial={prefersReducedMotion ? {} : { y: "110%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

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
    prefersReducedMotion ? [0, 0] : [0, -40],
  );

  return (
    <section ref={ref} className="relative min-h-screen flex items-end overflow-hidden selection:bg-secondary/30">
      {/* Parallax video background */}
      <motion.div className="absolute inset-0 scale-110 origin-top" style={{ y: imageY }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center"
          preload="metadata"
        >
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>
      </motion.div>

      <div className="absolute inset-0 gradient-overlay-full" />
      <div className="absolute inset-0 gradient-overlay-bottom" />

      {/* Hero content with counter-parallax */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 pb-28 lg:pb-36 w-full"
        style={{ y: textY }}
      >
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-10 h-px bg-secondary/60" />
            <p className="text-label-lg text-secondary tracking-[0.2em]">TORONTO REAL ESTATE</p>
          </motion.div>

          <h1 className="font-serif text-display-lg text-on-surface font-semibold mb-7 leading-[1.05]">
            <WordReveal delay={0.3} prefersReducedMotion={prefersReducedMotion}>Your</WordReveal>{" "}
            <WordReveal delay={0.4} prefersReducedMotion={prefersReducedMotion}>Home.</WordReveal>
            <br />
            <span className="text-secondary italic">
              <WordReveal delay={0.55} prefersReducedMotion={prefersReducedMotion}>Curated,</WordReveal>
            </span>{" "}
            <WordReveal delay={0.7} prefersReducedMotion={prefersReducedMotion}>Negotiated,</WordReveal>
            <br />
            <WordReveal delay={0.85} prefersReducedMotion={prefersReducedMotion}>Delivered.</WordReveal>
          </h1>

          <motion.p
            className="text-body-lg text-on-surface-variant max-w-xl mb-12 leading-relaxed opacity-90"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 0.9, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
          >
            Nicole Shlass is a Toronto Sales Representative known for her responsiveness,
            honesty, and commitment to helping clients find homes that truly fit their life.
            Whether you&apos;re buying, selling, or leasing — she&apos;s with you every step.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-5"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1, ease: "easeOut" }}
          >
            <MagneticButton strength={35}>
              <Link
                href="/properties"
                className="shimmer gradient-cta text-on-secondary font-semibold text-label-lg px-8 py-4.5 rounded-full inline-flex items-center gap-2.5 hover:opacity-90 transition-all duration-300 shadow-ambient group"
              >
                View Listings
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </MagneticButton>

            <MagneticButton strength={25}>
              <Link
                href="/concierge"
                className="inline-flex items-center gap-2.5 border border-on-surface/20 text-on-surface font-medium text-label-md px-8 py-4.5 rounded-full hover:border-secondary/40 hover:bg-secondary/5 transition-all duration-300 backdrop-blur-sm"
              >
                Private Consultation
                <MousePointer2 size={14} className="text-secondary opacity-60" />
              </Link>
            </MagneticButton>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating accolade badge */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.1, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute right-8 bottom-32 lg:right-16 lg:bottom-40 animate-float z-10 hidden sm:block"
      >
        <div className="glass rounded-full px-5 py-3 flex items-center gap-3 border border-gold/20 shadow-[0_0_24px_-6px_rgba(201,169,110,0.3)]">
          <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
          <span className="text-label-sm text-gold tracking-[0.15em]">TOP TORONTO AGENT</span>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3">
        <motion.div
          className="w-px bg-gradient-to-b from-secondary to-transparent"
          initial={{ height: 0 }}
          animate={{ height: 48 }}
          transition={{
            duration: 1.2,
            delay: 1,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <motion.div
            className="w-full bg-white"
            animate={{
              y: [0, 48, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ height: 12 }}
          />
        </motion.div>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="text-[9px] text-on-surface-variant/40 uppercase tracking-[0.3em] font-medium"
        >
          Scroll
        </motion.span>
      </div>
    </section>
  );
}
