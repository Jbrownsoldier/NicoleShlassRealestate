"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, Users, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { RevealOnScroll, StaggerChildren, StaggerItem } from "@/components/ui/RevealOnScroll";
import { AnimatedStat } from "@/components/ui/AnimatedStat";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Spotlight } from "@/components/ui/Spotlight";

const accolades = [
  { icon: Clock,  value: "14", suffix: " Yrs", label: "In the Toronto Market" },
  { icon: Award,  value: "2011",               label: "Career Start" },
  { icon: Users,  value: "10+",  suffix: " Yrs", label: "In Toronto Real Estate" },
  { icon: Award,  value: "416",                label: "Area Specialist" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-24 bg-primary-container overflow-hidden">
        <Spotlight />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <p className="text-label-lg text-secondary mb-4">ABOUT NICOLE</p>
              <h1 className="font-serif text-display-md text-on-surface font-semibold mb-6 text-balance">
                Where Precision<br />Meets Passion
              </h1>
              <p className="text-body-lg text-on-surface-variant leading-relaxed max-w-xl">
                I&rsquo;m driven by curiosity and fueled by connection, and I approach every client 
                relationship with intention. I listen deeply, think ahead, and stay fully committed 
                to delivering outcomes that align with both your lifestyle and long-term vision. 
                For me, success isn&rsquo;t just about closing a deal&mdash;it&rsquo;s about 
                knowing you feel confident, supported, and genuinely excited about the next chapter 
                you&rsquo;re stepping into.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-ambient"
            >
              <Image
                src="/nicole2.jpg"
                alt="Nicole Shlass"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-top"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-surface border-y border-outline-variant/20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <StaggerChildren className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {accolades.map(({ icon: Icon, value, suffix, label }) => (
              <StaggerItem key={label} className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Icon size={20} className="text-secondary" />
                </div>
                <div>
                  <AnimatedStat
                    value={value}
                    suffix={suffix}
                    className="font-serif text-display-md text-on-surface font-semibold"
                  />
                  <p className="text-label-md text-outline">{label}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Story */}
      <section className="py-28 bg-surface grain-overlay">
        <div className="max-w-3xl mx-auto px-6">
          <RevealOnScroll className="mb-14">
            <p className="text-label-lg text-secondary mb-5">HER STORY</p>
            <h2 className="font-serif text-headline-lg text-on-surface font-semibold">
              Built on Trust. Defined by Results.
            </h2>
          </RevealOnScroll>
          <StaggerChildren className="space-y-6 text-body-lg text-on-surface-variant leading-relaxed">
            <StaggerItem>
              <p>
                Real estate isn&apos;t just about buying and selling homes, it&apos;s about people, 
                relationships, and life changing transitions. I&apos;m a natural people person 
                and a bit of a relentless question asker, which helps me get to the heart of 
                what truly matters to you. I prioritize transparency, dependability, and a 
                customized approach for every client, making sure you always feel informed, 
                supported, and confident every step of the way. My goal is to make the process 
                feel clear, collaborative, and even enjoyable, because this isn&apos;t just 
                a transaction, it&apos;s a big moment in your life.
              </p>
            </StaggerItem>
            <StaggerItem>
              <p>
                I started my career working with first time buyers in the condo market, and as 
                my clients grew, so did my focus, naturally evolving into helping people move 
                into homes that better match their lifestyle and long term goals. One of my 
                favourite parts of this job is growing alongside my clients and being part 
                of that journey.
              </p>
            </StaggerItem>
            <StaggerItem>
              <p>
                Outside of work, family is a huge part of my life. I spend time caring for my 
                dad and love being &ldquo;Auntie Nikki&rdquo; to my friends&rsquo; kids, which 
                keeps me grounded and reminds me why finding the right home truly matters. 
                I&apos;m here to guide you with honesty, responsiveness, and a genuine commitment 
                to getting you the information you need fast, so you can move forward with 
                confidence and clarity.
              </p>
            </StaggerItem>
          </StaggerChildren>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-surface-c-low text-center relative overflow-hidden group/cta">
        <RevealOnScroll className="max-w-xl mx-auto px-6 relative z-10">
          <h2 className="font-serif text-headline-lg text-on-surface font-semibold mb-4 text-balance">
            Ready to Find Your Place in Toronto?
          </h2>
          <p className="text-body-lg text-on-surface-variant mb-10 leading-relaxed opacity-80">
            Whether you&apos;re buying, selling, or leasing — Nicole is ready to put her
            expertise to work for you.
          </p>
          <MagneticButton strength={30}>
            <Link
              href="/concierge"
              className="gradient-cta text-on-secondary font-semibold text-label-lg px-8 py-4.5 rounded-full inline-flex items-center gap-2 hover:opacity-90 transition-all duration-300 shadow-ambient mx-auto"
            >
              Get in Touch <ArrowRight size={16} />
            </Link>
          </MagneticButton>
        </RevealOnScroll>
        <div className="absolute inset-0 bg-secondary/5 opacity-0 group-hover/cta:opacity-100 transition-opacity duration-700 pointer-events-none" />
      </section>
    </>
  );
}
